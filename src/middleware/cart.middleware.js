const { cartFormatError } = require('../constant/error.type')

const validator = (rules) => { // rules 是规则对象
  return async (ctx, next) => {
    try {
      await ctx.verifyParams(rules)
    } catch (error) {
      console.error(error)
      cartFormatError.result = error
      cartFormatError.message = '无效的商品'
      return ctx.app.emit('error', cartFormatError, ctx) // 无效的商品
    }
    await next()
  }
}

module.exports = {
  validator
}