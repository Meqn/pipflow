const fs = require('fs-extra')
const { glob, globSync } = require('glob')
const _ = require('lodash')

/**
 * 异步读取Json文件,支持 `glob pattern`
 * @param {string|string[]} pattern 文件路径，支持 `glob pattern`
 * @param {object} options 配置项, 支持 `GlobOptions`
 * @param {boolean} options.merge 是否合并Json
 * @returns {object[]|object}
 */
async function readJsonFiles(pattern, options = {}) {
  if (!pattern) return []

  const contents = []
  const files = await glob(pattern, options)

  for (const file of files) {
    const json = await fs.readJson(file)
    contents.push(json)
  }

  return options.merge ? _.merge({}, ...contents) : contents
}

/**
 * 同步读取Json文件,支持 `glob pattern`
 */
function readJsonFilesSync(pattern, options = {}) {
  if (!pattern) return []

  const contents = []
  const files = globSync(pattern, options)

  for (const file of files) {
    const json = fs.readJsonSync(file)
    contents.push(json)
  }

  return options.merge ? _.merge({}, ...contents) : contents
}

module.exports = {
  readJsonFiles,
  readJsonFilesSync
}
