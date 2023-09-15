const sourcemaps = require('gulp-sourcemaps')
const filter = require('gulp-filter')
const replace = require('gulp-replace')
const sass = require('gulp-sass')(require('sass'))
const less = require('gulp-less')
const stylus = require('gulp-stylus')
// const postcss = require('gulp-postcss')
const postcss = require('../plugins/postcss')
const postcssEnv = require('postcss-preset-env')
const cssnano = require('cssnano')
const {
  gulp,
  _
} = require('@pipflow/utils')

const { pipeline } = require('../base/utils')
const {
  createSrcOptions,
  outputFiles,
  plumber,
  putProcesses
} = require('./comm')
const { ENV } = require('../base/env')

module.exports = function styleTask(options = {}, done) {
  const {
    input,
    compiler,
    minify: cssMinify,
    alias
  } = options

  if (!input) {
    throw new Error('input is required')
  }

  const processes = []
  const srcOptions = createSrcOptions(options)
  const cssFilter = filter('**/*.css', { restore: true })

  // 2. plumber错误处理
  processes.push(plumber.handler())

  // 3.1 sourcemaps.init
  if (options.sourcemap) {
    processes.push(sourcemaps.init({ loadMaps: true }))
  }

  // 1. 环境变量处理
  processes.push(ENV.inject({ isVar: false }))

  // 2. replace 替换别名
  if (_.isPlainObject(alias)) {
    for (const key in alias) {
      processes.push(replace(key, alias[key]))
    }
  }

  // 3. 自定义处理流程
  putProcesses(processes, options.plugins)

  // 4. CSS预处理器
  if (compiler === 'sass' || compiler === 'scss') {
    processes.push(sass().on('error', sass.logError))
  } else if (compiler === 'less') {
    processes.push(less())
  } else if (compiler === 'stylus') {
    processes.push(stylus())
  }

  // 5. postcss //!需配置 `postcss.config.js` 和 `.browserslistrc`
  const postcssPlugins = []
  postcssPlugins.push(postcssEnv())
  if (cssMinify) {
    const minifyOptions = _.isPlainObject(cssMinify) ? cssMinify : {}
    postcssPlugins.push(cssnano(minifyOptions))
  }
  processes.push(postcss({}, {
    plugins: postcssPlugins
  }))

  // 9. 文件指纹处理 & sourcemaps & 输出文件
  outputFiles(processes, {
    ...options,
    filter: cssFilter
  })

  return pipeline(
    gulp.src(input, srcOptions),
    processes
  ).on('end', done)
}
