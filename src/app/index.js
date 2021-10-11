const Koa = require('koa')
const KoaBody = require('koa-body')
const userRouter = require('../router/user.route')

const app = new Koa()
app.use(KoaBody()) // 在所有的路由之前注册koa-body 把传过来的数据 全写到ctx.request.body里面
app.use(userRouter.routes())

module.exports = app