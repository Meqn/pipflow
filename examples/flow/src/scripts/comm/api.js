import { log } from './utils'

export function request(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

export function getUser() {
  log('request getUser .....')
  return request({
    name: 'zhangsan',
  })
}

export function getNews() {
  log('request getNews .....')
  return request({
    data: ['first', 'second']
  })
}
