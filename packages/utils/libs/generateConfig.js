const _ = require('lodash')
const { generateDefault } = require('./defaultConfig')
const { makeJSOnlyValue } = require('./stringifyJS')

/**
 * 获取默认输入文件
 * @param {string} type 任务类型
 * @param {string} compiler 编译器类型
 * @param {string} dest 输出目录
 * @returns
 */
function getInput(type, compiler) {
  const htmlMap = {
    artTemplate: 'art',
    ejs: 'ejs',
    pug: 'pug',
    nunjucks: 'njk',
    handlebars: 'hbs'
  }
  const styleMap = {
    less: 'less',
    sass: 'sass,scss',
    stylus: 'styl'
  }

  const typeMap = {
    html: `./src/**/*.{html,htm${
      htmlMap[compiler] ? ',' + htmlMap[compiler] : ''
    }}`,
    style: `./src/styles/**/*.${
      styleMap[compiler] ? '{css,' + styleMap[compiler] + '}' : 'css'
    }`,
    script: `./src/scripts/**/*.{js,mjs}`,
    static: `./src/assets/**`,
    image: `./src/images/**`
  }

  return typeMap[type]
}

/**
 * 生成配置项
 * @param {object} preset 预设置
 * @param {boolean} preset.babel babel
 * @param {string} preset.cssPreprocessor CSS预处理器
 * @param {string} preset.templater html模板引擎
 * @returns
 */
exports.generateConfig = function generateConfig({
  babel,
  cssPreprocessor,
  templater,
  imagemin
} = {}) {
  const result = _.merge({}, generateDefault, {
    build: {
      fileHash: makeJSOnlyValue(`process.env.NODE_ENV === 'production'`),
      sourcemap: makeJSOnlyValue(`process.env.NODE_ENV === 'production'`),
      minify: makeJSOnlyValue(`process.env.NODE_ENV === 'production'`),
    }
  })
  if (imagemin === false) {
    result.build.imageMinify = imagemin
  }

  result.tasks = result.tasks.map(item => {
    switch (item.type) {
      case 'html':
        item.input = getInput('html', templater)
        if (templater) {
          item.compiler = templater
          item.compileOptions = {
            data: {
              title: 'pipflow',
              description: 'A web developer workflow based on Gulp.'
            }
          }
        }
        break
      case 'style':
        item.input = getInput('style', cssPreprocessor)
        cssPreprocessor && (item.compiler = cssPreprocessor)
        break
      case 'script':
        item.input = getInput('script')
        babel && (item.compiler = 'babel')
        break
      case 'static':
        item.input = getInput('static')
        break
      case 'image':
        item.input = getInput('image')
        break
    }
    return item
  })

  return result
}
