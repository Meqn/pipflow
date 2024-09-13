const {
  isObject,
  isPlainObject,
  deepMerge
} = require('../libs/utils')

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject(Object(0))).toBe(true)
    expect(isObject(Object(true))).toBe(true)
  })

  it('should return false for null', () => {
    expect(isObject(null)).toBe(false)
  })

  it('should return false for non-objects', () => {
    expect(isObject('string')).toBe(false)
    expect(isObject(123)).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })
})

describe('isPlainObject', () => {
  it('should return true for plain objects', () => {
    expect(isPlainObject({})).toBe(true)
  })

  it('should return false for non-plain objects', () => {
    expect(isPlainObject([])).toBe(false)
    expect(isObject(Object(0))).toBe(true)
    expect(isPlainObject(/\w/i)).toBe(false)
    expect(isPlainObject(new Date())).toBe(false)
  })
})

describe('deepMerge', () => {
  let target
  let source1, source2
  beforeEach(() => {
    target = {
      a: {
        b: 1,
      },
      d: 3,
    }
    source1 = {
      a: {
        b: 2,
      },
    }
    source2 = {
      a: {
        b: 2,
        c: 3
      },
      d: 4
    }
  })
  it('should merge two objects with objects', () => {
    const expectedResult = {
      a: {
        b: 2
      },
      d: 3
    }

    expect(deepMerge(target, source1)).toEqual(expectedResult)
  })

  it('should merge multiple objects with nested objects', () => {
    const expectedResult = {
      a: {
        b: 2,
        c: 3
      },
      d: 4
    }

    expect(deepMerge(target, source1, source2)).toEqual(expectedResult)
  })

  it('should return the target object if no source objects are provided', () => {
    const target = {
      a: 1,
      b: 2,
    }

    expect(deepMerge(target)).toBe(target)
  })

  it('should return a non-objects when target is not a object', () => {
    expect(deepMerge(null, source1)).toBeNull()
    expect(deepMerge(undefined, source1, source2)).toBeUndefined()
    expect(deepMerge(0, source1, source2)).toBe(0)
    expect(deepMerge(true, source1, source2)).toBe(true)
    expect(deepMerge(/\w/i, source1, source2)).toBeInstanceOf(RegExp)
  })

  it('merge an object with an array property', () => {
    const target = { a: [1, 2, 3] }
    const source = { a: [5, 6] }
    expect(deepMerge(target, source)).toEqual({ a: [5, 6, 3] })
  })
})
