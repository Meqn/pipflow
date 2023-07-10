# @pipflow/core

工作流


## project

### 配置文件
```js
{
  publicPath: '/', //部署应用包时的基本 URL
  base: './src', //公共基础路径, 用于 `gulp.src('', { base: './src' })`, 每个任务可以不一样
  publicDir: '', //作为静态资源服务的文件夹
  alias: {}, // 别名, 用于替换文本
  envDir: '', //用于加载 .env 文件的目录, 默认根目录
  build: {
    outDir: 'dist/', //指定输出路径（相对于 项目根目录).
    fileHash: false, //文件指纹 ['[name]?[hash]', '[name]-[hash]']
    minify: isPROD ? true : false,
    sourcemap: false, //构建后是否生成 source map 文件。
  },
  server: {
    port: 3000
  },
  tasks: [
    {
      // name: '', //任务名, `[type]:[index]`
      type: 'script', // 任务类型
      input: './src/scripts/**/*.{js,mjs}',
      base: './src', //同顶部 src
      dest: '', //同顶部 build.outDir
      compiler: 'babel', //编译器
      compilerOptions: {
        data: {}, //渲染数据
      },
      module: false, // 模块化 (js包含 import/require, 必须启用)
      plugins: [],
    },
    {
      type: 'archive',
      input: './dist/**',
      filename: '', //压缩包名
    },
    {
      type: 'html',
      input: './src/views/**/*.html',
      dest: 'dist/',
      base: './src',
      compiler: '',
      compilerOptions: {
        data: {}, //渲染数据
      },
      plugins: [],
    }
  ]
}
```

### 其他文件
- `.browserslistrc`
- `postcss.config.js`
- `babel.config.json`

