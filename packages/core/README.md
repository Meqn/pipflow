# @pipflow/core

> Packaging of Gulp-based build tasks.

It provides a series of out-of-the-box Gulp tasks , covering from HTML, CSS, Javascript to static resources , local servers , the entire front-end project build process , greatly simplifying and optimizing the Gulp configuration process .



基于Gulp构建任务的封装。

它提供了一系列开箱即用的 Gulp 任务, 涵盖从 HTML、CSS、Javascript 到静态资源、本地服务器的整个前端项目构建流程,极大地简化和优化了Gulp的配置过程。

## Install

```
npm install --save-dev @pipflow/core
```

## Usage

```js
// gulpfile.js

const gulp = require('gulp')
const {
  htmlTask,
  scriptTask,
  styleTask,
  imageTask,
  staticTask,
  copyTask,
  archiveTask,
  removeTask,
  userTask,
  eslintTask,
  createServer
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

## Task Options

```typescript
{
  /**
   * 指定任务入口文件
   * 
   * Specify the task entry
   */
  input: string | string[] | { [key: string]: string | string[] }

  /**
   * 指定任务输出路径
   * 
   * Specify output path.
   * @default 'dist/'
   */
  dest?: string

  /**
   * 显式地在创建的 Vinyl 对象上设置 base 属性
   * 
   * Explicitly set the base property on created Vinyl objects. 
   * @default './src'
   */
  base?: string

  /**
   * 转译工具
   * Compiler.
   */
  compiler?: string

  /**
   * 转译选项
   * Compiler Configuration.
   */
  compilerOptions?: Object<string, any>

  /**
   * 是否开始最小化混淆/压缩 或 配置项
   * 
   * Whether Minimize/compression or Configuration.
   */
  minify?: boolean | Object<string, any>

  /**
   * 自定义任务处理流程
   * 
   * Customize task processing flow
   */
  plugins?: ((...args: any[]) => NodeJS.ReadWriteStream)[]

  /**
   * 文件哈希和版本控制
   * 
   * File hashing and version control.
   */
  fileHash?: boolean | '?' | '-'

  /**
   * 生成 source map 文件
   * 
   * Whether to generate source map.
   */
  sourcemap?: boolean | 'inline'

  /**
   * 字符串别名替换
   * 
   * alias replacement.
   */
  alias?: { [key: string]: string }
}
```

## Documents 📚

[Read the Docs to Learn More.](https://pipflow.mengqing.org/guide/task.html)

