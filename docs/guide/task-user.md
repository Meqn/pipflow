# 自定义任务和流程




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
