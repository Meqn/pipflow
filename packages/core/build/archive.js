module.exports = function archiveTask(options = {}, done) {
  const zip = require('gulp-zip')
  const { gulp } = require('@pipflow/utils')
  const { pipeline, onDone } = require('../base/utils')
  const { createSrcOptions, plumber, putProcesses } = require('./comm')

  const {
    input,
    dest,
    filename = 'archive',
  } = options

  if (!input) {
    throw new Error('input is required')
  }

  const processes = [
    plumber.handler()
  ]
  const srcOptions = createSrcOptions(options)
  
  // 2. 自定义处理流程
  putProcesses(processes, options.plugins)
  
  // 3. 创建zip压缩包
  processes.push(zip(filename.endsWith('.zip') ? filename : `${filename}.zip`))
  
  // 3. 输出文件
  processes.push(gulp.dest(dest))

  return pipeline(
    gulp.src(input, srcOptions),
    processes
  ).on('end', onDone(done))
}
