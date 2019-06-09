import Mock from 'mockjs'

const orderTemplate = [{
  'id|+1': 1,
  receiverName: '@cname',
  receiverPhone: '@zip',
  deliveryAddress: '@county(true)',
  'totalProductNumber|1-100': 100,
  'totalPrice|200-1000': 300,
  'postage|200-400.2': 300,
  'payPrice|200-400.2': 300,
  'payPostage|200-400.2': 300,
  'balancePaidPrice|200-300.2': 300,
  payTime: '@datetime',
  'payType|1': ['余额', '微信'],
  createTime: '@datetime',
  'status|0-4': 0,
  'paid|0-1': 0,
  'refundStatus|0-2': 0,
  'refundReasonImage|1': ['http://ww1.sinaimg.cn/large/9d167ea7ly1g3ntjmj587j20dw07tt9o.jpg',
    'http://ww1.sinaimg.cn/large/9d167ea7ly1g3ntk22b6xj20fa08hmxv.jpg',
    'http://ww1.sinaimg.cn/large/9d167ea7ly1g3ntkb880cj20dw08pq3c.jpg',
    'http://ww1.sinaimg.cn/large/9d167ea7ly1g3ntkpjk71j20gn0893yr.jpg'],
  refundReasonExplain: '@cparagraph(1, 3)',
  refundApplyTime: '@datetime',
  refundRefuseReason: '就你个小王八犊子还想退款？你退你🐎呢',
  'refundPrice|200-400.2': 200,
  deliveryName: '',
  deliveryType: '',
  deliveryId: '@id',
  'gainedCredit|1-50': 10,
  merchantRemark: '@cparagraph(1,3)',
  userRemark: '@cparagraph(1,3)',
  'totalCost|1-100': 1,
  'goodsList|1-5': [
    {
      id: 1,
      imageUrls: 'http://img.alicdn.com/imgextra/i2/2838892713/TB2tduXmS8mpuFjSZFMXXaxpVXa_!!2838892713.jpg_430x430q90.jpg',
      name: '大号无盖垃圾桶',
      info: '塑料北欧家用大号无盖垃圾桶 创意简约箱欧式学生宿舍客厅厨房白',
      price: 29.47,
      priceBeforeDiscount: 32.78,
      cost: 30,
      amount: 3
    },
    {
      id: 2,
      imageUrls: 'http://img.alicdn.com/imgextra/i1/2063536833/O1CN01I3Lsbt20LYqCYzIfa_!!2063536833.jpg_430x430q90.jpg',
      name: '卫龙小面筋',
      info: '小面筋辣条32g*5包香辣小吃经典怀旧素肉零食',
      price: 14.40,
      priceBeforeDiscount: 29.50,
      cost: 10,
      'amount|1-10': 1
    }
  ]
}]

const groupOrderTemplate = [{
  'id|+1': 1,
  'status|0-1': 0,
  createTime: '@datetime',
  closeTime: '@datetime',
  actualFinishTime: '@datetime',
  'totalAmountOfMoneyPaid|1-1000': 0,
  'singleOrder|1-10': orderTemplate
}]

export default [
  {
    url: '/order/singleOrderList\.*',
    type: 'get',
    response: config => {
      const { queryType } = config.query
      const data = Mock.mock({
        'orderList|4-12': orderTemplate
      })
      return {
        code: 200,
        data: {
          orderList: data.orderList,
          queryType: queryType,
          total: 100
        }
      }
    }
  },
  {
    url: '/order/deliverNameList',
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: {
          deliverNameList: ['顺丰', '申通', '中通', '圆通', '韵达', '如风达', '京东', '百世']
        }
      }
    }
  },
  {
    url: '/order/groupOrderList\.*',
    type: 'get',
    response: config => {
      const data = Mock.mock({
        'groupOrderList|4-12': groupOrderTemplate,
        'total|1-100': 1
      })
      return {
        code: 200,
        data: {
          orderList: data.groupOrderList,
          total: data.total
        }
      }
    }
  }
]

