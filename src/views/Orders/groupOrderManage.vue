<template>
  <div class="home-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>搜索条件</span>
          </div>
          <div class="filter-item" style="margin-top: 5px">
            <span>团单状态</span>
            <div class="filter-choice">
              <el-radio v-model="listQuery.groupStatus" style="margin-right:2px" label="0" border size="medium">全部
              </el-radio>
              <el-radio v-model="listQuery.groupStatus" style="margin-right:2px" label="1" border size="medium">正在拼团
              </el-radio>
              <el-radio v-model="listQuery.groupStatus" style="margin-right:2px" label="2" border size="medium">已结束拼团
              </el-radio>
            </div>
          </div>
          <div class="filter-item">
            <span>创建时间</span>
            <div class="filter-choice">
              <el-date-picker
                v-model="listQuery.createTime"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始"
                end-placeholder="结束"
                :picker-options="pickerOptions"
              />
            </div>
          </div>
          <div class="filter-item">
            <el-button @click="getList">搜索</el-button>
            <el-button @click="getList">刷新</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top:16px;">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="orderData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="团单编号" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="80px" align="center" label="团单总价">
          <template slot-scope="scope">
            <span>{{ scope.row.totalAmountOfMoneyPaid }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" align="center" label="拼成时间">
          <template slot-scope="scope">
            <span>{{ scope.row.actualFinishTime }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" align="center" label="结束时间">
          <template slot-scope="scope">
            <span>{{ scope.row.closeTime }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="120px" align="center" label="团单状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status===0?'warning':'success'">
              <span>{{ scope.row.status===0?'拼团中':'已结束' }}</span>
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="内含订单" width="100px" type="expand">
          <template slot-scope="scope">
            <el-card v-for="(order,index) in scope.row.singleOrder" class="order-card">
              <div slot="header" class="clearfix">
                <span>订单编号 {{ order.id }}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="handleDetailOrder(order)">查看详情
                </el-button>
              </div>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="用户姓名">
                  <span>{{ order.receiverName }}</span>
                </el-form-item>

                <el-form-item label="地址">
                  <span>{{ order.deliveryAddress }}</span>
                </el-form-item>

                <el-form-item label="支付状态">
                  <el-tag :type="order.paid | payStatusFilter">
                    <span v-if="order.paid===0">未支付</span>
                    <span v-else>{{ order.payType }}</span>
                  </el-tag>
                  <el-tag v-if="order.refundStatus===1" style="margin-top:4px" type="danger">
                    申请退款
                  </el-tag>
                </el-form-item>

                <el-form-item label="商品总数">
                  <span>{{ order.totalProductNumber }}</span>
                </el-form-item>
                <el-form-item label="商品总价">
                  <span>{{ order.totalPrice }}</span>
                </el-form-item>
                <el-form-item label="实际支付金额">
                  <span>{{ order.payPrice }}</span>
                </el-form-item>

              </el-form>
            </el-card>

          </template>
        </el-table-column>

        <el-table-column min-width="110px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status===0"
              type="primary"
              plain
              size="mini"
              @click="handleChangeFinishTime(scope.row)"
            >
              修改截止时间
            </el-button>
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
    </el-card>

    <el-dialog top="2vh" title="订单详情" :visible.sync="orderDetailDialog">
      <order-detail-window :order="orderTemp"/>
    </el-dialog>

  </div>
</template>

<script>
  import { getGroupOrderList } from '@/api/order'
  import orderDetailWindow from './orderDetailWindow'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'GroupOrderManage',
    components: {
      orderDetailWindow,
      Pagination
    },
    filters: {
      orderStatusFilter(status) {
        const statusMap = {
          0: 'danger',
          1: 'warning',
          2: 'info',
          3: 'success',
          4: 'danger',
          5: 'success',
          6: 'success'
        }
        return statusMap[status]
      },
      orderWordFilter(word) {
        const statusMap = {
          0: '待发货',
          1: '待收货',
          2: '待评价',
          3: '已评价',
          4: '已退款',
          5: '退款拒绝'
        }
        return statusMap[word]
      },
      payStatusFilter(status) {
        const statusMap = {
          0: 'danger',
          1: 'success'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        total: 0,
        orderData: [],
        listQuery: {
          groupStatus: 0,
          createTime: 0,
          pageNumber: 1,
          pageSize: 10,
          sort: '+id'
        },
        loading: false,
        orderChangeDialog: false,
        orderDetailDialog: false,
        orderTemp: {},
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      async getList() {
        this.loading = true
        await new Promise((resolve, reject) => {
          getGroupOrderList(this.listQuery)
            .then(response => {
              this.total = response.data.total
              this.orderData = response.data.orderList
              this.loading = false
            }).catch(error => {
            reject(error)
          })
        })
      },
      handleDetailOrder(order) {
        this.orderTemp = Object.assign({}, order)
        this.orderDetailDialog = true
      }
    }
  }
</script>

<style scoped>
  .home-container {
    background-color: #f0f2f5;
    padding: 16px;
    min-height: calc(100vh - 84px);
  }

  .filter-item {
    margin-top: 20px;
  }

  .filter-item .filter-choice {
    margin-left: 15px;
    display: inline;
  }

  .filter-item .filter-input {
    margin-left: 30px;
    display: inline
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 16px;
    margin-bottom: 0;
    width: 30%;
  }

  .good-img {
    width: 100px;
    height: 100px;
  }

  .refund-img {
    width: 300px;
    height: 200px;
  }

  .el-table__expanded-cell {
    padding: 20px 20px;
  }

  .order-card {
    margin-bottom: 8px;
  }
</style>
