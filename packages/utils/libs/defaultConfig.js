/**
 * 每个task任务项 属性
 */
/* const taskOptions = {
  name: 'html:1', //任务名, @规则 `[type]:[index]`
  type: 'html', //任务类型
  input: '', //输入文件
  dest: '', //输出目录, 同 `build.outDir`
  base: '', //公共基础路径, 同 `base`
  compiler: '', //编译器(转换器), 如果 `type=user`, 则类型可以是gulp任务函数
  compilerOptions: {}, //编译选项, 和对应的compiler有关, 比如 html => { data, ... }
  minify: process.env.NODE_ENV === 'production' ? true : false, //是否压缩, @继承 `build.minify`
  plugins: [], //自定义流程
  fileHash: process.env.NODE_ENV === 'production' ? true : false, //文件指纹, @type: [boolean, string], @value: `{ '?': [name]?[hash], '-': [name]-[hash] }`, @继承 `build.fileHash`
  sourcemap: false, //是否生成 sourcemap 文件, @继承 `build.sourcemap`
  // alias: {}, //替换别名, @继承 `alias`
  watch: false, //是否监听任务,
} */

const defaults = Object.freeze({
  // publicPath: '/', //部署应用包时的基本 URL
  base: './src', //公共基础路径, 用于 `gulp.src('', { base: './src' })`, 每个任务可以不一样
  publicDir: 'public', //作为静态资源服务的文件夹
  // alias: {}, // 别名, 用于替换文本
  envDir: '.', //用于加载 .env 文件的目录, 默认根目录
  build: {
    outDir: 'dist/', //指定输出路径（相对于 项目根目录).
    assetsInlineLimit: 4096, //文件内联为 base64 编码
    fileHash: false, //文件指纹 ['[name]?[hash]', '[name]-[hash]']
    sourcemap: false, //构建后是否生成 source map 文件
    minify: false, //是否压缩
    // htmlMinify: false, //!是否压缩 html, 配置详见 html-minifier-terser
    // jsMinify: false, // !terser选项 https://terser.org/docs/api-reference/#minify-options
    // cssMinify: false, //!是否压缩 css或压缩选项, 配置详见 cssnano
    // imageMinify: false, //!是否压缩图片 或 压缩选项 !(由于压缩图片比较耗时，且安装依赖容易失败, 所以用户根据自身情况启用)
  },
  // BrowserSync 本地服务配置
  server: {
    port: 9527,
    server: {
      baseDir: 'dist/',
      index: 'index.html'
    },
    open: true
  },
  tasks: [
    {
      type: 'html',
      input: './src/**/*.{html,htm}',
      watch: true
    },
    {
      type: 'script',
      input: './src/scripts/**/*.{js,mjs}',
      watch: true
    },
    {
      type: 'style',
      input: './src/styles/**/*.css',
      watch: true
    },
    {
      type: 'static',
      input: './src/assets/**',
      watch: true
    }
  ]
})

const generateDefault = {
  base: defaults.base,
  publicDir: defaults.publicDir,
  build: {},
  tasks: defaults.tasks
}

module.exports = {
  defaultConfig: defaults,
  generateDefault
}
