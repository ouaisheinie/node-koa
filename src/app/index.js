const path = require('path')

const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static') // 处理服务器静态资源的
const parameter = require('koa-parameter') // 参数处理

const errorHandler = require('./error.handler')

// 导入路由
const router = require('../router')

const app = new Koa()

app.use(KoaBody({
  // multipart formidable 两个配置让koabody开启文件上传
  multipart: true,
  formidable: {
    maxFileSize: 2 * 1024 * 1024,
  },
  parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
})) // 在所有的路由之前注册koa-body 把传过来的数据 全写到ctx.request.body里面
.use(KoaStatic(path.join(__dirname, '../upload')))
.use(parameter(app)) // 后续的所有接口都有 ctx.verifyParams方法了
.use(router.routes()) // 使用路由
.use(router.allowedMethods()) // 对不支持的请求方式会返回正确状态405、501等。 不会只有404not found
.on('error', errorHandler) // 监听错误 调用错误处理函数

module.exports = app