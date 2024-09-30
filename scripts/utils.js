const fs = require('fs')
const path = require('path')
const { packagesMap, semverSymbol, messagesType, defaultChangeLog } = require('./config')

/**
 * 读取模块文件内容
 *
 * @param {string} name 模块名
 * @param {string} filename 文件名
 * @returns {Promise}
 */
function readPackageFile(name, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, '../', packagesMap[name], filename || 'CHANGELOG.md')
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

/**
 * 写入模块文件内容
 *
 * @param {string} name 模块名
 * @param {string} filename 文件名
 * @returns {Promise}
 */
function writePackageFile(name, data, filename) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.resolve(__dirname, '../', packagesMap[name], filename || 'CHANGELOG.md'),
      data,
      (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      }
    )
  })
}

/**
 * 日志排序
 *
 * @param {Array.<string>} logs 日志列表
 * @returns {Array.<string>}
 */
function sortLogsByType(logs) {
  const msgRegex = new RegExp(`- (${messagesType.join('|')}):[\\s\\S]+`)
  return logs
    .reduce((acc, cur) => {
      const type = cur.match(msgRegex)?.[1]
      const index = messagesType.indexOf(type)
      if (index > -1) {
        acc[index].push(cur)
      }
      return acc
    }, messagesType.map(() => []).concat([[]]))
    .reduce((acc, cur) => acc.concat(cur), [])
}

/**
 * 更新日志内容
 *
 * @param {string} content 日志内容
 * @param {string} version 版本号
 * @param {Array.<string>} logs 日志列表
 * @returns {Promise}
 */
function updateChangelog(content, version, logs) {
  const [v1, v2, v3] = version.split('.')
  const regex = new RegExp(`## ${v1}\\.${v2}\\.${v3}[\\s]*### (Patch|Minor|Major) Changes\\n`)
  logStr = sortLogsByType(logs).join('\n')

  return content
    .replace(regex, (match, p1) => {
      // console.log('replace : ', match, p1)
      return match.replace('Changes', 'Changes ' + semverSymbol[p1])
      // return match + ' ' + semverSymbol[p1]
    })
    .replace(defaultChangeLog, logStr)
}

/**
 * 读取JSON文件内容
 *
 * @param {string} name 模块名
 * @param {string} filename 文件名
 * @returns {Promise}
 */
function readPackageJson(name, filename) {
  return readPackageFile(name, filename || 'package.json').then((data) => JSON.parse(data))
}

module.exports = {
  readPackageFile,
  writePackageFile,
  readPackageJson,
  updateChangelog,
  sortLogsByType,
}
