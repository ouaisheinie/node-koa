const Router = require('koa-router')
const { register, login } = require('../controller/user.controller') // 控制器
const { user_validator, verify_user, crypt_password } = require('../middleware/user.middleware') // 中间件

const router = new Router({ prefix: '/users' }) // api前缀

// 用户注册接口 先跑user_validator和verify_user俩验证函数
router.post('/register', user_validator, verify_user, crypt_password, register) // /users/register 这加上了前缀

// 用户登录接口
router.post('/login', login)

module.exports = router