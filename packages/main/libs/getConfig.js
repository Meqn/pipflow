const _ = require('lodash')

const defaultConfig = require('./defaults')
const {
  getUserConfig
} = require('./utils')


/**
 * 获取配置项
 * @param {object|string} file 配置文件url或自定义配置项
 */
module.exports = function getConfig(file = 'pipflow.config') {
  if (!file) {
    throw new Error('file is required')
  }

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
