const { createAddr, findAllAddr, updateAddr, deleteAddr, setDefaultAddr } = require('../service/addr.service')
const { setDefaulFormat } = require('../constant/error.type')

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

  async update(ctx) {
    // 解析出id 和 要修改的数据项
    const id = ctx.request.params.id

    const res = await updateAddr(id, ctx.request.body)

    ctx.body = {
      code: 0,
      message: '更新地址成功',
      result: res
    }
  }

  async remove(ctx) {
    const id = ctx.request.params.id

    const res = await deleteAddr(id)

    ctx.body = {
      code: 0,
      message: '删除地址成功',
      result: res
    }
  }

  async setDefault(ctx) {
    const id = ctx.request.params.id
    const user_id = ctx.state.user.id
    const res = await setDefaultAddr(id, user_id)

    if (res[0]) {
      ctx.body = {
        code: 0,
        message: '设置默认成功',
        resullt: res
      }
    } else {
      setDefaulFormat.message = '设置默认失败，找不到该商品。'
      return ctx.app.emit('error', setDefaulFormat, ctx)
    }
  }
}

module.exports = new AddrController()