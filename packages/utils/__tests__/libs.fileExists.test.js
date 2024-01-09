const { fileExists, fileExistsSync } = require('../libs/fileExists')
const fs = require('fs-extra')

describe('fileExists', () => {
  it('should return a promise', () => {
    const accessMock = jest.spyOn(fs, 'access').mockResolvedValueOnce()
    const result = fileExists('path/to/file')
    
    expect(result).toBeInstanceOf(Promise)
    
    accessMock.mockRestore()
  })

  it('should check if file with provided extensions exists', async () => {
    const accessMock = jest.spyOn(fs, 'access').mockResolvedValueOnce()

    await fileExists('path/to/file', ['js', 'json'])

    expect(accessMock).toHaveBeenCalledTimes(2)
    expect(accessMock).toHaveBeenCalledWith('path/to/file.js')
    expect(accessMock).toHaveBeenCalledWith('path/to/file.json')

    accessMock.mockRestore()
  })

  it('should check if file without provided extensions exists', async () => {
    const accessMock = jest.spyOn(fs, 'access').mockResolvedValueOnce()

    await fileExists('path/to/file')

    expect(accessMock).toHaveBeenCalledTimes(1)
    expect(accessMock).toHaveBeenCalledWith('path/to/file')

    accessMock.mockRestore()
  })
})


describe('fileExistsSync', () => {
  test('fileExistsSync should return true when file exists without extension', () => {
    fs.accessSync = jest.fn()

    const file = '/path/to/file'

    expect(fileExistsSync(file)).toBe(true)
    expect(fs.accessSync).toHaveBeenCalledWith(file)
  })

  test('fileExistsSync should return false when file does not exist without extension', () => {
    fs.accessSync = jest.fn(() => {
      throw new Error('File does not exist')
    })

    const file = '/path/to/nonExistingFile'

    expect(fileExistsSync(file, [])).toBe(false)
    expect(fs.accessSync).toHaveBeenCalledWith(file)
  })

  test('fileExistsSync should return true when file with matching extension exists', () => {
    const file = '/path/to/file'
    const ext = ['js']

    // Mocking the fs.accessSync function
    fs.accessSync = jest.fn(() => {})

    const result = fileExistsSync(file, ext)

    expect(result).toBe(true)
    expect(fs.accessSync).toHaveBeenCalledWith(file + '.js')
  })

  test('fileExistsSync should return false when no file with matching extension exists', () => {
    const file = '/path/to/nonExistingFile'
    const ext = ['js']

    // Mocking the fs.accessSync function
    fs.accessSync = jest.fn(() => {
      throw new Error('File does not exist')
    })

    const result = fileExistsSync(file, ext)

    expect(result).toBe(false)
    expect(fs.accessSync).toHaveBeenCalledTimes(1)
    expect(fs.accessSync).toHaveBeenCalledWith(file + '.js')
  })

  test('fileExistsSync should return true when file with one of the matching extensions exists', () => {
    const file = '/path/to/file'
    const ext = ['js', 'json']

    // Mocking the fs.accessSync function
    fs.accessSync = jest
      .fn()
      .mockImplementationOnce(() => {
        throw new Error('File does not exist')
      })
      .mockImplementationOnce(() => {})

    const result = fileExistsSync(file, ext)

    expect(result).toBe(true)
    expect(fs.accessSync).toHaveBeenCalledTimes(2)
    expect(fs.accessSync).toHaveBeenCalledWith(file + '.js')
    expect(fs.accessSync).toHaveBeenCalledWith(file + '.json')
  })

  test('fileExistsSync should return false when no file with any of the matching extensions exists', () => {
    const file = '/path/to/nonExistingFile'
    const ext = ['js', 'json']

    // Mocking the fs.accessSync function
    fs.accessSync = jest.fn(() => {
      throw new Error('File does not exist')
    })

    const result = fileExistsSync(file, ext)

    expect(result).toBe(false)
    expect(fs.accessSync).toHaveBeenCalledTimes(2)
    expect(fs.accessSync).toHaveBeenCalledWith(file + '.js')
    expect(fs.accessSync).toHaveBeenCalledWith(file + '.json')
  })
})