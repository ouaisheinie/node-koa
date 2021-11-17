// 一个操作数据库的类 service 这一层主要是操作数据库
const Goods = require('../model/goods.model')
const { Op } = require('sequelize')

class GoodsService {
  async createGoods(goods) {
   const res = await Goods.create(goods)
   return res.dataValues
  }

  async updateGoods(id, goods) {
    // update返回的res 是数组
    const res = await Goods.update(goods, { // goods 要修改为啥样子的对象
      where: {
        id
      }
    })
    return res[0] > 0 ? true : false
  }

  
  // 删除、下架商品
  async removeGoods(id) {
    // 这里 destory返回的res 是 数字
    const res = await Goods.destroy({ where: { id } })
    return res > 0 ? true : false
  }

  // 上架商品
  async restoreGoods(id) {
    const res = await Goods.restore({ where: { id }})
    return res > 0 ? true : false
  }

  async findGoods(pageNum, pageSize) {
   /*  // 1. 获取总数
    const count = await Goods.count() // 总数 这里 sequelize已经帮你剔除了软删除的数据了
    // 2. 获取分页数据
    const rows = await Goods.findAll({
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1, // 转数字
    }) */

    // findAndCountAll方法就是结合了上面的count 和 findAll  效果是一样的
    const { count, rows } = await Goods.findAndCountAll({
      offset: (pageNum - 1) * 10,
      limit: pageSize * 1
    })

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }

  // carts 购物车中用到此功能  查看表中是否有该goods_id的商品
  async validateGoodsId(goods_id) {
    const res = await Goods.findAll({
      where: {
        id: goods_id
      }
    })
    return res.length > 0 ? true : false
  }
}

module.exports = new GoodsService()