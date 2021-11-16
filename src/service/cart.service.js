// 操作购物车数据库表的类
const Cart = require('../model/cart.model')
const { Op } = require('sequelize')

class CartService {
  async createOrUpdate(user_id, goods_id) {
    // 根据user_id、goods_id同时去查找
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id
        }
      }
    })

    if (res) { // res不为空 说明已经存在记录 于是把记录的number + 1
      res.increment('number') // += 1
      return await res.reload() // 更新以后 要调用reload 更新数据库
    } else { // res 为空 新建一条记录 然后返回
      return await Cart.create({
        user_id,
        goods_id,
        // number selected 有默认值
      })
    }
  }
}

module.exports = new CartService()