# server 任务 {#server-task}

任务类型为 `server` 。

`pipflow` 的 `server` 服务是基于 `browser-sync` 实现的。无需配置，运行简单命令即可快速启动本地开发服务器。



## 本地开发服务 {#dev-server}

```bash
pipflow dev
```

本地开发服务通过 `pipflow dev` 命令启动，提供了文件监听、浏览器自动刷新、CSS 注入等功能，方便项目开发和调试。

如果是通过 `pipflow create` 创建的项目，无需任何配置，直接执行 `npm run dev` 即可启动开发服务器。



## 本地预览服务 {#preview-server}

```bash
pipflow task server --preview
```

本地预览服务通过 `pipflow task server --preview` 启动，用于预览生产环境构建后的静态资源。

基于 `pipflow` 创建的项目，可以通过 `npm run preview` 快速预览构建产物 (服务器目录默认为构建目录)。



## 快速预览服务 {#quick-server}

```bash
pipflow server
```

快速预览服务通过 `pipflow server` 命令启动，用于快速预览或演示单个 HTML 页面。

全局安装 `@pipflow/cli` 后，无需配置，可在任意目录启动服务器，同时也支持参数自定义，如端口、目录、是否监听文件变化、浏览器自动刷新等。



::: tip 提示
以上 3 种服务器已覆盖大部分场景，一般无需在配置文件中自行配置 server 任务。
:::
