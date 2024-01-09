const {
  stringifyJS,
  makeJSOnlyValue
} = require('../libs/stringifyJS')

describe('stringifyJS', () => {
  it('should return the stringified value for normal objects', () => {
    const obj = { name: 'John', age: 30 }
    const result = stringifyJS(obj)
    expect(result).toEqual(`{\n  name: 'John',\n  age: 30\n}`)
  })

  it('should return the expression value for objects with __expression property', () => {
    const obj = { __expression: '1 + 1' }
    const result = stringifyJS(obj)
    expect(result).toEqual('1 + 1')
  })

  it('should return the stringified value for arrays', () => {
    const arr = [1, 2, 3]
    const result = stringifyJS(arr)
    expect(result).toEqual('[\n  1,\n  2,\n  3\n]')
  })

  it('should return the stringified value for null or undefined', () => {
    expect(stringifyJS(null)).toEqual('null')
    expect(stringifyJS(undefined)).toEqual('undefined')
  })
})

describe('makeJSOnlyValue', () => {
  it('should return a function', () => {
    const fn = makeJSOnlyValue('1 + 1')
    expect(fn).toBeInstanceOf(Function)
    expect(fn.__expression).toBe('1 + 1')
    expect(fn()).toBe()
  })

  it('should return a function with special characters', () => {
    expect(makeJSOnlyValue('!@#$%^&*()').__expression).toBe('!@#$%^&*()')
  })
})