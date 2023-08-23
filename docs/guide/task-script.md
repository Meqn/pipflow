# script 任务


## 处理流程 {#process-flow}

* 设置变量处理
  > 环境变量注入
* 别名替换
  > 静态替换 `alias` 对应的字符串
* 自定义处理流程
  > 处理 `pipflow.config.js` 中添加的自定义 `plugins`
* babel转译
  > babel 转译
* 压缩处理
  > 基于 `terser` 压缩混淆
* 源码映射 sourcemap
  > 生成 source map 文件
* 文件指纹
  > 生成文件hash, 支持 `[name]-[hash]` 和 `[name]?[hash]` 两种方式。


## 文件入口

文件入口配置支持 单一字符串，数组，和对象 3 种方式。

1. 单一通配符
```js
{
  input: './src/scripts/**/*.{js,mjs}'
}
```

2. 数组通配符
```js
{
  input: [
    './src/scripts/base.js',
    './src/scripts/utils.js',
    './src/scripts/pages/*.js'
  ]
}
```

3. 对象方式
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


## babel转译


## module配置


