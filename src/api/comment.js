import request from '@/utils/request'

export function getCommentByGoods(productId, queryType) {
  return request({
    url: '/comment/goods-comment',
    method: 'post',
    data: queryType
  })
}
