const browserSync = require('browser-sync')
const {
  defaultConfig,
  deepMerge
} = require('@pipflow/utils')
const { onDone } = require('../base/utils')
module.exports = function createServer(name) {
  const bs = browserSync.create(name)
  
  /**
   * 创建一个server服务.
   *
   * @param {Object} option - Server服务自定义配置项 (default: {})
   * @param {Function} done - 初始化完成后的回调函数
   * @param {Object} extend - 附加选项 (default: undefined)
   * @return {Object} - Server对象
   */
  function create(option = {}, done, extend) {
    const serveConfig = extend === null ? option : deepMerge({}, defaultConfig.server, option)
    if (serveConfig.port && !serveConfig.ui?.port) {
      if (!serveConfig.ui) {
        serveConfig.ui = {}
      }
      serveConfig.ui.port = parseInt(serveConfig.port, 10) + 1
    }
    return bs.init(serveConfig, onDone(done))
  }

  create.reload = bs.reload
  return create
}
