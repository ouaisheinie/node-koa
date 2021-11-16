// 操作数据库
// 1. 导入sequelize
const { DataTypes } = require('sequelize')

// 连接数据库
const seq = require('../db/seq')

const Cart = seq.define('zy_carts', {
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品id'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '商品数量'
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否选中'
  }
})

// Cart.sync({
//   force: true
// })

module.exports = Cart