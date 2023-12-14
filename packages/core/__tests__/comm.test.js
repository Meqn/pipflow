const {
  createSrcOptions,
  outputFiles,
  getBasePath,
  putProcesses
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


describe('createSrcOptions', () => {
  test('should return an object with "since" property if "name" is provided', () => {
    const result = createSrcOptions({ name: 'taskName' });
    expect(result).toHaveProperty('since');
  });

  test('should not have "since" property if "name" is not provided', () => {
    const result = createSrcOptions({});
    expect(result).not.toHaveProperty('since');
  });

  test('should have "base" property if "base" is provided', () => {
    const result = createSrcOptions({ base: 'basePath' });
    expect(result).toHaveProperty('base');
  });

  test('should not have "base" property if "base" is not provided', () => {
    const result = createSrcOptions({});
    expect(result).not.toHaveProperty('base');
  });
});


describe('getBasePath', () => {
  test('should return the common base path for an array of files', () => {
    const files = ['src/text/file1.txt', 'src/text/file2.txt', 'src/text/file3.txt'];
    const base = 'src';

    expect(getBasePath(files, base)).toBe('text');
  })

  test('should return the common base path for an object of files', () => {
    const files = {
      dir1: ['src/text/file1.txt', 'src/text/file2.txt'],
      dir2: ['src/text/file3.txt']
    };
    const base = 'src';

    expect(getBasePath(files, base)).toBe('text');
  });

  test('should return the common base path for a single file', () => {
    const files = 'src/file.txt';
    const base = '';

    expect(getBasePath(files, base)).toBe('');
  });

  test('should return an empty string if no common base path is found', () => {
    const files = ['src/file1.txt', 'src/file2.txt'];
    const base = 'src';

    expect(getBasePath(files, base)).toBe('');
  });

  test('should handle an empty input and return an empty string', () => {
    const files = [];
    const base = 'dir';

    expect(getBasePath(files, base)).toBe('');
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
