const gulp = require('gulp')
const { isPlainObject } = require('@pipflow/utils')

const { pipeline, onDone } = require('../base/utils')
const {
  createSrcOptions,
  outputFiles,
  plumber,
  putProcesses
} = require('./comm')

/**
 * 图片资源 处理任务
 * 
 * @param {Object} options - 配置项
 * @param {string|string[]|string[][]|Object.<string, string|string[]>} options.input - 输入文件路径
 * @param {string} [options.dest] - 输出目录
 * @param {string} [options.base] - 输入文件路径的基准目录
 * @param {boolean|Object.<string, any>} [options.minify=false] - 启用图片压缩或配置项
 * @param {boolean} [options.fileHash] - 生成文件指纹
 * @param {((...args: any[]) => Stream)[]} [options.plugins] - 自定义处理流程
 * @param {function} done - 任务完成回调函数
 * @returns {Stream} 返回处理后的文件流
 * @throws {Error} 如果`options.input`未定义，则抛出错误
 */
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
    try {
      const minifyOptions = isPlainObject(imageMinify) ? imageMinify : {}
      const gulpImagemin = require('gulp-imagemin')
      processes.push(gulpImagemin(
        minifyOptions.plugins || undefined,
        minifyOptions.options || {}
      ))
    } catch (error) {
      console.error(error?.message || error)
    }
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
