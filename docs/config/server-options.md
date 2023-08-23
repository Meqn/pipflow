# 开发服务器选项 {#server-options}

`pipflow` 的本地开发服务器是基于 `Browsersync` 工具, 它为开发过程提供自动化、高效的同步与调试功能。

配置详情请参见 [这里](https://browsersync.io/docs/options)。


## server.host
- **类型：** `string`
- **默认：** `localhost`

指定服务器应该监听哪个 IP 地址。


## server.port
- **类型：** `number`
- **默认：** `9527`

指定开发服务器端口。

也可以通过 CLI 使用 `--port 3000` 来设置。


## server.https
- **类型：** `boolean`
- **默认：** `false`

为本地主机开发启用 https。注意: 代理选项不需要这样做，因为它会从目标网址中推断出来。

```js
// Enable HTTPS for snippet mode
{
  https: true
}

// Enable HTTPS mode with custom certificates
{
  server: "./app",
  https: {
    key: "path-to-custom.key",
    cert: "path-to-custom.crt"
  }
}
```


## server.open
- **类型：** `boolean`
- **默认：** `true`

开发服务器启动时，自动在浏览器中打开应用程序。


## server.server
- **类型：** `string | boolean | object`
- **默认：** `dist`

内置静态服务器配置。可以指定当前服务基本目录以及索引文件。

```js
// Serve files from the app directory
{
  server: "app"
}

// Serve files from the app directory, with a specific index filename
{
  server: {
    baseDir: "app",
    index: "index.html"
  }
}
```


## server.proxy
- **类型：** `string | ProxyOptions`
- **默认：** `false`

为开发服务器配置自定义代理规则。

```js
// Using localhost sub directories
{
  proxy: {
    target: "http://localhost:4567",
  }
}

// Modify the server request before it hits your application
// and Modify the server response after it's returned from the proxy
{
  proxy: {
    target: "http://yourlocal.dev",
    proxyReq: [
      function(proxyReq) {
        proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
      }
    ],
    proxyRes: [
      function(proxyRes, req, res) {
        //...
      }
    ]
  }
}

// Modify the server response
{
  proxy: {
    target: '',
    middleware: function(req, res, next) {
      //...
      next();
    }
  }
}
```


## server.middleware
- **类型：** `function | function[]`
- **默认：** `false`

中间件函数或插件。

```js
{
  // Per-route middleware
  middleware: [
    {
      route: "/api",
      handle: function (req, res, next) {
        // handle any requests at /api
      }
    }
  ]
}
```


## server.cors
- **类型：** `boolean`
- **默认：** `false`

为开发服务器配置 CORS。


## server.browser
- **类型：** `string | string[]`
- **默认：** `default`

要打开的浏览器。

**示例：**
```js
{
  browser: 'google chrome'
}
```


## server.ghostMode
- **类型：** `boolean`
- **默认：** `false`

任何设备上的点击、滚动和表单输入都将镜像到所有其他设备。

```js
// Here you can disable/enable each feature individually
{
  ghostMode: {
    clicks: true,
    forms: true,
    scroll: false
  }
}

// Or switch them all off in one go
{
  ghostMode: false
}
```


## server.notify
- **类型：** `boolean`
- **默认：** `true`

浏览器右上角的小弹窗通知。

