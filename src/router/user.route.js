const Router = require('koa-router')
const { register, login } = require('../controller/user.controller') // 控制器
const { user_validator, verify_user, crypt_password, verify_login } = require('../middleware/user.middleware') // 中间件
const { auth } = require('../middleware/auth.middleware') // 验证token 中间件

const router = new Router({ prefix: '/users' }) // api前缀

// 用户注册接口 先跑user_validator和verify_user俩验证函数
router.post('/register', user_validator, verify_user, crypt_password, register) // /users/register 这加上了前缀

// 用户登录接口
router.post('/login', user_validator, verify_login, login)

// 修改密码接口
router.patch('/', auth, (ctx, next) => { // 先调用auth
  // 获取token
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  // 拿到token 验签
  console.log(ctx.state.user) // 早auth中间件里面 添加到ctx.state.user里的
  ctx.body = '用户修改密码成功'
})
module.exports = router