<template>
  <el-table :data="goodsData" border fit highlight-current-row style="width: 100%">
    <el-table-column
      v-loading="loading"
      align="center"
      label="ID"
      width="65"
      element-loading-text="载入中"
      fixed="left"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column width="120px" align="center" fixed="left" label="商品名称">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="图片">
      <template slot-scope="scope">
        <img
          style="width: 100px; height: 100px"
          :src="scope.row.image_urls"
          :fit="fit"></img>
      </template>
    </el-table-column>

    <el-table-column min-width="200px" align="center" label="商品简介">
      <template slot-scope="scope">
        <span>{{ scope.row.info}}</span>
      </template>
    </el-table-column>

    <el-table-column width="100px" label="搜索关键字">
      <template slot-scope="{row}">
        <el-tag>{{ row.keyword }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column width="100px" align="center" label="售价">
      <template slot-scope="scope">
        <span>￥{{ scope.row.price }}</span>
      </template>
    </el-table-column>

    <el-table-column width="100px" align="center" label="折扣前售价">
      <template slot-scope="scope">
        <span>￥{{ scope.row.price_before_discount}}</span>
      </template>
    </el-table-column>

    <el-table-column width="80px" align="center" label="单位">
      <template slot-scope="scope">
        <span>{{ scope.row.unit_name}}</span>
      </template>
    </el-table-column>

    <el-table-column width="80px" align="center" label="库存">
      <template slot-scope="scope">
        <span>{{ scope.row.stock_count}}</span>
      </template>
    </el-table-column>

    <el-table-column width="80px" align="center" label="销量">
      <template slot-scope="scope">
        <span>{{ scope.row.sold_count}}</span>
      </template>
    </el-table-column>

    <el-table-column width="80px" align="center" label="是否包邮">
      <template slot-scope="scope">
        <span>{{ scope.row.is_free_shipping==0?'是':'否'}}</span>
      </template>
    </el-table-column>

    <el-table-column width="80px" align="center" label="运费">
      <template slot-scope="scope">
        <span>￥{{ scope.row.is_free_shipping}}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="200px" show-overflow-tooltip="true" align="center" label="商品描述">
      <template slot-scope="scope">
        <span>{{ scope.row.description}}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="购买获得积分" width="95">
      <template slot-scope="scope">
        <span>{{ scope.row.credit_to_give }}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="成本" width="110">
      <template slot-scope="{row}">
        <el-tag :type="row.cost | statusFilter">
          {{ row.cost}}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          10: 'success',
          9: 'info',
          8: 'danger'
        }
        return statusMap[status]
      }
    },
    props: {
      type: {
        type: String,
        default: 'CN'
      }
    },
    data() {
      return {
        goodsData: [
          {
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
          }
        ],
        listQuery: {
          page: 1,
          limit: 5,
          type: this.type,
          sort: '+id'
        },
        loading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        this.$emit('create') // for test
        // fetchList(this.listQuery).then(response => {
        //   this.list = response.data.items
        //   this.loading = false
        // })
      }
    }
  }
</script>

