import request from '@/utils/request'

export function getSingleOrderList(storeId) {
  return request({
    url: '/order/singleOrderList',
    method: 'get',
    params: storeId
  })
}
