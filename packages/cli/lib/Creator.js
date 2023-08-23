const EventEmitter = require('events')
const inquirer = require('inquirer')
const chalk = require('chalk')
const gradientStr = require('gradient-string')
const execa = require('execa')
const { fs } = require('@pipflow/utils')

const features = require('./utils/features')
const { clearConsole } = require('./utils/clearConsole')
const { log, warn, error } = require('./utils/logger')
const { logWithSpinner, stopSpinner } = require('./utils/spinner')
const fetchRemotePreset = require('./utils/fetchRemotePreset')
const { loadTemplate, saveTemplate } = require('./utils/template')
const getPackageVersion = require('./utils/getPackageVersion')
const { hasGit, hasProjectGit } = require('./utils/env')
const getUser = require('./utils/getUser')
const { CLI_TEMPLATE_ID } = require('./config/constants')

const { generateTemplate } = require('./generate')

module.exports = class Creator extends EventEmitter {
  /**
   * @constructor
   * @param {string} name 项目名称
   * @param {string} context 项目路径
   */
  constructor(name, context) {
    super()

    this.name = name
    this.context = context
  }

  async create(cliOptions = {}) {
    const { name, context } = this
    const repo = cliOptions.repo || 'github' //模板仓库源 ['github', 'gitee']
    log()
    log(`${chalk.cyan.bold('pipflow-CLI')} - ${gradientStr(['#66baa7', '#6881ee'])('Quickly create a gulp-based web development workflow!')}`)

    //清空工作台log & 检测CLI当前版本
    await clearConsole(true)

    // 用户预设
    const preset = await this.getPreset()

    let tmpdir //模板临时存放目录
    let templateJson //模板数据

    log(`✨  Creating project in ${chalk.yellow(context)}.`)
    log()
    this.emit('creation', { event: 'creating' })
    try {
      stopSpinner()
      logWithSpinner(
        `⠋`,
        `Download project template. This might take a while...`
      )
      templateJson = await loadTemplate()
      tmpdir = await this.fetchTemplate(templateJson, repo, cliOptions.clone)
    } catch (e) {
      log()
      error(
        `Failed fetching remote git repo ${chalk.cyan(templateJson[repo]?.url)}:`
      )
      throw e
    }
    
    // 是否初始化git (检测是否安装 git)
    const shouldInitGit = this.shouldInitGit(cliOptions)
    
    // 生成模板文件
    try {
      await generateTemplate(tmpdir, context, {
        name,
        author: shouldInitGit ? getUser() : '',
        hasGit: shouldInitGit,
        ...preset,
      })
    } catch (e) {
      log()
      error(e)
      throw e
    }

    // 执行 git init/commit 命令
    if (shouldInitGit) {
      stopSpinner()
      log()
      logWithSpinner(`🗃  Initializing git repository...`)
      this.emit('creation', { event: 'git-init' })
      await this.run('git init')
    }

    // commit initial state
    let gitCommitFailed = false
    if (shouldInitGit) {
      await this.run('git add -A')
      try {
        await this.run('git', ['commit', '-m', 'Initial'])
      } catch (e) {
        gitCommitFailed = true
      }
    }

    stopSpinner()
    log()
    log(`🎉  Successfully created project ${chalk.yellow(name)}.`)
    log()
    this.emit('creation', { event: 'done' })

    // commit fail
    if (gitCommitFailed) {
      warn(
        `Skipped git commit due to missing username and email in git config, or failed to sign commit.\n` +
          `You will need to perform the initial commit yourself.\n`
      )
    }

    // 🎉 项目创建完成, 安装依赖并运行
    log('👉  Done. Now run:')
    log()
    if (!cliOptions.inCurrent) {
      log(`    cd ${name}`)
    }
    log(`    npm install`)
    log(`    npm run serve`)
    log()
  }

  run(command, args) {
    if (!args) {
      ;[command, ...args] = command.split(/\s+/)
    }
    return execa(command, args, { cwd: this.context })
  }

  /**
   * 获取预设
   * @returns
   */
  async getPreset() {
    const preset = features.reduce((ret, feat) => {
      ret[feat.value] = false
      return ret
    }, {})

    const featureList = await inquirer.prompt({
      name: 'features',
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      choices: features
    })

    const featuresMap = features.reduce((res, feat) => {
      if (feat.injectPrompt) {
        res[feat.value] = {
          prompt: feat.injectPrompt,
          handler: feat.onPromptComplete
        }
      }
      return res
    }, {})

    // 遍历选中的 features，做下一步处理
    for (const feat of featureList.features) {
      preset[feat] = true // 选中 features

      if (featuresMap[feat]) {
        const { prompt, handler } = featuresMap[feat]
        const answer = await inquirer.prompt(prompt)
        handler && handler(answer, preset)
      }
    }

    return preset
  }

  /**
   * 拉取模板
   * @param {object} json 模板信息
   * @param {string} repo 模板仓库源
   * @param {boolean} clone 是否clone方式拉取
   * @returns 暂存路径
   */
  async fetchTemplate(json, repo, clone = false) {
    if (!json) {
      json = await loadTemplate()
    }
    const { version: lastVersion } = await getPackageVersion(CLI_TEMPLATE_ID, 'latest')
    const { version, tmpdir } = json

    // 读取本地缓存的版本
    try {
      if (tmpdir && lastVersion === version) {
        await fs.access(tmpdir) // 检查文件是否存在
        return tmpdir
      }
    } catch (error) {}

    // 拉取远程仓库模板文件
    //! gitee下载`.zip`包需要 手动验证，故只能使用 `git clone` 方式下载
    if (repo === 'gitee') {
      clone = true
    }
    const _dir = await fetchRemotePreset(json[repo]?.download, clone)
    await saveTemplate({
      ...json,
      tmpdir: _dir,
      version: lastVersion,
      lastTime: Date.now()
    })
    return _dir
  }

  shouldInitGit(cliOptions) {
    if (!hasGit()) {
      // warn('Git is not installed.')
      return false
    }
    // --no-git
    if (cliOptions.git === false || cliOptions.git === 'false') {
      return false
    }
    // default: true unless already in a git repo
    return !hasProjectGit(this.context)
  }
}
