const { deepMerge } = require('./utils')
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
  const result = deepMerge({}, generateDefault, {
    build: {
      fileHash: makeJSOnlyValue(`process.env.NODE_ENV === 'production'`),
      sourcemap: makeJSOnlyValue(`process.env.NODE_ENV === 'production'`),
      minify: makeJSOnlyValue(`process.env.NODE_ENV === 'production'`),
    }
  })
  // 关闭图片压缩 (预设不压缩图片, 则不会安装依赖包)
  if (imagemin === false) {
    result.build.imageMinify = imagemin
  }

  result.tasks = result.tasks.map(item => {
    switch (item.type) {
      case 'html':
        item.input = getInput('html', templater)
        if (templater) {
          item.compiler = templater
          item.compilerOptions = {
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

exports.exportedForTesting = {
  getInput
}
