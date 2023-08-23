const request = require('./request.js')
module.exports = async function getPackageVersion(id, range = '') {
  // const registry = shouldUseTaobao ? `https://registry.npmmirror.com` : `https://registry.npmjs.org`
  const registry = `https://registry.npmmirror.com`
  let result
  try {
    result = await request.get(
      // 关于npm对package的定义 https://docs.npmjs.com/about-packages-and-modules
      // https://registry.npmjs.org/pipflow/latest
      `${registry}/${encodeURIComponent(id).replace(/^%40/, '@')}/${range}`
    )
  } catch (err) {
    return err
  }
  return result
}
