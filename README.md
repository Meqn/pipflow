# pipflow 🥤

[![version](https://img.shields.io/npm/v/pipflow?style=flat-square&logo=npm)](https://www.npmjs.com/package/pipflow)
[![node.js](https://img.shields.io/node/v/pipflow?style=flat-square&logo=nodedotjs)](https://nodejs.org/en/about/releases/)
[![downloads](https://img.shields.io/npm/dm/pipflow?style=flat-square)](https://www.npmjs.com/package/pipflow)
[![license](https://img.shields.io/npm/l/pipflow?style=flat-square)](https://github.com/Meqn/pipflow)


> `pipflow` (pipe-workflow) is a gulp-based front-end development workflow. It has built-in features such as merging, compiling, packaging, and compressing that greatly simplify the front-end development process. 
> 
> It provides a set of out-of-the-box gulp tasks and features , developers do not need to configure from scratch can immediately start the front-end project development .

`pipflow` (pipe-workflow) 是一个基于gulp的前端开发工作流。它内置了诸如合并、编译、打包、压缩等功能，极大地简化了前端开发流程。

它提供了一组开箱即用的gulp任务和功能，开发者无需从零开始配置就可以立即启动前端项目的开发。


## Features

- HTML模板渲染 - 内置5款流行的模板引擎,开箱即用
- CSS预处理 - 支持LESS/SASS(SCSS)/Stylus,自动添加浏览器前缀,压缩等
- JavaScript语法转换、合并、压缩、校验、兼容老版本浏览器
- 图片优化 - 无损压缩图片,生成雪碧图
- Sourcemap和文件指纹 - 更容易调试和版本控制
- 本地开发服务器 - 支持HTTPS和浏览器同步测试
- 文件监视 - 自动检测文件变动并重新编译、合并、刷新页面
- 自定义任务 - 可以扩展已有任务,满足各种需求

通过 `pipflow`，开发者可以专注于代码编写，无需浪费时间在重复的工程配置上。它使用简单的命令就可以完成复杂的前端构建工作，并标准化了构建流程，极大地提升了项目之间的一致性和开发效率。


## How to use

### 1. Install

```bash
npm install -g @pipflow/cli
# OR
yarn global add @pipflow/cli
```

### 2. Create a project:
```bash
pipflow create my-project
# OR
pw create my-project
```

### 3. Build project:
```bash
pipflow build
# OR
pw build
```

> `pw` is an acronym for the `pipflow` command, a combination of the first and last letters of `pipflow`.


## Documents 📚

[Read the Docs to Learn More.](https://pipflow.mengqing.org)



## Packages

| Package                                                                     | Version (click for changelogs)                                                                                                                               |
| --------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@pipflow/cli](https://github.com/Meqn/pipflow-cli)                         | [![CLI version](https://img.shields.io/npm/v/%40pipflow%2Fcli?style=flat-square)](https://github.com/Meqn/pipflow-cli/blob/main/CHANGELOG.md)                |
| [@pipflow/core](https://github.com/Meqn/pipflow/tree/main/packages/core/)   | [![core version](https://img.shields.io/npm/v/%40pipflow%2Fcore?style=flat-square)](https://github.com/Meqn/pipflow/blob/main/packages/core/CHANGELOG.md)    |
| [@pipflow/utils](https://github.com/Meqn/pipflow/tree/main/packages/utils/) | [![utils version](https://img.shields.io/npm/v/%40pipflow%2Futils?style=flat-square)](https://github.com/Meqn/pipflow/blob/main/packages/utils/CHANGELOG.md) |
| [pipflow](https://github.com/Meqn/pipflow/tree/main/packages/main/)         | [![pipflow version](https://img.shields.io/npm/v/pipflow?style=flat-square)](https://github.com/Meqn/pipflow/blob/main/packages/main/CHANGELOG.md)           |


## License

[MIT](LICENSE).

