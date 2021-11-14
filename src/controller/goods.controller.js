const path = require('path')
const fs = require('fs')
const { fileUploadError, unSupportedFileType, publishGoodsError, updateGoodsError, invalidGoodsId } = require('../constant/error.type')
const { createGoods, updateGoods } = require('../service/goods.service')

class GoodsController {
  // node 文件上传 实际生产中是要传图片到第三方cdn的
  async upload(ctx) {
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

  async create(ctx) {
    // 直接调用service 的 createGoods 把数据插入数据库
    try {
      const res = await createGoods(ctx.request.body)
      const { createdAt, updatedAt, ...data } = res
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: data
      }
    } catch (error) {
      console.error(error)
      // 这种涉及数据库的  就不要把error 写到publishGoodsError的result里面
      return ctx.app.emit('error', publishGoodsError, ctx)
    }
  }

  async update(ctx) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改商品信息成功',
          result: ''
        }
      } else return ctx.app.emit('error', invalidGoodsId, ctx)
    } catch (error) {
      console.error(error)
      return ctx.app.emit('error', updateGoodsError, ctx)
    }
  }
}

module.exports = new GoodsController()