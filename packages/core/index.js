const scriptTask = require('./build/script')
const styleTask = require('./build/style')
const htmlTask = require('./build/html')
const imageTask = require('./build/image')
const staticTask = require('./build/static')
const removeTask = require('./build/remove')
const copyTask = require('./build/copy')
const archiveTask = require('./build/archive')
const userTask = require('./build/user')
const createServer = require('./build/serve')
const eslintTask = require('./build/eslint')

const { loadEnv } = require('@pipflow/utils')
// 引入时载入一次环境变量配置
loadEnv()

module.exports = {
  scriptTask,
  styleTask,
  htmlTask,
  imageTask,
  staticTask,
  copyTask,
  archiveTask,
  removeTask,
  userTask,
  createServer,
  eslintTask
}
