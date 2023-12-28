# style 任务

任务类型为 `style` 。

`style` 任务用于处理 CSS 资源,主要包含 CSS 预处理、兼容性处理、压缩等功能。


## 任务流程 {#process-flow}

- 环境变量替换 - 静态替换 `env` 对应的字符串
- 别名替换 - 静态替换 `alias` 对应的字符串
- CSS 预处理器编译
- 自定义插件处理
- postcss 处理 - 包含 属性兼容性前缀(autoprefixer)、压缩混淆(cssnano)等
- 生成 source map 文件
- 生成文件hash - 支持 `[name]-[hash]` 和 `[name]?[hash]` 两种方式。

## 文件入口 {#file-entry}

文件入口配置支持 单一字符串，数组，和对象 3 种方式。

```js
// 1. 字符串
{
  input: './src/styles/**/*.{css,scss}'
}

// 2. 数组方式
{
  input: [
    './src/styles/comm.css',
    './src/styles/index.css',
    './src/styles/page.css',
  ]
}

// 3. 对象方式
{
  input: {
    'comm/index': [
      './src/styles/base.css',
      './src/styles/utils.css',
    ],
    'index': './src/styles/index.css',
    'pages': './src/styles/pages/*.css'
  }
}
```


## CSS 预处理器 {#css-preprocessor}

pipflow 支持 `sass (scss)`, `less`, `stylus` 三种最常见的 CSS 预处理器。你只需在 `style` 类型任务的 `compiler` 属性中配置对应的预处理器即可。

为了编码方便，你还可以在转译时注入额外代码。

下面我们以 `scss` 为例进行简单配置：

```js
// pipflow.config.js
module.exports = {
  tasks: [
    // ... 其他任务
    {
      type: 'style',
      input: './src/styles/**/*.scss',
      compiler: 'sass',
      compilerOptions: {
        // 注入额外代码
        additionalData: `@import './comm/variables';\n$--primary-color: blue;`,
        // sass 选项
        preprocessorOptions: {
          includePaths: ['node_modules'], //支持加载npm包
        }
      }
    }
  ]
}
```

::: tip additionalData 选项
所有预处理器都支持 `additionalData` 选项，可以用于为每个样式内容注入额外代码。请注意，如果注入的是实际的样式而不仅仅是变量时，那么这些样式将会在最终的打包产物中重复出现。
:::


各预处理器使用详见：
- `sass/scss` : [配置说明](https://www.npmjs.com/package/gulp-sass)
- `less` : [配置说明](https://www.npmjs.com/package/gulp-less)
- `stylus` : [配置说明](https://www.npmjs.com/package/gulp-stylus)


## PostCSS 插件 {#postcss-plugins}

PostCSS 内置了众多插件用来转换 CSS, 你只需在项目根目录的 `postcss.config.js` 文件中配置即可。目前 `pipflow` 已内置浏览器兼容性前缀(`postcss-preset-env`)和压缩优化(`cssnano`)插件。

这里列出一些常用的插件和用法示例，更多插件请参见 [这里](https://github.com/postcss/postcss)

### pxtorem

将 `px` 单位转换为 `rem` 单位。 更多配置请参见 [这里](https://github.com/cuth/postcss-pxtorem)

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*'],
      minPixelValue: 12,
      exclude: /node_modules/i,
    })
  ]
}
```
### pxtoview

将CSS中的 `px` 单位转换为  `vw、vh` 等视口单位。 更多配置请参见 [这里](https://github.com/evrone/postcss-px-to-viewport)

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-px-to-viewport')({
      viewportWidth: 375,
      unitPrecision: 5,
      viewportUnit: 'vw',
      propList: ['*'],
      selectorBlackList: ["ignore"],
      minPixelValue: 1,
      mediaQuery: false
    })
  ]
}
```

### with Tailwind CSS

项目中集成 `Tailwind CSS`。 具体配置请参见 [这里](https://tailwindcss.com/docs/installation/using-postcss)

1. 通过 `npm` 安装 `tailwindcss` 及其依赖项，并创建 `tailwind.config.js` 文件。

```bash
npm install -D tailwindcss autoprefixer
npx tailwindcss init
```

2. 配置 `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. 配置 `postcss.config.js`
```js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
}
```
