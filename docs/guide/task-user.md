# 自定义任务和流程


## 扩展任务 {#extend-task}

对于已有的任务，如果不满足你的业务需求，你可以通过这个任务的 `plugins` 配置项来扩展当前任务。

例如，`html` 类型的任务默认处理流程包括 模板引擎渲染、字符串内容替换、资源文件指纹、输出压缩等流程。如果你想在 `html` 类型任务构建过程中增加其他处理流程,你可以这样配置：

比如在默认流程之外，动态插入一段 jquery外链源码
```js
// pipflow.config.js
const { defineConfig } = require('pipflow')
const dom  = require('gulp-dom')

module.exports = defineConfig({
  tasks: [
    {
      type: 'html',
      input: './src/**/*.html',
      plugins: [
        dom(function() {
          return this.querySelectorAll('body')[0].insertAdjacentHTML(
            'beforeend',
            '<script src="https://unpkg.com/jquery/dist/jquery.js"></script>'
          )
        })
      ]
    }
  ]
})
```

## 创建新任务 {#create-task}

创建一个新任务非常简单，你只需要在配置文件 `pipflow.config.js` 的 `tasks` 中增加一条任务项即可。

`pipflow` 的任务类型主要分为两大类：

- 固定流程任务：内置了基础处理流程的任务。
- 自定义流程任务：无内置流程，处理过程完全自主控制。

### 1. 创建固定流程任务
当任务类型不为 `user` 时为固定流程任务。

下面我们来创建一个使用 `mustache` 模板引擎(未内置) 的 `html` 类型任务。

```js
// pipflow.config.js
const { defineConfig } = require('pipflow')
const mustache  = require('gulp-mustache')

module.exports = defineConfig({
  tasks: [
    {
      type: 'html',
      input: './src/**/*.html',
      plugins: [
        mustache({
          title: 'Hello, Pipflow!',
        })
      ]
    }
  ]
})
```

是不是非常简单？😀 😃 😄 😁 😆

### 2. 创建自定义流程任务
当任务类型为 `user` 时为自定义流程任务。创建自定义流程任务有两种方式:

- `plugins` 方式
- `compiler` 方式

这两种方式除了书写方式不同之外，没有其他区别。

#### 2.1 `plugins` 方式
将处理流程写在 `plugins` 配置中。

```js
// pipflow.config.js
const gulp = require('gulp')
const concat = require('gulp-concat')

module.exports = {
  tasks: [
    {
      name: 'build:css',
      type: 'user',
      plugins: [
        gulp.src('./src/**/*.css', { base: './src' }),
        concat('bundle.css'),
        gulp.dest('./dist')
      ]
    }
  ]
}
```

或者，你可以简化为如下形式

```js
// pipflow.config.js
const concat = require('gulp-concat')

module.exports = {
  tasks: [
    {
      type: 'user',
      input: './src/**/*.css',
      plugins: [
        concat('bundle.css')
      ]
    }
  ]
}
```

::: tip
如果配置了 `input` 属性，在gulp的处理过程中会自动增加文件的输入流和输出流。你只需要在`plugins`中配置处理流程所需要的插件即可。
:::


#### 2.2 `compiler` 方式
将 `compiler` 作为一个任务函数。它和定义一个gulp任务是一样的。

```js
// pipflow.config.js
const gulp = require('gulp')
const concat = require('gulp-concat')

module.exports = {
  tasks: [
    {
      type: 'user',
      compiler(done) {
        return gulp.src('./src/**/*.css', { base: './src' })
          .pipe(concat('bundle.css'))
          .pipe(gulp.dest('./dist'))
          .on('end', done)
      }
    }
  ]
}
```

## 组合任务 {#compose-task}

在Gulp中，`series` 和 `parallel` 是用于定义任务执行顺序的两个方法。

- `series()` - 用于按顺序串联执行任务。通过series方法，你可以按照顺序依次执行一系列的任务。当一个任务完成后，才会执行下一个任务。
- `parallel()` - 用于并行执行任务。通过parallel方法，你可以同时执行一系列的任务，而不必等待一个任务完成后再执行下一个任务。所有的任务会并行执行。

下面我们将通过 `compose` 类型的组合任务来创建一个构建 `预发布环境` 应用程序包的任务。

1. 先查看项目下的所有任务。通过下面命令可列显所有任务：
```bash
pipflow task --list
```


2. 从列显的任务中选择一些任务组合为一个新的任务。
```js
// pipflow.config.js

const { defineConfig } = require('pipflow')
module.exports = defineConfig({
  // 其他配置项 ...
  tasks: [
    // 其他任务 ...
    {
      name: 'build:stag', //任务名
      type: 'compose', //任务类型
      input: [ //任务入口
        'del:dest',
        ['copy:public', 'build:image'],
        ['build:css', 'build:js'],
        ['build:html'],
      ]
    }
  ]
})
```

::: tip 入口说明
在 `compose` 任务中，`input`入口和其他类型任务有些不同，其 `input` 值是一个二维数组 `string[][]`，数组的每一项是一个任务名。

下面是 `input` 的值转换后的结果:
```js
series(parallel('任务名', ...), parallel(...), ...)
```
- 数组列表表示一个串联任务，其内部是通过 `series` 方法执行的。
- 数组的子项表示一个并行任务，其内部是通过 `parallel` 方法执行的。
:::


3. 执行新任务，构建用于预发布环境的应用程序包。执行如下命令：
```bash
pipflow task build:stag --mode=staging
```

为了方便发布，你可以在 `package.json` 的 `scripts` 字段内添加 `build:stag` 脚本

```json
{
  "scripts": {
    "dev": "pipflow dev",
    "build": "pipflow build",
    "build:stag": "cross-env NODE_ENV=production pipflow task build:stag --mode=staging" // [!code ++]
  }
}
```

::: tip
如果当前主机的环境变量 `NODE_ENV` 未知或不为 `production` ，那么请在执行的命令前加上 `cross-env NODE_ENV=production` （确保构建主机的环境变量 `NODE_ENV` 为 `production`）
:::
