import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sign-in/default',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/manager/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
