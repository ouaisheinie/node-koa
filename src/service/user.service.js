// 一个操作数据库的类 service 这一层主要是操作数据库
const User = require('../model/user.model')

class UserService {
  // 用户注册
  async createUser(user_name, password) {
    // 往数据库插入数据
    const res = await User.create({ user_name, password })
    
    return res.dataValues
  }

  // 获取用户信息
  async getUserInfo({
    id,
    user_name,
    password,
    is_admin
  }) {
    const whereOpt = {}
    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt
    })
    return res ? res.dataValues : null
  }

  // 修改记录中的数据 除了id没变
  async updateById({ id, user_name, password, is_admin }) {
    const whereOpt = { id }
    const newUser = {}

    user_name && Object.assign(newUser, { user_name })
    password && Object.assign(newUser, { password })
    is_admin && Object.assign(newUser, { is_admin })

    const res = await User.update(newUser, {
      where: whereOpt
    })
    
    return res[0] > 0 ? true : false
  }
}

module.exports = new UserService()