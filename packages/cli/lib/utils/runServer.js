const execa = require('execa')
const path = require('path')
const { pkgDir, minimist } = require('@pipflow/utils')

module.exports = async function runTaskScript(command, args) {
  const rootDir = await pkgDir(__dirname)
  const cwd = process.cwd()
  const option = minimist(args)

  args.unshift('run', command, '--')
  args.push('--server=' + path.resolve(cwd, option.server || option.s || './'))
  
  return await execa('npm', args, { cwd: rootDir, stdio: 'inherit' })
}
