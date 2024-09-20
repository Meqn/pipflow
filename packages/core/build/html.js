const gulp = require('gulp')
const rename = require('gulp-rename')
const {
  isPlainObject,
  injectEnv
} = require('@pipflow/utils')

const { pipeline, onDone } = require('../base/utils')
const { htmlMinifyOptions } = require('../base/defaults')
const { createSrcOptions, outputFiles, plumber, putProcesses, readManifest } = require('./comm')

/**
 * html 模板引擎
 * @param {string} compiler 模板引擎name
 * @param {object} compilerOptions 配置项
 * @returns 
 */
function templater(compiler, compilerOptions = {}) {
  const { data = {} } = compilerOptions
  const templaterMap = {
    ejs() {
      // ejs(data, options)
      return require('gulp-ejs')(data, compilerOptions)
    },
    pug() {
      // pug([opts])
      return require('gulp-pug')(compilerOptions)
    },
    artTemplate() {
      // template(data, options)
      return require('gulp-art-tpl')(data, compilerOptions)
    },
    handlebars() {
      // hb([options])
      return require('gulp-hb')(compilerOptions)
    },
    nunjucks() {
      // nunjucks.compile(data?, options?)
      return require('gulp-nunjucks')(data, compilerOptions)
    }
  }
  return templaterMap[compiler]?.()
}

/**
 * HTML 处理任务
 * 
 * @param {Object} options - 配置项
 * @param {string|string[]|string[][]|Object.<string, string|string[]>} options.input - 输入文件路径
 * @param {string} [options.dest] - 输出目录
 * @param {string} [options.name] - 任务名
 * @param {string} [options.base] - 输入文件路径的基准目录
 * @param {'pug'|'ejs'|'handlebars'|'nunjucks'|'artTemplate'} [options.compiler] - 模板引擎
 * @param {Object.<string, any>} [options.compilerOptions] - 模板引擎配置项
 * @param {boolean|Object.<string, any>} [options.minify=false] - 启用HTML压缩或配置项
 * @param {boolean} [options.fileHash] - 存在文件指纹
 * @param {Object.<string, string>} [options.alias] - 别名替换
 * @param {{limit: number}} [options.assetsInlineLimit] - 图片资源内联配置
 * @param {((...args: any[]) => Stream)[]} [options.plugins] - 自定义处理流程
 * @param {function} done - 任务完成回调函数。
 * @returns {Stream} 返回处理后的文件流。
 * @throws {Error} 如果`options.input`未定义，则抛出错误。
 */
module.exports = function htmlTask(options = {}, done) {
  const {
    input,
    dest,
    compiler,
    compilerOptions,
    minify: htmlMinify,
    alias
  } = options
  
  if (!input) {
    throw new Error('input is required')
  }
  
  const processes = []
  const srcOptions = createSrcOptions(options)

  // 1. plumber错误处理
  processes.push(plumber.handler())

  // 2. 环境变量处理
  processes.push(injectEnv({ isVar: false }))

  // 3. 模板处理
  if (compiler) {
    const rendered = templater(compiler, compilerOptions)
    if (rendered) {
      processes.push(rendered)
    }
  }
  
  // 4. replace 替换别名 (在模板编译之前，避免路径不会被替换)
  if (isPlainObject(alias)) {
    const replace = require('gulp-replace')
    for (const key in alias) {
      processes.push(replace(key, alias[key]))
    }
  }

  // 5. 自定义处理流程
  putProcesses(processes, options.plugins)

  // 6. base64 处理
  if (options.assetsInlineLimit?.limit > 0) {
    processes.push(require('gulp-dataurl')(options.assetsInlineLimit))
  }
  
  // 6. 文件指纹处理
  const manifest = readManifest(options)
  if (manifest) {
    processes.push(require('gulp-rev-rewrite')({ manifest }))
  }
  
  // 7. 重命名
  processes.push(rename({ extname: '.html' }))

  // 8. 压缩处理
  if (htmlMinify) {
    const minifyOptions = Object.assign({}, htmlMinifyOptions, isPlainObject(htmlMinify) ? htmlMinify : {})
    processes.push(require('../plugins/htmlMinifier')(minifyOptions))
  }

  // 9. 文件指纹处理 & sourcemaps & 输出文件
  outputFiles(processes, {
    dest,
    fileHash: false,
    sourcemap: false,
  })

  return pipeline(
    gulp.src(input, srcOptions),
    processes
  ).on('end', onDone(done))
}
