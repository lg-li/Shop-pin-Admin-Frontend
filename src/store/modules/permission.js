import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // 如果路由里有meta并且meta里有roles
    return roles.some(role => route.meta.roles.includes(role))
    // 按传入的role去筛选可以访问的路由
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route } // 函数解构 直接获取route对象以供roles去筛选
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
        // 递归筛选符合的路由以应对嵌套路由
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    // 把常量路由表和routes添加在一起
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('god')) { // 是超级管理员就访问所有的动态路由
        accessedRoutes = asyncRoutes || []
      } else { // 否则就根据roles筛选动态路由
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      // 把筛好的路由存入vuex存储中以供直接调取
      resolve(accessedRoutes)
      // 返回筛好的路由
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
