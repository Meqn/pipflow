const { lilconfig } = require('lilconfig')

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
        console.error(err)
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

  if (options.plugins) {
    delete options.plugins
  }

  return options
}

module.exports = function posthtmlrc(ctx, path, options) {
  const defaults = { cwd: process.cwd(), env: process.env.NODE_ENV }

  ctx = Object.assign(defaults, ctx)
  path = path || ctx.cwd
  options = Object.assign({}, options)

  if (ctx.env === undefined) {
    process.env.NODE_ENV = 'development'
  }

  return lilconfig('posthtml', options)
    .search(path)
    .then((result) => {
      if (!result) {
        throw new Error('Failed to load PostHTML Config.')
      }
      return result?.config || {}
    })
    .then(async (config) => {
      if (typeof config === 'function') {
        config = await Promise.resolve(config(ctx))
      } else {
        config = Object.assign(config, ctx)
      }

      if (!config.plugins) {
        config.plugins = []
      }

      return {
        plugins: loadPlugins(config),
        options: loadOptions(config),
      }
    })
}
