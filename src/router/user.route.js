const Router = require('koa-router')
const { register, login, change_password } = require('../controller/user.controller') // 控制器
const { user_validator, verify_user, crypt_password, verify_login } = require('../middleware/user.middleware') // 中间件
const { auth } = require('../middleware/auth.middleware') // 验证token 中间件

const router = new Router({ prefix: '/users' }) // api前缀

// 用户注册接口 先跑user_validator和verify_user俩验证函数
router.post('/register', user_validator, verify_user, crypt_password, register) // /users/register 这加上了前缀

// 用户登录接口
router.post('/login', user_validator, verify_login, login)

// 修改密码接口
router.patch('/', auth, crypt_password, change_password) // 先登录的情况下 然后将用户输入的密码加密(其他的不会加密) 然后再修改密码

module.exports = router