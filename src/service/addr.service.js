const Address = require('../model/addr.model')

class AddrService {
  // 创建地址
  async createAddr(addr) {
    return await Address.create(addr)
  }

  // 获取列表
  async findAllAddr(user_id) {
    const res = await Address.findAll({
      // attributes包括哪些字段 exclude 是排除哪些字段
      attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
      where: {
        user_id
      }
    })
    return res
  }

  // 更新地址
  async updateAddr(id, data) {
    const res = await Address.update(data, {
      where: {
        id
      }
    })
    return res
  }

  // 删除地址
  async deleteAddr(id) {
    const res = await Address.destroy({
      where: {
        id
      }
    })
    
    return res
  }

  async setDefaultAddr(id, user_id) {
    // 先把当前用户所有的地址 is_default 设置为0
    await Address.update({ is_default: 0 }, {
      where: {
        user_id
      }
    })

    const res = await Address.update({ is_default: 1 }, {
      where: {
        id
      }
    })

    return res
  }
}

module.exports = new AddrService()