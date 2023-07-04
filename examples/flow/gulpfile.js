const { task, src, dest, series, parallel } = require('gulp')

const {
  scriptTask,
  removeTask
} = require('@pipflow/core')

task('clean', (done) => {
  removeTask('dist/', done)
})

task('script', (done) => {
  scriptTask(done)
})

task('build', series('clean', parallel('script')))
