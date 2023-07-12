/**
 * 输出日志
 * @param  {...any} args 
 */
export function log(...args) {
  console.log(...args)
}

/**
 * 求和函数
 * @param  {...any} args 
 * @returns 
 */
export function add(...args) {
  return args.reduce((a, b) => a + b, 0)
}
