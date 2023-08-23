---
title: 配置 pipflow
---

# 配置 pipflow {#configuring-pipflow}


当以命令行方式运行 `pipflow` 时，`pipflow` 会自动解析 项目根目录 下名为 `pipflow.config.js` 的配置文件（仅支持 `js` 和 `json` 扩展名）。

最基础的配置文件是这样的：

```js
// pipflow.config.js
module.exports = {
  // 配置选项
}
```

::: warning 提示
`pipflow` 项目配置文件仅支持 `CommonJS` 模块化规范。
:::

你可以显式地通过 `--config` 命令行选项指定一个配置文件（相对于 cwd 路径进行解析）

```bash
pipflow --config my-config.js
```


## 配置智能提示

因为 `pipflow` 本身附带 TypeScript 类型，所以你可以通过 IDE 和 jsdoc 的配合来实现智能提示：

```js
/** @type {import('pipflow').UserConfig} */
module.exports = {
  // ...
}

```

另外你可以使用 `defineConfig` 工具函数，这样不用 jsdoc 注解也可以获取类型提示：

```js
import { defineConfig } from 'pipflow'

module.exports = defineConfig({
  // ...
})
```


## 情景配置

如果配置文件需要基于（`dev`/`serve` 或 `build`）命令或者不同的 `模式` 来决定选项，则可以选择导出这样一个函数：

```js
module.exports = defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      // dev 独有配置
    }
  } else {
    // command === 'build'
    return {
      // build 独有配置
    }
  }
})
```



