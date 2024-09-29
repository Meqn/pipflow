const { src, dest } = require('gulp')
const stream = require('stream')
const File = require('vinyl')
const istextorbinary = require('istextorbinary')
const renew = require('../index')

// 模拟整个 Gulp 模块，而不是直接调用它的属性方法，因为在测试环境中没有实际的文件系统。
jest.mock('gulp')
jest.mock('istextorbinary')

describe('renew', () => {
  let fakeFile

  beforeEach(() => {
    // 创建虚拟文件(模拟一个 Vinyl 文件对象)
    fakeFile = new File({
      contents: Buffer.from('Hello, world!'),
      path: 'test.txt',
    })

    // 重置模拟的模块
    jest.resetModules()
    istextorbinary.isText.mockReturnValue(true)
  })

  test('should throw error for invalid replacements', () => {
    expect(() => renew('invalid')).toThrow(TypeError)
  })

  test('should return a Transform stream', () => {
    const result = renew([])
    expect(result).toBeInstanceOf(stream.Transform)
  })

  test('should handle null files', (done) => {
    const nullFile = new File()
    const result = renew([])

    result.on('data', (file) => {
      expect(file.isNull()).toBe(true)
      done()
    })

    result.write(nullFile)
    result.end()
  })

  test('should replace content in buffer mode', (done) => {
    const result = renew([{ search: 'world', replacement: 'Node.js' }])

    result.on('data', (file) => {
      expect(file.contents.toString()).toBe('Hello, Node.js!')
      done()
    })

    result.write(fakeFile)
    result.end()
  })

  test('should handle multiple replacements', (done) => {
    const replacements = [
      { search: 'Hello', replacement: 'Hi' },
      { search: 'world', replacement: 'Node.js' },
    ]
    const result = renew(replacements)

    result.on('data', (file) => {
      expect(file.contents.toString()).toBe('Hi, Node.js!')
      done()
    })

    result.write(fakeFile)
  })

  test('should handle regex replacements', (done) => {
    const replacements = [{ search: /o/g, replacement: '0' }]
    const result = renew(replacements)

    result.on('data', (file) => {
      expect(file.contents.toString()).toBe('Hell0, w0rld!')
      done()
    })

    result.write(fakeFile)
  })

  test('should handle function replacements', (done) => {
    const replacements = [
      {
        search: 'world',
        replacement: () => 'function',
      },
    ]
    const result = renew(replacements)

    result.on('data', (file) => {
      expect(file.contents.toString()).toBe('Hello, function!')
      done()
    })

    result.write(fakeFile)
  })

  test('should handle object-style replacements', (done) => {
    const replacements = { Hello: 'Hi', world: 'Jest' }
    const result = renew(replacements)

    result.on('data', (file) => {
      expect(file.contents.toString()).toBe('Hi, Jest!')
      done()
    })

    result.write(fakeFile)
  })

  test('should handle array-style replacements', (done) => {
    const replacements = [
      ['Hello', 'Hi'],
      ['world', 'Jest'],
    ]
    const result = renew(replacements)

    result.on('data', (file) => {
      expect(file.contents.toString()).toBe('Hi, Jest!')
      done()
    })

    result.write(fakeFile)
  })

  test('should skip binary files when skipBinary is true', (done) => {
    const replacements = [{ search: 'world', replacement: 'Jest' }]
    const result = renew(replacements, { skipBinary: true })

    istextorbinary.isText.mockReturnValue(false)

    result.on('data', (file) => {
      expect(file.contents.toString()).toBe('Hello, world!')
      done()
    })

    result.write(fakeFile)
  })

  test('should work with gulp src and dest', (done) => {
    // 模拟 src() 方法，使其返回一个可读流
    src.mockImplementation(() => {
      const readable = new stream.Readable({ objectMode: true })
      readable._read = () => {}
      readable.push(fakeFile)
      readable.push(null)
      return readable
    })

    const writtenFiles = []
    // 模拟 dest() 方法，使其返回一个可写流
    dest.mockImplementation(() => {
      return new stream.Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
          writtenFiles.push(chunk)
          callback()
        },
      })
    })

    src('test.txt')
      .pipe(renew([{ search: 'world', replacement: 'Node.js' }]))
      .pipe(dest('output'))
      .on('finish', () => {
        expect(writtenFiles.length).toBe(1)
        expect(writtenFiles[0].contents.toString()).toBe('Hello, Node.js!')
        done()
      })
  })
})
