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

export function addTimePoint(closeBatch) {
  return request({
    url: '/manager/store/close-batch',
    method: 'post',
    data: { closeBatch: closeBatch }
  })
}

export function deleteTimePoint(closeBatchList) {
  return request({
    url: '/manager/store/close-batch',
    method: 'delete',
    data: closeBatchList
  })
}

export function uploadImage(base64) {
  return request({
    url: '/manager/store/upload',
    method: 'post',
    data: { image: base64 }
  })
}

export function addStore(product) {
  return request({
    url: '/manager/store/storeInfo',
    method: 'post',
    data: product
  })
}

export function updateStore(product) {
  return request({
    url: '/manager/store/storeInfo',
    method: 'put',
    data: product
  })
}
