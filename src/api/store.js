import request from '@/utils/request'

export function getStoreList() {
  return request({
    url: '/manager/store/storeList',
    method: 'get'
  })
}

export function getStoreInfo() {
  return request({
    url: '/home',
    method: 'get'
  })
}

export function changeStoreInfo() {
  return request({
    url: '/manager/store/storeInfo',
    method: 'put'
  })
}

export function addStoreInfo() {
  return request({
    url: '/manager/store/storeInfo',
    method: 'post'
  })
}

export function getTimePoint() {
  return request({
    url: '/manager/store/close-batch',
    method: 'get'
  })
}

