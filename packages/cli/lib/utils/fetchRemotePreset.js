module.exports = async function fetchRemotePreset(repository, clone = false) {
  const os = require('os')
  const path = require('path')
  const { fs } = require('@pipflow/utils')
  const download = require('download-git-repo')

  const tmpdir = path.join(os.tmpdir(), '.pipflow')

  try {
    await fs.remove(tmpdir)
  } catch (e) {
    console.error(e?.message)
  }
  
  return new Promise((resolve, reject) => {
    download(repository, tmpdir, { clone }, err => {
      if (err) return reject(err)
      resolve(tmpdir)
    })
  })
}
