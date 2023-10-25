const { rimraf } = require('rimraf')

module.exports = function removeTask(options = {}, done) {
  const dir = typeof options === 'string' ? options : options.input
  if (!dir) return
  rimraf(dir).then(() => {
    done && done()
  })
}
