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

`input` 的值转换后的结果:
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
    "build:stag": "cross-env NODE_ENV=staging pipflow task build:stag --mode=staging" // [!code ++]
  }
}
```

::: tip
如果当前主机的环境变量 `NODE` 未知或不等于 `!== production` ，那么请在执行的命令前加上 `cross-env NODE_ENV=production` （确保构建主机的环境变量 `NODE_ENV` 为 `production`）
:::
