const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError, invalidToken, hasNotAdminPermission } = require('../constant/error.type')

// 验证用户是否登录有token的中间件
const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  // jwt verify验证token
  try {
    const user = jwt.verify(token, JWT_SECRET) // user中包含了 payload信息 主要有 id username isadmin
    ctx.state.user = user // 验证成功后 把用户信息user 加到了 ctx.state.user中
  } catch (error) {
    switch(error.name) {
      case 'TokenExpiredError':
        // console.error('token已过期', error)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', error)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }
  await next()
}

// 判断用户是否拥有管理员权限
const hadAdminPermission = async(ctx, next) => {
  const { is_admin } = ctx.state.user // auth里面放进去的
  if (!is_admin) { // 无权限
    console.error('该用户没有管理员权限', ctx.state.user)
    return ctx.app.emit('error', hasNotAdminPermission, ctx)
  }
  // 有权限就放行
  await next()
}

module.exports = {
  auth,
  hadAdminPermission
}