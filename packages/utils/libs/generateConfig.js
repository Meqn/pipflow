const _ = require('lodash')
const defaultConfig = require('./defaultConfig')

/**
 * 获取默认输入文件
 * @param {string} type 任务类型
 * @param {string} compiler 编译器类型
 * @param {string} dest 输出目录
 * @returns
 */
function getInput(type, compiler) {
  const htmlMap = {
    artTemplate: 'art,ejs',
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
    style: `./src/styles/**/*.{css${
      styleMap[compiler] ? ',' + styleMap[compiler] : ''
    }}`,
    script: `./src/scripts/**/*.{js,mjs}`,
    static: `./src/assets/**`
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
module.exports = function generateConfig({
  babel,
  cssPreprocessor,
  templater
} = {}) {
  const result = _.merge({}, defaultConfig, {
    build: {
      // 生成文件时会被替换 `replace('"process.env.NODE_ENV === production"', 'process.env.NODE_ENV === "production"')`
      fileHash: 'process.env.NODE_ENV === production',
      minify: 'process.env.NODE_ENV === production',
      sourcemap: 'process.env.NODE_ENV === production',
    }
  })

  result.tasks = result.tasks.map(item => {
    switch (item.type) {
      case 'html':
        item.input = getInput('html', templater)
        if (templater) {
          item.compiler = templater
          item.compilerOptions = {
            data: {
              title: 'pipflow',
              description: 'pipflow-CLI is a command line tool based on the gulp workflow. It can greatly simplify front-end development workflows.'
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
    }
    return item
  })

  return result
}
