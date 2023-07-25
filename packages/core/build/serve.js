const browserSync = require('browser-sync')
const {
  lodash: _
} = require('@pipflow/utils')

module.exports = function createServeTask(name) {
  const bs = browserSync.create(name)
  
  function create(options = {}, done) {
    return bs.init(_.merge({
      port: 9527,
      open: true,
      server: {
        baseDir: './dist',
        index: 'index.html'
      },
    }, options), done)
  }

  create.reload = bs.reload
  return create
}
