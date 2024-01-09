const fs = require('fs-extra')
const { stringifyJS } = require('./stringifyJS')

/**
 * 读取Json文件
 * @param {string} file 文件路径
 * @param {object} options 配置项
 * @returns 
 */
exports.readJsonFile = async (file, options = {}) => {
  return await fs.readJson(
    file,
    options
  )
}

/**
 * 写入Json文件
 * @param {string} file 文件路径
 * @param {JSON} data 数据
 * @param {object} options 配置项
 * @returns 
 */
exports.writeJsonFile = async (file, data, options = { spaces: 2 }) => {
  return await fs.outputJson(
    file,
    data,
    options
  )
}

/**
 * 写入Js文件
 * @param {string} file 文件路径
 * @param {JSON} data 数据
 * @returns 
 */
exports.writeJsFile = async (file, data) => {
  if (typeof data === 'function') {
    // 自定义输出内容
    data = data(stringifyJS)
  } else {
    // 固定格式输出内容
    data = `module.exports = ${stringifyJS(data, null, 2)}`
  }

  return await fs.outputFile(
    file,
    data
  )
}
