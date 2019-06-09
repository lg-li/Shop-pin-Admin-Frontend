
const tokens = {
  admin: {
    token: 'admin-token'
  },
  merchant: {
    token: 'merchant-token'
  },
  god: {
    token: 'god-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    avatar: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g3i0obr482j20d409in0e.jpg',
    name: 'Normal Admin'
  },
  'merchant-token': {
    roles: ['merchant'], // 他所拥有的权限
    avatar: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g310mrnvn7j20hs0hs74y.jpg',
    name: 'Normal merchant'
  },
  'god-token': {
    roles: ['god'],
    avatar: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g310mrnvn7j20hs0hs74y.jpg',
    name: 'Normal merchant'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      var token = {}
      const { username } = config.body
      if (username !== 'admin' && username !== 'god') {
        token = tokens['merchant']
      } else {
        token = tokens[username]
      }
      // var { password } = config.body
      // //token.password = password

      // mock error
      if (!token) {
        return {
          code: 401,
          message: '账户密码不正确'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const info = users['merchant-token']

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]
