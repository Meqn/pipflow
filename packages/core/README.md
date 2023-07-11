# @pipflow/core

A web developer workflow based on Gulp.

基于Gulp的web开发工作流程。目前提供了一系列的构建任务流程，包含`html`, `css`, `javascript`, `static`, `devServer`等。


## Install

```
npm install --save-dev @pipflow/core
```

## Usage

```js
const gulp = require('gulp')
const {
  scriptTask,
  styleTask,
  htmlTask,
  copyTask,
  staticTask,
  archiveTask,
  removeTask,
  userTask,
  serveTask
} = require('@pipflow/core')

task('build:html', done => {
  return htmlTask({
    input: 'src/**/*.{html,art,ejs}',
    dest: 'dist/'
    base: 'src/',
    compiler: 'art-template',
    compilerOptions: {
      data: {
        title: 'pipFlow'
      }
    }
  }, done)
})

task('build:script', done => {
  return scriptTask({
    input: 'src/**/*.{js,mjs}',
    dest: 'dist/',
    base: 'src/',
    compiler: 'babel'
  }, done)
})

// ...
```
