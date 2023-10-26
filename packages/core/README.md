# @pipflow/core

> Wrapping Gulp's build process.

It provides a series of out-of-the-box build tasks , can cover from html, css, javascript to static resources , local servers , the entire front-end project build process , greatly simplifying and optimizing the configuration process of Gulp .



基于Gulp构建流程的封装。

它提供了一系列开箱即用的构建任务,可以涵盖从 html、css、javascript 到静态资源、本地服务器的整个前端项目构建流程,极大地简化和优化了Gulp的配置过程。

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
    input: 'src/**/*.{html,ejs}',
    compiler: 'ejs'
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

## Documents 📚

[Read the Docs to Learn More.](https://pipflow.mengqing.org/guide/task.html)

