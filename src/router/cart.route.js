const Router = require('koa-router')

const {} = require('../controller/cart.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

const router = new Router({ prefix: '/carts' })

// 添加到购物车
router.post('/', auth, validator, (ctx) => {
  ctx.body = ctx.state.user // ctx.state.user里有auth函数传入的用户信息

})

module.exports = router