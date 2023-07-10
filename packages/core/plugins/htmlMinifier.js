'use strict'
/**
 * gulp plugin to minify HTML base on `html-minifier-terser`.
 * 参考: https://github.com/jonschlinkert/gulp-htmlmin/
 */
const PluginError = require('plugin-error')
const htmlmin = require('html-minifier-terser')
const through = require('through2')

const PLUGIN_NAME = 'html-minifier'

module.exports = function htmlMinifier(options) {
  return through.obj(function (file, enc, next) {
    if (file.isNull()) {
      next(null, file)
      return
    }

    const minify = async (buf, _, cb) => {
      try {
        let contents = Buffer.from(await htmlmin.minify(buf.toString(), options))
        if (next === cb) {
          file.contents = contents
          cb(null, file)
          return
        }
        cb(null, contents)
        next(null, file)
      } catch (err) {
        let opts = Object.assign({}, options, { fileName: file.path })
        let error = new PluginError(PLUGIN_NAME, err, opts)
        if (next !== cb) {
          next(error)
          return
        }
        cb(error)
      }
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(through(minify))
    } else {
      minify(file.contents, null, next)
    }
  })
}
