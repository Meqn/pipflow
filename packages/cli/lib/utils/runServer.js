module.exports = async function runTaskScript(command, args) {
  const path = require('pathe')
  const { pkgDir, minimist } = require('@pipflow/utils')
  const { execWithSign } = require('./exeCommand')

  const rootDir = await pkgDir(__dirname)
  const cwd = process.cwd()
  const option = minimist(args)
  
  args.unshift('run', command, '--')
  let serverDir = option.server || option.s
  if (!serverDir && option._.length) {
    serverDir = option._[0]
  }
  args.push('--server=' + path.resolve(cwd, serverDir || './'))
  
  // return await execa('npm', args, { cwd: rootDir, stdio: 'inherit' })
  return await execWithSign('npm', args, { cwd: rootDir, stdio: 'inherit' })
}
