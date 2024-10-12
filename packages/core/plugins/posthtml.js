'use strict'

/**
 * @Date 2024/10/11
 * 源自 gulp-posthtml：https://www.npmjs.com/package/gulp-posthtml
 * 1. 重写 `posthtml-load-config`
 * 2. 重写 `rc` 函数，支持 plugins 属性 (内置插件)
 * 3. 修正 插件只能异步执行(同步报错)
 */

const path = require('path')
const transform = require('through2').obj
const PluginError = require('plugin-error')
const posthtml = require('posthtml')
const posthtmlrc = require('./posthtml/posthtml-load-config')
// const posthtmlrc = require('posthtml-load-config')

const PLUGIN_NAME = 'gulp-posthtml'

function rc(cb) {
  // 合并 默认配置 和 配置文件
  return function (plugins, options = {}) {
    const ctx = options
    return cb(async (file) => {
      let defaults = {} //默认配置
      if (Array.isArray(plugins)) {
        defaults = { plugins, options }
      } else if (typeof plugins === 'function') {
        defaults = await Promise.resolve(plugins(file))
      }

      const config = {}

      if (ctx.config) {
        config.path = path.resolve(ctx.config)
      } else {
        config.path = file.dirname
      }

      config.ctx = { file: file, options: ctx }

      return posthtmlrc(config.ctx, config.path)
        .then((result) => {
          return {
            plugins: (defaults.plugins || []).concat(result.plugins || []),
            options: Object.assign({}, defaults.options, result.options),
          }
        })
        .catch((err) => {
          console.error(err)
          return defaults
        })
    })
  }
}

module.exports = rc((loadConfig) => {
  return transform((file, enc, cb) => {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return cb(
        new PluginError({
          plugin: PLUGIN_NAME,
          message: 'Streams are not supported',
        })
      )
    }

    loadConfig(file).then((config) => {
      //! 修正源插件错误, 只能使用异步方式 `options.sync = false` (由于PostHTML插件可能是异步)
      config.options = Object.assign({ from: file.path, to: file.path }, config.options, {
        sync: false,
      })

      return posthtml(config.plugins)
        .process(file.contents.toString(enc), config.options)
        .then((result) => {
          file.contents = Buffer.from(result.html)
          cb(null, file)
        })
        .catch((err) => {
          // passing the error object directly would usually be fine,
          // but plugins like posthtml-expressions are an exception, so we're being safe
          // https://github.com/posthtml/posthtml-expressions/issues/89
          cb(
            new PluginError({
              plugin: PLUGIN_NAME,
              message: err.message,
              stack: err.stack,
              showStack: true,
            })
          )
        })
    })
  })
})
