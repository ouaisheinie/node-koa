// 一个操作数据库的类 service 这一层主要是操作数据库
const Goods = require('../model/goods.model')

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

  async removeGoods(id) {
    // 这里 destory返回的res 是 数字
    const res = await Goods.destroy({ where: { id } })
    return res > 0 ? true : false
  }
}

module.exports = new GoodsService()