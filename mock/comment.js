import Mock from 'mockjs'

const goodsCommentTemplate = [{
  id: '@id',
  userId: '@id',
  user: {
    nickname: '@cname',
    'avatalUrl|1': ['http://ww1.sinaimg.cn/large/9d167ea7ly1g310mrnvn7j20hs0hs74y.jpg',
      'http://ww1.sinaimg.cn/large/9d167ea7ly1g3110hf8pdj202o02omx6.jpg',
      'http://ww1.sinaimg.cn/large/9d167ea7ly1g3hyzea2xdj20a00a0q33.jpg']
  },
  name: '卫龙小面筋',
  orderIndividualId: '@id',
  productId: '@id',
  'grade|0-2': 2,
  'productScore|1-5': 1,
  'serviceScore|1-5': 1,
  'content': '@cparagraph(1,4)',
  'imagesUrls|1': ['http://ww1.sinaimg.cn/large/9d167ea7ly1g3ntjmj587j20dw07tt9o.jpg',
    'http://ww1.sinaimg.cn/large/9d167ea7ly1g3ntk22b6xj20fa08hmxv.jpg',
    'http://ww1.sinaimg.cn/large/9d167ea7ly1g3ntkb880cj20dw08pq3c.jpg',
    'http://ww1.sinaimg.cn/large/9d167ea7ly1g3ntkpjk71j20gn0893yr.jpg'],
  createTime: '@datetime',
  'merchantCommentContent|1': ['@cparagraph(1,4)', ''],
  'merchantCommentTime': '@datetime'
}]

export default [
  {
    url: '/comment/goods-comment\.*',
    type: 'get',
    response: config => {
      const { queryType } = config.query
      const data = Mock.mock({
        'goodsCommentList|1-10': goodsCommentTemplate,
        'total|1-100': 1,
        type: queryType
      })
      return {
        code: 200,
        data: data
      }
    }
  }
]
