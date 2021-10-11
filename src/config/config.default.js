const dotenv = require('dotenv')
// 此模块把.env文件内的配置写到process.env对象里面

dotenv.config()

// 此时 process.env 里面就会有.env文件里面的属性了
// console.log(process.env.APP_PORT)

module.exports = process.env