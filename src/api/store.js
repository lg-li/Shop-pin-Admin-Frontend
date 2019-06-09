import request from '@/utils/request'

export function getStoreList() {
  return request({
    url: '/store/storeList',
    method: 'get'
  })
}

export function getStoreInfo() {
  return request({
    url: '/store/storeInfo',
    method: 'get'
  })
}

export function changeStoreInfo() {
  return request({
    url: '/store/storeInfo',
    method: 'put'
  })
}

export function addStoreInfo() {
  return request({
    url: '/store/storeInfo',
    method: 'post'
  })
}

