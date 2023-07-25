const path = require('path')
const findup = require('find-up')

async function pkgDir(cwd) {
  const filePath = await findup('package.json', { cwd })
  return filePath && path.dirname(filePath)
}

function pkgDirSync(cwd) {
  const filePath = findup.sync('package.json', { cwd })
  return filePath && path.dirname(filePath)
}

module.exports = {
  pkgDir,
  pkgDirSync
}
