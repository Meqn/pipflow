const { globFiles, getCliServeArgs, getInputList } = require('../libs/utils')

describe('globFiles', () => {
  test('should return filePath if it ends with */ or **', () => {
    expect(globFiles('/path/to/files/*')).toBe('/path/to/files/*')
    expect(globFiles('/path/to/files/**')).toBe('/path/to/files/**')
  })

  test('should return the joined filePath and ** or * based on recurs option', () => {
    expect(globFiles('/path/to/files', true)).toBe('/path/to/files/**')
    expect(globFiles('/path/to/files', false)).toBe('/path/to/files/*')
  })

  test('should return empty string if filePath is falsy', () => {
    expect(globFiles('')).toBe('')
    expect(globFiles(null)).toBe('')
    expect(globFiles(undefined)).toBe('')
  })
})

describe('getCliServeArgs', () => {
  test('should return an empty object when no options are provided', () => {
    const result = getCliServeArgs({})
    expect(result).toEqual({})
  })

  test('should return serve configuration object with provided options', () => {
    const options = {
      port: 3000,
      open: true,
      cors: true,
      dir: '/path/to/dir',
      https: true,
      host: 'localhost',
      index: 'index.html'
    }

    expect(getCliServeArgs(options)).toEqual({
      port: 3000,
      open: true,
      cors: true,
      https: true,
      host: 'localhost',
      server: {
        baseDir: '/path/to/dir',
        index: 'index.html'
      }
    })
  })

  test('should return serve configuration object with only valid options', () => {
    const options = {
      p: 3000,
      open: false,
      cors: false,
      dir: '/path/to/dir',
      invalidOption: 'value'
    }

    expect(getCliServeArgs(options)).toEqual({
      port: 3000,
      open: false,
      server: {
        baseDir: '/path/to/dir'
      }
    })
  })
})

describe('getInputList', () => {
  test('should return an array with a single string input', () => {
    expect(getInputList('/path/to/file')).toEqual(['/path/to/file'])
  })

  test('should return the same array if input is already an array', () => {
    const input = ['/path/to/file1', '/path/to/file2']
    expect(getInputList(input)).toEqual(input)
  })

  test('should return a flattened array if input is an object', () => {
    const input = {
      key1: ['/path/to/file1', '/path/to/file2'],
      key2: ['/path/to/file3']
    }
    expect(getInputList(input)).toEqual(['/path/to/file1', '/path/to/file2', '/path/to/file3'])
  })
})
