# pipflow 🥤

[![version](https://img.shields.io/npm/v/pipflow?style=flat-square&logo=npm)](https://www.npmjs.com/package/pipflow)
[![node.js](https://img.shields.io/node/v/pipflow?style=flat-square&logo=nodedotjs)](https://nodejs.org/en/about/releases/)
[![release](https://img.shields.io/github/actions/workflow/status/meqn/pipflow/release.yml?style=flat-square)](https://github.com/Meqn/pipflow/releases)
[![downloads](https://img.shields.io/npm/dm/pipflow?style=flat-square)](https://www.npmjs.com/package/pipflow)
[![license](https://img.shields.io/npm/l/pipflow?style=flat-square)](https://github.com/Meqn/pipflow)


> `pipflow` (pipe-workflow) is a gulp-based front-end development workflow. It has built-in features such as merging, compiling, packaging, and compressing that greatly simplify the front-end development process. 
> 
> It provides a set of out-of-the-box gulp tasks and features , developers do not need to configure from scratch can immediately start the front-end project development .

`pipflow` (pipe-workflow) 是一个基于gulp的前端开发工作流。它内置了诸如合并、编译、打包、压缩等功能，极大地简化了前端开发流程。

它提供了一组开箱即用的gulp任务和功能，开发者无需从零开始配置就可以立即启动前端项目的开发。


## Features

- 🎨 HTML template rendering - built-in 5 popular template engines
- 🌈 CSS preprocessing - supports LESS/SASS(SCSS)/Stylus, with autoprefixer, minify, and more.
- 🧬 JavaScript syntax transformation, merging, minification, validation, compatibility with older browsers
- 🖼 Image optimization - lossless image compression, sprite generation
- 🦋 Sourcemaps and fingerprinting - easier debugging and version control
- 👻 Local development server - supports HTTPS and browser sync testing
- 👀 File watching - automatically detects file changes and recompiles, merges, and refreshes pages
- 🤖 Custom tasks - extend existing tasks to meet various needs

With `pipflow`, developers can focus on coding without wasting time on repetitive build configurations. It uses simple commands to complete complex front-end builds and standardizes the build process, greatly improving consistency and efficiency across projects.


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
| [pipflow](https://github.com/Meqn/pipFlow/tree/main/packages/main/)         | [![pipflow version](https://img.shields.io/npm/v/pipflow?style=flat-square)](https://github.com/Meqn/pipFlow/blob/main/packages/main/CHANGELOG.md)           |
| [@pipflow/cli](https://github.com/Meqn/pipflow/tree/main/packages/cli)                         | [![CLI version](https://img.shields.io/npm/v/%40pipflow%2Fcli?style=flat-square)](https://github.com/Meqn/pipflow/blob/main/packages/cli/CHANGELOG.md)                |
| [@pipflow/core](https://github.com/Meqn/pipFlow/tree/main/packages/core/)   | [![core version](https://img.shields.io/npm/v/%40pipflow%2Fcore?style=flat-square)](https://github.com/Meqn/pipFlow/blob/main/packages/core/CHANGELOG.md)    |
| [@pipflow/utils](https://github.com/Meqn/pipFlow/tree/main/packages/utils/) | [![utils version](https://img.shields.io/npm/v/%40pipflow%2Futils?style=flat-square)](https://github.com/Meqn/pipFlow/blob/main/packages/utils/CHANGELOG.md) |


## License

[MIT](LICENSE).

