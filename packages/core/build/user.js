const { gulp } = require('@pipflow/utils')
const { pipeline, onDone } = require('../base/utils')
const { createSrcOptions } = require('./comm')

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
