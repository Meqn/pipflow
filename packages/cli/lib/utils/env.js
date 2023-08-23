const { execSync } = require('child_process')
const { LRUCache } = require('lru-cache') //在内存中管理缓存数据

let _hasGit
// 检测是否安装了git
exports.hasGit = () => {
  if (typeof _hasGit === 'boolean') {
    return _hasGit
  }
  try {
    execSync('git --version', { stdio: 'ignore' })
    return (_hasGit = true)
  } catch (error) {
    return (_hasGit = false)
  }
}

const _gitProjects = new LRUCache({
  max: 10, //缓存大小
  maxAge: 1000 //缓存过期时间
})
// 检测项目是否已经是一个git repo
exports.hasProjectGit = (cwd) => {
  if (_gitProjects.has(cwd)) {
    return _gitProjects.get(cwd)
  }

  let result
  try {
    execSync('git status', { stdio: 'ignore', cwd })
    result = true
  } catch (error) {
    result = false
  }
  _gitProjects.set(cwd, result)
  return result
}
