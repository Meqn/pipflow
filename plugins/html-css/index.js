const { Transform } = require('stream')
const postcss = require('postcss')

const PLUGIN_NAME = 'gulp-html-css'

function cssCompiler(compiler, options) {
  const compilerMap = {
    sass: async (input, file) => {
      if (typeof compiler.compileStringAsync !== 'function') {
        throw new Error('Invalid Sass compiler')
      }
      const opts = {
        file: file.path,
        ...options,
      }
      const result = await compiler.compileStringAsync(input, opts)
      return result.css
    },
    less: async (input, file) => {
      if (typeof compiler.render !== 'function') {
        throw new Error('Invalid Less compiler')
      }
      const opts = {
        filename: file.path,
        ...options,
      }
      const result = await compiler.render(input, opts)
      return result.css
    },
    stylus: (input, file) => {
      if (typeof compiler.render !== 'function') {
        throw new Error('Invalid Stylus compiler')
      }
      const opts = {
        filename: file.path,
        ...options,
      }
      if (file.data) {
        opts.define = file.data
      }
      return new Promise((resolve, reject) => {
        compiler.render(input, opts, (err, css) => {
          if (err) reject(err)
          else resolve(css)
        })
      })
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
 * Process HTML file, compile and transform CSS in <style> tags and inline styles using PostCSS.
 * If <style lang=""> attribute exists, compile the content using appropriate preprocessor before PostCSS.
 *
 * @param {Array|Object} plugins - PostCSS plugins
 * @param {Object} options - Configuration options
 * @param {Object} options.postcss - PostCSS options
 * @param {Object} options.compiler - CSS preprocessor compiler
 * @param {Object} options.compilerOptions - Preprocessor options
 * @returns {Transform} - Transform stream object
 */
function gulpHtmlCss(plugins = [], options = {}) {
  let renderer = null
  let postcssOptions = options
  if (options.compiler) {
    renderer = cssCompiler(options.compiler, options.compilerOptions)
    postcssOptions = options.postcss || {}
  }

  const processor = postcss(plugins)

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

          // Process <style> tags
          content = await asyncReplace(content, styleTagRegex, async (match, attrs, css) => {
            const langMatch = attrs.match(langAttrRegex)
            if (langMatch && renderer) {
              css = await renderer(langMatch[2].toLowerCase(), css, file)
            }
            const result = await processor.process(css, { ...postcssOptions, from: file.path })
            return `<style${attrs}>${result.css}</style>`
          })

          // Process inline styles
          content = await asyncReplace(content, inlineStyleRegex, async (match, quote, css) => {
            const result = await processor.process(css, { ...postcssOptions, from: file.path })
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
