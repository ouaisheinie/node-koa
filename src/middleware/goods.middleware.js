const { goodsFormatError } = require('../constant/error.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: { type: 'string', required: true },
      goods_price: { type: 'number', required: true },
      goods_num: { type: 'number', required: true },
      goods_img: { type: 'string', required: true }
    })
  } catch (error) {
    console.error(error)
    goodsFormatError.result = error // 把错误原因写到goodsFormatError里面 传给response
    return ctx.app.emit('error', goodsFormatError, ctx)
  }
  await next()
}

module.exports = {
  validator
}