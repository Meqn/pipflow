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
  'findCommonPath'
].forEach(m => {
  Object.assign(exports, require(`./libs/${m}`))
})

// const lodash = require('lodash')
const diyLog = require('diy-log')

// exports.lodash = lodash
// exports._ = lodash
exports.logger = diyLog
exports.colors = diyLog.colors
exports.symbols = diyLog.symbols
exports.timestamp = diyLog.timestamp
// exports.findup = require('find-up')
exports.fs = require('fs-extra')
exports.gulp = require('gulp')
exports.minimist = require('minimist')
// exports.glob = require('glob')
// exports.browserSync = require('browser-sync')
// exports.merge = require('merge2')
// exports.importFresh = require('import-fresh')

