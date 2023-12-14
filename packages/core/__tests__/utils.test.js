const stream = require('stream')
const { Readable, Writable } = require('stream');
const logModule = require('@pipflow/utils')
const { pipeline, findUrlFromNpm, onError, onDone } = require('../base/utils')

jest.mock('@pipflow/utils', () => ({
  logger: {
    time: jest.fn().mockImplementation((symbol, message) => `time(${symbol}, ${message})`),
    /* time: jest.fn().mockImplementation((symbol, message) => {
      expect(symbol).toBe('✖')
      expect(message).toBe('red(TestPlugin TestError : TestMessage)')
    }) */
  },
  symbols: { error: '✖' },
  colors: {
    red: jest.fn().mockImplementation((message) => `red(${message})`)
  }
}))

describe('base.utils', () => {

  describe('pipeline', () => {
    test('should return the input stream if no tubes provided', () => {
      const input = new Readable();
      const result = pipeline(input, []);
      expect(result).toBe(input);
    });
  
    test('should return null if input is not a stream', () => {
      const result = pipeline(null, []);
      expect(result).toBe(null);
    });

    it('should pipe streams together', () => {
      const mockStream1 = new stream.PassThrough();
      const mockStream2 = new stream.PassThrough();
      const mockStream3 = new stream.PassThrough();
  
      const spy1 = jest.spyOn(mockStream1, 'pipe');
  
      pipeline(mockStream1, mockStream3);
      expect(spy1).toHaveBeenCalledWith(mockStream3);

      pipeline([mockStream1, mockStream2, mockStream3]);
      expect(spy1).toHaveBeenCalledWith(mockStream3);

      spy1.mockRestore()
    });
  
    test('should pipe the input stream through the provided tubes', () => {
      const input = new stream.PassThrough();
      const tube1 = new stream.PassThrough();
      const tube2 = new stream.PassThrough();

      const result = pipeline(input, [tube1, tube2]);
      expect(result).toBe(tube2);
      
      const result2 = pipeline([input,tube1, tube2]);
      expect(result2).toBe(tube2);
    });
  });

  describe('findUrlFromNpm', () => {
    it('should return a URL for a package in node_modules if the URL starts with ~', () => {
      const url = findUrlFromNpm('~package');
      expect(url.pathname).toContain('node_modules/package');
    });

    it('should return the original URL if it does not start with ~', () => {
      const url = 'http://example.com';
      expect(findUrlFromNpm(url)).toBe(url);
    });
  });

  describe('onError', () => {
    it('should log an error message', () => {
      const error = {
        name: 'TestError',
        plugin: 'TestPlugin',
        message: 'TestMessage',
      };

      onError(error)

      expect(logModule.logger.time).toHaveBeenCalledWith(
        '✖',
        'red(TestPlugin TestError : TestMessage)'
      );
    });
  });

  describe('onDone', () => {
    it('should return the done function if it is a function', () => {
      const done = () => {};
      expect(onDone(done)).toBe(done);
    });

    it('should return an empty function if done is not a function', () => {
      const done = onDone('not a function');
      expect(typeof done).toBe('function');
      expect(done()).toBeUndefined();
    });
  });

})
