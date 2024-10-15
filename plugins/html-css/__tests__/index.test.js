const gulpHtmlCss = require('../index')

// Mock dependencies
/* jest.mock('postcss', () => {
  return jest.fn().mockImplementation(() => ({
    process: jest.fn().mockImplementation((css) => Promise.resolve({ css })),
  }))
}) */

/* jest.mock('sass', () => ({
  compileStringAsync: jest.fn().mockImplementation((input) => Promise.resolve({ css: input })),
})) */

const mockPostcssPlugin = () => ({
  postcssPlugin: 'mock-plugin',
  Once(root) {
    root.walkDecls((decl) => {
      if (decl.prop === 'color') {
        decl.value = 'blue'
      }
    })
  },
})

describe('gulp-html-css', () => {
  let file

  beforeEach(() => {
    file = {
      isNull: () => false,
      isStream: () => false,
      isBuffer: () => true,
      contents: Buffer.from('<html><style>body { color: red; }</style></html>'),
      path: 'test.html',
    }
  })

  test('should process CSS in style tags', (done) => {
    const stream = gulpHtmlCss([mockPostcssPlugin()])

    stream.on('data', (processedFile) => {
      expect(processedFile.contents.toString()).toBe(
        '<html><style>body { color: blue; }</style></html>'
      )
      done()
    })

    stream.write(file)
    stream.end()
  })

  test('should process inline styles', (done) => {
    file.contents = Buffer.from('<html><div style="color: pink;">Test</div></html>')
    const stream = gulpHtmlCss([mockPostcssPlugin()])

    stream.on('data', (processedFile) => {
      expect(processedFile.contents.toString()).toBe(
        '<html><div style="color: blue;">Test</div></html>'
      )
      done()
    })

    stream.write(file)
    stream.end()
  })

  test('should handle Sass preprocessing', (done) => {
    file.contents = Buffer.from(
      '<html><style lang="sass">$color: red;\nbody { color: $color; }</style></html>'
    )
    const stream = gulpHtmlCss([mockPostcssPlugin()], {
      compiler: require('sass'),
      compilerOptions: { style: 'compressed' },
    })

    stream.on('data', (processedFile) => {
      expect(processedFile.contents.toString()).toBe(
        '<html><style lang="sass">body{color:blue}</style></html>'
      )
      done()
    })

    stream.write(file)
    stream.end()
  })

  test('should apply PostCSS plugins', (done) => {
    const stream = gulpHtmlCss([mockPostcssPlugin()])

    stream.on('data', (processedFile) => {
      expect(processedFile.contents.toString()).toBe(
        '<html><style>body { color: blue; }</style></html>'
      )
      done()
    })

    stream.write(file)
    stream.end()
  })

  test('should handle null files', (done) => {
    file.isNull = () => true
    const stream = gulpHtmlCss()

    stream.on('data', (processedFile) => {
      expect(processedFile).toBe(file)
      done()
    })

    stream.write(file)
    stream.end()
  })

  test('should error on streams', (done) => {
    file.isStream = () => true
    const stream = gulpHtmlCss()

    stream.on('error', (err) => {
      expect(err.message).toContain('Streaming not supported')
      done()
    })

    stream.write(file)
    stream.end()
  })
})
