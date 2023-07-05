const gulp = require('gulp')

const { pipeline } = require('../base/utils')
const { createSrcOptions, plumber } = require('./comm')

module.exports = function copyTask(options = {}, done) {
  const {
    input,
    dest,
    plugins
  } = options

  if (!input) {
    throw new Error('input is required')
  }

  const processes = [
    plumber.handler()
  ]
  const srcOptions = createSrcOptions(options)
  
  // 2. 外部插件
  if (Array.isArray(plugins) && plugins.length > 0) {
    processes.push(plugins)
  }
  
  // 3. 输出文件
  processes.push(gulp.dest(dest))

  return pipeline(
    gulp.src(input, srcOptions),
    processes
  ).on('end', done)
}
