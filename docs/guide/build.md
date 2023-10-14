# 构建生产版本

当需要将应用部署到生产环境时，只需运行 `pipflow build` 命令。默认情况下，它使用 `<root>/index.html` 作为其入口，并生成能够静态部署的应用程序包。


## 浏览器兼容性

### browserslist

通过 `pipflow create` 创建的项目，在项目根目录下有一个单独的 `.browserslistrc` 文件，用于指定项目支持的浏览器范围。你也可以在  `package.json` 文件里配置 `browserslist` 字段。

这个值会被 `@babel/preset-env` 和 `postcss-preset-env` 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。

现在查阅 [这里](https://github.com/browserslist/browserslist) 了解如何指定浏览器范围。


### Polyfill

一个基于 pipflow CLI 创建的项目，它通过 `@babel/preset-env` 和 `browserslist` 配置来决定项目需要的 polyfill。

默认情况下，babel.config.js 预设 `useBuiltIns: "usage"`，这样它会根据源代码中出现的语言特性自动检测需要的 polyfill。这确保了最终包里 polyfill 数量的最小化。然而，这也意味着如果其中一个依赖需要特殊的 polyfill，默认情况下 Babel 无法将其检测出来。

你可以通过修改项目中的 babel.config.js 配置来自行调整 polyfill。

::: tip 温馨提示
我们推荐以这种方式添加 polyfill 而不是在源代码中直接导入它们，因为如果这里列出的 polyfill 在 browserslist 的目标中不需要，则它会被自动排除。
:::


## 自定义构建

构建生产环境应用程序包默认是通过 `pipflow build` 命令来完成的。如果在未修改配置文件 `pipflow.config.js` 的 `tasks` 选项时，其构建过程任务如下：

```
└─┬ build
  └─┬ <series>
    ├── del:dest
    ├─┬ <parallel>
    │ ├── copy:public
    │ └── static:4
    ├─┬ <parallel>
    │ ├── script:2
    │ └── style:3
    └─┬ <parallel>
      └── html:1
```

如果你想自定义构建流程，你可以创建一个 `compose` 类型的组合任务，配置自定义构建流程。 详细配置请参见 [这里](./task-user.md#compose-task)。

当配置完成之后，运行下面命令即可构建生产环境应用程序包：

```bash
pipflow task <compose-build-name> --mode=production
```
> 注: `<compose-build-name>` 代指你的组合任务名称。


你可以将 `package.json` 中的 `scripts` 字段的 `build` 命令更改为:

```json
{
  "scripts": {
    "dev": "pipflow dev",
    "build": "pipflow build", // [!code --]
    "build": "pipflow task <compose-build-name> --mode=production", // [!code ++]
    "preview": "pipflow task server --preview"
  }
}
```

然后运行 `npm run build` 即可。

::: warning 提醒
自定义 `build` 命令必须使用 `--mode=production` 参数。 如果要构建 `mode` 不为 `production` 的其他平台环境的部署包，请在命令开头加上 `cross-env NODE_ENV=production` (确保构建主机的环境变量 `NODE_ENV` 为 `production`)。

完整命令如下：
```
cross-env NODE_ENV=production pipflow task <compose-build-name> --mode=staging
```
:::
