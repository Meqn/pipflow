const execa = require('execa') // 一个child_process封装库
const path = require('pathe')
const { pkgDir } = require('@pipflow/utils')

module.exports = async function runTaskScript(command, args) {
  const rootDir = await pkgDir(__dirname)
  const projectRoot = await pkgDir(process.cwd())

  let gulpfile = path.resolve(projectRoot, 'node_modules/pipflow/tasks.js')
  if (process.env.PIPFLOW_CLI_DEBUG === 'true') {
    // 本地测试环境, `~/.zshrc`
    gulpfile = path.resolve(__dirname, '../../../', 'main/tasks.js')
  }
  //记录当前命令
  process.env.PIPFLOW_CLI_COMMAND = command
  
  // 参数 `args` 依次插入 `npm [run, command, --, ...]`
  args.unshift('run', command, '--')
  // gulp命令参数
  args.push(`--gulpfile=${gulpfile}`)
  args.push(`--cwd=${projectRoot}`)
  
  // await execa('ls', ['-la'], { cwd: projectRoot, stdio: 'inherit' })
  return await execa('npm', args, { cwd: rootDir, stdio: 'inherit' })
}