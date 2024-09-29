const File = require('vinyl')
const path = require('path')
const concat = require('gulp-concat')

describe('gulp-concat', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should concatenate multiple files into one', (done) => {
    const file1 = new File({
      path: '/test/file1.js',
      base: '/test/',
      contents: Buffer.from('test1 content'),
    })
    const file2 = new File({
      path: '/test/file2.js',
      base: '/test/',
      contents: Buffer.from(',test2 content'),
    })

    const stream = concat('combined.js')

    stream.on('data', (file) => {
      expect(file.relative).toBe('combined.js')
      expect(file.path).toBe('/test/combined.js')
      expect(file.contents.toString()).toBe('test1 content\n,test2 content')
      done()
    })

    stream.write(file1)
    stream.write(file2)
    stream.end()
  })

  test('should handle empty input streams', (done) => {
    const fakeFile = new File({
      path: '/test/file.js',
      base: '/test/',
      contents: Buffer.from(''),
    })
    const stream = concat('empty.js')

    stream.on('data', (file) => {
      expect(file.relative).toBe('empty.js')
      expect(file.path).toBe('/test/empty.js')
      expect(file.contents.toString()).toBe('')
      done()
    })

    stream.write(fakeFile)
    stream.end()
  })

  test('should handle large files without memory issues', (done) => {
    const largeContent = 'a'.repeat(10 * 1024 * 1024) // 10MB 的内容
    const largeFile = new File({
      contents: Buffer.from(largeContent),
      path: '/path/to/large.js',
    })

    const stream = concat('large.js')

    stream.on('data', (file) => {
      expect(file.contents.toString()).toBe(largeContent)
      expect(file.path).toEqual(path.join(process.cwd(), 'large.js'))
      done()
    })

    stream.write(largeFile)
    stream.end()
  })
})
