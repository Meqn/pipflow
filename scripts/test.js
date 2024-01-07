const minimist = require('minimist')
const rawArgs = process.argv.slice(2)
const args = minimist(rawArgs)
const packageNames = ['core', 'cli', 'main', 'utils']

let regex
if (args.p) {
  const packages = (args.p || args.package).split(',').join('|')
  regex = `packages/(${packages})/.*\\.(test|spec)\\.js$`
  const i = rawArgs.indexOf('-p')
  rawArgs.splice(i, 2)
} else if (args._.length && packageNames.includes(args._[0])) {
  // 支持 `pnpm test core`
  regex = `packages/(${args._[0]})/.*\\.(test|spec)\\.js$`
  rawArgs.shift()
}

const jestArgs = [
  '--env', 'node',
  '--runInBand',
  ...rawArgs,
  ...(regex ? [regex] : [])
]

console.log(`running jest with args: ${jestArgs.join(' ')}`)

require('jest').run(jestArgs)
