const browserSync = require('browser-sync').create('pipflow')

module.exports = function serveTask(options = {}, done) {
  const { server = {} } = options
  return browserSync.init({
    port: 8080,
    open: false,
    server: {
      baseDir: options.build?.outDir ?? './dist',
      index: 'index.html'
    },
    ...server
  }, done)
}

module.exports.reload = browserSync.reload
