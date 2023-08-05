/**
 * 
 * html
 * 模板引擎：handlebars, EJS, artTemplate, Pug(Jade), Nunjucks
 * 
 * css
 * 预处理器: less, sass, Stylus, postCss
 *   ['*.{sass,scss,css}', '*.{less,css}', '*.{styl,css}']
 * CSS框架: TailwindCSS
 * 
 * js
 * webpack, babel, uglify
 *
 * 
 */

/**
 * Task任务类型
 * 
 * 综合任务:
 * `serve`任务执行顺序: ['remove', ['public', 'static'], ['style', 'script'], 'html', ['server', 'watch']]
 * `build` 任务执行顺序: ['remove', ['public', 'static'], ['style', 'script'], 'html']
 */
const taskTypes = [
  'html',
  'style',
  'script',
  'static', //静态资源 任务
  'image',
  'server', //本地服务器 任务
  'copy',
  'remove', //删除文件/目录 任务
  'archive', //压缩包 任务
  'user', //自定义 任务, (默认空任务)
]

/**
 * 每个task任务项 属性
 */
const taskOptions = {
  name: 'html:1', //任务名, @规则 `[type]:[index]`
  type: 'html', //任务类型
  input: '', //输入文件
  dest: '', //输出目录, 同 `build.outDir`
  base: '', //公共基础路径, 同 `base`
  compiler: '', //编译器(转换器), 如果 `type=user`, 则类型可以是gulp任务函数
  compileOptions: {}, //编译选项, 和对应的compiler有关, 比如 html => { data, ... }
  module: false, //!模块化 (仅`JS`任务, 代码包含 `import/require` 则必须启用)
  minify: process.env.NODE_ENV === 'production' ? true : false, //是否压缩, @继承 `build.minify`
  minifyOptions: {}, //压缩选项
  plugins: [], //自定义流程
  fileHash: process.env.NODE_ENV === 'production' ? true : false, //文件指纹, @type: [boolean, string], @value: `{ '?': [name]?[hash], '-': [name]-[hash] }`, @继承 `build.fileHash`
  sourcemap: false, //是否生成 sourcemap 文件, @继承 `build.sourcemap`
  alias: {}, //替换别名, @继承 `alias`
  watch: false, //是否监听任务,
  filename: 'archive.zip', //文件名，仅 `archive` 任务有效 (xxx.zip)
}

const htmlTask = {
  input: '',
  compiler: '',
  compileOptions: ''
}

const styleTask = {
  input: '',
  compiler: '',
  cssMinify: ''
}

const scriptTask = {
  compiler: '',
  module: false,
  terserOptions: ''
}

const staticTask = {
  imageMinify: false
}

const defaults = Object.freeze({
  // publicPath: '/', //部署应用包时的基本 URL
  base: './src', //公共基础路径, 用于 `gulp.src('', { base: './src' })`, 每个任务可以不一样
  publicDir: 'public', //作为静态资源服务的文件夹
  // alias: {}, // 别名, 用于替换文本
  envDir: '.', //用于加载 .env 文件的目录, 默认根目录
  build: {
    outDir: 'dist/', //指定输出路径（相对于 项目根目录).
    fileHash: false, //文件指纹 ['[name]?[hash]', '[name]-[hash]']
    minify: false, //是否压缩
    // terserOptions: false, // !terser选项 https://terser.org/docs/api-reference/#minify-options
    // cssMinify: false, //!是否压缩 css或压缩选项
    // imageMinify: false, //!是否压缩图片 或 压缩选项 !(由于压缩图片比较耗时，且安装依赖容易失败, 所以用户根据自身情况启用)
    sourcemap: false, //构建后是否生成 source map 文件
  },
  // BrowserSync 本地服务配置
  server: {
    ui: {
      port: 9528
    },
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
