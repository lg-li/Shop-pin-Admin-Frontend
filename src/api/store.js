import request from '@/utils/request'

export function getStoreList(data) {
  return request({
    url: '/store/storeList',
    method: 'get',
    data
  })
}

