// 1. 导入sequelize连接
const { DataTypes } = require('sequelize')

// 2。定义字段 建表
const seq = require('../db/seq')

const Address = seq.define('zy_addresses', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人姓名'
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment: '收货人手机号'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人地址'
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    comment: '是否是默认地址',
  }
})

// 3. 同步
// Address.sync({ force: true })

// 4 导出
module.exports = Address
