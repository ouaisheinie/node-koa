const { getUserInfo } = require('../service/user.service')
const { userFormatError, userAlreadyExited } = require('../constant/error.type')

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

// 判断用户名不重复
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

module.exports = {
  user_validator,
  verify_user
}