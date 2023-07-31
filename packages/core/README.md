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
  htmlTask
} = require('@pipflow/core')

exports.buildHtml = done => {
  return htmlTask({
    input: 'src/**/*.{html,art,ejs}',
    compiler: 'pug'
  }, done)
}

exports.buildScript = done => {
  return scriptTask({
    input: 'src/**/*.{js,mjs}',
    compiler: 'babel'
  }, done)
}

exports.buildStyle = done => {
  return styleTask({
    input: 'src/**/*.{css,less}',
    compiler: 'less'
  }, done)
}

// ...
```
