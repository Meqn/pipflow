'use strict';

const Transform = require('stream').Transform;
const rs = require('replacestream');
const istextorbinary = require('istextorbinary');

const PLUGIN_NAME = 'gulp-renew';

const defaultOptions = {
  skipBinary: true
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * Performs batch replacement on file contents
 * @param {Array<{search: string|RegExp, replacement: string|Function}>} replacements 
 * @param {Object} options 
 */
module.exports = function(replacements, options = {}) {
  // Merge options
  options = {
    ...defaultOptions,
    ...options
  };

  // 支持 {search: replacement} 对象形式
  if (isObject(replacements)) {
    replacements = Object.keys(replacements).map(key => {
      return {
        search: key,
        replacement: replacements[key]
      }
    })
  }
  
  if (!Array.isArray(replacements)) {
    throw new TypeError(`[${PLUGIN_NAME}]: Expected an array of replacements`)
  }

  // 支持 [[search, replacement]] 数组形式
  replacements = replacements.reduce((result, item) => {
    if (isObject(item)) {
      result.push(item)
    } else if (Array.isArray(item) && item.length === 2) {
        result.push({
            search: item[0],
            replacement: item[1]
        })
    }
    return result
  }, [])

  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      if (file.isNull() || replacements.length === 0) {
        return callback(null, file)
      }

      function doReplace() {
        if (file.isStream()) {
          replacements.forEach(({ search, replacement }) => {
            if (typeof replacement === 'function') {
                replacement = replacement.bind({ file: file })
            }
            file.contents = file.contents.pipe(rs(search, replacement));
          })
          return callback(null, file);
        }

        if (file.isBuffer()) {
          let content = file.contents.toString()
          
          replacements.forEach(({ search, replacement }) => {
            if (search instanceof RegExp) {
              content = content.replace(search, replacement)
            } else {
              const chunks = content.split(search)
              
              if (typeof replacement === 'function') {
                content = chunks.reduce((result, chunk, index) => {
                  if (index === 0) return chunk
                  return result + replacement(search) + chunk
                }, '')
              } else {
                content = chunks.join(replacement)
              }
            }
          })

          file.contents = Buffer.from(content)
          return callback(null, file)
        }

        callback(null, file)
      }

      if (options.skipBinary) {
        if (!istextorbinary.isText(file.path, file.contents)) {
          callback(null, file)
        } else {
          doReplace()
        }
        return
      }

      doReplace()
    }
  })
}
