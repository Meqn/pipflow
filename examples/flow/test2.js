const { getConfig, generateConfig } = require('pipflow')

console.log('__dirname', __dirname)
console.log('process.cwd', process.cwd())

// console.log(getConfig('gwo.config'))
console.log(generateConfig({
  babel: true,
  templater: 'artTemplate',
  cssPreprocessor: 'sass',
}))