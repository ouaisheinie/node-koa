// 连接数据库 导出对应对象
const { Sequelize } = require('sequelize')
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB
} = require('../config/config.default')


// 数据库名称 用户名  密码  配置
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql'
})

// 只是测试连接与否的代码
/* seq.authenticate().then(() => {
  console.log('数据连接成功')
}).catch((err) => {
  console.log('数据库连接失败', err)
}) */

module.exports = seq // 这是导出数据库对象 在model内用