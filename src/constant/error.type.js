// 错误类型集合

module.exports = {
  userFormatError: {
    code: '10001',
    message: '用户名或者秘密为空',
    result: ''
  },
  userAlreadyExited: {
    code: '10002',
    message: '用户名已经存在',
    result: ''
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册错误',
    result: ''
  },
  userDoesNotExist: {
    code: '10004',
    message: '用户不存在',
    result: ''
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败',
    result: ''
  },
  invalidPassword: {
    code: '10006',
    message: '无效的密码',
    result: ''
  }
}