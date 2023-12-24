# 构建选项 {#build-options}

## build.outDir {#build-outdir}

- **类型：** `string`
- **默认：** `dist`

指定输出路径（相对于`项目根目录`)。


## build.assetsInlineLimit {#build-assetsInlineLimit}

- **类型：** `number`
- **默认：** `4096` (4 KiB)

小于此阈值的资源url将内联为 base64 编码，以避免额外的 http 请求。设置为 `0` 可以完全禁用此项。


## build.fileHash {#build-fileHash}

- **类型：** `boolean | '-' | '?'`
- **默认：** `false`

`build` 命令构建后生成的静态资源在它们的文件名中包含了 `hash` 以便更好的控制缓存，同时也会生成对应的 `manifest.json` 文件。
- 值为 `false` 时，关闭文件哈希。
- 值为 `true` 或 `-` 时，将生成文件名哈希和版本映射文件`manifest.json`。
- 值为 `?` 时，仅生成版本映射文件`manifest.json`。

## build.sourcemap {#build-sourcemap}

- **类型：** `boolean | 'inline'`
- **默认：** `false`

构建后是否生成 source map 文件。如果为 `true`，将会创建一个独立的 source map 文件。如果为 `'inline'`，source map 将作为一个 data URI 附加在输出文件中。


## build.minify {#build-minify}

- **类型：** `boolean`
- **默认：** `process.env.NODE_ENV === "production"`

全局配置, 设置为 `false` 可以统一禁用最小化混淆或压缩。

::: warning ⚠️ 提示
该配置项仅对任务类型 `type` 为 `html`, `style`, `script`, `static`, `image` 有效。这里是全局配置，也可以在每个任务项内单独配置 `minify`。
:::


## build.htmlMinify

- **类型：** `boolean | HtmlMinifyOptions`
- **默认：** 与 `build.minify` 一致

HTML 最小化压缩配置项，此选项配置后会覆盖 `build.minify`。

html压缩是基于 `html-minifier-terser` 插件, 详细配置请参见 [这里](https://terser.org/html-minifier-terser/)。


## build.jsMinify {js-minify}

- **类型：** `boolean | TerserMinifyOptions`
- **默认：** 与 `build.minify` 一致


Javascript 最小化混淆配置项，此选项配置后会覆盖 `build.minify`。

JS最小化混淆是基于 `terser` 插件, 详细配置请参见 [这里](https://terser.org/docs/options/)。


## build.cssMinify {css-minify}

- **类型：** `boolean | CSSNanoOptions`
- **默认：** 与 `build.minify` 一致

CSS 最小化压缩配置项，此选项配置后会覆盖 `build.minify`。

CSS压缩是基于 `cssnano` 插件, 详细配置请参见 [这里](https://cssnano.co/docs/config-file/)。


## build.imageMinify {image-minify}

- **类型：** `boolean | {plugins?: Plugin[], options?: Options}`
- **默认：** `dist`

图片压缩配置项，此选项配置后会覆盖 `build.minify`。

图片压缩是基于 `gulp-imagemin` 插件, 详细配置请参见 [这里](https://www.npmjs.com/package/gulp-imagemin)。

::: warning 🚨 提醒
由于安装 `gulp-imagemin` 依赖经常失败(国内环境)，且图片压缩是一项耗时的一次性任务。所以 `pipflow` 将 `gulp-imagemin` 的安装提取到项目的依赖中。如果你的项目不需要 压缩图片或者手动一次性压缩，请删除项目的 `package.json` 中的 `gulp-imagemin` 依赖，并将 `imageMinify` 配置项的值设置为 `false`。
:::
