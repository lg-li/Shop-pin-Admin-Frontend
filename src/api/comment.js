import request from '@/utils/request'

export function getCommentByGoods(productId) {
  return request({
    url: '/comment/goods-comment',
    methods: 'get',
    params: {
      productId
    }
  })
}
