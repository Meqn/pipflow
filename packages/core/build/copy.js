const gulp = require('gulp')

const { pipeline, onDone } = require('../base/utils')
const { createSrcOptions, plumber, putProcesses } = require('./comm')

/**
 * copy复制文件/目录 任务
 * 
 * @param {Object} options - 配置项
 * @param {string|string[]|string[][]|Object.<string, string|string[]>} options.input - 输入文件路径
 * @param {string} [options.dest] - 输出目录
 * @param {string} [options.name] - 任务名
 * @param {string} [options.base] - 输入文件路径的基准目录
 * @param {((...args: any[]) => Stream)[]} [options.plugins] - 自定义处理流程
 * @param {function} done - 任务完成回调函数。
 * @returns {Stream} 返回处理后的文件流。
 * @throws {Error} 如果`options.input`未定义，则抛出错误。
 */
module.exports = function copyTask(options = {}, done) {
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
  
  // 3. 输出文件
  processes.push(gulp.dest(dest))

  return pipeline(
    gulp.src(input, srcOptions),
    processes
  ).on('end', onDone(done))
}
