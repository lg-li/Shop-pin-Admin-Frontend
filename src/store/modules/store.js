import { getStoreList } from '@/api/store'
import { getToken, getStoreToken, setStoreToken, removeStoreToken } from '@/utils/auth'

const state = {
  storeToken: getStoreToken(),
  id: 2,
  name: '',
  description: '',
  currentStore: {}, // 获取商店Token
  logo_url: '',
  store_list: []
}

const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_STORENAME: (state, name) => {
    state.name = name
  },
  SET_DESCRIPTION: (state, description) => {
    state.description = description
  },
  SET_CURRENTSTORE: (state, store) => {
    state.currentStore = store
  },

  SET_LOGO_URL: (state, url) => {
    state.logo_url = url
  },
  SET_STORE_LIST: (state, list) => {
    state.store_list = list
  }
}

const actions = {
  getStoreList({ commit }, userId) {
    return new Promise((resolve, reject) => {
      getStoreList().then(response => {
        const { data } = response
        if (!data) {
          reject('获取商店列表失败 请重新登录')
        }
        commit('SET_STORE_LIST', data.storeList)
        if (data.storeList && data.storeList.length > 0) {
          if (state.id === 2) {
            commit('SET_CURRENTSTORE', data.storeList[0])
            setStoreToken(state.currentStore.id)
            commit('SET_ID', state.currentStore.id)
            commit('SET_STORENAME', state.currentStore.name)
            commit('SET_LOGO_URL', state.currentStore.logo_url)
            commit('SET_DESCRIPTION', state.currentStore.description)
          }
          resolve(data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  changeCurrentStore({ commit }, index) {
    commit('SET_CURRENTSTORE', state.store_list[index])
    setStoreToken(state.currentStore.id)
    commit('SET_ID', state.currentStore.id)
    commit('SET_STORENAME', state.currentStore.name)
    commit('SET_LOGO_URL', state.currentStore.name)
    commit('SET_DESCRIPTION', state.currentStore.description)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
