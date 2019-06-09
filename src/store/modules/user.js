import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(), // 获取Token
  id: '',
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }

}

const actions = {
  // user login
  // ES2015参数解构 不管传参是什么，直接获取参数.commit对象
  login({ commit }, userInfo) { // 由this.$store.dispatch('url/login')调用
    const { username, password } = userInfo // 参数解构 直接获取username和password
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        // 这里的login是request api库里的写好的
        // 用api/user/login发送request请求
        const { data } = response
        // data = response.data
        commit('SET_TOKEN', data.token)
        // 本地Store里储存Token
        setToken(data.token)
        // Cookies里储存Token
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        // 把Token作为获取用户信息的参数传入getInfo请求中并发起
        const { data } = response
        if (!data) {
          reject('获取用户信息失败 请重新登录')
        }

        const { roles, name, avatar } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: 该用户没有被设定权限')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken() // 从Cookies中移除Token
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

