const _ = require('lodash')
const browserSync = require('browser-sync')

module.exports = function createServeTask(name) {
  const bs = browserSync.create(name)
  
  function create(options = {}, done) {
    return bs.init(_.merge({
      port: 8080,
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
