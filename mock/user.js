
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
    introduction: 'I am an admin lu la lu',
    avatar: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g3i0obr482j20d409in0e.jpg',
    name: 'Normal Admin'
  },
  'merchant-token': {
    roles: ['merchant'],
    introduction: 'I am a merchant from Japan',
    avatar: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g310mrnvn7j20hs0hs74y.jpg',
    name: 'Normal merchant'
  },
  'god-token': {
    roles: ['god'],
    introduction: 'I am the world, the world is me',
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
          code: 60204,
          message: '账户密码不正确'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，无法获取用户信息'
        }
      }

      return {
        code: 20000,
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
        code: 20000,
        data: 'success'
      }
    }
  }
]
