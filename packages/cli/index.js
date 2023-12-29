module.exports = () => {
  //! 由于 require 模块比较耗时 (特别是 `@pipflow/utils`)，所以增加 loading效果
  // 在执行命令前清除 loading
  const ora = require('ora')
  const spinner = ora('Loading...').start()

  const semver = require('semver') //npm的语义版本包
  const leven = require('leven') //简易的智能匹配引擎
  const chalk = require('chalk') //美化命令行输出
  const { Command } = require('commander') //命令行工具
  const {
    minimist  //参数处理
  } = require('@pipflow/utils')

  const { info, warn } = require('./lib/utils/logger')
  const { CLI_NAME, CLI_ID, CLI_BASE_ID, CLI_CORE_ID, CLI_UTILS_ID } = require('./lib/config/constants')
  const pkg = require('./package.json')
  const name = pkg.name

  // 在执行其他操作前检查node版本
  function checkNodeVersion(wanted, id) {
    // 检测node版本是否符合要求范围
    if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
      console.log(chalk.red(
        'You are using Node ' + process.version + ', but this version of ' + id +
        ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
      ))
      process.exit(1)
    }
  }
  checkNodeVersion(pkg.engines.node, name)

  spinner.stop() //停止 loading

  const program = new Command()
  program
    .version(`${name} ${pkg.version}`)
    .usage('<command> [options]')
    // .description('Welcome to pipflow-cli !')

  program
    .command('create <app-name>')
    .description(`Create a new project powered by ${name}`)
    .option('-f, --force', 'overwrite target directory if it exists')
    .option('--merge', 'merge target directory if it exists')
    .option('--repo <name>', 'git repository source name', 'github') //模板仓库源 ['github', 'gitee']
    .option('-c, --clone', 'use git clone when fetching remote preset')
    .option('-n, --no-git', 'skip git initialization')
    .action((name, options) => {
      if (minimist(process.argv.slice(3))._.length > 1) {
        console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.'))
      }
      require('./lib/create')(name, options)
    })

  program
    .command('dev')
    .alias('serve')
    .description('Start development server that with HMR in the current project')
    .option('--mode <mode>', 'specify env mode', 'development')
    .option('--config <path>', 'the configuration file path')
    .option('--port <port>', 'specify port', 9527)
    .option('--host', 'specify hostname')
    .option('--index', 'specify index page')
    .option('--https', 'enable SSL for local development', false)
    .option('--cors', 'enable CORS for the dev server')
    .option('--open', 'open browser on startup')
    .option('--no-open', 'not open browser on startup')
    .option('--no-notify', 'disable the notify element in browser')
    // .allowUnknownOption()
    .action(() => {
      info('Starting development server...')
      require('./lib/utils/runNpmScript')('serve', process.argv.slice(3))
    })

  program
    .command('build')
    .description('Produces a production-ready bundle in the `dist/` directory')
    .option('--mode <mode>', 'specify env mode', 'production')
    .option('--config <path>', 'the configuration file path')
    .action((cmd) => {
      require('./lib/utils/runNpmScript')('build', process.argv.slice(3))
    })
  
  program
    .command('task')
    .description('Run a specific task')
    .argument('[task-name]', 'task name')
    .option('-l, --list', 'list all tasks')
    .option('-T, --tasks', 'list all tasks')
    .allowUnknownOption()
    .action((name, options, cmd) => {
      if (options.list || options.tasks) {
        require('./lib/utils/runNpmScript')('task', ['--tasks'])
      } else {
        require('./lib/utils/runNpmScript')('task', process.argv.slice(3))
      }
    })

  /* // 开启 gulp server 服务
  program
    .command('server')
    .description('Start a local HTTP service')
    .option('-p, --port <port>', 'specify port', 3000)
    .option('-d --dir [path]', 'specify base directory')
    .option('--host [host]', 'specify a hostname to use')
    .option('--open', 'open browser on server start')
    .option('--no-open', 'not open browser on server start')
    .option('--https', 'use https', false)
    .option('--cors', 'configure CORS for the dev server')
    .option('--index [index]', 'specify which file should be used as the index page')
    .allowUnknownOption()
    .action((cmd) => {
      require('./lib/utils/runNpmScript')('server', process.argv.slice(3))
    }) */
  
  // 开启 server 服务，不依赖 gulp
  program
    .command('server')
    .description(`Start a local HTTP service (base on browser-sync).\n👉 See more: ${chalk.blue('https://browsersync.io/docs/command-line')}`)
    .option('-s, --server <path>', 'the web root', '.')
    .option('--port <port>', 'specify a port to use', 3000)
    .option('--host [host]', 'specify a hostname to use')
    .option('--index <filename>', 'specify which file should be used as the index page')
    .option('-w, --watch', 'watch files for changes')
    .option('-f, --files', 'file paths to watch')
    .option('--https', 'enable SSL for local development', false)
    .option('--cors', 'add Access Control headers to every request')
    .option('--open', 'open browser on server start')
    .option('--no-open', 'not open browser on server start')
    .option('--no-notify', 'disable the notify element in browser')
    .allowUnknownOption()
    .action((options, cmd) => {
      require('./lib/utils/runServer')('server', process.argv.slice(3))
    })

  /* // 创建压缩包
  program
    .command('pack')
    .description('Create zip archives for files')
    .argument('[output]', 'output path')
    .argument('[target...]', 'input files')
    .action((cmd) => {
      const args = process.argv.slice(3)
      if (args.length > 1) {
        const dest = args.shift()
        require('./lib/utils/runNpmScript')('pack', [`--input=${args.join(',')}`, `--dest=${dest}`])
      } else {
        warn('No input or output file specified !')
      }
    }) */

  // 显示通用详细信息的报告，如操作系统、二进制版本、浏览器、已安装语言等。(用于排查软件问题)
  program
    .command('info')
    .description('Print debugging information about your environment')
    .action((cmd) => {
      console.log(chalk.bold('\nEnvironment Info:'))
      require('envinfo').run(
        {
          System: ['OS', 'CPU', 'Memory'],
          Binaries: ['Node', 'Yarn', 'npm', 'pnpm'],
          Browsers: ['Chrome', 'Firefox', 'Safari', 'Edge'],
          // npmPackages: '/**/{typescript,*@pipflow/cli*/*/}',
          npmPackages: ['gulp', CLI_BASE_ID, CLI_ID, CLI_CORE_ID, CLI_UTILS_ID],
          npmGlobalPackages: [CLI_ID]
        },
        {
          showNotFound: true,
          duplicates: true,
          fullTree: true
        }
      ).then(console.log)
    })

  // output help information on unknown commands
  program.on('command:*', ([cmd]) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(cmd)
    process.exitCode = 1
  })

  program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan(`${CLI_NAME} <command> --help`)} for detailed usage of given command.`)
    console.log()
  })

  program.commands.forEach(c => c.on('--help', () => console.log()))

  /**
   * 重写commander某些事件
   * 增强常见错误信息
   */
  const enhanceErrorMessages = require('./lib/utils/enhanceErrorMessages')

  enhanceErrorMessages('missingArgument', argName => {
    return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`
  })

  enhanceErrorMessages('unknownOption', optionName => {
    return `Unknown option ${chalk.yellow(optionName)}.`
  })

  enhanceErrorMessages('optionMissingArgument', (option, flag) => {
    return `Missing required argument for option ${chalk.yellow(option.flags)}` + (
      flag ? `, got ${chalk.yellow(flag)}` : ``
    )
  })


  // 把命令行参数传给commander解析
  program.parse(process.argv)

  // 输入 pipflow 显示帮助信息
  if (!process.argv.slice(2).length) {
    program.outputHelp()
  }


  /**
   * 未找到运行命令, 给出建议命令
   * @param {string} unknownCommand 未知cmd
   */
  function suggestCommands(unknownCommand) {
    const availableCommands = program.commands.map(cmd => cmd._name)

    let suggestion

    availableCommands.forEach(cmd => {
      const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
      if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
        suggestion = cmd
      }
    })

    if (suggestion) {
      console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
    }
  }

}
