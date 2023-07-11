const gulp = require('gulp')

const { pipeline } = require('../base/utils')
const {
  createSrcOptions,
  outputFiles,
  plumber,
  putProcesses
} = require('./comm')

module.exports = function staticTask(options = {}, done) {
  const { input, dest, fileHash } = options

  if (!input) {
    throw new Error('input is required')
  }

  const processes = []
  const srcOptions = createSrcOptions(options)

  // 1. plumber错误处理
  processes.push(plumber.handler())

  // 2. 自定义处理流程
  putProcesses(processes, options.plugins)

  // 3. 文件指纹处理 & 输出文件
  outputFiles(processes, {
    dest,
    fileHash,
    sourcemap: false
  })

  return pipeline(
    gulp.src(input, srcOptions),
    processes
  ).on('end', done)
}
