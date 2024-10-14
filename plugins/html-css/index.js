const path = require('path')
const { Transform } = require('stream')
const postcss = require('postcss')

const PLUGIN_NAME = 'gulp-html-css'

/**
 * Create a CSS compiler function
 * @param {Object} compiler - CSS compiler object
 * @param {Object} options - Compiler options
 * @returns {Function} - CSS compiler function
 */
function cssCompiler(compiler, options) {
  const compilerMap = {
    sass: async (input, file) => {
      if (typeof compiler.compileStringAsync !== 'function') {
        throw new Error('Invalid Sass compiler')
      }
      const opts = {
        file: file.path,
        importers: [
          {
            findFileUrl(url) {
              if (!path.isAbsolute(url)) {
                url = path.resolve(path.dirname(file.path), url)
              }
              return new URL(`file://${url}`)
            },
          },
        ],
        // loadPaths: [path.dirname(file.path)],
        ...options,
      }
      const result = await compiler.compileStringAsync(input, opts)
      return result.css
    },
    less: (input, file) => {
      if (typeof compiler.render !== 'function') {
        throw new Error('Invalid Less compiler')
      }
      const opts = {
        filename: file.path,
        // paths: [path.dirname(file.path)],
        javascriptEnabled: true,
        ...options,
      }
      return new Promise((resolve, reject) =>
        compiler.render(input, opts, (err, res) => (err ? reject(err) : resolve(res.css)))
      )
    },
    stylus: (input, file) => {
      if (typeof compiler.render !== 'function') {
        throw new Error('Invalid Stylus compiler')
      }
      const opts = {
        filename: file.path,
        // paths: [path.dirname(file.path)],
        ...options,
      }
      if (file.data) {
        opts.define = file.data
      }
      return new Promise((resolve, reject) =>
        compiler.render(input, opts, (err, css) => (err ? reject(err) : resolve(css)))
      )
    },
  }

  return async (lang, input, file) => {
    if (lang === 'scss') lang = 'sass'
    const renderer = compilerMap[lang]
    if (!renderer) {
      throw new Error(`Unsupported language ${lang}`)
    }
    return renderer(input, file)
  }
}

/**
 * Asynchronous string replace function
 * @param {string} str - Input string
 * @param {RegExp} regex - Regular expression to match
 * @param {Function} asyncFn - Async function to generate replacement
 * @returns {Promise<string>} - Resulting string after async replacements
 */
async function asyncReplace(str, regex, asyncFn) {
  const promises = []
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args)
    promises.push(promise)
  })
  const data = await Promise.all(promises)
  return str.replace(regex, () => data.shift())
}

/**
 * Create a PostCSS config loader
 * @param {Object} config - PostCSS configuration
 * @param {Array} config.plugins - PostCSS plugins
 * @param {Object} config.options - PostCSS options
 * @param {boolean} merge - Merge with existing PostCSS config
 * @returns {Function} - PostCSS loader function
 */
function createPostCSSLoader(config, merge) {
  return async (file) => {
    try {
      if (!config.plugins?.length || merge) {
        const postcssrc = require('postcss-load-config')
        const ctx = config.options || {}
        let configPath
        if (ctx.config) {
          configPath = path.isAbsolute(ctx.config) ? ctx.config : path.join(file.base, ctx.config)
        } else {
          configPath = file.dirname
        }
        ctx.options = Object.assign({}, ctx)
        ctx.file = file

        const result = await postcssrc(ctx, configPath)
        config = {
          file: result.file || file,
          plugins: [].concat(result.plugins || [], config.plugins || []),
          options: Object.assign({}, config.options, result.options),
        }
      }
    } catch (err) {
      console.error(err)
    }

    return {
      ...config,
      options: {
        from: file.path,
        to: file.path,
        ...config.options,
      },
    }
  }
}

/**
 * Process HTML file, compile and transform CSS in <style> tags and inline styles using PostCSS.
 * If <style lang=""> attribute exists, compile the content using appropriate preprocessor before PostCSS.
 *
 * @param {Array|Object} plugins - PostCSS plugins
 * @param {Object} options - Configuration options
 * @param {Object} options.postcss - PostCSS options
 * @param {Object} options.compiler - CSS preprocessor compiler
 * @param {Object} options.compilerOptions - Preprocessor options
 * @param {boolean} ext - Extended configuration, .e.g: merge: Merge with existing PostCSS config
 * @returns {Transform} - Transform stream object
 */
function gulpHtmlCss(plugins = [], options = {}, ext) {
  if (plugins && !Array.isArray(plugins)) {
    options = plugins
    plugins = options.plugins || []
  }
  if (typeof options === 'boolean') ext = options

  let renderer = null
  let postcssOptions = options
  if (options.compiler) {
    renderer = cssCompiler(options.compiler, options.compilerOptions)
    postcssOptions = options.postcss || {}
  }

  const loadConfig = createPostCSSLoader(
    { plugins, options: postcssOptions },
    typeof ext === 'boolean' ? ext : ext?.merge
  )

  const styleTagRegex = /<style\b([^>]*)>([\s\S]*?)<\/style>/gi
  const langAttrRegex = /\blang=(['"])(.*?)\1/i
  const inlineStyleRegex = /\bstyle=(["'])((?:(?!\1).)*)\1/gi

  const transformStream = new Transform({
    objectMode: true,
    async transform(file, encoding, callback) {
      if (file.isNull()) {
        return callback(null, file)
      }

      if (file.isStream()) {
        return callback(new Error(`${PLUGIN_NAME}: Streaming not supported`))
      }

      try {
        if (file.isBuffer()) {
          let content = file.contents.toString()

          const postcssConfig = await loadConfig(file)
          const postcssProcessor = postcss(postcssConfig.plugins)

          // Process <style> tags
          content = await asyncReplace(content, styleTagRegex, async (match, attrs, css) => {
            const langMatch = attrs.match(langAttrRegex)
            if (langMatch && renderer) {
              css = await renderer(langMatch[2].toLowerCase(), css, file)
            }
            const result = await postcssProcessor.process(css, postcssConfig.options)
            return `<style${attrs}>${result.css}</style>`
          })

          // Process inline styles
          content = await asyncReplace(content, inlineStyleRegex, async (match, quote, css) => {
            const result = await postcssProcessor.process(css, postcssConfig.options)
            return `style=${quote}${result.css}${quote}`
          })

          file.contents = Buffer.from(content)
        }

        this.push(file)
        callback()
      } catch (error) {
        callback(new Error(`${PLUGIN_NAME}: ${error.message}`))
      }
    },
  })

  return transformStream
}

module.exports = gulpHtmlCss
