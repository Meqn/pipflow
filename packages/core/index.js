const scriptTask = require('./build/script')
const styleTask = require('./build/style')
const htmlTask = require('./build/html')
const imageTask = require('./build/image')
const staticTask = require('./build/static')
const removeTask = require('./build/remove')
const copyTask = require('./build/copy')
const archiveTask = require('./build/archive')
const userTask = require('./build/user')
const createServeTask = require('./build/serve')
const eslintTask = require('./build/eslint')
const { loadEnv } = require('./base/env')

module.exports = {
  loadEnv,
  scriptTask,
  styleTask,
  htmlTask,
  imageTask,
  staticTask,
  copyTask,
  archiveTask,
  removeTask,
  userTask,
  createServeTask,
  eslintTask
}
