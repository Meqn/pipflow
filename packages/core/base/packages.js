const { pipeline } = require('./utils')

module.exports = {
  pipeline,
  gulp: require('gulp'),
  glob: require('glob'),
  lodash: require('lodash'),
  through: require('through2'),
  merge: require('merge2'),
  logger: require('diy-log'),
  envLoader: require('gulp-env-loader'),
}
