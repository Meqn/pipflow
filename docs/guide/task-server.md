# server 任务 {#server-task}

任务类型为 `server` 。

`pipflow` 的 `server` 服务是基于 `browser-sync` 实现的。无需配置，运行简单命令即可快速启动本地开发服务器。



## 本地开发服务 {#dev-server}

```bash
pipflow dev
```

如果你的项目是基于 `pipflow create` 创建的，无需任何配置，直接运行 `npm run dev` 命令即可启动本地开发服务器。它会自动解析工程配置，实现工程目录的本地开发和调试。具有文件监听、浏览器自动刷新、CSS注入、反向代理等开发辅助功能。


## 本地预览服务 {#preview-server}

```bash
pipflow task server --preview
```

基于 `pipflow` 创建的项目，可以通过 `npm run preview` 命令便可预览生产构建产物，默认将构建目录作为静态文件服务器目录。


## 快速预览服务 {#quick-server}

```bash
pipflow server
```

`pipflow` 提供了一个快速启动本地 HTTP 服务的命令。

如果全局安装了 `@pipflow/cli`，无需任何配置，运行 `pipflow server` 命令即可在任意目录中快速启动一个server服务。主要用来快速预览或演示单个HTML文件。 也可以指定目录、端口、监听文件变化、开启浏览器自动刷新等参数。

具体配置请参见 [这里](../config/server-options.md)。


::: tip 提示
由于以上3种内置 server服务 已经覆盖了大部分的场景，所以不建议在 `pipflow.config.js` 配置文件中创建新的 server任务。
:::
