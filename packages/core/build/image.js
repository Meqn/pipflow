const { gulp, isPlainObject } = require('@pipflow/utils')

const { pipeline, onDone } = require('../base/utils')
const {
  createSrcOptions,
  outputFiles,
  plumber,
  putProcesses
} = require('./comm')

module.exports = function staticTask(options = {}, done) {
  if (!options.input) {
    throw new Error('input is required')
  }

  const {
    minify: imageMinify
  } = options

  const processes = []
  const srcOptions = createSrcOptions(options)

  // 1. plumber错误处理
  processes.push(plumber.handler())

  // 2. 自定义处理流程
  putProcesses(processes, options.plugins)

  // 3. 压缩图片
  if (imageMinify) {
    const minifyOptions = isPlainObject(imageMinify) ? imageMinify : {}
    const gulpImagemin = require('gulp-imagemin')
    processes.push(gulpImagemin(
      minifyOptions.plugins || undefined,
      minifyOptions.options || {}
    ))
  }

  // 3. 文件指纹处理 & 输出文件
  outputFiles(processes, {
    ...options,
    sourcemap: false
  })

  return pipeline(
    gulp.src(options.input, srcOptions),
    processes
  ).on('end', onDone(done))
}
