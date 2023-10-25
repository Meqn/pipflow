const { pipeline, onDone } = require('../base/utils')

module.exports = function userTask(options = {}, done) {
  const { compiler, plugins } = options

  // 1. 自定义处理函数
  if (typeof compiler === 'function') {
    return compiler(onDone(done))
  }

  // 2. 自定义处理流程
  if (Array.isArray(plugins) && plugins.length > 0) {
    return pipeline(plugins).on('end', onDone(done))
  }

  return onDone(done).call(this)
}
