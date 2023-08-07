const browserSync = require('browser-sync')
const {
  defaultConfig,
  lodash: _
} = require('@pipflow/utils')

module.exports = function createServeTask(name) {
  const bs = browserSync.create(name)
  
  function create(options = {}, done) {
    return bs.init(_.merge({}, defaultConfig.server, options), done)
  }

  create.reload = bs.reload
  return create
}
