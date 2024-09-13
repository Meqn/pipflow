const path = require('path')
const {
  gulp,
  logger,
  loadEnv,
  setPublicEnv,
  getConfig,
  deepMerge,
  minimist
} = require('@pipflow/utils')
const { task, watch, series, parallel } = gulp
const {
  htmlTask,
  scriptTask,
  styleTask,
  imageTask,
  staticTask,
  copyTask,
  archiveTask,
  removeTask,
  userTask,
  eslintTask,
  createServer
} = require('@pipflow/core')
const { globFiles, getCliServeArgs, getInputList } = require('./libs/utils')
const serverTasks = []

//== 自定义配置: 参数和环境变量 ==============================================
// 命令行参数
const args = minimist(process.argv.slice(3))

// 环境变量配置
if (!process.env.PIPFLOW_MODE) {
  process.env.PIPFLOW_MODE = args.mode || (process.env.PIPFLOW_CLI_COMMAND === 'build' ? 'production' : 'development')
}

if (!process.env.NODE_ENV) {
  if (process.env.PIPFLOW_CLI_COMMAND === 'build') {
    process.env.NODE_ENV = 'production'
  } else {
    process.env.NODE_ENV = ['development', 'production'].includes(process.env.PIPFLOW_MODE) ? process.env.PIPFLOW_MODE : 'development'
  }
} else {
  // 当 build 且 mode=production 时，强制 node_env = production
  if(process.env.NODE_ENV !== 'production' && process.env.PIPFLOW_CLI_COMMAND === 'build' && process.env.PIPFLOW_MODE === 'production') {
    process.env.NODE_ENV = 'production'
  }
}

// 自定义配置
const CC = getConfig(args.config || 'pipflow.config')
const { outDir } = CC.build
const publicFiles = globFiles(CC.publicDir, true) // public 目录文件

// 重新加载环境变量文件
loadEnv({
  path: CC.envDir,
  mode: process.env.PIPFLOW_MODE
}, true)
//! 暴露内建特殊环境变量
setPublicEnv()

//== 用户任务 ==============================================
const taskTypes = {} //所有任务类型对象, `{ type: [{name}] }`
const composeTasks = [] //组合任务
const taskMap = {
  html(options, done) {
    return htmlTask(options, done)
  },
  script(options, done) {
    return scriptTask(options, done)
  },
  style(options, done) {
    return styleTask(options, done)
  },
  image(options, done) {
    return imageTask(options, done)
  },
  static(options, done) {
    return staticTask(options, done)
  },
  copy(options, done) {
    return copyTask(options, done)
  },
  remove(options, done) {
    return removeTask(options, done)
  },
  archive(options, done) {
    return archiveTask(options, done)
  },
  server(options, done) {
    return createServer(options.name)(options, done)
  },
  user(options, done) {
    return userTask(options, done)
  }
}
if (CC.tasks?.length > 0) {
  for (const item of CC.tasks) {
    // 任务类型数据
    if (!taskTypes[item.type]) {
      taskTypes[item.type] = []
    }
    taskTypes[item.type].push({
      name: item.name,
      input: item.input
    })

    // 🍱 所有自定义任务
    if (item.type === 'compose') {
      // 组合任务放在最后导出
      composeTasks.push(item)
    } else {
      //! 1. 使用async函数，防止用户自定义任务无返回值导致报错
      //! 2. 如果这里使用 async 函数，任务函数必须是一个返回promise的函数
      task(item.name, (done) => {
        if (item.type === 'server') {
          // server任务无 task 配置项
          const cliServe = getCliServeArgs(args)
          const _serverTask = createServer(item.name)
          serverTasks.push(_serverTask)
          return _serverTask(
            deepMerge({}, CC.server, cliServe),
            done
          )
        }
        return taskMap[item.type]?.(item, done)
      })
    }

  }
}

/**
 * 🍔 创建 public 任务
 */
if (publicFiles) {
  task('copy:public', done => {
    return copyTask({
      input: publicFiles,
      dest: outDir
    }, done)
  })
}

//== 内置任务 ==============================================
/**
 * 👻 本地开发服务
 */
const devServerTask = createServer('pipflowDev')
const devServerReload = devServerTask.reload
task('devServer', done => {
  serverTasks.push(devServerTask)
  const cliServe = getCliServeArgs(args)
  devServerTask(deepMerge({}, CC.server, cliServe), done)
})

