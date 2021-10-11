const Router = require('koa-router')
const { register, login } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' }) // api前缀

// 用户注册接口
router.post('/register', register) // /users/register 这加上了前缀

// 用户登录接口
router.post('/login', login)

module.exports = router