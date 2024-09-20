const gulp = require('gulp')
const path = require('path')
const concat = require('gulp-concat')
// const gulpif = require('gulp-if')
const replace = require('gulp-replace')
const uglifyjs = require('gulp-terser')
const sourcemaps = require('gulp-sourcemaps')
const filter = require('gulp-filter')
const merge = require('merge2')
const {
  isPlainObject,
  injectEnv
} = require('@pipflow/utils')

const { pipeline, onDone } = require('../base/utils')
const { outputFiles, createSrcOptions, plumber, putProcesses, getBasePath } = require('./comm')

/**
 * 处理 script文件 (非 module)
 * @param {object} options 配置项
 * @param {Function} done 回调
 * @returns 
 */
function compileScript(options = {}, done) {
  if (!options.input) {
    throw new Error('input is required')
  }

  const {
    input,
    alias,
    minify: jsMinify
  } = options
  
  const processes = []
  const jsFilter = filter('*.{js,mjs}', { restore: true })
  const srcOptions = createSrcOptions(options)
  const basePath = getBasePath(input, options.base || '.') //合并文件后的基础路径

  // 统一入口方式 (input支持 `string`, `array`, `object`)
  const entries = (
    isPlainObject(input)
      ? Object.keys(input).map(name => ({ name, file: input[name] }))
      : [{ name: '', file: input }]
  ).map(({ name, file }) => {
    const baseProcesses = []

    // 1. plumber错误处理
    processes.push(plumber.handler())

    // 2.1 sourcemaps.init
    if (options.sourcemap) {
      baseProcesses.push(sourcemaps.init({ loadMaps: true }))
    }

    // 3. 环境变量处理
    baseProcesses.push(injectEnv())

    // 4. replace 别名替换
    if (isPlainObject(alias)) {
      for (const key in alias) {
        baseProcesses.push(replace(key, alias[key]))
      }
    }

    // 5. 合并文件
    if (name) {
      baseProcesses.push(concat(path.join(basePath, `${name}.js`)))
    }

    return pipeline(
      gulp.src(file, name ? { ...srcOptions, base: '.' } : srcOptions),
      baseProcesses
    )
  })

  // 1. 自定义处理流程
  putProcesses(processes, options.plugins)

  // 2. 压缩处理
  if (jsMinify) {
    const minifyOptions = isPlainObject(jsMinify) ? jsMinify : {}
    processes.push(uglifyjs(minifyOptions))
  }

  /* 
  // 3.2 sourcemaps 输出
  if (hasSourcemap) {
    processes.push(sourcemaps.write('.'))
  }

  // 7.1 文件指纹 revision
  if (fileHash) {
    processes.push(mapFilter) //仅处理js文件 (过滤.map文件)
    processes.push(rev())
    processes.push(mapFilter.restore)
  }

  // 8.输出文件
  processes.push(gulp.dest(dest))
  
  // 7.2 输出revision manifest.json
  if (fileHash) {
    processes.push(rev.manifest({ merge: true }))
    processes.push(gulp.dest(dest))
  } */

  // 3. 文件指纹处理 & sourcemaps & 输出文件
  outputFiles(processes, {
    ...options,
    filter: jsFilter,
  })
  
  return pipeline(
    merge(...entries),
    processes
  ).on('end', done)

}

/**
 * Javascript 处理任务
 * 
 * @param {Object} options - 配置项
 * @param {string|string[]|string[][]|Object.<string, string|string[]>} options.input - 输入文件路径
 * @param {string} [options.dest] - 输出目录
 * @param {string} [options.name] - 任务名
 * @param {string} [options.base] - 输入文件路径的基准目录
 * @param {'babel'} [options.compiler] - 编译器配置
 * @param {boolean|Object.<string, any>} [options.minify=false] - 启用JS压缩或配置项
 * @param {boolean|'?'|'-'} [options.fileHash] - 生成文件指纹 ('?':后缀形式, '-':连接形式)
 * @param {boolean} [options.sourcemap=false] - 生成sourcemap
 * @param {Object.<string, string>} [options.alias] - 别名替换
 * @param {((...args: any[]) => Stream)[]} [options.plugins] - 自定义处理流程
 * @param {function} done - 任务完成回调函数。
 * @returns {Stream} 返回处理后的文件流。
 * @throws {Error} 如果`options.input`未定义，则抛出错误。
 */
module.exports = function scriptTask(options = {}, done) {
  if (options.compiler) {
    return require('./script.module')(options, onDone(done))
  } else {
    return compileScript(options, onDone(done))
  }
}
