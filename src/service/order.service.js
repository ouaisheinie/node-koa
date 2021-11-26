const Order = require('../model/order.model')

class OrderService {
  async createOrder(order) {
    return await Order.create(order)
  }

  async findAllOrder(params) {
    const { pageNum, pageSize, status } = params
    const { count, rows } = await Order.findAndCountAll({
      attributes: ['id', 'user_id', 'address_id', 'goods_info', 'total', 'order_number', 'status'],
      where: {
        status
      },
      offset: (pageNum - 1) * 10,
      limit: pageSize * 1,
    })
    return {
      pageNum,
      pageSize,
      toal: count,
      list: rows
    }
  }

  async updateOrder(id, status) {
    return await Order.update({ status }, { 
      where: { 
        id 
      }
    })
  }
}

module.exports = new OrderService()