;[
  'defaultConfig',
  'utils',
  'env',
  'fileExists',
  'generateConfig',
  'getConfig',
  'jsFile',
  'pkgDir',
  'readJsonFiles',
  'stringifyJS',
  'findCommonPath',
].forEach((m) => {
  Object.assign(exports, require(`./libs/${m}`))
})

const diyLog = require('diy-log')
exports.logger = diyLog
exports.colors = diyLog.colors
exports.symbols = diyLog.symbols
exports.timestamp = diyLog.timestamp
exports.fs = require('fs-extra')
exports.minimist = require('minimist')
exports.path = require('pathe')
