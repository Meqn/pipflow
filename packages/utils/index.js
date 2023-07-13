const nodeEnv = process.env.NODE_ENV
if (!nodeEnv) {
  process.env.NODE_ENV = ['development', 'production'].includes(process.env.PIP_MODE) ? process.env.PP_MODE : 'development'
}

const defaultConfig = require('./libs/defaultConfig')
const getConfig = require('./libs/getConfig')
const generateConfig = require('./libs/generateConfig')

module.exports = {
  defaultConfig,
  getConfig,
  generateConfig
}
