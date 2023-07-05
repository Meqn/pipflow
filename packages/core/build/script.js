const gulp = require('gulp')
const merge = require('merge2')
const _ = require('lodash')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const replace = require('gulp-replace')
const uglifyjs = require('gulp-terser')
const sourcemaps = require('gulp-sourcemaps')
const filter = require('gulp-filter')

const { isPROD, ENV, envInject } = require('../base/config')
const { pipeline } = require('../base/utils')
const { outputFiles, createSrcOptions, plumber } = require('./comm')

const options = {
  name: '',
  type: 'script',
  input: './src/scripts/**/*.{js,mjs}',
  base: './src', //同顶部 src
  dest: 'dist/', //同顶部 build.outDir
  compiler: 'babel', //编译器
  module: true, // 模块化 (js包含 import/require, 必须启用)
  plugins: [],

  fileHash: '?', //
  minify: isPROD ? true : false,
  sourcemap: true, //构建后是否生成 source map 文件。
  alias: {
    'HEHE': 'world'
  },
  env: ENV
}

/**
 * 处理 script文件 (非 module)
 * @param {object} options 配置项
 * @param {Function} done 回调
 * @returns 
 */
function compileScript(options = {}, done) {
  if (!options.input) {
    throw new Error('input is required')
  }

  const processes = []
  const entries = []
  const jsFilter = filter('**/*.{js,mjs}', { restore: true })

  const {
    input,
    dest,
    sourcemap: hasSourcemaps,
    alias,
    plugins,
    compiler,
    minify: isMinify,
    fileHash
  } = options

  const srcOptions = createSrcOptions(options)

  // 1. 统一入口文件
  if (_.isPlainObject(input)) {
    Object.keys(input).forEach(name => {
      entries.push(
        gulp.src(input[name], srcOptions)
          .pipe(concat(`${name}.js`))
      )
    })
  } else {
    entries.push(gulp.src(input, srcOptions))
  }

  // 2. 错误流处理
  processes.push(plumber.handler())

  // 3.1 sourcemaps.init
  if (hasSourcemaps) {
    processes.push(sourcemaps.init({ loadMaps: true }))
  }

  // 4. 环境变量处理
  processes.push(envInject())

  // 5. replace 替换别名
  if (_.isPlainObject(alias)) {
    for (const key in alias) {
      processes.push(replace(key, alias[key]))
    }
  }

  // 6. 外部插件
  if (Array.isArray(plugins) && plugins.length > 0) {
    processes.push(plugins)
  }

  // 7. babel转换
  if (compiler === 'babel') {
    processes.push(babel({
      presets: ['@babel/preset-env'],
    }))
  }

  // 6. 压缩处理
  if (isMinify) {
    processes.push(uglifyjs())
  }

  // 3.2 sourcemaps 输出
  if (hasSourcemaps) {
    processes.push(sourcemaps.write('./'))
  }

  /* 
  // 7.1 文件指纹 revision
  if (fileHash) {
    processes.push(mapFilter) //仅处理js文件 (过滤.map文件)
    processes.push(rev())
    processes.push(mapFilter.restore)
  }

  // 8.输出文件
  processes.push(gulp.dest(dest))
  
  // 7.2 输出revision manifest.json
  if (fileHash) {
    processes.push(rev.manifest({ merge: true }))
    processes.push(gulp.dest(dest))
  } */

  // 9. 文件指纹处理 & 输出文件
  outputFiles(processes, {
    dest,
    fileHash,
    filter: jsFilter
  })

  return pipeline(
    merge(...entries),
    processes
  ).on('end', done)

}

const compileModuleScript = require('./script.module')
module.exports = function scriptTask(done) {
  if (options.module) {
    return compileModuleScript(options, done)
  } else {
    return compileScript(options, done)
  }
}
