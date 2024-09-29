const { Readable } = require('stream')
const File = require('vinyl')
const rename = require('gulp-rename')

describe('gulp-rename', () => {
  it('should rename a file', (done) => {
    const file = new File({
      path: '/test/file.js',
      base: '/test/',
    })

    const stream = rename('new.js')

    stream.on('data', (file) => {
      expect(file.relative).toBe('new.js')
      done()
    })

    stream.write(file)
    stream.end()
  })

  it('should rename a file using a function', (done) => {
    const file = new File({
      path: '/test/file.js',
      base: '/test/',
    })

    const stream = rename((path) => {
      path.basename += '-changed'
      path.extname = '.css'
    })

    stream.on('data', (file) => {
      expect(file.relative).toBe('file-changed.css')
      done()
    })

    stream.write(file)
    stream.end()
  })

  it('should rename a file using an object', (done) => {
    const file = new File({
      path: '/test/file.js',
      base: '/test/',
    })

    const stream = rename({
      basename: 'new',
      prefix: 'pre-',
      suffix: '-suf',
      extname: '.css',
    })

    stream.on('data', (file) => {
      expect(file.relative).toBe('pre-new-suf.css')
      done()
    })

    stream.write(file)
    stream.end()
  })

  it('should handle streams', (done) => {
    const streamContent = new Readable({
      read() {
        this.push('test content')
        this.push(null)
      },
    })

    const file = new File({
      path: '/test/file.js',
      base: '/test/',
      contents: streamContent,
    })

    const stream = rename('new.js')

    stream.on('data', (file) => {
      expect(file.relative).toBe('new.js')
      expect(file.contents).toBeTruthy()
      expect(typeof file.contents.pipe).toBe('function')

      // 验证流的内容
      let content = ''
      file.contents.on('data', (chunk) => {
        content += chunk
      })
      file.contents.on('end', () => {
        expect(content).toBe('test content')
        done()
      })
    })

    stream.write(file)
    stream.end()
  })
})
