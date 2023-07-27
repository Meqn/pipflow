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
 * task
 * 任务类型： copy, html, script, style, static, image 自定义(none, compiler 函数)
 * 处理顺序： assets, copy, style, script, html
 * 
 */

/**
 * 每个task任务项 属性
 */
const taskItem = {
  name: 'html:1', //任务名, @规则 `[type]:[index]`
  type: 'html', //任务类型, 包含 `{html, script, style, static, copy, server, remove: '删除文件/目录', archive: '压缩包', user: '自定义任务'}`
  input: '', //输入文件
  dest: '', //输出目录, 同 `build.outDir`
  base: '', //公共基础路径, 同 `base`
  filename: '', //!输出的文件名, 仅 `archive`使用
  compiler: '', //编译器(转换器), 如果 `type=user`, 则类型可以是gulp任务函数
  compilerOptions: {}, //编译选项, 和对应的compiler有关, 比如 html => { data, ... }
  module: false, //!模块化 (仅`JS`任务, 代码包含 `import/require` 则必须启用)
  plugins: [], //自定义流程
  minify: process.env.NODE_ENV === 'production' ? true : false, //是否压缩, @继承 `build.minify`
  minifyOptions: {}, //压缩选项
  fileHash: process.env.NODE_ENV === 'production' ? true : false, //文件指纹, @type: [boolean, string], @value: `{ '?': [name]?[hash], '-': [name]-[hash] }`, @继承 `build.fileHash`
  sourcemap: false, //是否生成 sourcemap 文件, @继承 `build.sourcemap`
  alias: {}, //替换别名, @继承 `alias`
  watch: false, //是否监听任务
}

module.exports = Object.freeze({
  // publicPath: '/', //部署应用包时的基本 URL
  base: './src', //公共基础路径, 用于 `gulp.src('', { base: './src' })`, 每个任务可以不一样
  publicDir: 'public', //作为静态资源服务的文件夹
  // alias: {}, // 别名, 用于替换文本
  envDir: '.', //用于加载 .env 文件的目录, 默认根目录
  build: {
    outDir: 'dist/', //指定输出路径（相对于 项目根目录).
    fileHash: false, //文件指纹 ['[name]?[hash]', '[name]-[hash]']
    minify: false, //是否压缩
    sourcemap: false, //构建后是否生成 source map 文件
  },
  // BrowserSync 本地服务配置
  /* server: {
    ui: {
      port: 9528
    },
    port: 9527,
    server: {
      baseDir: 'dist/',
      index: 'index.html'
    },
    open: true
  }, */
  tasks: [
    {
      type: 'html',
      input: './src/**/*.{html,htm}',
      watch: true
    },
    {
      type: 'script',
      input: './src/scripts/**/*.{js,mjs}',
      module: false,
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

// tasks: html, script, style, static, public, devServer, archive, watch, remove:dest
