const { findCommonPath } = require('../libs/findCommonPath')

describe('findCommonPath', () => {
  it('should return common path', () => {
    const result1 = findCommonPath(['/path/to/some/file', '/path/to/another/file']);
    const result2 = findCommonPath(['./path/to/some/file', './path/to/another/file']);
    expect(result1).toBe('path/to')
    expect(result2).toBe('path/to')
  })

  it('should return empty string when no common path is found', () => {
    const result = findCommonPath(['./path1/to/file', './path2/to/another/other/file']);
    expect(result).toBe('')
  })

  it('should return empty string when input is not an array', () => {
    expect(findCommonPath('path/to/file')).toBe('')
    expect(findCommonPath()).toBe('')
  })

  it('should return empty string when input is an empty array', () => {
    const result = findCommonPath([]);
    expect(result).toBe('')
  })
  
  /* it('should handle different path separators correctly', () => {
    const paths = [
      'C:\\Users\\user\\documents\\file1.txt',
      'C:/Users/user/documents/file2.txt',
      'C:\\Users/user\\documents/file3.txt'
    ]
    const result = findCommonPath(paths)
    expect(result).toBe('C:\\Users\\user\\documents')
  }) */
})
