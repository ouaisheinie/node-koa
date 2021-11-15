const { invalidGoodsId } = require('../constant/error.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_id: 'number' // 'number' = { type: 'number', required: true }
    })
  } catch (error) {
    console.error(error)
    invalidGoodsId.result = error
    return ctx.app.emit('error', invalidGoodsId, ctx) // 无效的商品
  }
  await next()
}

module.exports = {
  validator
}