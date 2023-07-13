/**
 * 路径下的所有文件
 * @param {string} path 目录
 * @param {number} level 层级
 * @returns 
 */
function globFiles(path, level = 2) {
  if (!path) return ''
  const regEx = /\/\*{1,2}$/
  if (regEx.test(path)) {
    return path
  }

  const arr = path.split('/').filter(v => v)
  arr.push(''.padEnd(level, '*'))
  return arr.join('/')
}

/**
 * 获取命令行 serve配置
 * @param {object} options 选项
 * @param {string} options.port 端口
 * @param {boolean} options.open 是否打开
 * @param {boolean} options.cors 是否允许跨域
 * @param {string} options.dir 服务基础目录
 * @returns 
 */
function getCliServeArgs({ port, open, cors, dir }) {
  const args = {}
  port && (args.port = port)
  open && (args.open = open)
  cors && (args.cors = cors)
  dir && (args.server = { baseDir: dir })

  return args
}

/**
 * 获取所有输入文件列表
 * @param {string|array|object} input 输入文件
 * @returns 
 */
function getInputList(input) {
  if (typeof input === 'string') {
    return [].concat(input)
  }
  if (Array.isArray(input)) {
    return input
  }
  if (typeof input === 'object') {
    const list = Object.keys(input).reduce((arr, key) => {
      return arr.concat(input[key])
    }, [])
    return Array.from(new Set(list))
  }
}

module.exports = {
  globFiles,
  getCliServeArgs,
  getInputList
}
