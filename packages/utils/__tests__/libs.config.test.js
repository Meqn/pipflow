const path = require('path')
const importFresh = require('import-fresh')

// Mock the dependencies
jest.mock('path')
jest.mock('import-fresh')

const {
  generateConfig,
  exportedForTesting: { getInput }
} = require('../libs/generateConfig')

const {
  getConfig,
  exportedForTesting: { getUserConfig, getMinify }
} = require('../libs/getConfig')

// libs/generateConfig.js
describe('libs.generateConfig', () => {
  describe('generateConfig', () => {
    test('should generate a valid configuration with default values', () => {
      const result = generateConfig()

      expect(typeof result).toBe('object')
      expect(result.base).toBe('./src')
      expect(result.publicDir).toBe('public')
      expect(result.build).toBeDefined()
      expect(result.tasks).toBeDefined()
      expect(result.tasks.length).toBe(4)
    })

    test('should merge the preset values into the generated configuration object', () => {
      const preset = {
        babel: true,
        cssPreprocessor: 'sass',
        templater: 'artTemplate',
        imagemin: true
      }
      const result = generateConfig(preset)

      expect(typeof result).toBe('object')
      expect(result.build).toBeDefined()
      expect(result.tasks).toBeDefined()
      expect(result.tasks.length).toBe(4)

      expect(result.build.fileHash.__expression).toBe(`process.env.NODE_ENV === 'production'`)
      expect(result.build.sourcemap.__expression).toBe(`process.env.NODE_ENV === 'production'`)
      expect(result.build.minify.__expression).toBe(`process.env.NODE_ENV === 'production'`)
      expect(result.build.imageMinify).toBeUndefined()

      const tasks = result.tasks.reduce((a, b) => ((a[b.type] = b), a), {})
      expect(tasks['html'].compiler).toBe('artTemplate')
      expect(tasks['style'].compiler).toBe('sass')
      expect(tasks['script'].compiler).toBe('babel')
      expect(tasks['static'].compiler).toBeUndefined()
      expect(tasks['image']).toBeUndefined()
    })
  })

  describe('getInput', () => {
    test('should return the correct input pattern for the given type and compiler', () => {
      // html
      expect(getInput('html', 'artTemplate')).toEqual('./src/**/*.{html,htm,art}')
      expect(getInput('html', 'ejs')).toEqual('./src/**/*.{html,htm,ejs}')
      expect(getInput('html', 'pug')).toEqual('./src/**/*.{html,htm,pug}')
      expect(getInput('html', 'nunjucks')).toEqual('./src/**/*.{html,htm,njk}')
      expect(getInput('html', 'handlebars')).toEqual('./src/**/*.{html,htm,hbs}')

      // style
      expect(getInput('style', 'less')).toEqual('./src/styles/**/*.{css,less}')
      expect(getInput('style', 'sass')).toEqual('./src/styles/**/*.{css,sass,scss}')
      expect(getInput('style', 'stylus')).toEqual('./src/styles/**/*.{css,styl}')

      // script
      expect(getInput('script')).toEqual('./src/scripts/**/*.{js,mjs}')

      // static
      expect(getInput('static')).toEqual('./src/assets/**')

      // image
      expect(getInput('image')).toEqual('./src/images/**')
    })
  })
})

