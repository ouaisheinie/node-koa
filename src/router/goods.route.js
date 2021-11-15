const Router = require('koa-router')
const { upload, create, update, remove } = require('../controller/goods.controller')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')

const router = new Router({ prefix: '/goods' })

// 商品文件上传
// router.post('/upload', upload) // 无脑上传 可以在file_test.html里面用form表单上传
router.post('/upload', auth, hadAdminPermission, upload) // 先判断登录，再判断有没有管理员权限，有权限再进行upload

// 发布商品
router.post('/', auth, hadAdminPermission, validator, create)

// 修改商品
router.put('/:id', auth, hadAdminPermission, validator, update)

// 删除商品1 直接从数据库中删除
router.delete('/:id', auth, hadAdminPermission, remove)


module.exports = router