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


