const semver = require('semver')
const { CLI_ID } = require('../config/constants')
const { loadVersion, saveVersion } = require('./version')

// 缓存上一次的最新版本号以及本地版本号
let sessionCached

module.exports = async function getVersions() {
  if (sessionCached) {
    return sessionCached
  }
  let latest
  let error
  let local = require('../../package.json').version
  // 提供默认值作为第一次计算
  const { latestVersion = local, lastChecked = 0 } = loadVersion()
  // 本地最新的版本
  const cached = latestVersion
  // 一天检查一次
  const daysPassed = (Date.now() - lastChecked) / (3600 * 1000 * 24)
  if (daysPassed > 1) {
    try {
      latest = await getAndCacheLatestVersion(cached)
    } catch (e) {
      latest = cached
      error = e
    }
  } else {
    // 在后台执行检查 并更新结果，如果失败不抛错
    getAndCacheLatestVersion(cached).catch(() => {})
    latest = cached
  }
  return (sessionCached = {
    latest,
    current: local,
    error
  })
}

/**
 * 获取最新版本并且缓存在磁盘本地以便下次使用
 * @param {string} cached 缓存的版本号
 * @returns 
 */
async function getAndCacheLatestVersion(cached) {
  const getPackageVersion = require('./getPackageVersion')
  const { version } = await getPackageVersion(CLI_ID, 'latest')
  // 如果获得版本号是合法的并且与之前缓存的版本不一致说明是最新的
  if (semver.valid(version) && version !== cached) {
    // 缓存最新版本号及获取时间
    saveVersion({
      latestVersion: version,
      lastChecked: Date.now()
    })
    return version
  }
  return cached
}
