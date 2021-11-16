const Router = require('koa-router')

const { add } = require('../controller/cart.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

const router = new Router({ prefix: '/carts' })

// 添加到购物车
router.post('/', auth, validator, add)

module.exports = router