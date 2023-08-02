const {
  gulp,
  _,
  minimist,
  getConfig
} = require('@pipflow/utils')
const { task, watch, series, parallel } = gulp

// 命令行参数
const args = minimist(process.argv.slice(3))

// 环境变量配置
if (!process.env.PIPFLOW_MODE) {
  process.env.PIPFLOW_MODE = args.mode || (process.env.PIPFLOW_CLI_COMMAND === 'build' ? 'production' : 'development')
}
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = ['development', 'production'].includes(process.env.PIPFLOW_MODE) ? process.env.PIPFLOW_MODE : 'development'
}

const {
  loadEnv,
  htmlTask,
  scriptTask,
  styleTask,
  staticTask,
  copyTask,
  archiveTask,
  removeTask,
  userTask,
  createServeTask
} = require('@pipflow/core')
const { globFiles, getCliServeArgs, getInputList } = require('./libs/utils')

//== 自定义配置 ==============================================
const CC = getConfig(args.config || 'pipflow.config')
const { outDir } = CC.build
const publicFiles = globFiles(CC.publicDir, true) // public 目录文件

// 重新加载环境变量文件
loadEnv(CC.envDir)

//== 用户任务 ==============================================
const taskTypes = {} //所有任务类型对象, `{ type: [{name}] }`
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
    const serveTask = createServeTask(options.name)
    return serveTask(options, done)
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
      name: item.name
    })
    
    // 🍱 所有自定义任务
    task(item.name, done => {
      taskMap[item.type]?.(item, done)
    })
  }
}

/**
 * 🍔 创建 public 任务
 */
if (publicFiles) {
  task('copy:public', done => {
    copyTask({
      input: publicFiles,
      dest: outDir
    }, done)
  })
}

//== 内置任务 ==============================================
/**
 * 👻 本地开发服务
 */
const devServerTask = createServeTask('pipFlowDev')
const devServerReload = devServerTask.reload
task('devServer', done => {
  const cliServe = getCliServeArgs(args)
  devServerTask(_.merge({}, CC.server, cliServe), done)
})

/**
 * 👻 本地预览服务
 */
const viewServerTask = createServeTask('pipFlowView')
task('preview', done => {
  const cliServe = getCliServeArgs(args)
  if (!cliServe.port) {
    cliServe.port = 8527
  }
  viewServerTask(_.merge({}, CC.server, cliServe), done)
})

/**
 * 🗑 移除 dest 目录
 */
task('del:dest', done => {
  removeTask(outDir, done)
})

/**
 * 👀 监听任务
 */
task('watch', done => {
  if (!CC.tasks.length) return done()
  
  const watchTypes = ['html', 'style', 'script', 'static', 'copy', 'user']
  for (const item of CC.tasks) {
    if (watchTypes.includes(item.type) && item.input && item.watch) {
      watch(getInputList(item.input), parallel(item.name)).on('change', devServerReload)
    }
  }
  
  // public 文件
  if (publicFiles) {
    watch(publicFiles, parallel('copy:public')).on('change', devServerReload)
  }
  done()
})

//== 导出任务 ==============================================
let baseTasks = [[], [], []] // `[0: 静态资源, 1: js/css, 2: html`]
if (publicFiles) {
  baseTasks[0].push('copy:public')
}
Object.keys(taskTypes).forEach(type => {
  const _typeTasks = taskTypes[type]
  if (['static', 'copy', 'user'].includes(type)) {
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

exports.serve = series(
  'del:dest',
  ...baseTasks,
  parallel('devServer', 'watch')
)
exports.build = series(
  'del:dest',
  ...baseTasks
)
