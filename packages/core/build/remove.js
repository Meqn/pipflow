const { rimraf } = require('rimraf')

/**
 * 删除文件/目录 任务
 * 
 * @param {string|string[]|{input: string|string[]}} options 待删除目录或配置项
 * @param {function} done - 任务完成回调函数
 * @returns {Promise} 返回处理后的文件流
 * @returns 
 */
module.exports = function removeTask(options = {}, done) {
  const dir = typeof options === 'string' ? options : options.input
  if (!dir) return
  return rimraf(dir).then(() => {
    done && done()
  })
}
