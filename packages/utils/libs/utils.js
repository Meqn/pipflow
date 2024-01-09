exports.isObject = function (obj) {
  return obj !== null && typeof obj === 'object'
}

exports.isPlainObject = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

exports.deepMerge = function merge(target, ...sources) {
  const isObject = exports.isObject

  if (isObject(target)) {
    for (const source of sources) {
      if (isObject(source)) {
        Object.keys(source).forEach(key => {
          if (isObject(source[key]) && isObject(target[key])) {
            // 递归合并对象
            target[key] = merge(target[key], source[key])
          } else {
            // 直接复制属性
            target[key] = source[key]
          }
        })
      }
    }
  }
  return target
}
