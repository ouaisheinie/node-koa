const Router = require('koa-router')

const { add, validate_goods_id, findAll } = require('../controller/cart.controller')
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

const router = new Router({ prefix: '/carts' })

// 添加到购物车
router.post('/', auth, validator, validate_goods_id, add)

// 购物车列表
router.get('/', auth, findAll)

module.exports = router