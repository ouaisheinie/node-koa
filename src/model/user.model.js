// 操作数据库
const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const User = seq.define('zy_user', { // 表名会对应到 zy_users 也可以直接指定表名 看文档
  // id会被自动创建
  user_name: {
    type: DataTypes.STRING,
    allowNull: false, // 是否可以为空
    unique: true, // 唯一
    comment: '用户名，唯一', // 注释
  },
  password: {
    type: DataTypes.CHAR(64), // 64位
    allowNull: false,
    comment: '密码'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否是管理员，0：不是管理员（默认）；1：是管理员'
  }
}, {
  // timestamps: false, // 不会再表内自动创建时间戳
})

// 强制同步数据库 看情况开 创建数据表
// User.sync({
//   force: true, // 数据库存在这张表，就会删除后再同步，强制同步。
// })

module.exports = User