const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const filter = require('gulp-filter')

const { pipeline } = require('../base/utils')
const { createSrcOptions, outputFiles, plumber, putProcesses } = require('./comm')

module.exports = function styleTask(options = {}, done) {
  const {
    input,
    dest,
    fileHash,
    sourcemap: hasSourcemap,
  } = options

  if (!input) {
    throw new Error('input is required')
  }
  
  const processes = []
  const srcOptions = createSrcOptions(options)
  const cssFilter = filter('**/*.css', { restore: true })

  // 2. plumber错误处理
  processes.push(plumber.handler())

  // 3.1 sourcemaps.init
  if (hasSourcemap) {
    processes.push(sourcemaps.init({ loadMaps: true }))
  }

  // 1. 自定义处理流程
  putProcesses(processes, options.plugins)

  // 9. 文件指纹处理 & sourcemaps & 输出文件
  outputFiles(processes, {
    dest,
    fileHash,
    filter: cssFilter,
    sourcemap: hasSourcemap,
  })

  return pipeline(
    gulp.src(input, srcOptions),
    processes
  ).on('end', done)
}
