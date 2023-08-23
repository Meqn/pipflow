const metalsmith = require('metalsmith')
const { render } = require('consolidate').handlebars
// const handlebars = require('handlebars')
const path = require('path')
const {
  _,
  fs,
  generateConfig,
  readJsonFile,
  writeJsonFile,
  writeJsFile
} = require('@pipflow/utils')

const { CLI_CONFIG_FILE } = require('./config/constants')

/**
 * 生成 pipflow.config 配置
 * @param {object} preset 用户预设
 * @returns 
 */
async function createConfig(file, preset = {}) {
  const data = generateConfig(preset)
  await writeJsFile(file, (toString) => {
    return (
      `const { defineConfig } = require('pipflow')\n` +
      `module.exports = defineConfig(${toString(data)})`
    )
  })
}

/**
 * 渲染模板
 * @param {string} src 源地址
 * @param {string} dest 目标地址
 * @param {object} data 预设数据
 * @returns 
 */
function renderTemplate(src, dest, data = {}) {
  const renderTypes = ['js', 'json', 'md', 'html']
  return new Promise((resolve, reject) => {
    metalsmith(__dirname) //初始化Metalsmith对象
      .clean(false) //不清空dest目录
      .source(path.resolve(src, 'template'))
      .destination(dest)
      .metadata({ ...data })
      .use(async function(files, metalsmith, next) {
        const data = metalsmith.metadata()  //获取metalsmith的所有变量
        for (const file of Object.keys(files)) {
          // 过滤掉不需要编译的文件
          if (!renderTypes.includes(file.split('.').pop())) continue

          let contents = files[file].contents.toString()  //读取文件内容
          if (contents.includes('{{')) {  //内容包含 `{{` 才需要编译
            contents = await render(contents, data) //用数据渲染模板
            files[file].contents = Buffer.from(contents)  //更新文件内容
          }
        }
        next()
      })
      .build((err, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files)
        }
      })
  })
}

exports.generateTemplate = async function(src, dest, options = {}) {
  // 拷贝并渲染基础模板
  await renderTemplate(src, dest, options)
    
  // 生成 pipflow.config 配置文件
  await createConfig(
    path.resolve(dest, CLI_CONFIG_FILE),
    options
  )
  
  const { cssPreprocessor, templater, babel, hasGit, linter, eslintConfig } = options
  // 删除 .gitignore
  if (!hasGit) {
    await fs.remove(path.resolve(dest, '.gitignore'))
  }
  // 删除 babel.config.js
  if (!babel) {
    await fs.remove(path.resolve(dest, 'babel.config.js'))
  }
  // 拷贝 style 样式文件
  const cssDir = ['less', 'sass', 'stylus'].includes(cssPreprocessor) ? cssPreprocessor : 'default'
  await fs.copy(
    path.resolve(src, 'styles', cssDir),
    path.resolve(dest, 'src/styles')
  )
  // 拷贝基础 html 模板文件
  const htmlDir = ['artTemplate', 'ejs', 'pug', 'handlebars', 'nunjucks'].includes(templater) ? templater : 'default'
  await fs.copy(
    path.resolve(src, 'views', htmlDir),
    path.resolve(dest, 'src')
  )
  // 处理 linter 和 eslint 配置
  if (linter) {
    await fs.copy(
      path.resolve(src, 'eslint', eslintConfig),
      path.resolve(dest)
    )
    if (eslintConfig !== 'base') {
      await fs.copy(
        path.resolve(src, 'eslint/base'),
        path.resolve(dest)
      )
    }

    const { getConfig: getEslintConfig, getDeps: getEslintDeps } = require('./utils/eslint')
    const pkg = await readJsonFile(path.resolve(dest, 'package.json'))

    // 1. 处理 package.json 依赖
    const newPkg = _.merge({}, pkg, {
      scripts: {
        lint: 'pipflow task lint'
      },
      devDependencies: getEslintDeps(options)
    })
    await writeJsonFile(path.resolve(dest, 'package.json'), newPkg)

    // 2. 生成 .eslintrc.js配置
    const eslintJson = getEslintConfig(options)
    await writeJsFile(path.resolve(dest, '.eslintrc.js'), eslintJson)
  }
}
