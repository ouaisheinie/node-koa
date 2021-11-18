// 操作购物车数据库表的类
const Cart = require('../model/cart.model')
const { Op } = require('sequelize')
const Goods = require('../model/goods.model')

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

  // 包含关联表 这个在购物车表中有goods_id关联到商品表 关联表的作用就是查找购物车列表时直接把对应id的goods表内的信息获取到
  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Cart.findAndCountAll({
      attributes: ['id', 'number', 'selected'],
      offset: offset,
      limit: pageSize * 1,
      include: {
        model: Goods,
        as: 'goods_info',
        attributes: ['id', 'goods_name', 'goods_price', 'goods_img']
      },
    })

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }

  async updateCarts(params) {
    const { id, number, selected } = params
    
    const res = await Cart.findByPk(id) // findByPk 方法使用提供的主键从表中仅获得一个条目.
    if (!res) return ''

    number !== undefined ? (res.number = number) : ''
    selected !== undefined ? (res.selected = selected) : ''

    return await res.save()
  }
}

module.exports = new CartService()