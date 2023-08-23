const ora = require('ora') //美化终端加载
const chalk = require('chalk')

const spinner = ora()
let lastMsg = null
let isPaused = false

exports.logWithSpinner = (symbol, msg) => {
  if (!msg) {
    msg = symbol
    symbol = chalk.green('✔')
  }
  if (lastMsg) {
    // 清除上次的spinner
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    })
  }
  spinner.text = ' ' + msg
  lastMsg = {
    symbol: symbol + ' ',
    text: msg
  }
  spinner.start()
}

exports.stopSpinner = (persist) => {
  if (!spinner.isSpinning) {
    return
  }

  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    })
  } else {
    spinner.stop()
  }
  lastMsg = null
}

exports.pauseSpinner = () => {
  if (spinner.isSpinning) {
    spinner.stop()
    isPaused = true
  }
}

exports.resumeSpinner = () => {
  if (isPaused) {
    spinner.start()
    isPaused = false
  }
}

exports.failSpinner = (text) => {
  spinner.fail(text)
}
