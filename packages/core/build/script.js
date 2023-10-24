const path = require('path')
const concat = require('gulp-concat')
const gulpif = require('gulp-if')
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
const { outputFiles, createSrcOptions, plumber, putProcesses, getBasePath } = require('./comm')

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
  const entries = [] //多个 gulp.src 入口
  const jsFilter = filter('*.{js,mjs}', { restore: true })

  const {
    input,
    alias,
    minify: jsMinify
  } = options

  const srcOptions = createSrcOptions(options)
  const basePath = getBasePath(input, options.base || '.')
  /**
   * 统一入口文件
   * 1. sourcemaps.init (在合并文件之前)
   * 2. 合并文件
   */
  if (_.isPlainObject(input)) {
    Object.keys(input).forEach(name => {
      entries.push(
        gulp.src(input[name], { ...srcOptions, base: '.' })
          .pipe(gulpif(options.sourcemap, sourcemaps.init({ loadMaps: true })))
          .pipe(concat(path.join(basePath, `${name}.js`)))
      )
    })
  } else {
    entries.push(
      gulp.src(input, srcOptions)
        .pipe(gulpif(options.sourcemap, sourcemaps.init({ loadMaps: true })))
    )
  }

  // 2. plumber错误处理
  processes.push(plumber.handler())

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

  // 7. 压缩处理
  if (jsMinify) {
    const minifyOptions = _.isPlainObject(jsMinify) ? jsMinify : {}
    processes.push(uglifyjs(minifyOptions))
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
  if (options.compiler) {
    return compileModuleScript(options, done)
  } else {
    return compileScript(options, done)
  }
}
