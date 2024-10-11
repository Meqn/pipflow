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
  return function (plugins, options) {
    return cb(async (file) => {
      let _results = {} //默认配置
      if (Array.isArray(plugins)) {
        _results = { plugins: plugins, options: options }
      } else if (typeof plugins === 'function') {
        _results = await Promise.resolve(plugins(file))
        if (Array.isArray(_results)) {
          _results = { plugins: _results }
        } else if (typeof _results === 'object' && _results !== null) {
          const _res = {}
          _res.plugins = _results.plugins || []
          delete _results.plugins
          _res.options = _results.options || _results
          _results = _res
        } else {
          _results = {}
        }
      }

      const ctx = options || {}
      const config = {}

      if (ctx.config) {
        config.path = path.resolve(ctx.config)
      } else {
        config.path = file.dirname
      }

      config.ctx = { file: file, options: ctx }

      return posthtmlrc(config.ctx, config.path).then((res) => {
        return {
          plugins: (_results.plugins || []).concat(res.plugins),
          options: Object.assign(_results.options, res.options),
        }
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
