exports.execWithSign = async (cmd, args, options) => {
  const execa = require('execa')

  //1. 执行命令，并返回子进程
  const subprocess = execa(cmd, args, options)
  //2. 捕获 SIGINT 信号（Ctrl+C）
  process.on('SIGINT', async () => {
    // 在 Windows 上，我们需要发送 SIGINT 到整个进程组
    if (process.platform === 'win32') {
      try {
        await execa('taskkill', ['/pid', subprocess.pid, '/T', '/F']);
      } catch (error) {
        console.error('Failed to kill process tree:', error);
      }
    } else {
      subprocess.kill('SIGINT', {
        forceKillAfterTimeout: 2000
      })
    }
  })

  try {
    return await subprocess
  } catch (error) {
    if (error.signal === 'SIGINT') {
      // console.log('subprocess was terminated');
    } else {
      // console.error('Error occurred:', error.message)
    }
  } finally {
    process.exit(0)
  }
}
