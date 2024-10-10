'use strict'

/**
 * 源自 gulp-posthtml：https://www.npmjs.com/package/gulp-posthtml
 * 1. 将 `posthtml-load-config` 替换为 loadConfig
 * 2. 参数 options 支持 plugins 属性 (内置插件)
 */

const path = require('path')
const transform = require('through2').obj
const PluginError = require('plugin-error')
const posthtml = require('posthtml')
const { loadConfig } = require('./utils')

const PLUGIN_NAME = 'gulp-posthtml'

function rc(cb) {
  return function (plugins, options) {
    if (Array.isArray(plugins)) {
      return cb(() => Promise.resolve({ plugins: plugins, options: options })) // eslint-disable-line standard/no-callback-literal
    } else if (typeof plugins === 'function') {
      return cb((file) => Promise.resolve(plugins(file))) // eslint-disable-line standard/no-callback-literal
    } else {
      const ctx = plugins || {}

      return cb((file) => {
        // eslint-disable-line standard/no-callback-literal
        const config = {}

        if (ctx.config) {
          config.path = path.resolve(ctx.config)
        } else {
          config.path = file.dirname
        }

        config.ctx = { file: file, options: ctx }

        return loadConfig(config.ctx).then((config) => {
          if (Array.isArray(options?.plugins)) {
            config.plugins = config.plugins.concat(options.plugins)
          }
          return config
        })
      })
    }
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
      config.options = Object.assign({ from: file.path, to: file.path }, config.options)
      delete config.options.plugins
      delete config.options.locals

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
