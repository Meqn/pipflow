# HTML 
html文件内置处理流程:
- 环境变量
- 支持模板引擎渲染
- 字符串别名替换
- 自定义管道插件
- html内容压缩
- 文件指纹url重写



## minifier

基于 `html-minifier-terser` 插件进行压缩。  

**压缩默认配置：**
```js
{
  collapseWhitespace: true,
  removeComments: true,
  removeEmptyAttributes: true,
  collapseBooleanAttributes: true,
  minifyJS: true,
  minifyCSS: true
}
```

## Template Engine
`pipflow` 内置 5 款业内较为流行的模板引擎：`art-template`, `Pug`, `EJS`, `Handlebars`, `Nunjucks`。

> 个人推荐使用腾讯出品的`art-template`，它使用简单，且同时支持两种模板语法。  
> - 标准语法类似 `handlerbars`;
> - 原始语法兼容 `EJS`、`Underscore`、`LoDash` 模板。

**模板引擎配置项:**
```js
{
  compiler: 'pug',
  compilerOptions: {
    data: {} //渲染数据
    ... //模板编译选项
  }
}
```

### art-template
- [官方文档 Document](https://aui.github.io/art-template/)

art-template 是一个简约、超快的模板引擎。

它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。

### Pug


### EJS


### handlebars


### Nunjucks

