const path = require('path')
const importFresh = require('import-fresh')
// const { cosmiconfig } = require('cosmiconfig')

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

module.exports = {
  getUserConfig
}
