const minimist = require('minimist')
const rawArgs = process.argv.slice(2)
const args = minimist(rawArgs)
const packagesMap = {
  core: 'packages/core',
  cli: 'packages/cli',
  main: 'packages/main',
  utils: 'packages/utils',
  renew: 'plugins/renew',
}

let regex
if (args.p) {
  // `pnpm test -- -p utils,core`
  const packages = (args.p || args.package)
    .split(',')
    .map((p) => packagesMap[p])
    .join('|')
  regex = `(${packages})/.*\\.(test|spec)\\.js$`
  const i = rawArgs.indexOf('-p')
  rawArgs.splice(i, 2)
} else if (args._.length) {
  // 支持 `pnpm test core utils`
  const packages = args._.map((p) => packagesMap[p]).join('|')
  regex = `(${packages})/.*\\.(test|spec)\\.js$`
  // rawArgs.shift()
  rawArgs.splice(0, args._.length)
}
const jestArgs = ['--env', 'node', '--runInBand', ...rawArgs, ...(regex ? [regex] : [])]

require('jest').run(jestArgs)
