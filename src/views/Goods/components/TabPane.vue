<template>
  <el-table v-loading="loading" element-loading-text="拼命加载中" :data="goodsData" border fit highlight-current-row
            style="width: 100%">
    <el-table-column align="center" label="ID" width="65" fixed="left">
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
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.image_urls"
          :fit="contain"></el-image>
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
  import { getGoodsList } from '@/api/goods'
  import { mapGetters } from 'vuex'
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
    computed: {
      ...mapGetters([
        'current_store'
      ])
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
    mounted() {
      this.getList()
    },
    methods: {
      async getList() {
        this.loading = true
        await new Promise((resolve, reject) => {
          getGoodsList(this.current_store.id, this.type)
            .then(response => {
              this.goodsData = response.data.goodsList
              this.loading = false
            }).catch(error => {
            reject(error)
          })
        })
      }
    }
  }
</script>

