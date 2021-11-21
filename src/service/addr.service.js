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
}

module.exports = new AddrService()