# 项目说明文件

## 项目初始化
```
npm init -y
```

## git初始化

```
git init
```

## 开发用到的库

  1. koa-router 路由中间件。

  2. cross-env 可以再执行package.json的scripts时 修改.env内部的数据

  3. dotenv 环境.env内部定义的变量获取

  4. koa-body 可以处理数据

  5. sequilize ORM数据库工具 Sequelize 是一个基于 promise 的 Node.js ORM。

      ORM: 操作关系型数据库的工具，对象关系映射，面向对象操作关系型数据库。

      * 关系型数据库当作对象来处理。
      * 数据表中的每一个记录对应一个对象。
      * 数据的字段会对应到对象的属性。
      * 数据表的操作对应对象的方法
  　　①安装服务：mysqld --install
  
  　　②初始化：　mysqld --initialize --console
  
  　　③开启服务：net start mysql
  
  　　④关闭服务：net stop mysql
  
  　　⑤登录mysql：mysql -u root -p
  
  　　　　Enter PassWord：(密码)
  
  　　⑥修改密码：alter user 'root'@'localhost' identified by 'root';(by 接着的是密码)
  
  　　⑦标记删除mysql服务：sc delete mysql