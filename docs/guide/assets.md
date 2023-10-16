# 静态资源处理


## 资源文件URL

在页面中引入资源文件，建议用绝对路径（以 `/` 开头）引入。

你可以在 `pipflow.config.js` 配置文件中设置路径别名，在页面内通过别名+路径引入文件，编译阶段会被统一静态替换。

```json
// pipflow.config.json
{
  "alias": {
    "@img": "/assets/images",
    "@css": "/styles"
  }
}
```

```html
<!-- demo.html -->
<img src="@img/background.png">

<!-- 构建后的内容 -->
<img src="/assets/images/background.png">
```

## `public` 目录

如果你有下列这些资源：

- 不会被源码引用（例如 robots.txt）
- 必须保持原有文件名（没有经过 hash）
- ...或者你压根不想引入该资源，只是想得到其 URL。

那么你可以将该资源放在指定的 `public` 目录中，它应位于你的项目根目录。该目录中的资源在开发时能直接通过 `/` 根路径访问到，并且打包时会被完整复制到目标目录的根目录下。

目录默认是 `<root>/public`，但可以通过 `publicDir` 选项 来配置。 请参见 [这里](../config/shared-options.md#public-dir)

::: tip 请注意
引入 `public` 中的资源永远应该使用根绝对路径 —— 举个例子，`public/icon.png` 应该在源码中被引用为 `/icon.png`。
:::


## 文件指纹

静态文件指纹是为了解决缓存问题，可以帮助优化浏览器缓存和文件更新的管理。它可以确保用户获得最新的文件版本，同时提高网站的性能和用户体验。

如果你在配置文件中开启了文件指纹，则在 `build` 之后引入的文件路径会携带文件指纹（以文件名或url参数形式）。仅在 `build` 阶段有效。

关于 `build.fileHash` 配置请参见 [这里](../config/build-options.md#build-fileHash)

