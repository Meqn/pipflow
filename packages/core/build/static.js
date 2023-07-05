const gulp = require('gulp')

const { pipeline } = require('../base/utils')
const { createSrcOptions, outputFiles, plumber } = require('./comm')

module.exports = function staticTask(options = {}, done) {
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

  // 1. 外部插件
  if (Array.isArray(plugins) && plugins.length > 0) {
    processes.push(plugins)
  }

  // 2. 文件指纹处理 & 输出文件
  outputFiles(processes, {
    dest,
    fileHash
  })

  return pipeline(
    gulp.src(input, srcOptions),
    processes
  ).on('end', done)
}
