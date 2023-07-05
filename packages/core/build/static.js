const gulp = require('gulp')

const { pipeline } = require('../base/utils')
const { createSrcOptions, outputFiles, plumber, putProcesses } = require('./comm')

module.exports = function staticTask(options = {}, done) {
  const {
    input,
    dest,
  } = options

  if (!input) {
    throw new Error('input is required')
  }

  const processes = [
    plumber.handler()
  ]
  const srcOptions = createSrcOptions(options)

  // 1. 自定义处理流程
  putProcesses(processes, options.plugins)

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
