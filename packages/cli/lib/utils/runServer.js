module.exports = async function runTaskScript(command, args) {
  const execa = require('execa')
  const path = require('path')
  const { pkgDir, minimist } = require('@pipflow/utils')

  const rootDir = await pkgDir(__dirname)
  const cwd = process.cwd()
  const option = minimist(args)
  
  args.unshift('run', command, '--')
  let serverDir = option.server || option.s
  if (!serverDir && option._.length) {
    serverDir = option._[0]
  }
  args.push('--server=' + path.resolve(cwd, serverDir || './'))
  
  return await execa('npm', args, { cwd: rootDir, stdio: 'inherit' })
}
