const fs = require('fs-extra')

/**
 * 判断文件是否存在
 * @param {string} file 文件路径
 * @param {string[]} ext 文件扩展名, 比如 ['js', 'json']
 * @returns Promise<any>
 */
exports.fileExists = async (file, ext) => {
  if (ext?.length > 0) {
    return await Promise.any(
      ext.map(suffix => fs.access(file + `.${suffix}`))
    )
  }
  return await fs.access(file)
}

/**
 * 判断文件是否存在
 * @param {string} file 文件路径
 * @param {string[]} ext 文件扩展名, 比如 ['js', 'json']
 * @returns boolean
 */
exports.fileExistsSync = (file, ext) => {
  if (ext?.length > 0) {
    let failCount = 0
    for (const suffix of ext) {
      try {
        fs.accessSync(file + `.${suffix}`)
        return true
      } catch (e) {
        failCount++
        if (failCount >= ext.length) {
          return false
        }
      }
    }
  }

  try {
    fs.accessSync(file)
    return true
  } catch (e) {
    return false
  }
}
