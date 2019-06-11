import Mock from 'mockjs'

const goodsCategoryTemplate = [{
  id: 2,
  imageUrls: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g3hyzea2xdj20a00a0q33.jpg',
  name: '卫龙小面筋',
  info: '小面筋辣条32g*5包香辣小吃经典怀旧素肉零食',
  parentCategory: '@cword("食药美品装服衣电家表", 2)',
  parentCategoryId: 2,
  childCategory: '@cword("衣食住行美妆装服车表房电,2)',
  'childCategoryId|21-25': 21
}, {
  id: 1,
  imageUrls: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g3i0obr482j20d409in0e.jpg',
  name: '大号无盖垃圾桶',
  info: '塑料北欧家用大号无盖垃圾桶 创意简约箱欧式学生宿舍客厅厨房白',
  parentCategory: '@cword("食药美品装服衣电家表", 2)',
  parentCategoryId: 1,
  childCategory: '@cword("衣食住行美妆装服车表房电,2)',
  'childCategoryId|11-14': 11
}
]

const goodsCommentTemplate = [{
  id: 2,
  imageUrls: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g3hyzea2xdj20a00a0q33.jpg',
  name: '卫龙小面筋',
  info: '小面筋辣条32g*5包香辣小吃经典怀旧素肉零食',
  'commentNum|1-10': 2
},
  {
    id: 1,
    imageUrls: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g3i0obr482j20d409in0e.jpg',
    name: '大号无盖垃圾桶',
    info: '塑料北欧家用大号无盖垃圾桶 创意简约箱欧式学生宿舍客厅厨房白',
    'commentNum|1-10': 1
  }
]

const goodsTemplate = [{
  id: 2,
  imageUrls: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g3hyzea2xdj20a00a0q33.jpg',
  name: '卫龙小面筋',
  info: '小面筋辣条32g*5包香辣小吃经典怀旧素肉零食',
  keyword: '辣条',
  price: 14.40,
  priceBeforeDiscount: 29.50,
  unitName: '包',
  stockCount: 50000,
  soldCount: 10000,
  isShown: 1,
  shippingFee: 10.00,
  isFreeShipping: 0,
  description: 'Hotstrip mini - 卫龙 1736KJ能量、12%蛋白质、1650辣感跑分 鲜辣任性小面筋',
  creditToGive: 10,
  cost: 10,
  visitCount: 15000
},
  {
    id: 1,
    imageUrls: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g3i0obr482j20d409in0e.jpg',
    name: '大号无盖垃圾桶',
    info: '塑料北欧家用大号无盖垃圾桶 创意简约箱欧式学生宿舍客厅厨房白',
    keyword: '垃圾桶',
    price: 29.47,
    priceBeforeDiscount: 32.78,
    unitName: '个',
    stockCount: 28576,
    soldCount: 39,
    isShown: 1,
    shippingFee: 6.00,
    isFreeShipping: 0,
    description: '环保无味，压圈分离设计，稳定设计，坚固耐用，硅胶手提设计',
    creditToGive: 30,
    cost: 30,
    visitCount: 1000
  }]

export default [
  {
    url: '/goods/goodsList\.*',
    type: 'get',
    response: config => {
      const { queryType } = config.query
      const data = Mock.mock({
        'goodsList|1-10': goodsTemplate,
        'total|1-100': 1,
        type: queryType
      })
      return {
        code: 200,
        data: data
      }
    }
  },
  {
    url: '/goods/goodsCategory\.*',
    type: 'get',
    response: config => {
      const data = Mock.mock({
        'goodsList|1-10': goodsCategoryTemplate,
        'total|1-100': 1
      })
      return {
        code: 200,
        data: data
      }
    }
  },
  {
    url: '/goods/goodsWithComment',
    type: 'get',
    response: config => {
      const data = Mock.mock({
        'goodsList|1-10': goodsCommentTemplate
      })
      return {
        code: 200,
        data: data
      }
    }
  },
  {
    url: '/goods/categoryList',
    type: 'get',
    response: config => {
      const data = {
        categoryList: [
          {
            parent: { id: 1, text: '女装' },
            child: [
              { id: 11, text: 'T恤' },
              { id: 12, text: '连衣裙' },
              { id: 13, text: '卫衣' },
              { id: 14, text: '牛仔裤' }
            ]
          },
          {
            parent: { id: 2, text: '食品' },
            child: [
              { id: 21, text: '无辣不欢' },
              { id: 22, text: '深夜食堂' },
              { id: 23, text: '地方特产' },
              { id: 24, text: '坚果炒货' },
              { id: 25, text: '蜜饯果干' }
            ]
          }
        ]

      }
      return {
        code: 200,
        data: data
      }
    }
  }
]
