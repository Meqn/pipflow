const path = require('path')
const inquirer = require('inquirer')
const validateProjectName = require('validate-npm-package-name')
const chalk = require('chalk')
const {
  fs,
  logger
} = require('@pipflow/utils')

const { clearConsole } = require('./utils/clearConsole')
const { stopSpinner } = require('./utils/spinner')
const Creator = require('./Creator')
const { error } = require('./utils/logger')

async function create(projectName, options) {
  if (options.proxy) {
    process.env.HTTP_PROXY = options.proxy
  }

  const cwd = options.cwd || process.cwd() //当前node进程的工作目录
  const inCurrent = projectName === '.' //判断是否是当前工作目录
  const name = inCurrent ? path.relative('../', cwd) : projectName //获取项目名,当前目录或指定项目名
  const targetDir = path.resolve(cwd, projectName || '.') //真正的目录地址

  const result = validateProjectName(name) //校验项目名是否合法
  if (!result.validForNewPackages) {
    // 打印出错误及警告
    logger.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach(err => {
      logger.error(chalk.red.dim('Error: ' + err))
    })
    result.warnings && result.warnings.forEach(warn => {
      logger.error(chalk.red.dim('Warning: ' + warn))
    })
    process.exit(1)
  }
  
  // 目录存在
  if (fs.existsSync(targetDir) && !options.merge) {
    if (options.force) {
      // 若覆盖则删除存在的目录
      await fs.remove(targetDir)
    } else {
      // 存在两种情况: 1. 当前目录创建; 2. 存在同名目录
      await clearConsole()
      if (inCurrent) {
        const { ok } = await inquirer.prompt([
          {
            name: 'ok',
            type: 'confirm',
            message: `Generate project in current directory?`
          }
        ])
        if (!ok) {
          return
        }
      } else {
        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
            choices: [
              { name: 'Overwrite', value: 'overwrite' },
              { name: 'Merge', value: 'merge' },
              { name: 'Cancel', value: false }
            ]
          }
        ])
        if (!action) {
          return
        } else if (action === 'overwrite') {
          logger.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
          await fs.remove(targetDir)
        }
      }
    }
  }

  const creator = new Creator(name, targetDir)
  await creator.create({ ...options, inCurrent })
}


module.exports = (...args) => {
  return create(...args).catch(err => {
    stopSpinner(false) // do not persist
    error(err)
    process.exit(1)
  })
}
