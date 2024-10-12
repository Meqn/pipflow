/**
 * @Date 2024/10/11
 * 源自 gulp-postcss@10.0.0
 * `gulp-postcss` 不支持 配置项 和 post.config合并，故fork并修改
 * 1. 重写 `withConfigLoader` 函数
 */

var Stream = require('stream')
var postcss = require('postcss')
var applySourceMap = require('vinyl-sourcemaps-apply')
var fancyLog = require('fancy-log')
var PluginError = require('plugin-error')
var path = require('path')

module.exports = withConfigLoader(function (loadConfig) {
  var stream = new Stream.Transform({ objectMode: true })

  stream._transform = function (file, encoding, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return handleError('Streams are not supported!')
    }

    // Protect `from` and `map` if using gulp-sourcemaps
    var isProtected = file.sourceMap ? { from: true, map: true } : {}

    var options = {
      from: file.path,
      to: file.path,
      // Generate a separate source map for gulp-sourcemaps
      map: file.sourceMap ? { annotation: false } : false,
    }

    loadConfig(file)
      .then(function (config) {
        var configOpts = config.options || {}
        // Extend the default options if not protected
        for (var opt in configOpts) {
          if (configOpts.hasOwnProperty(opt) && !isProtected[opt]) {
            options[opt] = configOpts[opt]
          } else {
            fancyLog.info(
              'gulp-postcss:',
              file.relative +
                '\nCannot override ' +
                opt +
                ' option, because it is required by gulp-sourcemaps'
            )
          }
        }
        return postcss(config.plugins || []).process(file.contents, options)
      })
      .then(handleResult, handleError)

    function handleResult(result) {
      var map
      var warnings = result.warnings().join('\n')

      file.contents = Buffer.from(result.css)

      // Apply source map to the chain
      if (file.sourceMap) {
        map = result.map.toJSON()
        map.file = file.relative
        map.sources = [].map.call(map.sources, function (source) {
          return path.join(path.dirname(file.relative), source)
        })
        applySourceMap(file, map)
      }

      if (warnings) {
        fancyLog.info('gulp-postcss:', file.relative + '\n' + warnings)
      }

      setImmediate(function () {
        cb(null, file)
      })
    }

    function handleError(error) {
      var errorOptions = { fileName: file.path, showStack: true }
      if (error.name === 'CssSyntaxError') {
        errorOptions.error = error
        errorOptions.fileName = error.file || file.path
        errorOptions.lineNumber = error.line
        errorOptions.showProperties = false
        errorOptions.showStack = false
        error = error.message + '\n\n' + error.showSourceCode() + '\n'
      }
      // Prevent stream’s unhandled exception from
      // being suppressed by Promise
      setImmediate(function () {
        cb(new PluginError('gulp-postcss', error, errorOptions))
      })
    }
  }

  return stream
})

function withConfigLoader(cb) {
  return function (plugins, options = {}) {
    var postcssLoadConfig = require('postcss-load-config')
    var contextOptions = options
    return cb(async (file) => {
      var defaults = {} //默认配置
      if (Array.isArray(plugins)) {
        defaults = { plugins, options }
      } else if (typeof plugins === 'function') {
        defaults = await Promise.resolve(plugins(file))
      }

      var configPath
      if (contextOptions.config) {
        if (path.isAbsolute(contextOptions.config)) {
          configPath = contextOptions.config
        } else {
          configPath = path.join(file.base, contextOptions.config)
        }
      } else {
        configPath = file.dirname
      }
      // @TODO: The options property is deprecated and should be removed in 10.0.0.
      contextOptions.options = Object.assign({}, contextOptions)
      contextOptions.file = file
      return postcssLoadConfig(contextOptions, configPath)
        .then((result) => {
          return {
            file: result.file || file,
            plugins: [].concat(result.plugins || [], defaults.plugins || []),
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
