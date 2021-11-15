// goods模块 数据库表定义
const { DataTypes } = require('sequelize')

// 连接数据库
const seq = require('../db/seq')

const Goods = seq.define('zy_goods', {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品名称'
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格'
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品库存'
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片url'
  }
}, {
  timestamps: false, // 不会再表内自动创建时间戳
})

// 强制同步数据库 看情况开 创建数据表 只执行第一次就行了
// Goods.sync({
//   force: true, // 数据库存在这张表，就会删除后再同步，强制同步。
// })

module.exports = Goods