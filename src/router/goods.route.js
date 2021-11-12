const Router = require('koa-router')
const { upload } = require('../controller/goods.controller')

const router = new Router({ prefix: '/goods' })

// 商品文件上传
router.post('/upload', upload)

module.exports = router