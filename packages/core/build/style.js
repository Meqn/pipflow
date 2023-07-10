const gulp = require('gulp')
const _ = require('lodash')
const sourcemaps = require('gulp-sourcemaps')
const filter = require('gulp-filter')
const replace = require('gulp-replace')
const sass = require('gulp-sass')(require('sass'))
const less = require('gulp-less')
const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss')
const postcssEnv = require('postcss-preset-env')
const cssnano = require('cssnano')

const { pipeline } = require('../base/utils')
const { createSrcOptions, outputFiles, plumber, putProcesses } = require('./comm')
const { envInject } = require('../base/config')

module.exports = function styleTask(options = {}, done) {
  const {
    input,
    dest,
    fileHash,
    compiler,
    alias,
    minify: isMinify,
    sourcemap: hasSourcemap,
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
  if (hasSourcemap) {
    processes.push(sourcemaps.init({ loadMaps: true }))
  }

  // 1. 环境变量处理
  processes.push(envInject({ isVar: false }))

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
  isMinify && postcssPlugins.push(cssnano())
  processes.push(postcss(postcssPlugins))

  // 9. 文件指纹处理 & sourcemaps & 输出文件
  outputFiles(processes, {
    dest,
    fileHash,
    filter: cssFilter,
    sourcemap: hasSourcemap,
  })

  return pipeline(
    gulp.src(input, srcOptions),
    processes
  ).on('end', done)
}
