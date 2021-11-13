const path = require('path')
const fs = require('fs')
const { fileUploadError, unSupportedFileType } = require('../constant/error.type')

class GoodsController {
  // node 文件上传
  async upload(ctx, next) {
    // koa-body 支持文件上传 files.file 因为接口的字段名叫file
    const { file } = ctx.request.files
    const fileTypes = ['image/jpeg', 'image/png'] // 支持jpeg 和 png格式
    if (file) {
      if (!fileTypes.includes(file.type)) return ctx.app.emit('error', unSupportedFileType, ctx)
      // 创建流
      const reader = fs.createReadStream(file.path)
      // 修改文件名称
      const newFilename = Date.now() + '.' + file.name.split('.')[1]
      const uploadPath = path.join(__dirname, '../upload/goods_image') + `/${newFilename}`
      // 创建可写流
      const upStream = fs.createWriteStream(uploadPath)
  
      reader.pipe(upStream) // 放入文件夹 goods_image
      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        result: {
          goods_img: '/goods_image/' + newFilename
        }
      }
    } else return ctx.app.emit('error', fileUploadError, ctx)
  }
}

module.exports = new GoodsController()