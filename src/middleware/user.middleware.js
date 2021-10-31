const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const { userFormatError, userAlreadyExited, userDoesNotExist } = require('../constant/error.type')

// 判断用户名和密码是否都填写
const user_validator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  if (!user_name || !password) {
    console.error('用户名或者密码为空', ctx.request.body)
    ctx.status = 400 // bad request
    // 出错 提交错误
    ctx.app.emit('error', userFormatError, ctx)
    return
  }

  await next()
}

// 注册 判断用户名不重复
const verify_user = async (ctx, next) => {
  const { user_name } = ctx.request.body
  try {
    const res = await getUserInfo({ user_name })
    if (res) {
      console.error('用户名已经存在', { user_name })
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (error) {
    console.error('获取用户信息错误', error)
    ctx.app.emit('error', userAlreadyExited, ctx)
    return
  }

  await next()
}

// crypt 加密中间件
const crypt_password = async (ctx, next) => {
  try {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10) // 10次同步加盐
    // 这个hash保存的是加盐后的密文
    const hash = bcrypt.hashSync(password, salt) // 明文密码加盐
  
    ctx.request.body.password = hash // 覆盖掉密码
    await next()
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  user_validator,
  verify_user,
  crypt_password
}