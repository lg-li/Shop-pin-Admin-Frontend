import request from '@/utils/request'

export function getStoreList(id) {
  return request({
    url: '/store/storeList',
    method: 'get',
    params: { id }
  })
}

export function getStoreInfo(id) {
  return request({
    url: '/store/storeInfo',
    method: 'get',
    params: { id }
  })
}

