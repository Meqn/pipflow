const path = require('path')
const gulp = require('gulp')
const gulpFilter = require('gulp-filter')
const rev = require('gulp-rev')
const jsonEditor = require('gulp-json-editor')

/**
 * 转换文件 hash 方式
 */
function transformHash(json) {
  let newObj = {}
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      let hash = path.basename(json[key]).split('-').pop().split('.')[0]
      newObj[key] = key + '?' + hash
    }
  }
  return newObj
}

// 创建文件过滤器
function createFilter(filter) {
  if (typeof filter === 'string') {
    return gulpFilter('**/*.{js,mjs}', { restore: true })
  }
  return filter
}

/**
 * 生成文件指纹 和 输出文件
 * 1. fileHash 作为文件名([name]-[hash])，则输出 rev后的文件及manifest.json
 * 2. fileHash 作为参数`?`([name]?[hash])，则仅输出文件及 manifest.json
 * @param {Array} processes 所有流程
 * @param {object} params 其他参数
 * @param {string} params.dest 输出目录
 * @param {string} params.fileHash 文件指纹
 * @param {string} params.filter 文件过滤
 */
exports.outputFiles = function buildFileHash(processes, {
  fileHash,
  dest,
  filter
}) {
  if (fileHash) {
    const fileFilter = createFilter(filter)
    if (fileHash === '?') {
      processes.push(gulp.dest(dest))
      if (fileFilter) {
        //过滤指定文件, 不输出 rev后的文件
        processes.push(fileFilter)
        processes.push(rev())
        processes.push(fileFilter.restore)
      }
      processes.push(rev.manifest({ merge: true }))
      processes.push(jsonEditor(function(file) {
        return transformHash(file)
      }))
      processes.push(gulp.dest(dest))
    } else {
      if (fileFilter) {
        processes.push(fileFilter)
        processes.push(rev())
        processes.push(fileFilter.restore)
      }
      processes.push(gulp.dest(dest))
      processes.push(rev.manifest({ merge: true }))
      processes.push(gulp.dest(dest))
    }
  } else {
    processes.push(gulp.dest(dest))
  }
}
