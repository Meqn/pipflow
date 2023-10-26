# 自定义任务和流程

## 扩展任务 {#extend-task}


示例：
```js
const { defineConfig } = require('pipflow')
const replace = require('gulp-replace')

module.exports = defineConfig({
  tasks: [
    {
      type: 'html',
      input: './src/**/*.html',
      plugins: [
        replace('@styles/', '/static/styles/')
      ]
    }
  ]
})
```

## 创建新任务 {#create-task}


## 组合任务 {#compose-task}

在Gulp中，`series` 和 `parallel` 是用于定义任务执行顺序的两个方法。

- `series()` - 用于按顺序串联执行任务。通过series方法，你可以按照顺序依次执行一系列的任务。当一个任务完成后，才会执行下一个任务。
- `parallel()` - 用于并行执行任务。通过parallel方法，你可以同时执行一系列的任务，而不必等待一个任务完成后再执行下一个任务。所有的任务会并行执行。

下面我们将通过 `compose` 类型的组合任务来创建一个构建 `预发布环境` 应用程序包的任务。

1. 先查看项目下的所有任务。通过下面命令可列显所有任务：
```bash
pipflow task --list
```

2. 从列显中的任务选择一些任务组合为一个新的任务。
```js
const { defineConfig } = require('pipflow')
module.exports = defineConfig({
  tasks: [
    {
      name: 'build:staging',
      type: 'compose',
      input: [
        'del:dest',
        ['copy:public', 'build:image'],
        ['build:css', 'build:js'],
        ['build:html'],
      ]
    }
  ]
})
```

3. 执行新任务，构建用于预发布环境的应用程序包。执行如下命令：
```bash
pipflow task build:prod --mode=staging
```

::: tip
如果当前主机的环境变量 `NODE` 未知或不等于 `!== production` ，那么请在执行的命令前加上 `cross-env NODE_ENV=production` （确保构建主机的环境变量 NODE_ENV 为 production）
:::

