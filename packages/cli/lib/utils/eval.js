/**
 * 执行字符串表达式
 * @param {string} exp 字符串表达式
 * @param {*} data 数据
 * @returns 
 */
function evaluate(exp, data) {
  const fn = new Function('data', 'with (data) { return ' + exp + '; }')
  try {
    return fn(data)
  } catch (e) {
    // return e
    // console.error(chalk.red('Error when evaluating filter condition: ' + exp))
  }
}

module.exports = evaluate
