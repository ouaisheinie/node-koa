const Router = require('koa-router')
const { upload } = require('../controller/goods.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const router = new Router({ prefix: '/goods' })

// 商品文件上传
// router.post('/upload', upload) // 无脑上传 可以在file_test.html里面用form表单上传
router.post('/upload', auth, hadAdminPermission, upload) // 先判断登录，再判断有没有管理员权限，有权限再进行upload

module.exports = router