const { pkgDir, path } = require('@pipflow/utils')
const { execWithSign } = require('./exeCommand')

// 缓存数据
let rootDir, projectRoot, gulpFile

module.exports = async function runTaskScript(command, args) {
  if (!rootDir) rootDir = await pkgDir(__dirname)
  if (!projectRoot) projectRoot = await pkgDir(process.cwd())
  if (!gulpFile) {
    gulpFile =
      process.env.PIPFLOW_CLI_DEBUG === 'true'
        ? path.resolve(__dirname, '../../../', 'main/tasks.js') // 本地测试环境
        : path.resolve(projectRoot, 'node_modules/pipflow/tasks.js')
  }
  //记录当前命令
  process.env.PIPFLOW_CLI_COMMAND = command

  // 参数 `args` 依次插入 `npm [run, command, --, ...]`
  // `--gulpfile` 指定 gulpfile 文件路径
  const fullArgs = [
    'run',
    command,
    '--',
    `--gulpfile=${gulpFile}`,
    `--cwd=${path.resolve(projectRoot, '.')}`,
  ].concat(args)

  // await execa('ls', ['-la'], { cwd: projectRoot, stdio: 'inherit' })
  return await execWithSign('npm', fullArgs, { cwd: rootDir, stdio: 'inherit' })
}
