const path = require('path')
const gulpFilter = require('gulp-filter')
const rev = require('gulp-rev')
const jsonEditor = require('gulp-json-editor')
const gulpPlumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const {
  gulp,
  isPlainObject,
  logger,
  colors,
  symbols,
  readJsonFilesSync
} = require('@pipflow/utils')

// gulp-rev `manifest.json` 保存目录
const revDir = 'revManifest'

const hashRegex = /(-\w{5,}\.\w+)$/

/************************************************
 * 生成 gulp.src 选项
 * @param {object} options 选项
 * @param {string} options.name 任务名
 * @param {string} options.base 基础路径
 * @returns 
 */
function createSrcOptions({ name, base }) {
  const ret = {}
  if (name) {
    // 增量构建能,加快执行时间
    ret.since = gulp.lastRun(name)
  }
  if (base) {
    ret.base = base
  }
  return ret
}

/************************************************
 * 计算相对共同目录的相对url
 * @param {string[]} urls 文件相对路径
 * @param {string} base 基础路径
 * @returns 
 */
function getCommonPath(urls, base) {
  if (!Array.isArray(urls) || urls.length === 0) return ''
  const fragments = urls.map(p => {
    p = p.split('/').filter(v => v && v !== '.')
    if (p[p.length - 1].includes('.')) {
      return p.slice(0, p.length - 1)
    }
    return p
  })
  const comm = fragments.reduce((prev, cur) => {
    return prev.filter((frag, idx) => cur[idx] === frag);
  })

  if (comm.length === 0 || !base || base === '.') {
    return ''
  }
  
  base = base.replace(/^\.?\/+/, '').replace(/\/+$/, '') // 去掉 base 开始和结束的 `/`
  const commStr = comm.join('/')
  if (commStr.includes(base)) {
    return commStr.split(base).pop().replace(/^\/+/, '')
  }
  return ''
}

// 获取公共基础路径
function getBasePath(files, base) {
  if (isPlainObject(files)) {
    files = Object.values(files).reduce((list, current) => {
      return list.concat(current)
    }, [])
  } else if (typeof files === 'string') {
    if (!files) return ''
    files = [files]
  }
  return getCommonPath(files, base)
}

/************************************************
 * 自定义处理流程
 * @param {Array} plugins 流程
 */
function putProcesses(processes, plugins) {
  if (Array.isArray(plugins) && plugins.length > 0) {
    processes.push(...plugins)
  }
  return processes
}

/************************************************
 * plumber 错误处理
 */
const plumber = (function() {
  function errorHandler(error) {
    const { name, plugin, message } = error
    logger.time(symbols.error, colors.red(`${plugin} ${name} : ${message}`))
  }

  return {
    handler() {
      return gulpPlumber({ errorHandler })
    },
    stop() {
      return gulpPlumber.stop()
    }
  }
})();

/************************************************
 * 转换文件 hash 方式
 */
function transformHash(json) {
  return Object.keys(json).reduce((obj, key) => {
    const fileName = path.basename(json[key])
    const hash = hashRegex.test(fileName) ? fileName.split('-').pop().split('.')[0] : ''
    obj[key] = key + '?' + hash
    return obj
  }, {})
}

// 创建文件过滤器
function createFilter(filter) {
  if (typeof filter === 'string' || Array.isArray(filter)) {
    return gulpFilter(filter, { restore: true })
  }
  return filter
}

/************************************************
 * 生成文件指纹, sourcemaps 和 输出文件
 * 1. fileHash 作为文件名([name]-[hash])，则输出 rev后的文件及manifest.json
 * 2. fileHash 作为参数`?`([name]?[hash])，则仅输出文件及 manifest.json
 * @param {Array} processes 所有流程
 * @param {object} params 其他参数
 * @param {string} params.dest 输出目录
 * @param {string} params.fileHash 文件指纹
 * @param {string} params.filter 文件过滤
 * @param {boolean} params.sourcemap 是否输出 sourcemap
 */
function outputFiles(processes, {
  name: taskName,
  fileHash,
  dest,
  filter,
  sourcemap: hasSourcemap
}) {
  // 1. 写入sourcemap文件
  if (hasSourcemap) {
    processes.push(
      hasSourcemap === 'inline' ? sourcemaps.write() : sourcemaps.write('.')
    )
  }

  if (fileHash) {
    const fileFilter = createFilter(filter)
    // 2. 是否生成 hash文件
    // fileHash === '?' && processes.push(gulp.dest(dest))
    processes.push(gulp.dest(dest)) //!复制原始文件，防止 hash 文件未被替换后导致找不到文件 (容错)
    // 2.2 是否过滤指定文件
    if (fileFilter) {
      processes.push(fileFilter)
      processes.push(rev())
      processes.push(fileFilter.restore)
    } else {
      processes.push(rev())
    }
    // 2.3 生成 hash文件
    fileHash !== '?' && processes.push(gulp.dest(dest))

    // 3. 生成 manifest.json
    //! gulp-rev 使用 `merge` 选项存在bug。当并行任务生成`rev-mainifest.json`会混乱(覆盖)
    /* processes.push(rev.manifest(
      path.resolve(dest, revManifest),
      { merge: true, base: path.resolve(dest) }
    )) */
    processes.push(rev.manifest(
      taskName ? `rev-${taskName.replace(/:/g, '-')}.json` : `rev-${Date.now()}.json`
    ))

    // 3.1 转换`rev-manifest.json`内容
    if (fileHash === '?') {
      processes.push(jsonEditor(function(file) {
        return transformHash(file)
      }))
    }
    // 3.2 输出`rev-manifest`文件
    processes.push(gulp.dest(path.resolve(dest, revDir)))
  } else {
    processes.push(gulp.dest(dest))
  }
}

/**
 * 获取 manifest文件hash表, 并返回字符串形式内容
 *
 * @param {object} options - 选项
 * @param {string} options.dest - 目标目录
 * @param {boolean} options.fileHash - 该任务是否支持 fileHash
 * @return {string|null} - hash文件表
 */
function readManifest(options) {
  if (options.fileHash) {
    // path.posix 统一路径, 兼容window平台
    const json = readJsonFilesSync(path.posix.join(options.dest, revDir, '*.json'), { merge: true })
    return JSON.stringify(json)
  }
  return null
}

module.exports = {
  revDir,
  createSrcOptions,
  getCommonPath,
  getBasePath,
  plumber,
  putProcesses,
  transformHash,
  outputFiles,
  readManifest
}
