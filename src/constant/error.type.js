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
  },
  tokenExpiredError: {
    code: '10101',
    message: 'token已过期',
    result: ''
  },
  invalidToken: {
    code: '10102',
    message: '无效的token',
    result: ''
  },
  hasNotAdminPermission: {
    code: '10103',
    message: '没有管理员权限',
    result: ''
  },
  fileUploadError: {
    code: '10201',
    message: '商品图片上传失败',
    result: ''
  },
  unSupportedFileType: {
    code: '10202',
    message: '不支持的文件格式',
    result: ''
  }
}