/**
 * 👻 本地 HTTP 服务
 */
task('server', done => {
  const cliServe = getCliServeArgs(args)
  const _defaults = args.preview ? { ...CC.server, port: 8527 } : {
    port: 3000,
    server: '.',
    open: true
  }
  const _serverTask = createServer('pipflowServer')
  serverTasks.push(_serverTask)
  _serverTask(deepMerge(_defaults, cliServe), done)
})

/**
 * 📦 打包 `zip` 文件
 * @example gulp archive --input=src/style,src/script --dest=assets.zip
 */
task('archive', done => {
  let input = path.resolve(outDir, '**')
  let dest = outDir
  const fileRegex = /(.+\.\w+)$/

  if (args.input) {
    //如果 input 是以 `xx.xx` 结尾，则认为是 文件，否则为 目录
    input = args.input.split(',').map(item => {
      if (fileRegex.test(item)) return item
      return path.resolve(item, '**')
    })
  }
  
  if (args.dest) {
    /* 
    // 打包到 dest 目录下
    const _reg = /^\.\//
    const argsDest = args.dest.replace(_reg, '') //过滤开头的 `./`
    if (argsDest.startsWith(outDir.replace(_reg, ''))) {
      dest = args.dest
    } else {
      dest = path.join(outDir, args.dest)
    } */
    
    dest = args.dest
  }

  return archiveTask({
    input,
    dest
  }, done)
})

/**
 * 🗑 移除 dest 目录
 */
task('del:dest', done => {
  return removeTask(outDir, done)
})

/**
 * 👀 监听任务
 */
task('watch', async (done) => {
  if (!CC.tasks.length) return done()
  
  const watchTypes = ['html', 'style', 'script', 'static', 'image', 'copy', 'user']
  for (const item of CC.tasks) {
    if (watchTypes.includes(item.type) && item.input && item.watch) {
      watch(getInputList(item.input), parallel(item.name)).on('change', devServerReload)
    }
  }
  // public 文件
  if (publicFiles) {
    watch(publicFiles, parallel('copy:public')).on('change', devServerReload)
  }
})

/**
 * 🎨 lint检查
 */
task('lint', async (done) => {
  const jsTasks = taskTypes['script']
  if (jsTasks) {
    // 获取所有 JS入口文件
    const jsEntries = jsTasks.reduce((list, item) => {
      if (typeof item.input === 'string') {
        list.push(item.input)
      } else if (Array.isArray(item.input)) {
        list.push(...item.input)
      } else if (typeof item.input === 'object') {
        Object.values(item.input).map(input => {
          list.push(...[].concat(input))
        })
      }
      return list
    }, [])
    jsEntries.push('!node_modules/**')
    
    return eslintTask({
      name: 'lint',
      input: jsEntries
    }, done)
  } else {
    logger.time(logger.symbols.warn, logger.colors.yellow('ESLint: Javascript-free task!'))
    done()
  }
})

//== 导出组合任务 ==============================================
let baseTasks = [[], [], []] //任务执行顺序分组: `[0: 静态资源, 1: js/css, 2: html`]
if (publicFiles) {
  baseTasks[0].push('copy:public')
}
Object.keys(taskTypes).forEach(type => {
  const _typeTasks = taskTypes[type]
  if (['static', 'image', 'copy', 'user'].includes(type)) {
    baseTasks[0].push(..._typeTasks.map(v => v.name))
  }
  if (type === 'script' || type === 'style') {
    baseTasks[1].push(..._typeTasks.map(v => v.name))
  }
  if (type === 'html') {
    baseTasks[2].push(..._typeTasks.map(v => v.name))
  }
})
baseTasks = baseTasks
  .filter(item => item.length > 0) //过滤空任务
  .map(item => parallel(...item))

exports.default = exports.dev = series(
  'del:dest',
  ...baseTasks,
  parallel('devServer', 'watch')
)
exports.build = series(
  'del:dest',
  ...baseTasks
)

// 自定义组合任务
for (const item of composeTasks) {
  const { name, input } = item
  if (Array.isArray(input) && input?.length > 0) {
    exports[name] = input.length === 1 ? parallel(
      ...[].concat(input)
    ) : series(...input.map(v => parallel(...[].concat(v))))
  }
}

process.on('SIGINT', () => {
  if (serverTasks.length) {
    serverTasks.forEach(item => {
      item.bs?.exit?.()
      item.bs = null
      item.reload = null
    })
  }
})
