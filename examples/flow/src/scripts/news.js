import { log } from './comm/utils'
import { getNews } from './comm/api'

// log('page news ....')
getNews().then((res) => {
  log('getNews', res)
})
