const { createOrder } = require('../service/order.service')

class OrderController {
  async create(ctx) {
    const user_id = ctx.state.user.id
    const { address_id, goods_info, total } = ctx.request.body

    const order_number = 'ZZY' + Date.now() // 订单号  唯一表示
    const res = await createOrder({
      user_id,
      address_id,
      goods_info,
      total,
      order_number
    })
    
    ctx.body = {
      code: 0,
      message: '生成订单成功',
      resulte: res
    }
  }
}

module.exports = new OrderController()