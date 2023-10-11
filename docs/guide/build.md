# 构建生产版本

当需要将应用部署到生产环境时，只需运行 `pipflow build` 命令。默认情况下，它使用 `<root>/index.html` 作为其入口，并生成能够静态部署的应用程序包。


## 浏览器兼容性

### browserslist

通过 `pipflow create` 创建的项目，在项目根目录下有一个单独的 `browserslistrc` 文件，用于指定项目支持的浏览器范围。你也可以在  `package.json` 文件里配置 `browserslist` 字段。

这个值会被 `@babel/preset-env` 和 `postcss-preset-env` 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。

现在查阅 [这里](https://github.com/browserslist/browserslist) 了解如何指定浏览器范围。


### Polyfill

请注意，默认情况下 Vite 只处理语法转译，且 不包含任何 polyfill。你可以前往 Polyfill.io 查看，这是一个基于用户浏览器 User-Agent 字符串自动生成 polyfill 包的服务。

