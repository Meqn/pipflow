const path = require('pathe')

exports.findCommonPath = function findCommonPath(paths) {
  if (!Array.isArray(paths) || paths.length === 0) {
    return ''
  }

  const parts = paths.map((p) => {
    const dirs = p.split(path.sep)
    if (dirs[0] === '' || dirs[0] === '.') dirs.shift()
    return dirs
  })

  let common = ''
  const firstPath = parts[0]

  for (let i = 0, len = firstPath.length; i < len; i++) {
    const seg = firstPath[i]
    if (parts.some((p) => p[i] !== seg)) {
      break
    }
    common = path.join(common, seg)
  }

  return common
}
