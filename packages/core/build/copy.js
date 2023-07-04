const gulp = require('gulp')

const { pipeline } = require('../base/utils')

module.exports = function copyTask(options = {}, done) {
  const {
    plugins
  } = options
  const processes = []

  // 1. 外部插件
  if (Array.isArray(plugins) && plugins.length > 0) {
    processes.push(plugins)
  }
  
  // 2. 输出文件
  processes.push(gulp.dest('./dist'))

  return pipeline(
    gulp.src(['./public/**/*']),
    processes
  ).on('end', done)
}
