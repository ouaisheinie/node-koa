// 一个操作数据库的类 service 这一层主要是操作数据库
const User = require('../model/user.model')

class UserService {
  async createUser(user_name, password) {
    // 往数据库插入数据
    const res = await User.create({ user_name, password })
    // console.log(res)
    return res.dataValues
  }
}

module.exports = new UserService()