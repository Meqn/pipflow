const { resolve } = require('path')
const { readJsonFile, writeJsonFile } = require('@pipflow/utils')
const { error } = require('./logger')

let cachedVersion

exports.loadVersion = async () => {
  if (cachedVersion) {
    return cachedVersion
  }
  try {
    cachedVersion = await readJsonFile(resolve(__dirname, '../config/version.json'))
  } catch (e) {
    error('Error loading saved version.\n' + e.message)
    process.exit(1)
  }
  return cachedVersion
}

exports.saveVersion = async (data) => {
  cachedVersion = data
  await writeJsonFile(resolve(__dirname, '../config/version.json'), data)
}
