const path = require('path')

function loadOptions(options) {
  if (options.parser && typeof options.parser === 'string') {
    options.parser = require(options.parser)()
  }

  if (options.parser && typeof options.parser === 'object') {
    const parser = options.parser

    options.parser = require(parser.name)(parser.options)
  }

  if (options.render && typeof options.render === 'string') {
    options.render = require(options.render)
  }

  if (options.render && typeof options.render === 'object') {
    const render = options.render

    options.render = require(render.name)(render.options)
  }

  return options
}

function loadPlugins(config) {
  var plugins = []

  if (Array.isArray(config.plugins)) {
    plugins = config.plugins

    if (plugins.length && plugins.length > 0) {
      plugins.forEach((plugin) => {
        if (plugin.default) {
          plugin = plugin.default
        }

        if (typeof plugin !== 'function') {
          throw new TypeError(
            `${plugin.name} is not a valid PostHTML plugin, did you require() it ?`
          )
        }
      })
    }

    return plugins
  } else {
    config = config.plugins

    const load = (plugin, options = {}) => {
      try {
        return require(plugin)(options)
      } catch (err) {
        console.log(err)
      }
    }

    Object.keys(config)
      .filter((plugin) => {
        return config[plugin] !== false ? plugin : ''
      })
      .forEach((plugin) => {
        plugin = load(plugin, config[plugin])

        if (plugin.default) {
          plugin = plugin.default
        }

        return plugins.push(plugin)
      })

    return plugins
  }
}

async function loadConfig(ctx, filename = 'posthtml.config.js') {
  let context = { cwd: process.cwd(), env: process.env.NODE_ENV || 'development' }
  let config

  if (typeof ctx === 'function' || ctx?.plugins) {
    config = ctx
  } else {
    context = Object.assign(context, ctx)
    config = require(path.resolve(context.cwd, filename))
  }

  if (!config) {
    throw new Error('PostHTML Config could not be loaded. Please check your `posthtml.config.js` !')
  }

  if (typeof config === 'function') {
    config = config(context)
  } else {
    config = Object.assign(config, context)
  }

  if (!config.plugins) {
    config.plugins = []
  }

  return {
    plugins: loadPlugins(config),
    options: loadOptions(config),
  }
}

module.exports = {
  loadConfig,
}
