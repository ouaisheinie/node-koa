const Koa = require('koa')
const KoaBody = require('koa-body')
const errorHandler = require('./error.handler')
// 导入路由
const router = require('../router')

const app = new Koa()
app.use(KoaBody()) // 在所有的路由之前注册koa-body 把传过来的数据 全写到ctx.request.body里面
.use(router.routes()) // 使用路由
.use(router.allowedMethods()) // 对不支持的请求方式会返回正确状态405、501等。 不会只有404not found
.on('error', errorHandler) // 监听错误 调用错误处理函数

module.exports = app