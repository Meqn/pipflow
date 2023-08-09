const babel = require('gulp-babel')
const concat = require('gulp-concat')
const replace = require('gulp-replace')
const uglifyjs = require('gulp-terser')
const sourcemaps = require('gulp-sourcemaps')
const filter = require('gulp-filter')
const {
  gulp,
  merge,
  _
} = require('@pipflow/utils')

const { ENV } = require('../base/env')
const { pipeline } = require('../base/utils')
const { outputFiles, createSrcOptions, plumber, putProcesses } = require('./comm')

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
    alias,
    compiler,
    minify
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

  // 2. plumber错误处理
  processes.push(plumber.handler())

  // 3.1 sourcemaps.init
  if (options.sourcemap) {
    processes.push(sourcemaps.init({ loadMaps: true }))
  }

  // 4. 环境变量处理
  processes.push(ENV.inject())

  // 5. replace 替换别名
  if (_.isPlainObject(alias)) {
    for (const key in alias) {
      processes.push(replace(key, alias[key]))
    }
  }

  // 6. 自定义处理流程
  putProcesses(processes, options.plugins)

  // 7. babel转换 //!需配置 `babel.config.json`
  if (compiler === 'babel') {
    processes.push(babel({
      presets: ['@babel/preset-env'],
    }))
  }

  // 6. 压缩处理
  if (minify) {
    processes.push(uglifyjs())
  }

  /* 
  // 3.2 sourcemaps 输出
  if (hasSourcemap) {
    processes.push(sourcemaps.write('.'))
  }

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

  // 9. 文件指纹处理 & sourcemaps & 输出文件
  outputFiles(processes, {
    ...options,
    filter: jsFilter,
  })

  return pipeline(
    merge(...entries),
    processes
  ).on('end', done)

}

const compileModuleScript = require('./script.module')
module.exports = function scriptTask(options = {}, done) {
  if (options.module) {
    return compileModuleScript(options, done)
  } else {
    return compileScript(options, done)
  }
}
