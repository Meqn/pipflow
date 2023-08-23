const exec = require('child_process').execSync

/**
 * 获取用户名和邮箱
 * @returns object
 */
function getUser() {
  let name
  let email
  try {
    name = exec('git config --get user.name')
    email = exec('git config --get user.email')
  } catch (e) {
    //
  }

  name = name && JSON.stringify(name.toString().trim()).slice(1, -1)
  email = email && email.toString().trim()

  /* return {
    name,
    email,
    user: `${name || ''} ${email ? `<${email}>` : ''}`,
  } */
  return `${name || ''} ${email ? `<${email}>` : ''}`
}

module.exports = getUser
