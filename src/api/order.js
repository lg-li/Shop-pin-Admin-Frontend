import request from '@/utils/request'

export function getSingleOrderList(queryType) {
  return request({
    url: '/order/singleOrderList',
    method: 'get',
    params: { queryType: queryType }
  })
}

export function getDeliverNameList(queryType) { // 获取物流公司的列表
  return request({
    url: '/order/deliverNameList',
    method: 'get'
  })
}

export function getGroupOrderList(queryType) {
  return request({
    url: '/order/groupOrderList',
    method: 'get',
    params: { queryType: queryType }
  })
}
