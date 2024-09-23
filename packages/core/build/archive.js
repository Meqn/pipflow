/**
 * zip压缩包 任务
 * 
 * @param {Object} options - 配置项
 * @param {string|string[]|string[][]|Object.<string, string|string[]>} options.input - 输入文件路径
 * @param {string} [options.dest] - 输出目录
 * @param {string} [options.base] - 输入文件路径的基准目录
 * @param {((...args: any[]) => Stream)[]} [options.plugins] - 自定义处理流程
 * @param {function} done - 任务完成回调函数
 * @returns {Stream} 返回处理后的文件流
 * @throws {Error} 如果`options.input`未定义，则抛出错误
 */
module.exports = function archiveTask(options = {}, done) {
  const gulp = require('gulp')
  const zip = require('gulp-zip')
  const { timestamp } = require('@pipflow/utils')
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
