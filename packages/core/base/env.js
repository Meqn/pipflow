const envLoader = require('gulp-env-loader')

const envInject = envLoader()
const ENV = {
  inject: envInject,
  data: envInject.ENV
}

/**
 * 加载环境变量文件
 * @param {string} path 文件路径
 * @returns 
 */
function loadEnv(path) {
  if (!path || path === '.') return ENV
  
  const _env = envLoader(path)
  ENV.data = _env.ENV
  ENV.inject = _env
  return ENV
}

module.exports = {
  loadEnv,
  ENV
}
