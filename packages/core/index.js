const scriptTask = require('./build/script')
const styleTask = require('./build/style')
const htmlTask = require('./build/html')
const removeTask = require('./build/remove')
const copyTask = require('./build/copy')
const staticTask = require('./build/static')
const archiveTask = require('./build/archive')
const userTask = require('./build/user')
const serveTask = require('./build/serve')

module.exports = {
  scriptTask,
  styleTask,
  htmlTask,
  copyTask,
  staticTask,
  archiveTask,
  removeTask,
  userTask,
  serveTask,
  reload: serveTask.reload,
}
