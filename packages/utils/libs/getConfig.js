const path = require('path')
const importFresh = require('import-fresh')
// const { cosmiconfig } = require('cosmiconfig')
const _ = require('lodash')

const { defaultConfig } = require('./defaultConfig')

/**
 * 获取用户自定义配置
 * 由于配置文件简单, 故暂不使用 `cosmiconfig`
 * @param {string|object} filePath 配置文件, 比如 `pipflow.config`, 可读取 `js|json`文件
 * @param {string} filePath.cwd 当前运行目录
 * @param {string} filePath.path 文件路径
 * @returns 
 */
function getUserConfig(filePath) {
  let fileContent
  if (typeof filePath === 'string') {
    fileContent = importFresh(path.resolve(filePath))
  }
  if (typeof filePath === 'object') {
    fileContent = importFresh(path.resolve(filePath.cwd, filePath.path))
  }

  const configEnv = {
    mode: process.env.PIPFLOW_MODE
  }
  if (['serve', 'build'].includes(process.env.PIPFLOW_CLI_COMMAND)) {
    configEnv.command = process.env.PIPFLOW_CLI_COMMAND
  }

  return typeof fileContent === 'function' ? fileContent(configEnv) : fileContent
}

/**
 * 是否压缩
 * @param {any} self 子集项
 * @param {boolean} parent 父级项
 * @returns 
 */
function isMinify(self, parent) {
  return self ? true : self === false ? false : parent
}

/**
 * 获取压缩配置项
 * @param {string} type 任务类型
 * @param {object} options 配置项
 * @returns 
 */
function getMinify(type, options = {}) {
  const { minify, htmlMinify, jsMinify, cssMinify, imageMinify } = options
  
  if (type === 'script') {
    return jsMinify ?? minify
  } else if (type === 'style') {
    return cssMinify ?? minify
  } else if (type === 'html') {
    return htmlMinify ?? minify
  } else if (type === 'static' || type === 'image') {
    return imageMinify ?? minify
  }
  return minify
}

/**
 * 获取配置项
 * @param {object|string} file 配置文件url或自定义配置项
 */
module.exports = function getConfig(file) {
  let userConfig = {}
  if (typeof file === 'string') {
    file = {
      path: file
    }
  }
  if (file.tasks && file.tasks.length > 0) {
    userConfig = file
  } else {
    userConfig = getUserConfig({
      path: file.path,
      cwd: file.cwd || process.cwd()
    })
  }
  
  const result = _.merge({}, defaultConfig, userConfig)
  const { base, alias, tasks = [], build = {}  } = result
  const { outDir, fileHash, sourcemap } = build
  // [minify, sourcemap, fileHash] 必须在 `build` 命令下有效
  const isBuild = process.env.PIPFLOW_CLI_COMMAND === 'build'

  result.tasks = tasks.map((item, index) => {
    if (!item.type) return false
    
    if (!item.name) {
      item.name = `${item.type}:${index + 1}`
    }
    if (!item.dest) {
      item.dest = outDir
    }
    if (item.base === undefined && base) {
      item.base = base
    }

    if (item.minify === undefined) {
      item.minify = getMinify(item.type, build) && isBuild
    }
    if (item.fileHash === undefined) {
      item.fileHash = fileHash && isBuild
    }
    if (item.sourcemap === undefined) {
      item.sourcemap = sourcemap && isBuild
    }
    if (item.alias || alias) {
      item.alias = _.merge({}, alias, item.alias)
    }
    return item
  }).filter(item => item)

  return result
}
