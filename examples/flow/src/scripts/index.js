const log = (...args) => {
  console.log(...args)
}

log('hello', process.env.NODE_ENV, process.env.TITLE)
log('HEHE')
