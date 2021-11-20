const Router = require('koa-router')
const router = new Router({ prefix: '/address' })

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/addr.middleware')

// 新增地址 登录 数据格式校验
router.post('/', auth, validator({
  consignee: { type: 'string', required: true },
  phone: { type: 'string', format: /^1\d{10}$/ },
  address: { type: 'string', required: true },
}), ctx => {
  console.log(ctx.state.user.id)
  ctx.body = '添加地址成功'
})

module.exports = router