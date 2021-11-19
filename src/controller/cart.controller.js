const { createOrUpdate, findCarts, updateCarts, removeCarts } = require('../service/cart.service')
const { validateGoodsId } = require('../service/goods.service')
const { invalidGoodsId, cartFormatError } = require('../constant/error.type')

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

  // 更新购物车
  async update(ctx) {
    // 1. 解析参数
    const { id } = ctx.request.params
    const { selected, number } = ctx.request.body
    if (number === undefined && selected === undefined) { // 这两个参数同时都不传的话要报错 格式错误
      cartFormatError.message = 'number和selected不能同时为空'
      return ctx.app.emit('error', cartFormatError, ctx)
    }
    // 2. 操作数据库 
    const res = await updateCarts({ id, number, selected })
    // 3. 返回数据
    ctx.body = {
      code: 0,
      message: '更新购物车成功',
      result: res
    }
  }

  // 删除购物车记录
  async remove(ctx) {
    const { ids } = ctx.request.body

    const res = await removeCarts(ids)

    if (res) {
      ctx.body = {
        code: 0,
        message: '成功删除购物车内' + res +'条记录',
        result: res
      }
    } else {
      cartFormatError.message = '购物车内没有相对应的记录'
      return ctx.app.emit('error', cartFormatError, ctx)
    }
  }
}

module.exports = new CartController()