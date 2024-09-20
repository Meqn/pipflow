const gulp = require('gulp')
const { pipeline, onDone } = require('../base/utils')
const { createSrcOptions } = require('./comm')

/**
 * 自定义流程任务
 * 
 * @param {Object} options - 配置项
 * @param {string|string[]|string[][]|Object.<string, string|string[]>} [options.input] - 输入文件路径
 * @param {string} [options.dest] - 输出目录
 * @param {(done: Function) => Stream|void} [options.compiler] - 自定义处理函数
 * @param {((...args: Stream[]) => Stream)[]} [options.plugins] - 自定义处理流程
 * @param {function} done - 任务完成回调函数
 * @returns {Stream|void}
 */
module.exports = function userTask(options = {}, done) {
  const { input, compiler, plugins } = options

  // 1. 自定义处理函数
  if (typeof compiler === 'function') {
    return compiler(onDone(done))
  }

  // 2. 自定义处理流程
  if (Array.isArray(plugins) && plugins.length > 0) {
    if (input) {
      const srcOptions = createSrcOptions(options)

      return pipeline([
        gulp.src(input, srcOptions),
        ...plugins,
        gulp.dest(options.dest)
      ]).on('end', onDone(done))
    }

    return pipeline(plugins).on('end', onDone(done))
  }

  return onDone(done).call(this)
}
