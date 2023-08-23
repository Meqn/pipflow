# 共享配置 {#shared-options}

## base {#base}

- **类型：** `string`
- **默认：** `./src`

显式地在创建的 Vinyl 对象上设置 base 属性。

`glob base` (有时称为 glob parent)是 `glob` 字符串中任何特殊字符之前的路径段。因此，`/src/js/**.js` 的 blob base 是 `/src/js/`。所有匹配 `glob` 的路径都保证共享 `glob base`，该路径段不能是可变的。

由 `src()` 生成的 Vinyl 实例是用 glob base 集作为它们的 base 属性构造的。当使用 `dest()` 写入文件系统时，将从输出路径中删除 base ，以保留目录结构。

有关更深入的信息，请参阅 [glob-parent](https://github.com/es128/glob-parent) 库。


## publicDir {#public-dir}
- **类型：** `string | false`
- **默认：** `"public"`

作为静态资源服务的文件夹。该目录中的文件在开发期间在 `/` 处提供，并在构建期间复制到 `outDir` 的根目录，并且始终按原样提供或复制而无需进行转换。该值可以是文件系统的绝对路径，也可以是相对于项目根目录的相对路径。

将 `publicDir` 设定为 `false` 可以关闭此项功能。


## alias {#alias}
- **类型：** `{ [key string]: string }`

全局字符串别名，在处理`html`, `javascript`, `css` 文件时, 每一项将会被静态替换。

::: warning 友情提醒
这里的 `alias` 仅仅是字符串的别名替换，不同于 `webpack`, `vite` 等 `alias` 功能。
:::

## envDir {#env-dir}

- **类型：** `string`
- **默认：** `root`

用于加载 `.env` 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。

关于环境文件的更多信息，请参见 [这里](../guide/env-and-mode)。
