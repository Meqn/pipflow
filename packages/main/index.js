const nodeEnv = process.env.NODE_ENV
if (!nodeEnv) {
  process.env.NODE_ENV = ['development', 'production'].includes(process.env.PIP_MODE) ? process.env.PP_MODE : 'development'
}

const getConfig = require('./libs/getConfig')
const defineConfig = require('./libs/defineConfig')
const generateConfig = require('./libs/generateConfig')

module.exports = {
  getConfig,
  generateConfig,
  defineConfig
}
