const fs = require('fs-extra')
const { glob, globSync } = require('glob')
const { deepMerge } = require('../libs/utils')

const {
  readJsonFiles,
  readJsonFilesSync
} = require('../libs/readJsonFiles')

jest.mock('fs-extra')
jest.mock('glob')
jest.mock('../libs/utils')

describe('readJsonFiles', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return an empty array if pattern is not provided', async () => {
    const result = await readJsonFiles()
    expect(result).toEqual([])
  })

  it('should read and return JSON contents for each file matching the pattern', async () => {
    const files = ['/path/to/file1.json', '/path/to/file2.json']
    const jsonContents = [{ foo: 'bar' }, { baz: 'qux' }]
    glob.mockResolvedValueOnce(files)
    fs.readJson.mockResolvedValueOnce(jsonContents[0])
    fs.readJson.mockResolvedValueOnce(jsonContents[1])

    const result = await readJsonFiles('/path/to/*.json')

    expect(glob).toHaveBeenCalledWith('/path/to/*.json', {})
    expect(fs.readJson).toHaveBeenNthCalledWith(1, '/path/to/file1.json')
    expect(fs.readJson).toHaveBeenNthCalledWith(2, '/path/to/file2.json')
    expect(result).toEqual(jsonContents)
  })

  it('should merge JSON contents if merge option is true', async () => {
    const files = ['/path/to/file1.json', '/path/to/file2.json']
    const jsonContents = [{ foo: 'bar' }, { baz: 'qux' }]
    glob.mockResolvedValueOnce(files)
    fs.readJson.mockResolvedValueOnce(jsonContents[0])
    fs.readJson.mockResolvedValueOnce(jsonContents[1])
    deepMerge.mockReturnValueOnce({ foo: 'bar', baz: 'qux' })

    const result = await readJsonFiles('/path/to/*.json', { merge: true })

    expect(glob).toHaveBeenCalledWith('/path/to/*.json', { merge: true })
    expect(fs.readJson).toHaveBeenNthCalledWith(1, '/path/to/file1.json')
    expect(fs.readJson).toHaveBeenNthCalledWith(2, '/path/to/file2.json')
    expect(deepMerge).toHaveBeenCalledWith({}, ...jsonContents)
    expect(result).toEqual({ foo: 'bar', baz: 'qux' })
  })
})

describe('readJsonFilesSync', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return an empty array if pattern is not provided', () => {
    const result = readJsonFilesSync()
    expect(result).toEqual([])
  })

  it('should read and return JSON contents', () => {
    const files = ['/path/to/file1.json', '/path/to/file2.json']
    const jsonContents = [{ foo: 'bar' }, { baz: 'qux' }]
    globSync.mockReturnValueOnce(files)
    fs.readJsonSync.mockReturnValueOnce(jsonContents[0])
    fs.readJsonSync.mockReturnValueOnce(jsonContents[1])

    const result = readJsonFilesSync('/path/to/*.json')

    expect(globSync).toHaveBeenCalledWith('/path/to/*.json', {})
    expect(fs.readJsonSync).toHaveBeenNthCalledWith(1, '/path/to/file1.json')
    expect(fs.readJsonSync).toHaveBeenNthCalledWith(2, '/path/to/file2.json')
    expect(result).toEqual(jsonContents)
  })

  it('should merge JSON contents if merge option is true', () => {
    const files = ['/path/to/file1.json', '/path/to/file2.json']
    const jsonContents = [{ foo: 'bar' }, { baz: 'qux' }]
    globSync.mockReturnValueOnce(files)
    fs.readJsonSync.mockReturnValueOnce(jsonContents[0])
    fs.readJsonSync.mockReturnValueOnce(jsonContents[1])
    deepMerge.mockReturnValueOnce({ foo: 'bar', baz: 'qux' })

    const result = readJsonFilesSync('/path/to/*.json', { merge: true })

    expect(globSync).toHaveBeenCalledWith('/path/to/*.json', { merge: true })
    expect(fs.readJsonSync).toHaveBeenNthCalledWith(1, '/path/to/file1.json')
    expect(fs.readJsonSync).toHaveBeenNthCalledWith(2, '/path/to/file2.json')
    expect(deepMerge).toHaveBeenCalledWith({}, ...jsonContents)
    expect(result).toEqual({ foo: 'bar', baz: 'qux' })
  })
})
