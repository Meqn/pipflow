const envLoader = require('gulp-env-loader')

const envInject = envLoader()

const nodeEnv = process.env.NODE_ENV
if (!nodeEnv) {
  process.env.NODE_ENV = ['development', 'production'].includes(process.env.PIP_MODE) ? process.env.PP_MODE : 'development'
}
const isPROD = process.env.NODE_ENV === 'production'
const ENV = envInject.env

module.exports = {
  isPROD,
  ENV,
  envInject
}
