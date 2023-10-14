# 静态资源

## 静态文件任务


## 图片任务

### 图片压缩

由于图片压缩是一个耗时任务，且 `gulp-imagemin` 插件**安装依赖经常失败**(国内环境)。鉴于此会影响整个工程的安装运行，所以 `pipflow` 并未内置图片压缩功能，如果需要则手动安装依赖并引入插件即可。

**具体步骤如下:**

1. 安装 `gulp-imagemin` 依赖
```shell
npm install -D gulp-imagemin@7
```

::: warning 注意
`gulp-imagemin` 只能安装 `<=7` 的版本，`8`及以上版本仅支持 `esModule` 模块化.
:::


2. 在 `pipflow.config.js` 中找到当前任务，并加入以下代码

```js
const imagemin = require('gulp-imagemin')

module.exports = {
  tasks: [
    {
      type: 'assets',
      plugins: [
        imagemin(/* options */)
      ]
    }
  ]
}
```

> `gulp-imagemin` 插件在压缩图片过程中会自动过滤非图片文件。 请[点击查看文档](https://www.npmjs.com/package/gulp-imagemin)