const envLoader = require('gulp-env-loader')

// 缓存已载入的环境变量
let envInject

/**
 * 载入环境变量
 * @param {string | object} options 配置选项
 * @param {boolean} reload 是否重新载入
 * @returns 
 */
function loadEnv(options = {}, reload) {
  if (reload) {
    // 仅重置配置环境变量
    const _env = getEnv('env')
    if (_env) {
      resetEnv(_env)
    }
    envInject = null
  }

  if (!envInject) {
    envInject = envLoader(options)
  }

  return envInject
}

/**
 * 重置环境变量
 * @param {object} env 环境变量
 */
function resetEnv(env) {
  if (env && typeof env === 'object') {
    Object.keys(env).forEach(key => {
      delete process.env[key]
    })
  }
}

/**
 * 替换文件内的环境变量
 * @param {*} options 
 * @returns 
 */
function injectEnv(options = {}) {
  const { hasPublic = true } = options
  // 是否包含内建的环境变量
  if (hasPublic) {
    options.env = Object.assign({}, options.env, getPublicEnv())
  }

  if (envInject) {
    return envInject(options)
  }
  return envLoader()(options)
}

/**
 * 设置内建环境变量
 */
function setPublicEnv() {
  process.env.MODE = process.env.PIPFLOW_MODE ?? 'development'
  process.env.PROD = process.env.NODE_ENV === 'production'
  process.env.DEV = process.env.NODE_ENV !== 'production'
}

function getPublicEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    MODE: process.env.MODE,
    PROD: process.env.PROD,
    DEV: process.env.DEV
  }
}

/**
 * 获取环境变量
 * @param {string} type 类型, ['all', 'env', 'public']
 * @returns 
 */
function getEnv(type = 'all') {
  const typeMap = {
    all() {
      return Object.assign({}, envInject?.env, getPublicEnv())
    },
    env() {
      return envInject?.env
    },
    public() {
      return getPublicEnv()
    }
  }
  
  return typeMap[type]() || {}
}

module.exports = {
  loadEnv,
  injectEnv,
  setPublicEnv,
  getEnv
}
