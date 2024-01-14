function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

exports.isPlainObject = function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

exports.deepMerge = function merge(target, ...sources) {
  if (isObject(target)) {
    for (const source of sources) {
      if (isObject(source)) {
        Object.keys(source).forEach(key => {
          if (isObject(source[key])) {
            // 如果目标对象的相应属性也是对象，则递归合并
            if (isObject(target[key])) {
              target[key] = merge(target[key], source[key])
            } else {
              // 否则直接赋值
              // !注: 这里是浅拷贝，某些情况下会有问题
              target[key] = Array.isArray(source[key]) ? [...source[key]] : { ...source[key] }
            }
          } else {
            // 非对象属性直接赋值
            target[key] = source[key]
          }
        })
      }
    }
  }

  return target
}

exports.isObject = isObject
