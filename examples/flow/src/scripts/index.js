import dateFormat from "@jotter/dateformat"
import { log } from './comm/utils'
import {
  getUser
} from './comm/api'

getUser().then((res) => {
  log('getUser', res)
})

log(dateFormat(new Date()))

function test() {
  if (process.env.NODE_ENV === 'production') {
    return 'hello index, (production)'
  } else if (process.env.NODE_ENV === 'development') {
    return 'hello index, (development)'
  }
}

log(test())
