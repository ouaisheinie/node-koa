const { createAddr, findAllAddr } = require('../service/addr.service')

class AddrController {
  async create(ctx) {
    // 解析 user_id, consignee, phone, address
    const user_id = ctx.state.user.id
    const { consignee, phone, address } = ctx.request.body
    const res = await createAddr({
      user_id, consignee, phone, address
    })

    ctx.body = {
      code: 0,
      message: '添加地址成功',
      result: res
    }
  }

  async findAll(ctx) {
    // 解析参数
    const user_id = ctx.state.user.id

    const res = await findAllAddr(user_id)

    ctx.body = {
      code: 0,
      message: '获取列表成功',
      result: res
    }
  }
}

module.exports = new AddrController()