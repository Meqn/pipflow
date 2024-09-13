module.exports = async function runTaskScript(command, args) {
  const execa = require('execa')
  const path = require('pathe')
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
  
  // return await execa('npm', args, { cwd: rootDir, stdio: 'inherit' })
  //1. 执行命令
  const subprocess = execa('npm', args, { cwd: rootDir, stdio: 'inherit' })
  //2. 捕获 SIGINT 信号（Ctrl+C）
  process.on('SIGINT', async () => {
    // 在 Windows 上，我们需要发送 SIGINT 到整个进程组
    if (process.platform === 'win32') {
      try {
        await execa('taskkill', ['/pid', subprocess.pid, '/T', '/F']);
      } catch (error) {
        // console.error('Failed to kill process tree:', error);
      }
    } else {
      subprocess.kill('SIGINT', {
        forceKillAfterTimeout: 2000
      });
    }
  });

  try {
    await subprocess;
  } catch (error) {
    /* if (error.signal === 'SIGINT') {
      console.log('subprocess was terminated');
    } else {
      console.error('Error occurred:', error.message);
    } */
  } finally {
    // console.log('Exiting...');
    process.exit(0);
  }
}
