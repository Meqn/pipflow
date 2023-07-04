const { rimraf } = require('rimraf')

module.exports = function removeTask(dir, done) {
  rimraf(dir).then(() => done())
}
