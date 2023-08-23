# 命令行界面

CLI (`@pipflow/cli`) 是一个全局安装的 npm 包，提供了终端里的 `pipflow` 命令。它可以通过 `pipflow create` 快速搭建一个新项目，或者直接通过 `pipflow serve` 构建新想法的原型。下面我们会深入介绍。

::: tip 温馨提示
你也可以在终端里使用 `pw` 命令。它是 `pipflow` 命令的缩写，由 `pipflow` 的首尾字母组合而成。
:::

## 创建项目

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
`pipflow create my-project --repo gitee --clone`
:::

:::tip 提示
`pipflow` 通过 `download-git-repo` 拉取仓库模板，它分两种方式：
1. 使用 `git clone` 克隆源码
2. 下载 `.zip` 包

`pipflow` 目前仅支持从 `github` 和 `gitee` 拉取源码，但是 gitee 仓库下载 `.zip` 包时需要手动验证，故只能使用 `git clone` 方式下载。
> 吐槽：gitee 真不想评价，除去不可抗拒因素外，自身也是一塌糊涂，不求上进的xx!
:::

### 项目目录结构

```
// 项目根目录
```

## 开发服务器

### `pipflow serve`

在当前项目下启动一个开发服务器 (基于 BrowserSync) 并附带开箱即用的热重载功能。

#### 使用

```bash
pipflow serve
# 或者
pipflow dev
```

#### 选项
```bash
➜ pipflow serve --help

Usage: pipflow serve|dev [options]

Start development server that with HMR in the current project

Options:
  --mode <mode>      specify env mode (default: "development")
  --config <path>    the configuration file path
  -p, --port <port>  specify port (default: 9527)
  --open             open browser on server start
  --https            use https (default: false)
  --base <path>      base directory
  --cors             configure CORS for the dev server
  -h, --help         display help for command
```

除了通过命令行参数，你也可以使用 `pipflow.config.js` 里的 server 字段配置开发服务器。


## 构建

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

Produces a production-ready bundle in the dist/ directory

Options:
  --mode <mode>    specify env mode (default: "production")
  --config <path>  the configuration file path
  -h, --help       display help for command
```


## 其他

### `pipflow task`
单独执行某个任务

#### 使用
```bash
pipflow task <task-name>

# Example: 执行 lint 任务
pipflow task lint
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

### `pipflow preview`

本地预览构建产物。

#### 使用
```bash
pipflow preview
```

#### 选项
```bash
➜ pipflow preview --help

Usage: pipflow preview [options]

Start a preview server in the current project

Options:
  --config <path>    the configuration file path
  -p, --port <port>  specify port (default: 8527)
  --open             open browser on server start
  --https            use https (default: false)
  --base <path>      base directory
  --cors             configure CORS for the dev server
  -h, --help         display help for command
```

### `pipflow pack`
创建 `.zip` 压缩包

#### 使用
```bash
pipflow pack [...target] [dest]
```

**提示：**
1. 最后一个参数是 输出文件。(可以省略 `.zip` 后缀)
2. 从第一个参数起，至倒数第二个参数均为输入文件。
