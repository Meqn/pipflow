exports.stringifyJS = function stringifyJS (value) {
  const { stringify } = require('javascript-stringify')
  // eslint-disable-next-line no-shadow
  return stringify(value, (val, indent, stringify) => {
    if (val && val.__expression) {
      return val.__expression
    }
    return stringify(val)
  }, 2)
}

// __expression is a special flag that allows us to customize stringification
// output when extracting configs into standalone files
exports.makeJSOnlyValue = function (str) {
  const fn = () => {}
  fn.__expression = str
  return fn
}
