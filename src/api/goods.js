import request from '@/utils/request'

export function getGoodsList(storeId, queryType) {
  return request({
    url: '/goods/goodsList',
    method: 'get',
    params: {
      storeId: storeId,
      queryType: queryType
    }
  })
}

export function getGoodsCategory(storeId) {
  return request({
    url: '/goods/goodsCategory',
    method: 'get',
    params: { storeId }
  })
}

