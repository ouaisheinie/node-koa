// 操作数据库
// 1. 导入sequelize
const { DataTypes } = require('sequelize')

// 连接数据库
const seq = require('../db/seq')
const Goods = require('./goods.model') // 这里是用到了Goods

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

Cart.belongsTo(Goods, {
  foreignKey: 'goods_id',
  as: 'goods_info'
}) // Cart关联到Goods 用belongsTo 意思是cart里面有个goods_id 跟 goods 主键关联   查询出来的字段名叫goods_info

module.exports = Cart