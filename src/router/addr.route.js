const Router = require('koa-router')
const router = new Router({ prefix: '/address' })

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/addr.middleware')
const { create, findAll, update } = require('../controller/addr.controller')

const validator_params = {
  consignee: { type: 'string', required: true },
  phone: { type: 'string', format: /^1\d{10}$/, required: true },
  address: { type: 'string', required: true },
}

// 新增地址 登录 数据格式校验
router.post('/', auth, validator(validator_params), create)

// 地址列表接口 根据用户id 来找到用户的地址信息
router.get('/', auth, findAll)

// 修改接口
router.put('/:id', auth, validator(validator_params), update)

module.exports = router