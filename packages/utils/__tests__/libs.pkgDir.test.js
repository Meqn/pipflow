const findup = require('find-up')
const {
  pkgDir,
  pkgDirSync
} = require('../libs/pkgDir')

jest.mock('find-up')

describe('pkgDir', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  it('should return the directory path of package.json', async () => {
    const cwd = '/path/to/some'
    findup.mockResolvedValueOnce(cwd + '/package.json')
    const result = await pkgDir(cwd)
    expect(result).toBe(cwd)
  })

  it('should return null if package.json is not found', async () => {
    const cwd = '/path/to/some'
    findup.mockResolvedValueOnce()
    const result = await pkgDir(cwd)
    expect(result).toBeUndefined()
  })
})

describe('pkgDirSync', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  it('should return the directory path of package.json', () => {
    const cwd = '/path/to/some'
    findup.sync.mockReturnValueOnce(cwd + '/package.json')
    const result = pkgDirSync(cwd)
    expect(result).toBe(cwd)
  })

  it('should return null if package.json is not found', () => {
    const cwd = '/path/to/some'
    findup.sync.mockReturnValueOnce()
    const result = pkgDirSync(cwd)
    expect(result).toBeUndefined()
  })
})
