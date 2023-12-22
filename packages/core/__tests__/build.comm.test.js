const {
  createSrcOptions,
  getCommonPath,
  getBasePath,
  plumber,
  putProcesses,
  outputFiles,
} = require('../build/comm')

jest.mock('@pipflow/utils', () => ({
  gulp: {
    lastRun: jest.fn(),
    dest: jest.fn()
  },
  _: {
    isPlainObject: arg => Object.prototype.toString.call(arg) === '[object Object]'
  }
}))

jest.mock('gulp-plumber', () => {
  return {
    default: jest.fn().mockImplementation((fn) => {
      return fn
    }),
    stop: jest.fn()
  }
})

describe('createSrcOptions', () => {
  it('should create default options', () => {
    expect(createSrcOptions({})).toEqual({});
  });

  it('should add name', () => {
    expect(createSrcOptions({ name: 'taskName' })).toHaveProperty('since');
  });

  it('should add base', () => {
    expect(createSrcOptions({ base: 'src' })).toHaveProperty('base');
  });
});

describe('getCommonPath', () => {
  it('should handle empty inputs', () => {
    expect(getCommonPath([], './src')).toBe('');
    expect(getCommonPath(['file.js'], undefined)).toBe('');
  });

  it('should get common path', () => {
    const files = ['path/to/file1', 'path/to/nested/file2', 'path/to/base/file3'];
    expect(getCommonPath(files, 'path')).toBe('to');
    expect(getCommonPath(files, './src')).toBe('');
  });

  it('should return an empty string if no common path is found', () => {
    const files = ['path/to/file1', 'another/path/to/file2', 'yet/another/path/to/file3'];
    expect(getCommonPath(files, 'path')).toBe('');
  });
});

describe('getBasePath', () => {
  it('should get empty if no files', () => {
    expect(getBasePath({})).toBe('');
    expect(getBasePath([])).toBe('');
    expect(getBasePath('')).toBe('');
  });

  test('should get base path for an array of files', () => {
    const files = ['src/text/file1.txt', 'src/text/file/2.txt', 'src/text/file/3.txt'];
    expect(getBasePath(files, 'src')).toBe('text');
  })

  it('should get base path from an object of files', () => {
    const files = {
      key1: ['path/to/file1', 'path/to/file2'],
      key2: ['path/to/file3', 'path/to/file4']
    };
    expect(getBasePath(files, 'path')).toBe('to');
  });
  
  it('should get base path from a single file', () => {
    const files = 'path/to/file1';
    expect(getBasePath(files, 'path/to')).toBe('file1');
    expect(getBasePath(files, '')).toBe('');
  });

  it('should get an empty string if no common base path is found', () => {
    const files = ['path/to/file1', 'another/path/to/file2', 'yet/another/path/to/file3'];
    expect(getBasePath(files, 'path')).toBe('');
  });

});

describe('plumber', () => {
  it('should provide handler and stop methods', () => {
    const { handler, stop } = plumber;
    expect(handler).toBeDefined();
    expect(stop).toBeDefined();
  });
});

describe('putProcesses', () => {
  it('should add plugins to the processes array if plugins array is not empty', () => {
    const processes = ['process1', 'process2'];
    const plugins = ['plugin1', 'plugin2'];
    const result = putProcesses(processes, plugins);

    expect(result).toEqual(['process1', 'process2', 'plugin1', 'plugin2']);
  });

  it('should return the processes array unchanged if plugins array is empty', () => {
    const processes = ['process1', 'process2'];
    const plugins = [];

    const result = putProcesses(processes, plugins);

    expect(result).toEqual(['process1', 'process2']);
  });

  it('should return the processes array unchanged if plugins is not an array', () => {
    const processes = ['process1', 'process2'];
    const plugins = 'not an array';

    const result = putProcesses(processes, plugins);

    expect(result).toEqual(['process1', 'process2']);
  });
});

describe('outputFiles', () => {
  let processes;

  beforeEach(() => {
    processes = [];
  });

  it('should handle process array', () => {
    const processes = [];
    outputFiles(processes, {});
    expect(processes.length).toBe(1)
    expect(processes).toEqual([undefined]);
  });

  test('should has sourcemap or not', () => {
    const options = {
      name: 'taskName',
      fileHash: true,
      dest: '/output',
      filter: '*.js',
      sourcemap: true
    };
    
    outputFiles(processes, options)
    expect(processes.length).toBe(7)

    options.sourcemap = false
    processes = []
    outputFiles(processes, options)
    expect(processes.length).toBe(6)
  });

  test('should has filter or not', () => {
    const options = {
      name: 'taskName',
      fileHash: true,
      dest: '/output',
      filter: '*.js',
      sourcemap: true
    };

    outputFiles(processes, options)
    expect(processes.length).toBe(7)

    options.filter = null
    processes = []
    outputFiles(processes, options)
    expect(processes.length).toBe(5)
  })

  test('should without fileHash or fileHash is "?" or "-"', () => {
    const options = {
      name: 'taskName',
      fileHash: false,
      dest: '/output',
      filter: '*.js',
      sourcemap: true
    };

    outputFiles(processes, options)
    expect(processes.length).toBe(2)

    options.fileHash = '?'
    processes = []
    outputFiles(processes, options)
    expect(processes.length).toBe(8)

    options.fileHash = '-'
    processes = []
    outputFiles(processes, options)
    expect(processes.length).toBe(7)
  })
});
