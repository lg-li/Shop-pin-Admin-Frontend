<template>
  <div>
    <el-row style="margin-bottom: 8px">
      <el-col :span="24">
        <el-card>
          <div class="filter-item">
            <div class="filter-input">
              <el-input v-model="listQuery.key" style="width: 250px" placeholder="商品名称 关键字 编号"
                        @keyup.enter.native="getList"/>
            </div>
            <el-button style="margin-left:8px" @click="getList">搜索</el-button>
            <el-button @click="getList">刷新</el-button>
          </div>
          <div class="filter-item">
            <el-button @click="searchOrder">添加商品</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="goodsData"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="65" fixed="left">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="商品种类" width="100px" type="expand">
        <template slot-scope="scope">
          <el-table
            :data="scope.row.skuList"
            border
            fit
            highlight-current-row
            style="width: 100%">
            <el-table-column align="center" label="ID" width="65" fixed="left">
              <template slot-scope="item">
                <span>{{ item.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px" align="center" label="图片">
              <template slot-scope="item">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.row.imageUrl"
                  :fit="contain"
                  lazy
                />
              </template>
            </el-table-column>
            <el-table-column align="center" label="SKU" width="65" fixed="left">
              <template slot-scope="item">
                <span>{{ item.row.sku }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="库存" width="65" fixed="left">
              <template slot-scope="item">
                <span>{{ item.row.stock }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="价格" width="65" fixed="left">
              <template slot-scope="item">
                <span>{{ item.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="成本价" width="65" fixed="left">
              <template slot-scope="item">
                <span>{{ item.row.cost }}</span>
              </template>
            </el-table-column>
          </el-table>
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
            :src="scope.row.imageUrls"
            :fit="contain"
            lazy
          />
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="center" label="商品简介">
        <template slot-scope="scope">
          <span>{{ scope.row.info }}</span>
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
          <span>￥{{ scope.row.priceBeforeDiscount }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="单位">
        <template slot-scope="scope">
          <span>{{ scope.row.unitName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="库存">
        <template slot-scope="scope">
          <span>{{ scope.row.stockCount }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="销量">
        <template slot-scope="scope">
          <span>{{ scope.row.soldCount }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="是否包邮">
        <template slot-scope="scope">
          <span>{{ scope.row.isFreeShipping==0?'是':'否' }}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="运费">
        <template slot-scope="scope">
          <span>￥{{ scope.row.shippingFee }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" show-overflow-tooltip="true" align="center" label="商品描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="购买获得积分" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.creditToGive }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="成本" width="110">
        <template slot-scope="{row}">
          <span>￥{{ row.cost }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNumber"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
  import { getGoodsList } from '@/api/goods'
  import { mapGetters } from 'vuex'
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination
    },
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
        total: 0,
        goodsData: [],
        listQuery: {
          pageNumber: 1,
          pageSize: 10,
          key: '',
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
          getGoodsList(this.type, this.listQuery)
            .then(response => {
              this.goodsData = response.data.goodsList
              this.total = response.data.total
              this.loading = false
            }).catch(error => {
            reject(error)
          })
        })
      }
    }
  }
</script>

<style scoped>

  .filter-item {
    margin-top: 20px;
  }

  .filter-item .filter-choice {
    margin-left: 15px;
    display: inline;
  }

  .filter-item .filter-input {
    display: inline
  }

  .filter-choice-button {
    margin: 0 2px 4px 0;
  }

  .refund-img {
    width: 81%;
    height: 54%;
  }
</style>

