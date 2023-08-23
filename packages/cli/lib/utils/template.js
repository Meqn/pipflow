const { resolve } = require('path')
const { readJsonFile, writeJsonFile } = require('@pipflow/utils')
const { error } = require('./logger')

let cachedTemplate

exports.loadTemplate = async () => {
  if (cachedTemplate) {
    return cachedTemplate
  }
  try {
    cachedTemplate = await readJsonFile(resolve(__dirname, '../config/template.json'))
  } catch (e) {
    error('Error loading saved template data.\n' + e.message)
    process.exit(1)
  }
  return cachedTemplate
}

exports.saveTemplate = async (data) => {
  cachedTemplate = data
  await writeJsonFile(resolve(__dirname, '../config/template.json'), data)
}