// libs/getConfig.js
describe('libs.getConfig', () => {
  describe('getUserConfig', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should return the user config when filePath is a string and fileContent is a function', () => {
      const configFilePath = 'path/to/config.js'
      const resolvedConfigFilePath = 'resolved/path/to/config.js'
      const fileContent = jest.fn(() => ({ name: 'pipflow' }))

      path.resolve.mockReturnValueOnce(resolvedConfigFilePath)
      importFresh.mockReturnValueOnce(fileContent)

      const result = getUserConfig(configFilePath)

      expect(path.resolve).toHaveBeenCalledWith(configFilePath)
      expect(importFresh).toHaveBeenCalledWith(resolvedConfigFilePath)
      expect(fileContent).toHaveBeenCalledWith({ mode: process.env.PIPFLOW_MODE })
      expect(result).toEqual({ name: 'pipflow' })
    })

    test('should return the user config when filePath is a object and fileContent is not a function', () => {
      const configFilePath = {
        cwd: 'path/to',
        path: 'config.js'
      }
      const resolvedConfigFilePath = 'resolved/path/to/config.js'
      const fileContent = { name: 'pipflow' }

      path.resolve.mockReturnValueOnce(resolvedConfigFilePath)
      importFresh.mockReturnValueOnce(fileContent)

      const result = getUserConfig(configFilePath)

      expect(path.resolve).toHaveBeenCalledWith(configFilePath.cwd, configFilePath.path)
      expect(importFresh).toHaveBeenCalledWith(resolvedConfigFilePath)
      expect(result).toEqual(fileContent)
    })

    test('should return the user config when PIPFLOW_CLI_COMMAND is "build"', () => {
      const configFilePath = 'path/to/config.js'
      const resolvedConfigFilePath = 'resolved/path/to/config.js'
      const fileContent = jest.fn(() => ({}))

      path.resolve.mockReturnValueOnce(resolvedConfigFilePath)
      importFresh.mockReturnValueOnce(fileContent)

      process.env.PIPFLOW_CLI_COMMAND = 'build'
      const result = getUserConfig(configFilePath)

      expect(path.resolve).toHaveBeenCalledWith(configFilePath)
      expect(importFresh).toHaveBeenCalledWith(resolvedConfigFilePath)
      expect(fileContent).toHaveBeenCalledWith({ mode: process.env.PIPFLOW_MODE, command: 'build' })
      expect(result).toEqual({})
    })
  })

  describe('getMinify', () => {
    it("should return jsMinify if type is 'script'", () => {
      const options = { jsMinify: true }
      const result = getMinify('script', options)
      expect(result).toBe(true)
    })

    it("should return cssMinify if type is 'style'", () => {
      const options = { cssMinify: true }
      const result = getMinify('style', options)
      expect(result).toBe(true)
    })

    it("should return htmlMinify if type is 'html'", () => {
      const options = { htmlMinify: true }
      const result = getMinify('html', options)
      expect(result).toBe(true)
    })

    it("should return imageMinify if type is 'static' or 'image'", () => {
      const options = { imageMinify: true }
      const result1 = getMinify('static', options)
      const result2 = getMinify('image', options)
      expect(result1).toBe(true)
      expect(result2).toBe(true)
    })

    it("should return minify if type is not 'script', 'style', 'html', 'static', or 'image'", () => {
      const options = { minify: true }
      const result = getMinify('unknown', options)
      expect(result).toBe(true)
    })

    it('should return minify if options are not provided', () => {
      const result = getMinify('script')
      expect(result).toBe(undefined)
    })
  })

  describe('getConfig', () => {
    it('should return default config when no file is provided', () => {
      const result = getConfig()
      
      expect(typeof result).toBe('object')
      expect(result.base).toBe('./src')
      expect(result.build).toBeDefined()
      expect(result.server).toBeDefined()
      expect(result.tasks).toBeDefined()
      expect(result.tasks.length).toBe(4)

      expect(result.build.outDir).toBe('dist/')
      expect(result.build.fileHash).toBeDefined()
      expect(result.build.sourcemap).toBeDefined()
      expect(result.build.minify).toBeDefined()

      const styleTask = result.tasks.filter(t => t.type === 'style')[0]
      expect(styleTask.type).toBe('style')
      expect(styleTask.name).toBeDefined()
      expect(styleTask.input).toBeDefined()
      expect(styleTask.dest).toBeDefined()
      expect(styleTask.base).toBeDefined()
      expect(styleTask.fileHash).toBeDefined()
      expect(styleTask.sourcemap).toBeDefined()
      expect(styleTask.assetsInlineLimit).toBeDefined()
    })

    it('should return user config when file is a string', () => {
      const result = getConfig('path/to/config.js')
      
      expect(result).toHaveProperty('base')
      expect(result).toHaveProperty('publicDir')
      expect(result).toHaveProperty('build')
      expect(result).toHaveProperty('server')
      expect(result).toHaveProperty('tasks')
    })

    it('should return user config when file does not have tasks array', () => {
      const file = {
        cwd: 'path/to',
        path: 'config.js'
      }
      const result = getConfig(file)
      
      expect(result).toHaveProperty('base')
      expect(result).toHaveProperty('publicDir')
      expect(result).toHaveProperty('build')
      expect(result).toHaveProperty('server')
      expect(result).toHaveProperty('tasks')
    })

    it('should return user config when file has tasks array', () => {
      const file = {
        base: './source',
        build: {
          outDir: 'dest',
          fileHash: true,
          sourcemap: false,
          assetsInlineLimit: {
            remote: true
          }
        },
        tasks: [{ type: 'html' }]
      }
      const result = getConfig(file)
      
      expect(result.base).toBe('./source')
      expect(result).toHaveProperty('publicDir')
      expect(result).toHaveProperty('build')
      expect(result).toHaveProperty('server')
      expect(result).toHaveProperty('tasks')
      expect(result.tasks.length).toBe(1)
      expect(result.tasks[0].type).toBe('html')
      expect(result.tasks[0].base).toBe(file.base)
      expect(result.tasks[0].dest).toBe(file.build.outDir)
      expect(result.tasks[0].fileHash).toBe(file.build.fileHash)
      expect(result.tasks[0].sourcemap).toBe(file.build.sourcemap)
      expect(result.tasks[0].assetsInlineLimit).toEqual({
        remote: true,
        limit: 4096
      })
    })
  })
})
