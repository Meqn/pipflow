const path = require('path')
const concat = require('gulp-concat')
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
  _,
  merge,
  injectEnv
} = require('@pipflow/utils')

const { pipeline, onDone } = require('../base/utils')
const {
  createSrcOptions,
  outputFiles,
  plumber,
  putProcesses,
  getBasePath
} = require('./comm')

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

  const processes = [] //统一处理流程
  const srcOptions = createSrcOptions(options)
  const basePath = getBasePath(input, options.base || '.') //合并文件后的基础路径
  const cssFilter = filter('**/*.css', { restore: true })
  
  /**
   * 统一入口方式 (input支持 `string`, `array`, `object`)
   * 流程分开处理 为了解决合并文件的问题
   * 1. sourcemaps.init (在合并文件之前)
   * 2. 预处理必须在合并之前
   * 3. 合并文件
   */
  const entries = (
    _.isPlainObject(input)
      ? Object.keys(input).map(name => ({ name, file: input[name] }))
      : [{ name: '', file: input }]
  ).map(({ name, file }) => {
    const baseProceses = []

    // 1. plumber错误处理
    baseProceses.push(plumber.handler())

    // 2.1 sourcemaps.init
    if (options.sourcemap) {
      baseProceses.push(sourcemaps.init({ loadMaps: true }))
    }

    // 3. 环境变量处理
    baseProceses.push(injectEnv({ isVar: false }))

    // 4. replace 别名替换
    if (_.isPlainObject(alias)) {
      for (const key in alias) {
        baseProceses.push(replace(key, alias[key]))
      }
    }

    // 5. CSS预处理器
    if (compiler === 'sass' || compiler === 'scss') {
      baseProceses.push(sass().on('error', sass.logError))
    } else if (compiler === 'less') {
      baseProceses.push(less())
    } else if (compiler === 'stylus') {
      baseProceses.push(stylus())
    }

    // 6. 合并文件
    if (name) {
      baseProceses.push(concat(path.join(basePath, `${name}.css`)))
    }

    return pipeline(
      gulp.src(file, name ? { ...srcOptions, base: '.' } : srcOptions),
      baseProceses
    )
  })

  /***************************************************************
   * 统一自定义处理流程
  */

  // 1. 自定义处理流程
  putProcesses(processes, options.plugins)

  // 2. postcss //!需配置 `postcss.config.js` 和 `.browserslistrc`
  const postcssPlugins = []
  postcssPlugins.push(postcssEnv())
  if (cssMinify) {
    const minifyOptions = _.isPlainObject(cssMinify) ? cssMinify : {}
    postcssPlugins.push(cssnano(minifyOptions))
  }
  processes.push(postcss({}, {
    plugins: postcssPlugins
  }))

  // 3. 文件指纹处理 & sourcemaps & 输出文件
  outputFiles(processes, {
    ...options,
    filter: cssFilter
  })

  return pipeline(
    merge(...entries),
    processes
  ).on('end', onDone(done))
}

/** 任务整体流程
gulp.task('style', () => {
  return pipeline(
    merge(
      ...[
        pipeline(
          gulp.src(['./src/styles/*.scss'], { base: 'src' }),
          [
            sourcemaps.init({ loadMaps: true }),
            sass(),
            concat('styles/index.css')
          ]
        ),
        pipeline(
          gulp.src('./src/styles/index.scss', { base: 'src' }),
          [
            sourcemaps.init({ loadMaps: true }),
            sass()
          ]
        )
      ]
    ),
    [
      sourcemaps.write('.'),
      gulp.dest('dist')
    ]
  )
  .on('end', () => console.log('success!'))
}) */
