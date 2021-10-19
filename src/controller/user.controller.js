const { createUser, getUserInfo } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    // 1.获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body
    // 2.操作数据库 大型项目会有单独的曾 抽出来做数据库操作 此项目放在service里
    // 合法性 
    if (!user_name || !password) {
      console.error('用户名或者密码为空', ctx.request.body)
      ctx.status = 400 // bad request
      ctx.body = {
        code: '10001',
        message: '用户名或者密码为空',
        result: ''
      }
      return
    }
    // 合理性
    if (getUserInfo({ user_name })) {
      ctx.status = 409
      ctx.body = {
        code: '10002',
        message: '用户名已经存在',
        result: ''
      }
      return
    }
    // console.log(res)
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
  }

  async login(ctx, body) {
    ctx.body = '用户登录成功'
  }
}

module.exports = new UserController()