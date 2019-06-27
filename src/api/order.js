import request from '@/utils/request'

export function getSingleOrderList(queryType) {
  return request({
    url: '/admin/order/query',
    method: 'post',
    data: queryType
  })
}

export function getDeliverNameList(queryType) { // 获取物流公司的列表
  return request({
    url: '/admin/order/deliverNameList',
    method: 'get'
  })
}

export function getGroupOrderList(queryType) {
  return request({
    url: '/admin/order/get-group-order-list',
    method: 'post',
    data: queryType
  })
}

export function deliverProduct(deliverInfo) {
  return request({
    url: '/admin/order/deliver-product',
    method: 'put',
    data: deliverInfo
  })
}

export function addOrderRemark(remarkInfo) {
  return request({
    url: '/admin/order/order-remark',
    method: 'put',
    data: remarkInfo
  })
}

export function refund(id, agree, reason) {
  return request({
    url: '/admin/refund-order',
    method: 'post',
    data: {
      orderIndividualId: id,
      agree: agree,
      refundRefuseReason: reason
    }
  })
}
