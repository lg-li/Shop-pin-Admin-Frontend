import request from '@/utils/request'

export function getCommentByGoods(productId, queryType) {
  return request({
    url: '/comment/goods-comment',
    method: 'post',
    data: queryType
  })
}

export function replyComment(reply) {
  return request({
    url: '/comment/reply-comment',
    method: 'post',
    data: reply
  })
}
