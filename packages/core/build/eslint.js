module.exports = async function eslintTask(options = {}, done) {
  const eslint = require('gulp-eslint')
  const { gulp } = require('@pipflow/utils')
  const { createSrcOptions, plumber } = require('./comm')

  const {
    input
  } = options

  if (!input) {
    throw new Error('input is required')
  }

  const srcOptions = createSrcOptions(options)

  return gulp.src(input, srcOptions)
    .pipe(plumber.handler())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('end', done)
}
