# @pipflow/core

- [pipflow Documents](https://pipflow.mengqing.org/)

> Gulp-based web development workflow. It provides a series of out-of-the-box build tasks , can cover from html, css, javascript to static resources , local servers , the entire front-end project build process , greatly simplifying and optimizing the front-end project development .

基于Gulp的web开发工作流程。它提供了一系列开箱即用的构建任务,可以涵盖从 html、css、javascript 到静态资源、本地服务器的整个前端项目构建流程,极大地简化和优化了前端的项目开发。


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
