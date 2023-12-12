# 命令行界面 {#cli}

CLI (`@pipflow/cli`) 是一个全局安装的 npm 包，提供了终端里的 `pipflow` 命令。你可以通过 `pipflow create` 快速搭建一个新项目，然后运行 `pipflow dev` 进行便捷开发。下面我们来深入介绍每个命令的使用。

::: tip 温馨提示
你也可以在终端里使用 `pw` 命令。它是 `pipflow` 命令的缩写，由 `pipflow` 的首尾字母组合而成。
:::

## 创建项目 {#cli-create}

### `pipflow create`

创建一个新项目。

#### 使用
运行以下命令来创建一个新项目：
```bash
pipflow create hello-world
```

你会被提示选取需要的特性。
```bash
pipflow CLI v0.4.0
? Check the features needed for your project: (Press <space> to select, <a> to toggle
all, <i> to invert selection, and <enter> to proceed)
❯◯ Babel
 ◯ HTML templater
 ◯ CSS Pre-processors
 ◯ Compress Image & SVG
 ◯ Linter / Formatter
```

#### 选项
`pipflow create` 命令有一些可选项，你可以通过运行以下命令进行探索：

```bash
pipflow create --help
```

```bash
Usage: pipflow create [options] <app-name>

create a new project powered by @pipflow/cli

Options:
  -f, --force    Overwrite target directory if it exists
  --merge        Merge target directory if it exists
  --repo <name>  Git repository source name (default: "github")
  -c, --clone    Use git clone when fetching remote preset
  -n, --no-git   Skip git initialization
  -h, --help     display help for command
```

::: warning 提醒
如果你在创建项目时，拉取模板源码一直处于 loading 状态 或者超时失败，建议从 `gitee` 拉取模板，但是本地一定要安装 git 环境。

运行以下命令创建新项目：  

`pipflow create my-project --repo=gitee --clone`
:::

> 吐槽：gitee 真不想评价，除去不可抗拒因素外，自身也是一塌糊涂，不求上进的xx!

<!--
:::tip 提示
`pipflow` 通过 `download-git-repo` 拉取仓库模板，它分两种方式：
1. 使用 `git clone` 克隆源码
2. 下载 `.zip` 包

`pipflow` 目前仅支持从 `github` 和 `gitee` 拉取源码，但是 gitee 仓库下载 `.zip` 包时需要手动验证，故只能使用 `git clone` 方式下载。
> 吐槽：gitee 真不想评价，除去不可抗拒因素外，自身也是一塌糊涂，不求上进的xx!
:::
-->

### 项目目录结构

```
.
├── README.md
├── package.json
├── .browserslistrc         // 浏览器支持列表
├── .env                    // 运行环境变量
├── .eslintignore           // eslint忽略
├── .eslintrc.js            // eslint配置
├── .gitignore              // git忽略
├── .prettierrc             // prettier配置
├── babel.config.js         // babel配置
├── pipflow.config.js       // pipflow配置
├── postcss.config.js       // postcss配置
├── public                  // 公共静态资源服务文件夹
│   ├── favicon.ico
│   └── robots.txt
└── src                     // 源码文件夹
    ├── assets              // 资源文件夹
    │   ├── logo.png
    │   └── logo.svg
    ├── scripts             // js文件夹
    │   └── index.js
    ├── styles              // css文件夹
    │   ├── index.scss
    │   └── normalize.css
    ├── views               // html文件夹
    └── index.html          // 默认入口页面
```

## 开发服务器 {#cli-dev}

### `pipflow dev`

在当前项目下启动一个开发服务器 (基于 BrowserSync) 并附带开箱即用的热重载功能。

#### 使用

```bash
pipflow dev
# 或者
pw dev
```

#### 选项
```bash
➜ pipflow dev --help

Usage: pipflow dev|serve [options]

Start development server that with HMR in the current project

Options:
  --mode <mode>    specify env mode (default: "development")
  --config <path>  the configuration file path
  --port <port>    specify port (default: 9527)
  --host           specify hostname
  --index          specify index page
  --https          enable SSL for local development (default: false)
  --cors           enable CORS for the dev server
  --open           open browser on startup
  --no-open        not open browser on startup
  --no-notify      disable the notify element in browser
  -h, --help       display help for command
```

除了通过命令行参数，你也可以使用 `pipflow.config.js` 里的 server 字段配置开发服务器。


## 构建 {#cli-build}

### `pipflow build`

构建生产版本。(`mode` 默认为 `production`)

#### 使用
```bash
pipflow build
```

该命令会在 `dist/` 目录产生一个可用于生产环境的包，默认带有 JS/CSS/HTML 的压缩，和为更好的缓存而做的自动的 file hash。

#### 选项
```bash
➜ pipflow build --help

Usage: pipflow build [options]

Produces a production-ready bundle in the `dist/` directory

Options:
  --mode <mode>    specify env mode (default: "production")
  --config <path>  the configuration file path
  -h, --help       display help for command
```


## 其他 {#cli-other}

### `pipflow task` {#cli-task}
单独执行某个任务

#### 使用
```bash
pipflow task <task-name>

# Example: 执行 lint 任务
pipflow task lint

# 查看所有任务
pipflow task --list
```

#### 选项
```bash
➜ pipflow task --help

Usage: pipflow task [options] [task-name]

Run a specific task

Options:
  -l, --list   List all tasks
  -T, --tasks  List all tasks
  -h, --help   display help for command
```

### `pipflow server` {#cli-server}

快速启动一个本地HTTP服务器，用于预览或演示单个 HTML 页面。它是基于 `BrowserSync` 实现的。

无需配置，可在任意目录启动服务器，同时也支持参数自定义，如端口、目录、是否监听文件变化、浏览器自动刷新等。

#### 使用
```bash
pipflow server
```

#### 选项
```bash
➜ pipflow preview --help

Usage: pw server [options]

Start a local HTTP service (base on browser-sync).
👉 See more: https://browsersync.io/docs/command-line

Options:
  -s, --server <path>  the web root (default: ".")
  --port <port>        specify a port to use (default: 3000)
  --host [host]        specify a hostname to use
  --index <filename>   specify which file should be used as the index page
  -w, --watch          watch files for changes
  -f, --files          file paths to watch
  --https              enable SSL for local development (default: false)
  --cors               add Access Control headers to every request
  --open               open browser on server start
  --no-open            not open browser on server start
  --no-notify          disable the notify element in browser
  -h, --help           display help for command
```

### `pipflow-info` {#cli-info}

打印当前项目的运行环境信息。

#### 使用
```bash
pipflow info
```
