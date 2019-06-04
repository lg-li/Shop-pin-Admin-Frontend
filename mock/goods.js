import Mock from 'mockjs'

const goodsCategoryTemplate = [{
  id: 2,
  image_urls: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g3hyzea2xdj20a00a0q33.jpg',
  name: '卫龙小面筋',
  info: '小面筋辣条32g*5包香辣小吃经典怀旧素肉零食',
  father_category: '@cword("食药美品装服衣电家表", 2)',
  child_category: '@cword("衣食住行美妆装服车表房电,2)'
}, {
  id: 1,
  image_urls: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g3i0obr482j20d409in0e.jpg',
  name: '大号无盖垃圾桶',
  info: '塑料北欧家用大号无盖垃圾桶 创意简约箱欧式学生宿舍客厅厨房白',
  father_category: '@cword("食药美品装服衣电家表", 2)',
  child_category: '@cword("衣食住行美妆装服车表房电,2)'
}
]

const goodsTemplate = [{
  id: 2,
  image_urls: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g3hyzea2xdj20a00a0q33.jpg',
  name: '卫龙小面筋',
  info: '小面筋辣条32g*5包香辣小吃经典怀旧素肉零食',
  keyword: '辣条',
  price: 14.40,
  price_before_discount: 29.50,
  unit_name: '包',
  stock_count: 50000,
  sold_count: 10000,
  is_shown: 1,
  shipping_fee: 10.00,
  is_free_shipping: 0,
  description: 'Hotstrip mini - 卫龙 1736KJ能量、12%蛋白质、1650辣感跑分 鲜辣任性小面筋',
  credit_to_give: 10,
  cost: 10,
  visit_count: 15000
},
  {
    id: 1,
    image_urls: 'http://ww1.sinaimg.cn/large/9d167ea7ly1g3i0obr482j20d409in0e.jpg',
    name: '大号无盖垃圾桶',
    info: '塑料北欧家用大号无盖垃圾桶 创意简约箱欧式学生宿舍客厅厨房白',
    keyword: '垃圾桶',
    price: 29.47,
    price_before_discount: 32.78,
    unit_name: '个',
    stock_count: 28576,
    sold_count: 39,
    is_shown: 1,
    shipping_fee: 6.00,
    is_free_shipping: 0,
    description: '环保无味，压圈分离设计，稳定设计，坚固耐用，硅胶手提设计',
    credit_to_give: 30,
    cost: 30,
    visit_count: 1000
  }]

export default [
  {
    url: '/goods/goodsList\.*',
    type: 'get',
    response: config => {
      const { queryType } = config.query
      const data = Mock.mock({
        'goodsList|1-10': goodsTemplate,
        type: queryType
      })
      return {
        code: 20000,
        data: data
      }
    }
  },
  {
    url: '/goods/goodsCategory\.*',
    type: 'get',
    response: config => {
      const { id } = config.query
      const data = Mock.mock({
        'goodsList|1-10': goodsCategoryTemplate,
        id: id
      })
      return {
        code: 20000,
        data: data
      }
    }
  }
]
