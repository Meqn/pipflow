const chalk = require('chalk')
const semver = require('semver')

const { clearConsole } = require('./logger')
const getVersions = require('./getVersions')
const { CLI_REPO_URL, CLI_ID } = require('../config/constants')

exports.generateTitle = async function (checkUpdate) {
  const { current, latest, error } = await getVersions()
  let title = chalk.bold.blue(`pipflow CLI v${current}`)

  if (error) {
    title += '\n' + chalk.red('Failed to check for updates')
  }

  // 提示升级
  if (checkUpdate && semver.gt(latest, current)) {
    //! 内容不要换行，否则显示效果不一样
    const upgradeMessage = `Update available! ${chalk.red(current)} → ${chalk.green(latest)}.\nRun "${chalk.magenta('npm i -g ' + CLI_ID)}" to update.
    \n${chalk.magenta('Changelog:')} ${chalk.dim(CLI_REPO_URL + '/releases/')}`

    const upgradeBox = require('boxen')(upgradeMessage, {
      textAlignment: 'center',
      borderColor: 'yellow',
      borderStyle: 'round',
      padding: 1
    })
    
    title += `\n${upgradeBox}\n`
  }
  return title
}

exports.clearConsole = async function clearConsoleWithTitle(checkUpdate) {
  const title = await exports.generateTitle(checkUpdate)
  clearConsole(title)
}
