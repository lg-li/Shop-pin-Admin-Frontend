import Mock from 'mockjs'

const data = Mock.mock({
  'stores|6': [{
    id: '@id',
    name: '@city',
    description: '@csentence(10, 20)',
    'logo_url|1': ['http://ww1.sinaimg.cn/large/9d167ea7ly1g3ntjmj587j20dw07tt9o.jpg',
      'http://ww1.sinaimg.cn/large/9d167ea7ly1g3ntk22b6xj20fa08hmxv.jpg',
      'http://ww1.sinaimg.cn/large/9d167ea7ly1g3ntkb880cj20dw08pq3c.jpg',
      'http://ww1.sinaimg.cn/large/9d167ea7ly1g3ntkpjk71j20gn0893yr.jpg'],
    createTime: '@date("yyyy-MM-dd")',
    email: '@email',
    phone: '@integer'
  }]
})

const storeDataTemp = {
  'storeData': {
    'readyToDeliver|1-200': 100,
    'salesReturn|1-200': 100,
    'inventory|1-200': 100,
    'comment|1-200': 100,
    chartData: {
      'commentNum|7': ['@natural(1, 200)'],
      'viewNum|7': ['@natural(1, 200)'],
      'orderNum|7': ['@natural(200,400)']
    }
  }
}

export default [
  {
    url: '/store/storeList\.*',
    type: 'get',
    response: config => {
      const stores = data.stores
      return {
        code: 200,
        message: '',
        data: {
          storeList: stores
        }
      }
    }
  },
  {
    url: '/store/storeInfo',
    type: 'get',
    response: config => {
      const storeData = Mock.mock(storeDataTemp).storeData
      return {
        code: 200,
        message: '',
        data: {
          storeData: storeData
        }
      }
    }
  },
  {
    url: '/store/close-batch',
    type: 'get',
    response: config => {
      const batchList = Mock.mock({
        'batchList|1-10': [{
          id: '@id',
          time: '@time(HH:mm)'
        }]
      })
      return {
        code: 200,
        message: '',
        data: {
          batchList: batchList.batchList
        }
      }
    }
  }
]

