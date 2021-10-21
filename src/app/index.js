const Koa = require('koa')
const KoaBody = require('koa-body')
const userRouter = require('../router/user.route')
const errorHandler = require('./error.handler')

const app = new Koa()
app.use(KoaBody()) // 在所有的路由之前注册koa-body 把传过来的数据 全写到ctx.request.body里面
app.use(userRouter.routes())
app.on('error', errorHandler) // 监听错误 调用错误处理函数

module.exports = app