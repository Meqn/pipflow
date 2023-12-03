const path = require('path')
const { pathToFileURL } = require('url')
const {
  logger,
  symbols,
  colors
} = require('@pipflow/utils')

/**
 * 将多个流的阵列合并成一个流
 * 来自: gulp-pipe
 * 参考: pumpify
 * @param {*} stream 数据流
 * @param {*} tubes 数据流
 * @returns 
 */
function pipeline(stream, tubes) {
  tubes = tubes ? [].concat(tubes) : stream.slice(1);
  return tubes.reduce(function(stream, tube) { return stream.pipe(tube); }, Array.isArray(stream) ? stream[0] : stream);
}

function onError(error) {
  const { name, plugin, message } = error
  logger.time(symbols.error, colors.red(`${plugin} ${name} : ${message}`))
}

/**
 * 任务完成回调
 * @param {function} done 回调函数
 */
function onDone(done) {
  if (typeof done === 'function') {
    return done
  }
  return () => {}
}

/**
 * 从包含指定前缀的url查找 npm 包
 * @param {string} url path
 * @param {string} prefix 前缀
 * @returns 
 */
function findUrlFromNpm(url, prefix = '~') {
  if (url.startsWith(prefix)) {
    return new URL(
      pathToFileURL(path.resolve(process.cwd(), 'node_modules', url.substring(1)))
    )
  }
  return url
}

module.exports = {
  pipeline,
  findUrlFromNpm,
  onError,
  onDone
}
