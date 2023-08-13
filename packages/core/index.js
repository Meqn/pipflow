const scriptTask = require('./build/script')
const styleTask = require('./build/style')
const htmlTask = require('./build/html')
const removeTask = require('./build/remove')
const copyTask = require('./build/copy')
const staticTask = require('./build/static')
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
  copyTask,
  staticTask,
  archiveTask,
  removeTask,
  userTask,
  createServeTask,
  eslintTask
}
