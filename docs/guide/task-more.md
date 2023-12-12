# 其他任务 {#more-task}

下面是一些辅助任务，用于复制、压缩 和 删除 文件及目录等。


## copy 复制任务 {#copy-task}

`copy` 任务用于复制文件和目录。

```js
// pipflow.config.js
module.exports = {
  tasks: [
    {
      type: 'copy',
      input: 'src/assets/**/*',
      dest: 'dist/assets/' 
    }
  ]
}
```

这会将 `src/assets/` 目录下的所有文件复制到 `dist/assets/`。

> copy任务支持 `glob` 写法来匹配文件,可以配置 `input` 和 `dest` 路径来定义复制源和输出目标。如果源文件是目录,会将整个目录复制过去。


## remove 删除任务 {#remove-task}

`remove` 任务用于删除文件和目录。

```js
// pipflow.config.js
module.exports = {
  tasks: [
    {
      type: 'remove',
      input: 'dist/**/*.map'
    }
  ]
}
```

这会删除 `dist` 目录下所有的 `.map` 文件。

`input` 同样支持 `glob` 写法。


## archive 压缩任务 {#archive-task}

`archive` 任务用于文件和目录的压缩和打包。

```js
// pipflow.config.js
module.exports = {
  tasks: [
    {
      type: 'archive',
      input: 'dist/**/*',
      dest: 'release.zip'
    }
  ]
}
```

这会将 `dist` 目录下的所有文件和目录打包压缩成 `release.zip`。



