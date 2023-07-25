const gulp = require('gulp')
const path = require('path')
const _ = require('lodash')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const htmlMinifier = require('../plugins/htmlMinifier')
const revRewrite = require('gulp-rev-rewrite')
const ejsTemplate = require('gulp-ejs')
const pugTemplate = require('gulp-pug')
const hbTemplate = require('gulp-hb')
const njkTemplate = require('gulp-nunjucks')
const artTemplate = require('gulp-art-tpl')

const { pipeline } = require('../base/utils')
const { revDir, createSrcOptions, outputFiles, plumber, putProcesses } = require('./comm')
const { envInject } = require('../base/config')
const { readJsonFiles } = require('@pipflow/utils')

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
      return ejsTemplate(data, compilerOptions)
    },
    pug() {
      // pug([opts])
      return pugTemplate(compilerOptions)
    },
    artTemplate() {
      // template(data, options)
      return artTemplate(data, compilerOptions)
    },
    handlebars() {
      // hb([options])
      return hbTemplate(compilerOptions)
    },
    nunjucks() {
      // nunjucks.compile(data?, options?)
      return njkTemplate(data, compilerOptions)
    }
  }
  return templaterMap[compiler]?.()
}

module.exports = async function htmlTask(options = {}, done) {
  const {
    input,
    dest,
    compiler,
    compilerOptions,
    alias,
    fileHash,
    minify: isMinify,
  } = options
  
  if (!input) {
    throw new Error('input is required')
  }
  
  let manifest
  if (fileHash) {
    // path.posix 统一路径, 兼容window平台
    const json = await readJsonFiles(path.posix.join(dest, revDir, '*.json'), { merge: true })
    manifest = JSON.stringify(json)
  }
  
  const processes = []
  const srcOptions = createSrcOptions(options)

  // 1. plumber错误处理
  processes.push(plumber.handler())

  // 2. 环境变量处理
  processes.push(envInject({ isVar: false }))

  // 3. 模板处理
  if (compiler) {
    const rendered = templater(compiler, compilerOptions)
    if (rendered) {
      processes.push(rendered)
    }
  }
  
  // 4. replace 替换别名 (在模板编译之前，避免路径不会被替换)
  if (_.isPlainObject(alias)) {
    for (const key in alias) {
      processes.push(replace(key, alias[key]))
    }
  }

  // 5. 自定义处理流程
  putProcesses(processes, options.plugins)
  
  // 6. 文件指纹处理
  if (manifest) {
    processes.push(revRewrite({ manifest }))
  }
  
  // 7. 重命名
  processes.push(rename({ extname: '.html' }))

  // 8. 压缩处理
  if (isMinify) {
    processes.push(htmlMinifier({
      collapseWhitespace: true, //移除多余空白
      removeComments: true, //移除注释
      // removeRedundantAttributes: true, //移除默认值的属性
      removeEmptyAttributes: true, //移除空的属性
      // removeAttributeQuotes: true, //移除属性值周围的引号，仅在可能的情况下使用
      collapseBooleanAttributes: true, //当属性值为布尔类型时，移除属性值，仅保留属性名称
      minifyJS: true, //使用terser来压缩内联JavaScript代码
      minifyCSS: true //使用clean-css压缩内联CSS代码
    }))
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
  ).on('end', done)
}
