const {
  createSrcOptions,
  getCommonPath,
  getBasePath,
  plumber,
  putProcesses,
  outputFiles,
  transformHash,
  readManifest
} = require('../build/comm')

jest.mock('gulp', () => ({
  src: jest.fn(),
  dest: jest.fn(),
  lastRun: jest.fn(),
  series: jest.fn(),
  parallel: jest.fn(),
  watch: jest.fn(),
  task: jest.fn(),
}))

jest.mock('@pipflow/utils', () => ({
  isPlainObject: arg => Object.prototype.toString.call(arg) === '[object Object]',
  readJsonFilesSync: jest.fn().mockReturnValueOnce({ '1.js': 'abc.js' })
}))

jest.mock('gulp-plumber')

describe('createSrcOptions', () => {
  it('should create default options', () => {
    expect(createSrcOptions()).toEqual({})
  })

  it('should add task function', () => {
    expect(createSrcOptions(null, () => null)).toHaveProperty('since')
  })

  it('should add base', () => {
    expect(createSrcOptions('src')).toHaveProperty('base')
  })
})

describe('getCommonPath', () => {
  it('should handle empty inputs', () => {
    expect(getCommonPath([], './src')).toBe('')
    expect(getCommonPath(['file.js'], undefined)).toBe('')
  })

  it('should get common path', () => {
    const files = ['path/to/file1', 'path/to/nested/file2', 'path/to/base/file3']
    expect(getCommonPath(files, 'path')).toBe('to')
    expect(getCommonPath(files, './src')).toBe('')
  })

  it('should return an empty string if no common path is found', () => {
    const files = ['path/to/file1', 'another/path/to/file2', 'yet/another/path/to/file3']
    expect(getCommonPath(files, 'path')).toBe('')
  })
})

describe('getBasePath', () => {
  it('should get empty if no files', () => {
    expect(getBasePath({})).toBe('')
    expect(getBasePath([])).toBe('')
    expect(getBasePath('')).toBe('')
  })

  it('should get base path for an array of files', () => {
    const files = ['src/text/file1.txt', 'src/text/file/2.txt', 'src/text/file/3.txt']
    expect(getBasePath(files, 'src')).toBe('text')
  })

  it('should get base path from an object of files', () => {
    const files = {
      key1: ['path/to/file1', 'path/to/file2'],
      key2: ['path/to/file3', 'path/to/file4']
    }
    expect(getBasePath(files, 'path')).toBe('to')
  })

  it('should get base path from a single file', () => {
    const files = 'path/to/file1'
    expect(getBasePath(files, 'path/to')).toBe('file1')
    expect(getBasePath(files, '')).toBe('')
  })

  it('should get an empty string if no common base path is found', () => {
    const files = ['path/to/file1', 'another/path/to/file2', 'yet/another/path/to/file3']
    expect(getBasePath(files, 'path')).toBe('')
  })
})

describe('plumber', () => {
  it('should provide handler and stop methods', () => {
    const { handler, stop } = plumber
    expect(handler).toBeDefined()
    expect(stop).toBeDefined()
  })

  it('should return the correct gulpPlumber configuration', () => {
    const errorHandler = jest.fn()
    jest.mocked(require('gulp-plumber')).mockImplementationOnce(() => {
      return { errorHandler }
    })

    const result = plumber.handler()
    expect(result).toEqual({
      errorHandler: errorHandler
    })
  })

  it('should call gulpPlumber.stop()', () => {
    jest.mocked(require('gulp-plumber')).mockImplementationOnce(() => {
      return { stop: jest.fn() }
    })
    plumber.stop()
    expect(require('gulp-plumber').stop).toHaveBeenCalled()
  })
})

describe('putProcesses', () => {
  it('should add plugins to the processes array if plugins array is not empty', () => {
    const processes = ['process1', 'process2']
    const plugins = ['plugin1', 'plugin2']
    const result = putProcesses(processes, plugins)

    expect(result).toEqual(['process1', 'process2', 'plugin1', 'plugin2'])
  })

  it('should return the processes array unchanged if plugins array is empty', () => {
    const processes = ['process1', 'process2']
    const plugins = []

    const result = putProcesses(processes, plugins)

    expect(result).toEqual(['process1', 'process2'])
  })

  it('should return the processes array unchanged if plugins is not an array', () => {
    const processes = ['process1', 'process2']
    const plugins = 'not an array'

    const result = putProcesses(processes, plugins)

    expect(result).toEqual(['process1', 'process2'])
  })
})

describe('outputFiles', () => {
  let processes

  beforeEach(() => {
    processes = []
  })

  it('should handle process array', () => {
    const processes = []
    outputFiles(processes, {})
    expect(processes.length).toBe(1)
    expect(processes).toEqual([undefined])
  })

  it('should has sourcemap or not', () => {
    const options = {
      name: 'taskName',
      fileHash: true,
      dest: '/output',
      filter: '*.js',
      sourcemap: true
    }

    outputFiles(processes, options)
    expect(processes.length).toBe(8)

    options.sourcemap = false
    processes = []
    outputFiles(processes, options)
    expect(processes.length).toBe(7)
  })

  it('should has filter or not', () => {
    const options = {
      name: 'taskName',
      fileHash: true,
      dest: '/output',
      filter: '*.js',
      sourcemap: true
    }

    outputFiles(processes, options)
    expect(processes.length).toBe(8)

    options.filter = null
    processes = []
    outputFiles(processes, options)
    expect(processes.length).toBe(6)
  })

  it('should without fileHash or fileHash is "?" or "-"', () => {
    const options = {
      name: 'taskName',
      fileHash: false,
      dest: '/output',
      filter: '*.js',
      sourcemap: true
    }

    outputFiles(processes, options)
    expect(processes.length).toBe(2)

    options.fileHash = '?'
    processes = []
    outputFiles(processes, options)
    expect(processes.length).toBe(8)

    options.fileHash = '-'
    processes = []
    outputFiles(processes, options)
    expect(processes.length).toBe(8)
  })
})

describe('transformHash', () => {
  it('should transform hash correctly', () => {
    const json = {
      file1: '/path/to/file1-abc123.jpg',
      file2: '/path/to/file2-def456.jpg',
      file3: '/path/to/file3-ghi789.jpg'
    }

    const expected = {
      file1: 'file1?abc123',
      file2: 'file2?def456',
      file3: 'file3?ghi789'
    }

    expect(transformHash(json)).toEqual(expected)
  })

  it('should handle empty input JSON', () => {
    const json = {}
    const expected = {}
    expect(transformHash(json)).toEqual(expected)
  })

  it('should handle input with missing hash', () => {
    const json = {
      file1: '/path/to/file1.jpg',
      file2: '/path/to/file2.jpg',
      file3: '/path/to/file3.jpg'
    }

    const expected = {
      file1: 'file1?',
      file2: 'file2?',
      file3: 'file3?'
    }

    expect(transformHash(json)).toEqual(expected)
  })
})

describe('readManifest', () => {
  it('should return null when options.fileHash is false', () => {
    const options = {
      dest: 'path/to/dest',
      fileHash: false
    }
    const result = readManifest(options)
    expect(result).toBeNull()
  })

  it('should return a stringified JSON when options.fileHash is true', () => {
    const options = {
      dest: 'path/to/dest',
      fileHash: true
    }
    const result = readManifest(options)
    expect(result).toEqual('{"1.js":"abc.js"}')
  })
})
