const path = require('path')
const fs = require('fs-extra')
const { readJsonFile, writeJsonFile, writeJsFile } = require('../libs/jsFile')

const jsonData = { "name": "pipflow" }

describe('readJsonFile', () => {
  it('should read JSON file correctly', async () => {
    const file = path.resolve(__dirname, './mocks/data.json')
    const result = await readJsonFile(file)
    expect(result).toEqual(jsonData)
  })

  it('should handle error when file does not exist', async () => {
    await expect(readJsonFile('./mocks/non-file.json')).rejects.toThrow()
  })
})

describe('writeJsonFile', () => {
  it('should write JSON file correctly', async () => {
    const file = path.resolve(__dirname, './mocks/_write.json')
    await writeJsonFile(file, jsonData)
    const writtenData = await readJsonFile(file)

    expect(writtenData).toEqual(jsonData)
  })

  it('should overwrite existing file', async () => {
    const file = path.resolve(__dirname, './mocks/_write.json')
    
    await writeJsonFile(file, { name: 'pipflow' })
    await writeJsonFile(file, { name: 'pipflow-cli' })
    
    const fileContent = await readJsonFile(file)
    
    expect(fileContent).toEqual({ name: 'pipflow-cli' })
  })
})

describe('writeJsFile', () => {
  it('should write JS file correctly with data as function', async () => {
    const file = path.resolve(__dirname, './mocks/_config.js')

    await writeJsFile(file, (toString) => (`module.exports = ${toString(jsonData)}`))
    const writtenData = await fs.readFile(file, 'utf-8')

    expect(writtenData).toContain('module.exports = {\n  name: \'pipflow\'\n}')
  })

  it('should write JS file correctly with data as object', async () => {
    const file = path.resolve(__dirname, './mocks/_config.js')
    
    await writeJsFile(file, jsonData)
    const writtenData = await fs.readFile(file, 'utf-8')

    expect(writtenData).toContain('module.exports =')
  })
})
