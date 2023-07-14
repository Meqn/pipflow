const { task, watch, series, parallel } = require('gulp')
const _ = require('lodash')
const minimist = require('minimist')

// 命令行参数
const args = minimist(process.argv.slice(3))
console.log('args : ', args)

const nodeEnv = process.env.NODE_ENV
if (!nodeEnv) {
  process.env.NODE_ENV = ['development', 'production'].includes(process.env.PP_MODE) ? process.env.PP_MODE : 'development'
}

const {
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
const { getConfig } = require('@pipflow/utils')
const { globFiles, getCliServeArgs, getInputList } = require('./libs/utils')

//== 自定义配置 ==============================================
const CC = getConfig(args.config || 'pipflow.config')
const { outDir, archive } = CC.build
const publicFiles = globFiles(CC.publicDir, 2) // public 目录文件

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

/**
 * 📦 创建 archive:dest 压缩包
 */
task('archive:dest', done => {
  archiveTask({
    input: outDir,
    filename: typeof archive === 'string' ? archive : `dest-${Date.now()}`
  }, done)
})

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
  
  const watchTypes = ['html', 'style', 'script', 'static']
  for (const item of CC.tasks) {
    if (watchTypes.includes(item.type) && item.watch) {
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
let buildTasks = [[], [], []] // `[0: 静态资源, 1: js/css, 2: html`]
if (publicFiles) {
  buildTasks[0].push('copy:public')
}
Object.keys(taskTypes).forEach(type => {
  const _typeTasks = taskTypes[type]
  if (type === 'static') {
    buildTasks[0].push(..._typeTasks.map(v => v.name))
  }
  if (type === 'script' || type === 'style') {
    buildTasks[1].push(..._typeTasks.map(v => v.name))
  }
  if (type === 'html') {
    buildTasks[2].push(..._typeTasks.map(v => v.name))
  }
})
buildTasks = buildTasks.filter(v => v.length > 0) //过滤空任务

exports.serve = series(
  'del:dest',
  parallel(...buildTasks[0]),
  parallel(...buildTasks[1]),
  parallel(...buildTasks[2]),
  parallel('devServer', 'watch')
)
exports.build = series(
  'del:dest',
  parallel(...buildTasks[0]),
  parallel(...buildTasks[1]),
  parallel(...buildTasks[2]),
)
