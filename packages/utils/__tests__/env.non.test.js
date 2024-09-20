const { loadEnv, injectEnv, setPublicEnv, getEnv, exportedForTesting } = require('../libs/env')
const { resetEnv, getPublicEnv } = exportedForTesting

describe('loadEnv', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  test('should load environment variables', () => {
    const options = { path: '.env' }
    const result = loadEnv(options)
    expect(result).toBeDefined()
    expect(typeof result).toBe('function')
  })

  test('should reload environment variables', () => {
    const options = { path: '.env' }
    const result = loadEnv(options, true)
    expect(result).toBeDefined()
    expect(typeof result).toBe('function')
  })
})

describe('resetEnv', () => {
  test('should reset environment variables', () => {
    const env = { VAR1: 'value1', VAR2: 'value2' }
    process.env.VAR1 = 'existingValue1'
    process.env.VAR2 = 'existingValue2'
    resetEnv(env)
    expect(process.env.VAR1).toBeUndefined()
    expect(process.env.VAR2).toBeUndefined()
  })
})

describe('injectEnv', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  test('should inject environment variables', () => {
    const options = { hasPublic: true, env: { VAR1: 'value1', VAR2: 'value2' } }
    const result = injectEnv(options)
    expect(typeof result).toBe('object')
  })

  test('should inject environment variables without public variables', () => {
    const options = { hasPublic: false, env: { VAR1: 'value1', VAR2: 'value2' } }
    const result = injectEnv(options)
    expect(typeof result).toBe('object')
  })
  
  test('should call envInject if available', () => {
    // envInject is available
    const options1 = { hasPublic: true, env: Object.assign({ VAR1: "value1" }, getPublicEnv()) }
    const injectMock = jest.fn()
    const originEnvInject = exportedForTesting.mockEnvInject(injectMock)
    injectEnv(options1)
    expect(injectMock).toHaveBeenCalledWith(options1)

    exportedForTesting.mockEnvInject(originEnvInject)
  })
})

describe('setPublicEnv', () => {
  test('should set public environment variables', () => {
    setPublicEnv()
    expect(process.env.MODE).toBeDefined()
    expect(process.env.PROD).toBeDefined()
    expect(process.env.DEV).toBeDefined()
  })
})

describe('getPublicEnv', () => {
  test('should get public environment variables', () => {
    const result = getPublicEnv()
    expect(result).toBeDefined()
    expect(result).toHaveProperty('DEV')
    expect(result).toHaveProperty('PROD')
    expect(result).toHaveProperty('MODE')
    expect(result).toHaveProperty('NODE_ENV')
  })
})

describe('getEnv', () => {
  test('should get environment variables', () => {
    const allEnv = getEnv('all')
    const userEnv = getEnv('env')
    const publicEnv = getEnv('public')

    expect(allEnv).toBeDefined()
    expect(userEnv).toBeDefined()
    expect(publicEnv).toBeDefined()
    expect(allEnv).toHaveProperty('DEV')
    expect(publicEnv).toHaveProperty('DEV')
    expect(allEnv).toMatchObject(userEnv)
    expect(allEnv).toMatchObject(publicEnv)
  })
})
