const { createOrUpdate, findCarts } = require('../service/cart.service')
const { validateGoodsId } = require('../service/goods.service')
const { invalidGoodsId } = require('../constant/error.type')

class CartController {
  async add(ctx) { // 将商品添加到购物车
    // 1. 解析 user_id、goods_id
    const user_id = ctx.state.user.id
    const goods_id = ctx.request.body.goods_id
    // 2. 操作数据库
    const res = await createOrUpdate(user_id, goods_id)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '添加到购物车成功',
      result: res
    }
  }

  // 验证goods_id是否可用
  async validate_goods_id(ctx, next) {
    // 获取goods_id
    const goods_id = ctx.request.body.goods_id
    // 看看数据库zy_goods表中是否有该商品
    const res = await validateGoodsId(goods_id)
    if (res) await next()
    else ctx.app.emit('error', invalidGoodsId, ctx)
  }

  // 获取购物车列表
  async findAll(ctx) {
    // 1. 解析请求参数
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    // 2. 操作数据库
    const res = await findCarts(pageNum, pageSize)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '获取购物车列表成功',
      result: res
    }
  }
}

module.exports = new CartController()