const browserSync = require('browser-sync')
const {
  defaultConfig,
  lodash: _
} = require('@pipflow/utils')

module.exports = function createServeTask(name) {
  const bs = browserSync.create(name)
  
  /**
   * 创建一个server服务.
   *
   * @param {Object} options - Server服务自定义配置项 (default: {})
   * @param {Function} done - 初始化完成后的回调函数
   * @param {Object} extend - 附加选项 (default: undefined)
   * @return {Object} - Server对象
   */
  function create(options = {}, done, extend) {
    const serveConfig = extend === null ? options : _.merge({}, defaultConfig.server, options)
    return bs.init(serveConfig, done)
  }

  create.reload = bs.reload
  return create
}
