module.exports = function archiveTask(options = {}, done) {
  const zip = require('gulp-zip')
  const { gulp, timestamp } = require('@pipflow/utils')
  const { pipeline, onDone } = require('../base/utils')
  const { createSrcOptions, plumber, putProcesses } = require('./comm')

  const {
    input,
    dest
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
  let filename = 'archive.zip'
  let outDir = dest
  // 获取压缩包名
  const regex = /(.+\.\w+)$/
  if (regex.test(dest)) {
    const destArr = dest.split('/')
    if (destArr.length === 1) {
      filename = destArr[0]
      outDir = '.'
    } else {
      filename = destArr.pop()
      outDir = destArr.join('/')
    }
  }
  // filename 支持 [name]-[time] 和 [name]-[date].zip
  if (filename.includes('[time]')) {
    filename = filename.replace('[time]', timestamp('YYYYMMDDHHmmss'))
  }
  if (filename.includes('[date]')) {
    filename = filename.replace('[date]', timestamp('YYYYMMDD'))
  }
  processes.push(zip(filename))
  
  // 4. 输出文件
  processes.push(gulp.dest(outDir))

  return pipeline(
    gulp.src(input, srcOptions),
    processes
  ).on('end', onDone(done))
}
