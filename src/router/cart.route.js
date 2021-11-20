const Router = require('koa-router')

const { add, validate_goods_id, findAll, update, remove, selectAll, unselecteAll } = require('../controller/cart.controller')
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
}), update)

// 删除购物车商品
/* 严格模式启用的话  不会把get、head、delete请求方法的body里的数据挂载到ctx.request里 这里要单独处理 去app.js里面配置parsedMethods方法*/
router.delete('/', auth, validator({
  ids: 'array' // 必选 类型是array
}), remove)

// 全选
router.post('/selectAll', auth, selectAll)

// 全不选
router.post('/unselectAll', auth, unselecteAll)

module.exports = router