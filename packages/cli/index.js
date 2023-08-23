module.exports = () => {
  const semver = require('semver') //npm的语义版本包
  const leven = require('leven') //简易的智能匹配引擎
  const chalk = require('chalk') //美化命令行输出
  const {
    minimist  //参数处理
  } = require('@pipflow/utils')

  const { info, warn } = require('./lib/utils/logger')
  const { CLI_NAME, CLI_ID, CLI_BASE_ID, CLI_CORE_ID } = require('./lib/config/constants')
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

  const { Command } = require('commander') //命令行工具
  const program = new Command()

  program
    .version(`${name} ${pkg.version}`)
    .usage('<command> [options]')
    // .description('Welcome to pipflow-cli !')

  program
    .command('create <app-name>')
    .description(`create a new project powered by ${name}`)
    .option('-f, --force', 'Overwrite target directory if it exists')
    .option('--merge', 'Merge target directory if it exists')
    .option('--repo <name>', 'Git repository source name', 'github') //模板仓库源 ['github', 'gitee']
    .option('-c, --clone', 'Use git clone when fetching remote preset')
    .option('-n, --no-git', 'Skip git initialization')
    .action((name, options) => {
      if (minimist(process.argv.slice(3))._.length > 1) {
        console.log(chalk.yellow('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored.'))
      }

      require('./lib/create')(name, options)
    })

  program
    .command('serve')
    .alias('dev')
    .description('Start development server that with HMR in the current project')
    .option('--mode <mode>', 'specify env mode', 'development')
    .option('--config <path>', 'the configuration file path')
    .option('-p, --port <port>', 'specify port', 9527)
    .option('--open', 'open browser on server start')
    .option('--https', 'use https', false)
    .option('--base <path>', 'base directory')
    .option('--cors', 'configure CORS for the dev server')
    // .allowUnknownOption()
    .action(() => {
      info('Starting development server...')
      const args = process.argv.slice(3).filter(v => v.startsWith('-'))
      require('./lib/utils/runNpmScript')('serve', args)
    })

  program
    .command('build')
    .description('Produces a production-ready bundle in the dist/ directory')
    .option('--mode <mode>', 'specify env mode', 'production')
    .option('--config <path>', 'the configuration file path')
    .action((cmd) => {
      const args = process.argv.slice(3).filter(v => v.startsWith('-'))
      require('./lib/utils/runNpmScript')('build', args)
    })

  program
    .command('preview')
    .description('Start a preview server in the current project')
    .allowUnknownOption()
    .action((cmd) => {
      const args = process.argv.slice(3).filter(v => v.startsWith('-'))
      require('./lib/utils/runNpmScript')('preview', args)
    })
  
  program
    .command('pack')
    .description('Create zip archives for files')
    .argument('[target]', 'input files')
    .argument('[output]', 'output path')
    .action((cmd) => {
      const args = process.argv.slice(3)
      if (args.length > 1) {
        const dest = args.pop()
        require('./lib/utils/runNpmScript')('pack', [`--input=${args.join(',')}`, `--dest=${dest}`])
      } else {
        warn('No input or output file specified !')
      }
    })

  program
    .command('task [task-name]')
    .description('Run a specific task')
    .option('-l, --list', 'List all tasks')
    .option('-T, --tasks', 'List all tasks')
    .allowUnknownOption()
    .action((name, options, cmd) => {
      if (options.list || options.tasks) {
        require('./lib/utils/runNpmScript')('task', ['--tasks'])
      } else {
        require('./lib/utils/runNpmScript')('task', process.argv.slice(3))
      }
    })

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
          npmPackages: ['gulp', CLI_BASE_ID, CLI_ID, CLI_CORE_ID],
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
