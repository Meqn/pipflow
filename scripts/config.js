/**
 * 模块及对应路径
 */
const packagesMap = {
  core: 'packages/core',
  cli: 'packages/cli',
  main: 'packages/main',
  utils: 'packages/utils',
  renew: 'plugins/renew',
}

/**
 * 版本 emoji 标识
 */
const semverSymbol = {
  Major: '🎉',
  Minor: '🚀',
  Patch: '🌟',
}

/**
 * 显示的日志类型
 * // (revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip)
 */
const messagesType = ['feat', 'fix', 'perf', 'refactor', 'docs']

/**
 * changeset 默认变更日志 (待替换)
 */
const defaultChangeLog = `- update.`

module.exports = {
  packagesMap,
  semverSymbol,
  messagesType,
  defaultChangeLog,
}
