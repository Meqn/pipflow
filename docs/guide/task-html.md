# HTML 任务

## 处理流程 {#process-flow}

* 环境变量处理
  > 环境变量在构建时会被静态替换
* 模板渲染
  > 渲染HTML模板引擎，支持 `Pug`, `EJS`, `Handlebars`, `Nunjucks`, `art-template`
* 别名替换
  > 静态替换 `alias` 对应的字符串
* 自定义处理流程
  > 处理 `pipflow.config.js` 中添加的自定义 `plugins`
* 内容压缩
  > 基于 `html-minifier-terser` 的内容压缩
* 资源文件指纹
  > 将构建后通过生成的 `manifest.json` 中包含 hash 过的资源文件版本的映射，进行引入链接的替换


## 环境变量处理

html内容中的以 `process.env.XXX` 写入的环境变量将会被静态替换。


## 模板渲染 {#html-templater}

`pipflow` 内置了**5**款流行的模板引擎，它们曾经都是主流 🤪。让我们来逐一介绍它们:

1. **Pug**:
   - **简介:** Pug是一种高度可读性的模板引擎，具有简洁的语法和强大的功能。它采用缩进和标签语法，可以快速生成HTML代码。
   - **文档:** [Pug文档](https://pugjs.org/api/getting-started.html) 、 [gulp-pug 插件文档](https://www.npmjs.com/package/gulp-pug)

2. **EJS**:
   - **简介:** EJS（Embedded JavaScript）是一种简单而灵活的模板引擎，可将JavaScript代码嵌入到模板中。它允许您动态生成HTML页面。
   - **文档:** [EJS文档](https://ejs.co/) 、 [gulp-ejs 插件文档](https://www.npmjs.com/package/gulp-ejs)

3. **Handlebars**:
   - **简介:** Handlebars是一种语法简洁的模板引擎，它使用标签和表达式来生成HTML。它具有易学易用的特点，非常适合快速构建静态页面。
   - **文档:** [Handlebars文档](https://handlebarsjs.com/guide/) 、 [gulp-hb 插件文档](https://www.npmjs.com/package/gulp-hb)

4. **Nunjucks**:
   - **简介:** Nunjucks是一款功能强大的模板引擎，它支持条件语句、循环和继承等高级功能。它被广泛用于JavaScript开发中的模板渲染。
   - **文档:** [Nunjucks文档](https://mozilla.github.io/nunjucks/) 、 [gulp-nunjucks 插件文档](https://www.npmjs.com/package/gulp-nunjucks)

5. **art-template**:
   - **简介:** art-template是一种快速、简洁而且可扩展的模板引擎。它支持JavaScript语法和自定义扩展，非常适合前端开发和服务器端渲染。
   - 它同时支持两种模板语法。原始语法兼容 `EJS`、`Underscore`、`LoDash` 模板，标准语法类似 `Mustache` 。
   - **文档:** [art-template文档](https://aui.github.io/art-template/) 、 [gulp-art-tpl 插件文档](https://www.npmjs.com/package/gulp-art-tpl)
   - *个人推荐*： 功能强大，使用简单

这些模板引擎在过去曾经很流行，每一款都有自己独特的特点和用法。您可以根据自己的需求和偏好选择适合的模板引擎来开发您的项目。


### 渲染配置项 {#configuration}



### 示例 {#example}

pipflow内置的模板引擎中，Handlebars 的使用相对复杂一些，那么我们来写一个 Handlebars 代码片段复用的示例。

**模板文件：**
```html
<!-- ./src/index.html -->
<html>
  <head>
    <title>pipflow</title>
  </head>
  <body>
    <!-- 复用 header.hbs 文件 -->
    {{> header }}
    <p>{{ description }}</p>
  </body>
</html>

<!-- ./src/views/includes/header.hbs -->
<header>
  <h1>hello {{ title }}!</h1>
</header>
```

**模板配置：**
```js
// ./pipflow.config.js
module.exports = {
  // ...
  plugins: [
    // ...
    {
      type: 'html',
      input: './src/**/*.{html,hbs}',
      compiler: 'handlebars',
      compileOptions: {
        partials: './src/views/includes/*.{html,hbs}',
        data: {
          title: 'pipflow',
          description: '开箱即用的前端开发工作流'
        }
      },
    }
  ]
}
```


## 内容压缩 {#content-compress}

html的压缩是基于 `html-minifier-terser` 插件, 详细配置请参见 [这里](https://terser.org/html-minifier-terser/)。

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


