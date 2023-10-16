# 开始

## 总览


`pipflow` (pipe-workflow) 是一个基于`gulp`的前端开发工作流。它内置了诸如合并、编译、打包、压缩等功能，极大地简化了前端开发流程。它提供了一组开箱即用的gulp任务和功能，开发者无需从零开始配置就可以立即启动前端项目的开发。

pipflow的主要功能包括:

- HTML模板渲染 - 内置5款流行的模板引擎,开箱即用
- CSS预处理 - 支持LESS/SASS(SCSS)/Stylus,自动添加浏览器前缀,压缩等
- JavaScript语法转换、合并、压缩、校验、兼容老版本浏览器
- 图片优化 - 无损压缩图片,生成雪碧图
- Sourcemap和文件指纹 - 更容易调试和版本控制
- 本地开发服务器 - 支持HTTPS和浏览器同步测试
- 文件监视 - 自动检测文件变动并重新编译、合并、刷新页面
- 自定义任务 - 可以扩展已有任务,满足各种需求

通过`pipflow`，开发者可以专注于代码编写，无需浪费时间在重复的工程配置上。它使用简单的命令就可以完成复杂的前端构建工作，并标准化了构建流程，极大地提升了项目之间的一致性和开发效率。


::: tip 💡 温馨说明
简单易用和预设功能，使其成为**基于gulp工作流**的理想选择。
:::


## 搭建 `pipflow` 项目

::: tip 兼容性注意
pipflow 需要 [Node.js](https://nodejs.org/en/) 版本 14.13+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。
:::

运行 `create` 命令创建新项目：
```bash
pipflow create my-project
```

然后按照提示操作即可！ 具体参数说明请参见 [这里](./cli.md#cli-create)


## 命令行界面

如果在本机全局安装了 `@pipflow/cli`，进入项目根目录后，可以直接运行 `pipflow dev` 即可启动当前项目。  
下面是通过脚手架创建的 pipflow 项目中默认的 npm scripts：

```json
{
  "scripts": {
    "dev": "pipflow dev", // 启动开发服务器，`pipflow dev`或`pw dev`
    "build": "pipflow build", // 为生产环境构建产物
    "preview": "pipflow task preview", // 本地预览生产构建产物
    "lint": "pipflow task lint", // 代码检查
  }
}
```

可以指定额外的命令行选项，如 `--port` 或 `--no-open`。 运行 `pipflow --help` 获得完整的命令行选项列表。

查看 [命令行界面](./cli.md) 了解更多细节。
