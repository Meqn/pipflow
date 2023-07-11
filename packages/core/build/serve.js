const browserSync = require('browser-sync').create('pipflow')

module.exports = function serveTask(options = {}, done) {
  return browserSync.init({
    port: 8080,
    open: false,
    server: {
      baseDir: './dist',
      index: 'index.html'
    },
    ...options
  }, done)
}

module.exports.reload = browserSync.reload
