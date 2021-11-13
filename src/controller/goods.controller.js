const path = require('path')
const { fileUploadError } = require('../constant/error.type')

class GoodsController {
  // node 文件上传
  async upload(ctx, next) {
    // koa-body 支持文件上传 files.file 因为接口的字段名叫file
    console.log(ctx.request.files.file)
    const { file } = ctx.request.files
    if (file) {
      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        result: {
          goods_img: path.basename(file.path), // 拿到file.path这个文件的文件名称
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }
}

module.exports = new GoodsController()