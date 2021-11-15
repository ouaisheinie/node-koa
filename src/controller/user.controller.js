const jwt = require('jsonwebtoken')
const { createUser, getUserInfo, updateById } = require('../service/user.service')
const { userRegisterError } = require('../constant/error.type')
const { JWT_SECRET } = require('../config/config.default')

class UserController {
  async register(ctx, next) {
    // 1.获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body
    // 2.操作数据库 大型项目会有单独的曾 抽出来做数据库操作 此项目放在service里
    try {
      const res = await createUser(user_name, password)
      // 3.返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name
        }
      } 
    } catch (error) {
      console.log(error)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx, body) {
    const { user_name } = ctx.request.body
    // 登录成功后 颁发令牌 token 用户在以后每一次请求都携带令牌 使用jwt(json web token)来颁发令牌
    // 1.获取用户信息 (在token的playload中需要包含用户信息，id user_name is_admin)
    try {
      const res = await getUserInfo({ user_name })
      const { password, ...resUser } = res
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: jwt.sign(resUser, JWT_SECRET, { expiresIn: '10d' })
      }
    } catch (error) {
      console.error('用户登录失败', error)
    }
  }

  async change_password(ctx, body) {
    // 1.获取数据 2.操作数据库 3.返回结果
    const id = ctx.state.user.id
    const password = ctx.request.body.password

    if (await updateById({ id, password })) { //  修改成功 
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        result: ''
      }
    } else { // 修改密码 失败 
      ctx.body  = {
        code: '10007',
        message: '修改密码失败',
        result: ''
      }
    }
  }
}
 
module.exports = new UserController()