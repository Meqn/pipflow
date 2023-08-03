const nodeEnv = process.env.NODE_ENV
if (!nodeEnv) {
  process.env.NODE_ENV = ['development', 'production'].includes(process.env.PIPFLOW_MODE) ? process.env.PIPFLOW_MODE : 'development'
}

const { defaultConfig } = require('./libs/defaultConfig')
const getConfig = require('./libs/getConfig')
const generateConfig = require('./libs/generateConfig')

const { readJsonFiles, readJsonFilesSync } = require('./libs/readJsonFiles')
const { pkgDir, pkgDirSync } = require('./libs/pkgDir')

const lodash = require('lodash')
const diyLog = require('diy-log')

module.exports = {
  defaultConfig,
  getConfig,
  generateConfig,

  readJsonFiles,
  readJsonFilesSync,
  pkgDir,
  pkgDirSync,

  diyLog,
  logger: diyLog,
  colors: diyLog.colors,
  symbols: diyLog.symbols,
  findup: require('find-up'),
  fs: require('fs-extra'),
  gulp: require('gulp'),
  glob: require('glob'),
  merge: require('merge2'),
  importFresh: require('import-fresh'),
  lodash,
  _: lodash,
  minimist: require('minimist')
}
