/**
 * ESLint检查 任务
 * 
 * @param {Object} options - 配置项
 * @param {string|string[]|string[][]|Object.<string, string|string[]>} options.input - 输入文件路径
 * @param {string} [options.base] - 输入文件路径的基准目录
 * @param {function} done - 任务完成回调函数
 * @returns {Stream} 返回处理后的文件流
 * @throws {Error} 如果`options.input`未定义，则抛出错误
 */
module.exports = async function eslintTask(options = {}, done) {
  const eslint = require('gulp-eslint-new')
  const gulp = require('gulp')
  const { onDone } = require('../base/utils')
  const { createSrcOptions, plumber } = require('./comm')

  const {
    input
  } = options

  if (!input) {
    throw new Error('input is required')
  }

  const srcOptions = createSrcOptions(options.base, eslintTask)

  return gulp.src(input, srcOptions)
    .pipe(plumber.handler())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('end', onDone(done))
}
