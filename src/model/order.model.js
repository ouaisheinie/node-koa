// 1. 导入sequelize连接
const { DataTypes } = require('sequelize')

// 2。定义字段 建表
const seq = require('../db/seq')

// 定义数据表
const Order = seq.define('zy_orders', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '地址id'
  },
  goods_info: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '商品信息'
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '订单总金额'
  },
  order_number: {
    type: DataTypes.CHAR(16),
    allowNull: false,
    comment: '订单号'
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
    comment: '订单状态（0未支付、1已支付、2已发货、3已签收、4取消）'
  }
})

// Order.sync({ force: true })

// 4 导出
module.exports = Order