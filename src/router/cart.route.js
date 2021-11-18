const Router = require('koa-router')

const { add, validate_goods_id, findAll, update } = require('../controller/cart.controller')
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

const router = new Router({ prefix: '/carts' })

// 添加到购物车
router.post('/', auth, validator({ goods_id: 'number' }), validate_goods_id, add)

// 购物车列表
router.get('/', auth, findAll)

// 更新购物车接口
router.patch('/:id', auth, validator({
  number: { type: 'number', required: false },
  selected: { type: 'boolean', required: false }
}),update)

module.exports = router