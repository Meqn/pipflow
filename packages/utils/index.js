const lodash = require('lodash')
const diyLog = require('diy-log')
const { colors, symbols, timestamp } = diyLog

module.exports = {
  lodash,
  _: lodash,
  diyLog,
  logger: diyLog,
  colors,
  symbols,
  timestamp,
  findup: require('find-up'),
  fs: require('fs-extra'),
  gulp: require('gulp'),
  glob: require('glob'),
  browserSync: require('browser-sync'),
  merge: require('merge2'),
  importFresh: require('import-fresh'),
  minimist: require('minimist')
}

;[
  'defaultConfig',
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
  Object.assign(module.exports, require(`./libs/${m}`))
})
