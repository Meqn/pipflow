# 模式与环境变量

## 模式

默认情况下，开发服务器 (`dev` 命令) 运行在 `development` (开发) 模式，而 `build` 命令则运行在 `production` (生产) 模式。

这意味着当执行 `pipflow build` 时，它会自动加载 `.env.production` 中可能存在的环境变量：

```
# .env.production
APP_TITLE=App Title
```

在你的应用中，你可以使用 `process.env.APP_TITLE` 渲染标题。

在某些情况下，若想在 `pipflow build` 时运行不同的模式来渲染不同的标题，你可以通过传递 `--mode` 选项标志来覆盖命令使用的默认模式。例如，如果你想在 `staging` （预发布）模式下构建应用：

```bash
pipflow build --mode staging
```

还需要新建一个 `.env.staging` 文件：

```
# .env.staging
APP_TITLE=App Title (staging)
```

由于 `pipflow build` 默认运行生产模式构建，你也可以通过使用不同的模式和对应的 `.env` 文件配置来改变它，用以运行开发模式的构建：

```
# .env.testing
NODE_ENV=development
```


::: tip
当运行 `pipflow` 命令时，所有的环境变量都从对应的环境文件中载入。如果文件内部不包含 `NODE_ENV` 变量，它的值将取决于模式，例如，在 `production` 模式下被设置为 `"production"`，在 `dev` 模式下被设置为 `"development"`。

而 `NODE_ENV` 将决定您的应用运行的模式，是开发，还是生产。例如，如果你在执行 `pipflow build` 时将环境变量设定为 `NODE_ENV=development` ,那么构建的应用程序包的资源文件将不会进行 hash，也不会混淆压缩。

所以当你运行 `pipflow build` 命令时，无论你要部署到哪个环境，应该始终把 `NODE_ENV` 设置为 `"production"` 来获取可用于部署的应用程序。
:::

::: warning NODE_ENV
如果在环境中有默认的 `NODE_ENV`，你应该移除它或在运行 `pipflow` 命令的时候明确地设置 `NODE_ENV`。
:::


## 环境变量

在项目中，你可以通过 `process.env` 对象来获取环境变量, 如 `process.env.APP_TITLE`。比如在JS文件中，你可以这样写:

```js
if (process.env.NODE_ENV === 'production') {
  // 生产环境
} else {
  // 开发环境
}
```

下面是一些内建变量，在所有情况下都可以使用：

- `process.env.MODE`: {string} 应用运行的模式。
- `process.env.PROD`: {boolean} 应用是否运行在生产环境。
- `process.env.DEV`: {boolean} 应用是否运行在开发环境 (永远与 `process.env.PROD` 相反)。


### `.env`文件

`pipflow` 会从你的 [`环境目录`](../config/shared-options.md#env-dir) 中的下列文件加载额外的环境变量：

```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

一个环境文件只包含环境变量的`“键=值”`对：

```
APP_TITLE=App Title
API_BASE_URL=http://test.api.com

NODE_ENV=development
```

::: tip 环境文件加载优先级
一份用于指定模式的环境文件 (例如 `.env.production`) 将会比一般的环境文件 (例如 `.env`) 拥有更高的优先级。

此外，`pipflow` 启动时已经存在的环境变量拥有最高优先级，并不会被 `.env` 文件覆写。

`.env` 环境文件是在 `pipflow` 启动一开始时被加载，因此环境文件发生变化，你需要重启服务。
:::

想要了解解析环境文件规则的细节，请参考 [dotenv](https://github.com/motdotla/dotenv)。

::: warning 安全注意事项
- `.env.*.local` 文件应是本地的，可以包含敏感变量。你应该将 `*.local` 添加到你的 `.gitignore` 中，以避免它们被 `git` 检入。
- 由于任何暴露给 `pipflow` 源码的变量最终都将出现在客户端包中，因此环境变量应该不包含任何敏感信息。
:::

