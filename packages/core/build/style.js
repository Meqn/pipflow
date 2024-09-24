const path = require('path')
const gulp = require('gulp')
const merge = require('merge2')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const filter = require('gulp-filter')
// const postcss = require('gulp-postcss')
const postcss = require('../plugins/postcss')
const postcssEnv = require('postcss-preset-env')

const {
  isPlainObject,
  injectEnv
} = require('@pipflow/utils')

const { pipeline, onDone } = require('../base/utils')
const { sassDefaultOptions } = require('../base/defaults')
const {
  createSrcOptions,
  outputFiles,
  plumber,
  putProcesses,
  getBasePath,
  readManifest
} = require('./comm')

/**
 * CSS样式 处理任务
 * 
 * @param {Object} options - 配置项
 * @param {string|string[]|string[][]|Object.<string, string|string[]>} options.input - 输入文件路径
 * @param {string} [options.dest] - 输出目录
 * @param {string} [options.base] - 输入文件路径的基准目录
 * @param {'sass'|'less'|'stylus'} [options.compiler] - 预处理器类型
 * @param {Object.<string, any>} [options.compilerOptions] - 预处理器配置项
 * @param {boolean|Object.<string, any>} [options.minify=false] - 启用CSS压缩或配置项
 * @param {boolean|'?'|'-'} [options.fileHash] - 生成文件指纹 ('?':后缀形式, '-':连接形式)
 * @param {boolean} [options.sourcemap=false] - 生成sourcemap
 * @param {Object.<string, string>} [options.alias] - 别名替换
 * @param {{limit: number}} [options.assetsInlineLimit] - 图片资源内联配置
 * @param {((...args: any[]) => Stream)[]} [options.plugins] - 自定义处理流程
 * @param {function} done - 任务完成回调函数
 * @returns {Stream} 返回处理后的文件流
 * @throws {Error} 如果`options.input`未定义，则抛出错误
 */
module.exports = function styleTask(options = {}, done) {
  const {
    input,
    compiler,
    compilerOptions,
    minify: cssMinify,
    alias
  } = options

  if (!input) {
    throw new Error('input is required')
  }

  const processes = [] //统一处理流程
  const srcOptions = createSrcOptions(options.base, styleTask)
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
    isPlainObject(input)
      ? Object.keys(input).map(name => ({ name, file: input[name] }))
      : [{ name: '', file: input }]
  ).map(({ name, file }) => {
    const baseProcesses = []

    // 1. plumber错误处理
    baseProcesses.push(plumber.handler())

    // 2.1 sourcemaps.init
    if (options.sourcemap) {
      baseProcesses.push(sourcemaps.init({ loadMaps: true }))
    }

    // 3. 环境变量处理
    baseProcesses.push(injectEnv({ isVar: false }))

    // 5.1 插入 css.preprocessor 的 additionalData
    if (compilerOptions?.additionalData) {
      baseProcesses.push(require('gulp-header')(compilerOptions.additionalData))
    }
    // 5.2 CSS预处理器
    if (compiler === 'sass' || compiler === 'scss') {
      const sass = require('gulp-sass')(require('sass'))
      const _sassOptions = Object.assign({}, sassDefaultOptions, compilerOptions?.preprocessorOptions)
      baseProcesses.push(sass(_sassOptions).on('error', sass.logError))
    } else if (compiler === 'less') {
      baseProcesses.push(require('gulp-less')(compilerOptions?.preprocessorOptions || {}))
    } else if (compiler === 'stylus') {
      baseProcesses.push(require('gulp-stylus')(compilerOptions?.preprocessorOptions || {}))
    }
    
    // 4. replace 别名替换
    if (isPlainObject(alias)) {
      const replace = require('gulp-replace')
      for (const key in alias) {
        baseProcesses.push(replace(key, alias[key]))
      }
    }

    // 6. 合并文件
    if (name) {
      baseProcesses.push(concat(path.join(basePath, `${name}.css`)))
    }

    return pipeline(
      gulp.src(file, name ? { ...srcOptions, base: '.' } : srcOptions),
      baseProcesses
    )
  })

  /***************************************************************
   * 统一自定义处理流程
  */

  // 1. 自定义处理流程
  putProcesses(processes, options.plugins)
    
  // 2. base64 处理
  if (options.assetsInlineLimit?.limit > 0) {
    processes.push(require('gulp-dataurl')(options.assetsInlineLimit))
  }

  // 3. 文件指纹处理
  const manifest = readManifest(options)
  if (manifest) {
    processes.push(require('gulp-rev-rewrite')({ manifest }))
  }

  // 3. postcss //!需配置 `postcss.config.js` 和 `.browserslistrc`
  const postcssPlugins = []
  postcssPlugins.push(postcssEnv())
  if (cssMinify) {
    const minifyOptions = isPlainObject(cssMinify) ? cssMinify : {}
    postcssPlugins.push(require('cssnano')(minifyOptions))
  }
  processes.push(postcss({
    _plugins: postcssPlugins
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
