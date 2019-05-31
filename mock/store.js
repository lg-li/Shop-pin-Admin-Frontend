import Mock from 'mockjs'

const data = Mock.mock({
  'stores|6': [{
    id: '@id',
    name: '@city',
    description: '@csentence(10, 20)',
    'logo_url|1': ['published', 'draft', 'deleted']
  }]
})

export default [
  {
    url: '/store/storeList',
    type: 'get',
    response: config => {
      const stores = data.stores
      return {
        code: 20000,
        data: {
          storeList: stores
        }
      }
    }
  }
]
