# 任务配置 {#task-options}

每个任务的单独配置项，设置后会覆盖全局配置。


## name {#name}
- **类型：** `string`
- **默认：** `[type]:[index]`

任务名称, 默认为 `任务类型 + 任务索引`


## type
- **类型：** `string`

任务类型。 查看所有任务类型 请参见 [这里](../guide/task.md#outline)



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

文件内容转译工具。仅对任务类型为 `html`, `style`, `script` 有效。
1. 当 `type` 为 `'html'`时, `compiler` 为 HTML模板引擎；(请参见 [这里](../guide/task-html#html-templater))
  > 内置模板引擎: `Pug`, `EJS`, `Handlebars`, `Nunjucks`, `art-template`
2. 当 `type` 为 `'style'`时, `compiler` 为 CSS预处理器。(请参见 [这里](../guide/task-style#css-preprocessor))
  > 支持的 CSS 预处理器: `sass`, `less`, `stylus`
3. 当 `type` 为 `'script'`时, `compiler` 可设置为 `babel` (此时JS代码基于 `webpack` 构建)。


## compilerOptions {#compiler-options}
- **类型：** `object`

转译配置项。

1. HTML模板引擎 配置项，请参见 [这里](../guide/task-html#configuration)
2. CSS预处理器 配置项，请参见 [这里](../guide/task-style#configuration)

### 1. HTML模板引擎

当转译器compiler 为 HTML模板引擎时，其值为传递给 HTML 模板引擎的选项。

```ts
interface CompilerOptions {
  // 渲染时的数据
  data: {
    [key: string]: any
  },
  // 其他编译选项
  [key: string]: any
}
```

每一个HTML模板引擎选项都包含 `data` 属性，用于渲染时所需的数据。

示例：
```js
// pipflow.config.js
module.exports = {
  tasks: [
    {
      compiler: 'pug',
      compilerOptions: {
        data: {
          title: 'Piflow',
          description: 'A gulp-based front-end development workflow.'
        },
        strict: true,
        delimiter: '%',
        // ...
      }
    }
  ]
}
```

### 2. CSS预处理器

当转译器compiler 为 CSS预处理器时，其值为传递给 CSS 预处理器的选项。

```ts
interface CompilerOptions {
  // 注入的额外代码
  additionalData: String,
  // 预处理器特有的选项
  preprocessorOptions: {
    [key: string]: any
  }
}
```

每个预处理器支持的选项可以在它们各自的文档中找到：
- `sass/scss` : [配置说明](https://www.npmjs.com/package/gulp-sass)
- `less` : [配置说明](https://www.npmjs.com/package/gulp-less)
- `stylus` : [配置说明](https://www.npmjs.com/package/gulp-stylus)


示例：
```js
// pipflow.config.js
module.exports = {
  tasks: [
    {
      type: 'style',
      compiler: 'sass',
      compilerOptions: {
        // 注入的额外代码
        additionalData: `@import './comm/variables';\n$--primary-color: blue;`,
        // 预处理器特有的选项
        preprocessorOptions: {
          // ...
        }
      }
    }
  ]
}
```

::: tip additionalData 选项
所有预处理器配置项都支持 `additionalData` 选项，用于为每个样式文件内容注入额外代码。请注意，如果注入的是实际的样式而不仅仅是变量时，那么这些样式将会在最终的打包产物中重复出现。
:::


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
> 继承 `build.fileHash` 配置，请参见 [这里](./build-options#build-filehash)


## sourcemap {#sourcemap}
- **类型：** `boolean`
- **默认：** `false`

是否生成 source map 文件。
> 继承 `build.sourcemap` 配置，请参见 [这里](./build-options#build-sourcemap)

<!-- 
## alias {#alias}
- **类型：** `{ [key: string]: string }`

别名替换，会合并全局 `alias` 配置。
> 继承 全局 `alias` 配置，请参见 [这里](./shared-options#alias)
 -->
## watch {#watch}
- **类型：** `boolean`
- **默认：** `false`

在 `serve` 阶段是否监视文件变动并重新编译、刷新页面。

支持 `'html', 'style', 'script', 'static', 'image', 'copy', 'user'` 类型任务。

<!-- 
## filename {#filename}
- **类型：** `string`
- **默认：** `archive`

生成的文件名。目前仅对 `archive` 任务类型有效。

::: tip 温馨提示
如果需要创建压缩包，可以使用 `pipflow pack` 命令快速生成压缩包。 请参见 [[这里](../guide/cli#pipflow-pack)]。
:::
 -->