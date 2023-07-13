const path = require('path')
const importFresh = require('import-fresh')
// const { cosmiconfig } = require('cosmiconfig')
const _ = require('lodash')

const defaultConfig = require('./defaultConfig')

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
  return typeof fileContent === 'function' ? fileContent() : fileContent
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
  const { outDir, fileHash, minify, sourcemap } = build

  result.tasks = tasks.map((item, index) => {
    /* 
    name: item.name ?? `html:${index}`,
    input: '',
    dest: '',
    base: '',
    compiler: '',
    compilerOptions: {},
    module: false,
    plugins: [],
    minify: false,
    minifyOptions: {},
    fileHash: false,
    sourcemap: false,
    alias: {},
    */

    if (!item.type) return false
    
    if (!item.name) {
      item.name = `${item.type}:${index}`
    }
    if (!item.dest) {
      item.dest = outDir
    }
    if (item.base === undefined && base) {
      item.base = base
    }
    if (item.minify === undefined) {
      item.minify = minify
    }
    if (item.fileHash === undefined) {
      item.fileHash = fileHash
    }
    if (item.sourcemap === undefined) {
      item.sourcemap = sourcemap
    }
    if (item.alias === undefined && alias) {
      item.alias = alias
    }
    return item
  }).filter(item => item)

  return result
}
