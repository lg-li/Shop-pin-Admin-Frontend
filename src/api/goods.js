import request from '@/utils/request'

export function getGoodsList(queryType, queryList) {
  return request({
    url: '/goods/goods-list',
    method: 'post',
    data: {
      queryType: queryType,
      queryList: queryList
    }
  })
}

export function getGoodsWithComment(queryList) {
  return request({
    url: '/goods/goodsWithComment',
    methods: 'get',
    params: {
      queryList: queryList
    }
  })
}

export function getGoodsCategory(queryType, queryList) {
  return request({
    url: '/goods/goods-category',
    method: 'get',
    params: { queryType, queryList }
  })
}

export function getCategoryList() { // 获取所有的分类列表
  return request({
    url: '/goods/categoryList',
    method: 'get'
  })
}

