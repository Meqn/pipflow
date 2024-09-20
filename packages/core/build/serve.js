const browserSync = require('browser-sync')
const {
  defaultConfig,
  deepMerge
} = require('@pipflow/utils')
const { onDone } = require('../base/utils')

/**
 * @typedef {Object} IServerOptions
 * @property {string | string[]} server - 服务基础目录
 * @property {number} port - 服务器端口
 * @property {string} host - 服务器主机
 * @property {boolean} https - 是否启用 https
 * @property {boolean} open - 是否自动打开浏览器
 * @property {boolean} cors - 是否启用跨域
 * @property {boolean} watch - 是否启用文件监听
 * @property {string[]} files - 监听的文件路径
 * @property {string[]} exclude - 排除的文件路径
 * @property {string[]} ignore - 忽略的文件路径
 */

/**
 * 创建 BrowserSync 实例.
 * 
 * @param {string} name - HTTP服务名称
 * @returns 
 */
module.exports = function createServer(name) {
  const bs = browserSync.create(name)
  
  /**
   * 创建 HTTP Server服务.
   *
   * @param {IServerOptions} options - Server服务自定义配置项
   * @param {Function} done - 初始化完成后的回调函数
   * @param {Object} extend - 附加选项
   * @return {Object} - Server实例
   */
  function create(options = {}, done, extend) {
    const serveConfig = extend === null ? options : deepMerge({}, defaultConfig.server, options)
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
