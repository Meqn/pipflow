function useLess() {
  console.log('use less .....')
}

const name = 'about'
// 页面name
globalThis.pageName = 'about'
const users = ['san', 'si', 'wu']

function helloPage(pageName = 'about') {
  console.log('HEHE, HELLO, xiao')
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  console.log('process.env ', process.env.API_URL, HELLO)
  console.log('name :', name, process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'production') {
    pageName = `${pageName} - prod`
  } else if (process.env.NODE_ENV === 'development') {
    pageName = `${pageName} - dev`
  } else {
    pageName = `${pageName} - env`
  }
  console.log(pageName)
}

helloPage()


/**
 * hello
 * @returns 
 */
function hello() {
  return users.map(user => {
    const msg = 'hello ' + user
    console.log(msg)
    return msg
  })
}

hello()
