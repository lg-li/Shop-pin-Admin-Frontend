import request from '@/utils/request'

export function getGoodsList(queryType, queryList) {
  return request({
    url: '/goods/goodsList',
    method: 'get',
    params: {
      queryType: queryType,
      queryList: queryList
    }
  })
}

export function getGoodsCategory(queryType, queryList) {
  return request({
    url: '/goods/goodsCategory',
    method: 'get',
    params: { queryType, queryList }
  })
}

export function getCategoryList() {
  return request({
    url: '/goods/categoryList',
    method: 'get'
  })
}

