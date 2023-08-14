const lodash = require('lodash')
const diyLog = require('diy-log')
const { colors, symbols } = diyLog

module.exports = {
  lodash,
  _: lodash,
  diyLog,
  logger: diyLog,
  colors,
  symbols,
  findup: require('find-up'),
  fs: require('fs-extra'),
  gulp: require('gulp'),
  glob: require('glob'),
  merge: require('merge2'),
  importFresh: require('import-fresh'),
  minimist: require('minimist')
}

;[
  'defaultConfig',
  'fileExists',
  'generateConfig',
  'getConfig',
  'jsFile',
  'pkgDir',
  'readJsonFiles',
  'stringifyJS',
].forEach(m => {
  Object.assign(module.exports, require(`./libs/${m}`))
})
