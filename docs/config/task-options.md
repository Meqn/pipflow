# 任务配置 {#task-options}

每个任务的单独配置项，设置后会覆盖全局配置。


## name {#name}
- **类型：** `string`
- **默认：** `[type]:[index]`

任务名称, 默认为 `任务类型 + 任务索引`


## type
- **类型：** `string`

任务类型。

内置任务类型： `'html' | 'style' | 'script' | 'static' | 'image' | 'server' | 'remove' | 'copy' | 'archive' | 'user'` 。


## input {#input}
- **类型：** `string | string[] | object`

指定任务入口文件。


## dest {#dest}
- **类型：** `string`
- **默认：** `dist`

指定任务输出路径。
> 继承 `build.outDir` 配置，请参见 [这里](./build-options#build-outdir)

## base {#base}
- **类型：** `string`
- **默认：** `./src`

显式地在创建的 Vinyl 对象上设置 `base` 属性。
> 继承 全局 `base` 配置，请参见 [这里](./shared-options#base)


## compiler {#compiler}
- **类型：** `string`

文件转译工具。仅对任务类型为 `html`, `style`, `script` 有效。
- 当 `type` 为 `'html'`时, `compiler` 为 HTML模板引擎；(请参见 [这里](../guide/task-html#html-templater))
- 当 `type` 为 `'style'`时, `compiler` 为 CSS预处理器。(请参见 [这里](../guide/task-style#css-preprocessor))
- 当 `type` 为 `'script'`时, `compiler` 为 `babel`。


## compilerOptions {#compiler-options}
- **类型：** `object`

转译配置项。

- HTML模板引擎 配置项，请参见 [这里](../guide/task-html#configuration)
- CSS预处理器 配置项，请参见 [这里](../guide/task-style#configuration)


## minify {#minify}
- **类型：** `boolean | MinifyOptions`
- **默认：** `false`

文件最小化混淆或压缩。
> 继承 `build.minify` 配置 或 对应的混淆/压缩配置项，请参见 [这里](./build-options#build-minify)


## plugins {#plugins}
- **类型：** `function[]`

自定义任务处理流程。 请参见 [这里](../guide/task-user)


## fileHash {#file-hash}
- **类型：** `boolean | '-' | '?'`
- **默认：** `false`

文件哈希和版本控制


## sourcemap {#sourcemap}
- **类型：** `boolean`
- **默认：** `false`

是否生成 source map 文件。
> 继承 `build.sourcemap` 配置，请参见 [这里](./build-options#build-sourcemap)


## alias {#alias}
- **类型：** `{ [key: string]: string }`

别名替换，会合并全局 `alias` 配置。
> 继承 全局 `alias` 配置，请参见 [这里](./shared-options#alias)

## watch {#watch}
- **类型：** `boolean`
- **默认：** `false`

在 `serve` 阶段是否监视文件变动并重新编译、刷新页面。



## filename {#filename}
- **类型：** `string`
- **默认：** `archive`

生成的文件名。目前仅对 `archive` 任务类型有效。

::: tip 温馨提示
如果需要创建压缩包，可以使用 `pipflow pack` 命令快速生成压缩包。 请参见 [[这里](../guide/cli#pipflow-pack)]。
:::
