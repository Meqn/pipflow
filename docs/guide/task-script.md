# script 任务


## 处理流程 {#process-flow}

- 环境变量处理 - 环境变量注入
- 别名替换 - 静态替换 `alias` 对应的字符串
- 自定义处理流程 - 处理 `pipflow.config.js` 中添加的自定义 `plugins`
- babel转译
- 压缩混淆 - 基于 `terser` 压缩混淆
- 生成 source map 文件
- 生成文件hash - 支持 `[name]-[hash]` 和 `[name]?[hash]` 两种方式。


## 文件入口

文件入口配置支持 单一字符串，数组，和对象 3 种方式。

### 1. 字符串通配符
```js
{
  input: './src/scripts/**/*.{js,mjs}'
}
```

### 2. 数组方式
```js
{
  input: [
    './src/scripts/base.js',
    './src/scripts/utils.js',
    './src/scripts/pages/*.js'
  ]
}
```

### 3. 对象方式
```js
{
  input: {
    'comm/index': [
      './src/scripts/base.js',
      './src/scripts/utils.js',
    ],
    'index': './src/scripts/index.js',
    'pages': './src/scripts/pages/*.js'
  }
}
```

最后生成 3 个JS文件
```
dist/scripts/comm/index.js
dist/scripts/index.js
dist/scripts/pages.js
```


## babel 转译

如果开启 `babel` 转译，则使用 `webpack` 进行 Javascript 构建。

你可以通过修改项目中的 `babel.config.js` 文件来配置 babel 的转译选项。或者调整 `.browserslistrc` 修改支持的目标浏览器。


## terser

Javascript 文件是基于 `terser` 进行压缩混淆，配置项请点 [这里](../config/build-options.md#build-jsminify)。

具体配置可以查阅 [terser](https://github.com/terser/terser)。

