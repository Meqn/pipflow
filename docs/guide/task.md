# 概要 {#outline}

`pipflow` 内置一套完整的构建流程和多类型构建任务，实现资源的自动化处理。

主要任务类型包含：

- `html` - HTML处理任务，可用于 `HTML` 文件的语法检查、模板渲染、压缩等
- `script` - JavaScript处理任务，可用于 JavaScript 文件的语法检查、美化、压缩、打包等
- `style` - CSS处理任务，可用于 CSS 预处理器编译、美化、压缩等处理
- `static` - 静态资源处理任务，可用于图片、字体等静态资源的优化、复制等处理
- `image` - 图片资源处理任务，专门用于图片资源的压缩、格式转换等处理
- `server` - 创建本地服务器任务，可以快速创建一个本地开发服务器
- `copy` - 复制文件任务
- `remove` - 删除文件任务
- `archive` - 打包压缩任务，可以将文件打包成 `zip` 压缩包
- `user` - 用户自定义任务，自定义一些全新任务，完全自主控制处理流程
- `compose` - 组合任务，将已有任务组合成一个新任务，实现更复杂的构建处理

<br>

基于以上核心任务类型，可以通过配置实现自动化的资源处理，比如:

- HTML/CSS/JS 的语法检查和压缩
- 图片压缩和格式转换
- 打包和发布等处理

你可以在已有的任务基础上进行扩展，也可以创建全新的任务，还可以将已有任务和新增任务组合成新的构建任务，极大提高工作效率。


下面我将详细介绍每一个任务类型，及其使用方法。
