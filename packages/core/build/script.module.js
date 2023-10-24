const path = require('path')
const named = require('vinyl-named')
const gulpWebpack = require('webpack-stream')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
// const strReplace = require('string-replace-loader')
const sourcemaps = require('gulp-sourcemaps')
const filter = require('gulp-filter')
const {
  gulp,
  merge,
  _
} = require('@pipflow/utils')

const { ENV } = require('../base/env')
const { outputFiles, createSrcOptions, plumber, putProcesses, getBasePath } = require('./comm')
const { pipeline } = require('../base/utils')

/**
 * 生成webpack配置项
 * @param {object} options 配置项
 * @param {string} options.filename 文件名 (入口为`object`则需要传入合并后文件名,即`key`)
 * @param {object} options.env 环境变量
 * @param {boolean} options.minify 是否压缩
 * @param {object} options.alias 别名
 * @param {string} options.compiler 使用babel转换
 * @returns 
 */
function getWebpackConfig({
  filename,
  env,
  minify,
  alias,
  compiler,
}) {
  const plugins = []
  const rules = []

  // 1. 文件压缩
  const uglifyOptions = {
    extractComments: false // 不提取注释
  }
  // 不压缩时，简化webpack生成内容
  if (!minify) {
    uglifyOptions.terserOptions = {
      mangle: true, //指定变量名压缩选项，或跳过破坏变量名
      keep_classnames: true, //是否保留或保留哪些类名
      keep_fnames: true, //是否保留或保留哪些函数名
      format: {
        comments: true, //保留注释
        beautify: true, //是否美化实际的输出代码 (保留空格和制表符)
      }
    }
  } else {
    // 生产环境 自定义压缩
    if (_.isPlainObject(minify)) {
      uglifyOptions.terserOptions = {
        ...minify
      }
    }
  }

  // 2. 定义环境变量
  if (_.isPlainObject(env)) {
    const defineEnv = Object.keys(env).reduce((obj, name) => {
      obj[`process.env.${name}`] = JSON.stringify(env[name])
      return obj
    }, {})
    plugins.push(new webpack.DefinePlugin(defineEnv))
  }
  
  // 3. 替换别名 string-replace-loader
  if (_.isPlainObject(alias)) {
    rules.push({
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'string-replace-loader',
      options: {
        multiple: Object.keys(alias).map(key => ({
          search: key, replace: alias[key]
        }))
      }
    })
  }

  // 4. babel转换
  if (compiler === 'babel') {
    rules.push({
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    })
  }
  
  return {
    // devtool: 'source-map',
    mode: minify ? 'production' : 'none', //无webpack注释 ['none', 'production']
    output: {
      filename: filename || '[name].js',
    },
    optimization: {
      minimizer: [new TerserPlugin(uglifyOptions)]
    },
    plugins: plugins,
    module: {
      rules: rules
    }
  }
}

/**
 * 统一入口文件
 * @param {object} options 配置项
 * @param {string} options.base 基础路径
 * @param {string} options.name 任务名
 * @param {string} options.input 入口文件
 * @param {boolean} options.minify 是否压缩
 * @param {object} options.alias 别名
 * @param {string} options.compiler 使用babel转换
 * @returns 
 */
function getEntries(options = {}) {
  const { input, alias, minify, compiler } = options
  const webpackOptions = {
    env: ENV.data,
    minify,
    alias,
    compiler,
  }
  const srcOptions = createSrcOptions(options)
  const basePath = getBasePath(input, options.base || '.')
  let entries = []
  
  if (_.isPlainObject(input)) {
    entries = Object.keys(input).map(name => {
      return gulp.src(input[name], { ...srcOptions, base: '.' })
        .pipe(plumber.handler())
        .pipe(gulpWebpack(getWebpackConfig(
          Object.assign({
            filename: path.join(basePath, `${name}.js`)
          }, webpackOptions)
        )))
    })
  } else {
    entries.push(
      gulp.src(input, srcOptions)
        .pipe(plumber.handler())
        .pipe(named(function(file) {
          // 返回相对路径的文件名
          return file.relative.replace(file.extname, '')
        }))
        .pipe(gulpWebpack(getWebpackConfig(webpackOptions)))
    )
  }

  return entries
}

module.exports = function compileModule(options = {}, done) {
  if (!options.input) {
    throw new Error('input is required')
  }

  const jsFilter = filter('*.{js,mjs}', { restore: true })
  const processes = []

  // 3.1 sourcemaps.init
  if (options.sourcemap) {
    processes.push(sourcemaps.init({ loadMaps: true }))
  }
  
  // 4. 自定义处理流程
  putProcesses(processes, options.plugins)

  // 5. 文件指纹处理 & sourcemaps & 输出文件
  outputFiles(processes, {
    ...options,
    filter: jsFilter,
  })

  return pipeline(
    merge(...getEntries(options)),
    processes
  ).on('end', done)
}
