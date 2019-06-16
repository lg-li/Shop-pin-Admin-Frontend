<template>
  <div>
    <el-row style="margin-bottom: 8px">
      <el-col :span="24">
        <el-card>
          <div class="filter-item">
            <div class="filter-input">
              <el-input
                v-model="listQuery.key"
                style="width: 250px"
                placeholder="商品名称 关键字 编号"
                @keyup.enter.native="getList"
              />
            </div>
            <el-button style="margin-left:8px" @click="getList">搜索</el-button>
            <el-button @click="getList">刷新</el-button>
          </div>
          <div class="filter-item">
            <el-button @click="handleAddGoods">添加商品</el-button>
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
            :data="scope.row.productAttributeValues"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column align="center" label="ID" width="65" fixed="left">
              <template slot-scope="item">
                <span>{{ item.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px" align="center" label="图片">
              <template slot-scope="item">
                <el-image
                  style="width: 80px; height: 80px"
                  :src="item.row.imageUrl"
                  :fit="contain"
                  lazy
                />
              </template>
            </el-table-column>
            <el-table-column align="center" label="SKU" width="130">
              <template slot-scope="item">
                <span>{{ item.row.sku }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="库存" width="100">
              <template slot-scope="item">
                <span>{{ item.row.stock }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="价格" width="80">
              <template slot-scope="item">
                <span>{{ item.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="成本价" width="80">
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

    <el-dialog top="4vh" title="新增商品" :visible.sync="addGoodsDialog" close-on-click-modal="false">
      <el-steps :active="addStep" finish-status="success">
        <el-step title="确定基本信息" />
        <el-step title="确定属性" />
        <el-step title="确定SKU" />
      </el-steps>
      <div v-if="addStep===0">
        <el-form ref="dataForm" :model="newGoodsTemp" label-position="left" label-width="100px" style="margin:16px;">
          <el-form-item label="商品名称" prop="id">
            <el-input v-model="newGoodsTemp.name" />
          </el-form-item>
          <el-form-item label="商品简介" prop="total_price">
            <el-input v-model="newGoodsTemp.info" />
          </el-form-item>
          <el-form-item label="搜索关键字" prop="postage">
            <el-input v-model="newGoodsTemp.keyword" />
          </el-form-item>
          <el-form-item label="描述" prop="total_price">
            <el-input v-model="newGoodsTemp.description" />
          </el-form-item>
          <el-form-item label="显示价格" prop="pay_price">
            <el-input v-model="newGoodsTemp.price" />
          </el-form-item>
          <el-form-item label="折扣前金额" prop="pay_price">
            <el-input v-model="newGoodsTemp.priceBeforeDiscount" />
          </el-form-item>
          <el-form-item label="单位名" prop="pay_postage">
            <el-input v-model="newGoodsTemp.unitName" />
          </el-form-item>
          <el-form-item label="是否包邮" prop="gained_credit">
            <el-switch
              v-model="newGoodsTemp.isFreeShipping"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="包邮"
              inactive-text="不包邮"
            >>
            </el-switch>
          </el-form-item>
          <el-form-item v-show="newGoodsTemp.isFreeShipping==false" label="邮费" prop="pay_postage">
            <el-input v-model="newGoodsTemp.shippingFee" />
          </el-form-item>
          <el-form-item label="购买获得积分" prop="pay_postage">
            <el-input v-model="newGoodsTemp.creditToGive" />
          </el-form-item>
        </el-form>
      </div>

      <div v-if="addStep===1">
        <el-button @click="addNewAttribute">添加新属性</el-button>
        <el-table
          :data="attributeList"
          border
          fit
          style="width: 100%"
        >
          <el-table-column align="center" label="属性名" width="80" fixed="left">
            <template slot-scope="item">
              <el-input v-model="item.row.attributeName" />
            </template>
          </el-table-column>

          <el-table-column align="center" label="属性值" width="150" fixed="left">
            <template slot-scope="item">
              <el-tag v-for="attribute in item.row.attributeValue.split(';')" type="info">
                {{ attribute }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="新属性值" width="180" fixed="left">
            <template slot-scope="item">
              <el-input v-model="item.row.newAttributeValue" style="width: 70px" />
              <el-button @click="addNewAttributeValue(item.row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="删除" width="100" fixed="left">
            <template slot-scope="item">
              <el-button @click="deleteAttribute(item.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="addStep===2">
        <el-button @click="addNewSku">添加新SKU</el-button>
        <el-table
          :data="skuList"
          border
          fit
          style="width: 100%"
        >
          <el-table-column v-for="attribute in attributeList" align="center" :label="attribute.attributeName" width="120">
            <template slot-scope="item">
              <el-select v-model="attribute.attributeChoice" placeholder="请选择">
                <el-option
                  v-for="item in attribute.attributeValue.split(';')"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column align="center" label="生成SKU" width="80">
            <template slot-scope="item">
              <el-button @click="generateSku(item.row)">生成SKU</el-button>
            </template>
          </el-table-column>

          <el-table-column align="center" label="SKU" width="100">
            <template slot-scope="item">
              <span>{{ item.row.sku }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="库存" width="80">
            <template slot-scope="item">
              <el-input v-model="item.row.stock" />
            </template>
          </el-table-column>

          <el-table-column align="center" label="价格" width="80">
            <template slot-scope="item">
              <el-input v-model="item.row.price" />
            </template>
          </el-table-column>

          <el-table-column align="center" label="成本" width="80">
            <template slot-scope="item">
              <el-input v-model="item.row.cost" />
            </template>
          </el-table-column>

          <el-table-column align="center" label="删除" width="100">
            <template slot-scope="item">
              <el-button @click="deleteAttribute(item.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="orderChangeDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="nextStep()">{{ addStep!==2?'下一步':'确定' }}</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsList, addProduct, addSkuDefinition, addSkuValue } from '@/api/goods'
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
      total: 1,
      goodsData: [],
      listQuery: {
        pageNumber: 1,
        pageSize: 10,
        key: '',
        type: this.type,
        sort: '+id'
      },
      newGoodsTemp: {
        shippingFee: 0,
        cost: 100
      },
      attributeList: [], // 当前商品属性表
      skuList: [], // 当前商品SKU表
      loading: false,
      addGoodsDialog: false,
      addStep: 0,
      newAttributeValue: ''
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
    },
    handleAddGoods() {
      this.newGoodsTemp = {
        isFreeShipping: true,
        shippingFee: 0,
        cost: 100
      },
      this.addStep = 0
      this.addGoodsDialog = true
    },
    addNewAttribute() {
      this.attributeList.push({
        attributeName: '',
        attributeValue: '',
        attributeChoice: ''
      })
    },
    addNewSku() {
      this.skuList.push({
        sku: '',
        attributeList: this.attributeList,
        stock: 0,
        price: 0,
        cost: 0
      })
    },
    addNewAttributeValue(row) {
      if (row.attributeValue.length === 0) {
        row.attributeValue = row.attributeValue + row.newAttributeValue
      } else {
        row.attributeValue = row.attributeValue + ';' + row.newAttributeValue
      }
      row.newAttributeValue = ''
    },
    deleteAttribute(row) {
      for (let i = 0; i < this.attributeList.length; i++) {
        if (this.attributeList[i].attributeName === row.attributeName) {
          this.attributeList.splice(i, 1)
          break
        }
      }
    },
    generateSku(row) {
      console.log(row)
      for (let i = 0; i < this.attributeList.length; i++) {
        row.sku = row.sku + this.attributeList[i].attributeChoice + ';'
      }
      row.sku = row.sku.substring(0, row.sku.length - 1)
    },
    nextStep() {
      if (this.addStep === 0) {
        this.addNewProduct()
      }
      if (this.addStep === 1) {
        this.addNewAttributeList()
      }
      if (this.addStep === 2) {
        this.addNewSkuList()
      }
    },
    async addNewProduct() {
      await new Promise((resolve, reject) => {
        addProduct(this.newGoodsTemp)
          .then(response => {
            this.newGoodsTemp.id = response.data.id
            this.$message({
              message: '商品创建成功',
              type: 'success'
            })
            this.addStep++
          }).catch(error => {
            reject(error)
          })
      })
    },
    async addNewAttributeList() {
      await new Promise((resolve, reject) => {
        addSkuDefinition({
          productId: this.newGoodsTemp.id,
          attribute: this.attributeList
        })
          .then(response => {
            this.$message({
              message: '商品属性创建成功',
              type: 'success'
            })
            this.addStep++
          }).catch(error => {
            reject(error)
          })
      })
    },

    async addNewSkuList() {
      await new Promise((resolve, reject) => {
        addSkuValue({
          productId: this.newGoodsTemp.id,
          list: this.skuList
        })
          .then(response => {
            this.$message({
              message: '商品SKU创建成功',
              type: 'success'
            })
            this.addGoodsDialog = false
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

