const gulp = require('gulp')
const merge = require('merge2')
const _ = require('lodash')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const named = require('vinyl-named')
const gulpWebpack = require('webpack-stream')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
// const strReplace = require('string-replace-loader')

const {
  isPROD,
  ENV
} = require('../base/config')

const {
  onError,
  pipeline
} = require('../base/utils')

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
  if (!(isPROD && minify)) {
    uglifyOptions.terserOptions = {
      mangle: true, //指定变量名压缩选项，或跳过破坏变量名
      keep_classnames: true, //是否保留或保留哪些类名
      keep_fnames: true, //是否保留或保留哪些函数名
      format: {
        comments: true, //保留注释
        beautify: true, //是否美化实际的输出代码 (保留空格和制表符)
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
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    })
  }
  
  return {
    // devtool: 'source-map',
    mode: isPROD ? 'production' : 'none', //无webpack注释 ['none', 'production']
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
 * @param {string} options.input 入口文件
 * @param {object} options.env 环境变量
 * @param {boolean} options.minify 是否压缩
 * @param {object} options.alias 别名
 * @param {string} options.compiler 使用babel转换
 * @param {string} options.base 基础路径
 * @returns 
 */
function getEntries({ input, env, alias, minify, base, compiler }) {
  const webpackOptions = {
    env,
    minify,
    alias,
    compiler,
  }
  
  let entries = []
  if (_.isPlainObject(input)) {
    entries = Object.keys(input).map(name => {
      return gulp.src(input[name], { base })
        .pipe(plumber(onError))
        .pipe(gulpWebpack(getWebpackConfig(
          Object.assign({
            filename: `${name}.js`
          }, webpackOptions)
        )))
    })
  } else {
    entries.push(
      gulp.src(input, { base })
        .pipe(plumber(onError))
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
  const {
    input,
    dest,
    sourcemap: hasSourcemaps,
    minify: isMinify
  } = options

  if (!input) {
    throw new Error('input is required')
  }

  const processes = []
  processes.push(sourcemaps.init({ loadMaps: true }))
  processes.push(sourcemaps.write('./'))
  processes.push(gulp.dest(dest))

  return pipeline(
    merge(...getEntries(options)),
    processes
  ).on('end', done)
}
