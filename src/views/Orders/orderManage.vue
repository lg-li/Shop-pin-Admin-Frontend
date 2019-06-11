<template>
  <div class="home-container">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>搜索条件</span>
          </div>
          <div class="filter-item" style="margin-top: 5px">
            <span>订单状态</span>
            <div class="filter-choice">
              <el-radio v-model="listQuery.orderTypeChoice" class="filter-choice-button" label="0" border size="medium">
                全部
              </el-radio>
              <el-radio v-model="listQuery.orderTypeChoice" class="filter-choice-button" label="1" border size="medium">
                未支付
              </el-radio>
              <el-radio v-model="listQuery.orderTypeChoice" class="filter-choice-button" label="2" border size="medium">
                未发货
              </el-radio>
              <el-radio v-model="listQuery.orderTypeChoice" class="filter-choice-button" label="3" border size="medium">
                待收货
              </el-radio>
              <el-radio v-model="listQuery.orderTypeChoice" class="filter-choice-button" label="4" border size="medium">
                待评价
              </el-radio>
              <el-radio v-model="listQuery.orderTypeChoice" class="filter-choice-button" label="5" border size="medium">
                交易完成
              </el-radio>
              <el-radio v-model="listQuery.orderTypeChoice" class="filter-choice-button" label="6" border size="medium">
                退款中
              </el-radio>
              <el-radio v-model="listQuery.orderTypeChoice" class="filter-choice-button" label="7" border size="medium">
                已退款
              </el-radio>
            </div>
          </div>
          <div class="filter-item">
            <span>创建时间</span>
            <div class="filter-choice">
              <el-radio v-model="listQuery.orderDateChoice" style="margin:2px" label="0" border size="medium">全部
              </el-radio>
              <el-radio v-model="listQuery.orderDateChoice" style="margin:2px" label="1" border size="medium">昨天
              </el-radio>
              <el-radio v-model="listQuery.orderDateChoice" style="margin:2px" label="2" border size="medium">今天
              </el-radio>
              <el-radio v-model="listQuery.orderDateChoice" style="margin:2px" label="3" border size="medium">本周
              </el-radio>
              <el-radio v-model="listQuery.orderDateChoice" style="margin:2px" label="4" border size="medium">本月
              </el-radio>
              <el-radio v-model="listQuery.orderDateChoice" style="margin:2px" label="5" border size="medium">本季度
              </el-radio>
              <el-radio v-model="listQuery.orderDateChoice" style="margin:2px" label="6" border size="medium">本年
              </el-radio>
              <el-radio v-model="listQuery.orderDateChoice" style="margin:2px" label="7" border size="medium">自定义
              </el-radio>
            </div>
          </div>
          <div class="filter-item">
            <span>关键字</span>
            <div class="filter-input">
              <el-input v-model="listQuery.key" style="width: 250px" placeholder="姓名、电话、订单号"/>
            </div>
          </div>
          <div class="filter-item">
            <el-button @click="searchOrder">搜索</el-button>
            <el-button @click="refreshOrder">刷新</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top: 16px;">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="orderData"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >

        <el-table-column align="center" label="订单编号" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="用户姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.receiverName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="80px" align="center" label="商品总数">
          <template slot-scope="scope">
            <span>{{ scope.row.totalProductNumber }}</span>
          </template>
        </el-table-column>

        <el-table-column width="80px" align="center" label="商品总价">
          <template slot-scope="scope">
            <span>￥{{ scope.row.totalPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120px" align="center" label="实际支付金额">
          <template slot-scope="scope">
            <span>￥{{ scope.row.payPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="支付时间">
          <template slot-scope="scope">
            <span>{{ scope.row.payTime }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="支付状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.paid | payStatusFilter">
              <span v-if="scope.row.paid===0">未支付</span>
              <span v-else>{{ scope.row.payType }}</span>
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column width="110px" align="center" label="订单状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | orderStatusFilter">
              {{ scope.row.status | orderWordFilter }}
            </el-tag>
            <el-tag v-if="scope.row.refundStatus===1" style="margin-top:4px" type="danger">
              申请退款
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="详情" align="center" min-width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetailOrder(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
        >

        <el-table-column min-width="100px" align="center" label="操作" close-on-click-modal="false">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.paid===1&&scope.row.status===0"
              style="margin-bottom: 4px"
              type="primary"
              plain
              size="mini"
              @click="handleDeliverOrder(scope.row)"
            >
              发货<i class="el-icon-truck el-icon--right"/>
            </el-button>
            <el-dropdown trigger="click">
              <el-button type="primary" plain size="mini">
                操作<i class="el-icon-arrow-down el-icon--right"/>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="scope.row.paid===0" @click.native="handleChangeOrder(scope.row)">修改订单
                </el-dropdown-item>
                <el-dropdown-item @click.native="handleRemarkOrder(scope.row)">订单备注</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.refundStatus===1" @click.native="handleRefundOrder(scope.row)">处理退款
                </el-dropdown-item>
                <el-dropdown-item divided>订单记录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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

    <el-dialog top="4vh" title="修改订单" :visible.sync="orderChangeDialog" close-on-click-modal="false">
      <el-form ref="dataForm" :model="orderTemp" label-position="left" label-width="100px" style="margin:16px;">
        <el-form-item label="订单编号" prop="id">
          <el-input v-model="orderTemp.id" :disabled="true"/>
        </el-form-item>
        <el-form-item label="商品总价" prop="total_price">
          <el-input v-model="orderTemp.totalPrice"/>
        </el-form-item>
        <el-form-item label="原始运费" prop="postage">
          <el-input v-model="orderTemp.postage"/>
        </el-form-item>
        <el-form-item label="实际支付金额" prop="pay_price">
          <el-input v-model="orderTemp.payPrice"/>
        </el-form-item>
        <el-form-item label="实际支付运费" prop="pay_postage">
          <el-input v-model="orderTemp.payPostage"/>
        </el-form-item>
        <el-form-item label="赠送积分" prop="gained_credit">
          <el-input v-model="orderTemp.gainedCredit"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderChangeDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateOrder()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog top="4vh" title="发货" :visible.sync="orderDeliveryDialog" close-on-click-modal="false">
      <el-form ref="dataForm" :model="orderTemp" label-position="left" label-width="70px" style="margin:16px">
        <el-form-item label="发货类型" prop="delivery_type">
          <el-select v-model="orderTemp.deliveryType" placeholder="请选择发货类型">
            <el-option label="线上发货" value="0"/>
            <el-option label="物流发货" value="1"/>
            <el-option label="同城面交" value="2"/>
            <el-option label="皮肉交易" value="3"/>
          </el-select>
        </el-form-item>

        <el-form-item label="物流公司" prop="delivery_name">
          <el-select
            v-model="orderTemp.deliveryName"
            :disabled="orderTemp.deliveryType!=='1'"
            filterable
            placeholder="可输入公司名称搜索"
          >
            <el-option
              v-for="item in deliverNameList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号" prop="delivery_id">
          <el-input v-model="orderTemp.deliveryId" :disabled="orderTemp.deliveryType!=='1'"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderDeliveryDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="deliveryOrder()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog top="4vh" title="订单备注" :visible.sync="orderRemarkDialog">
      <el-form ref="dataForm" :model="orderTemp" label-position="left" label-width="70px" style="margin:16px">
        <el-form-item label="备注" prop="remark">
          <el-input v-model="orderTemp.merchantRemark" :rows="8" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderRemarkDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateOrder()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog top="4vh" title="处理退款" :visible.sync="orderRefundDialog">
      <el-form ref="dataForm" :model="orderTemp" label-position="left" label-width="70px" style="margin:16px;">
        <el-form-item label="退款原因">
          <span>{{ orderTemp.refundReasonExplain }}</span>
        </el-form-item>
        <el-form-item label="退款图片">
          <el-image class="refund-img" :src="orderTemp.refundReasonImage" :fit="contain" lazy>
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-form-item>
        <el-form-item label="申请时间">
          <span>{{ orderTemp.refundApplyTime }}</span>
        </el-form-item>
        <el-form-item label="操作">
          <el-button type="primary" @click="refundAgree=1">
            同意退款
          </el-button>
          <el-button type="primary" @click="refundAgree=2">
            拒绝退款
          </el-button>
        </el-form-item>
        <el-form-item v-if="refundAgree!==0" :label="refundAgree===1?'退款金额':'拒绝理由'">
          <el-input v-if="refundAgree===1" v-model="orderTemp.refundPrice" placeholder="退款金额"/>
          <el-input
            v-if="refundAgree===2"
            v-model="orderTemp.refundRefuseReason"
            :rows="3"
            type="textarea"
            placeholder="拒绝理由"
          />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderRefundDialog = false;refundAgree = 0">
          取消
        </el-button>

        <el-button type="primary" @click="refundOrder">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog top="2vh" title="订单详情" :visible.sync="orderDetailDialog">
      <order-detail-window :order="orderTemp"/>
    </el-dialog>
  </div>
</template>

<script>

  import { getSingleOrderList, getDeliverNameList } from '@/api/order'
  import { mapGetters } from 'vuex'
  import orderDetailWindow from './orderDetailWindow'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'OrderManage',
    computed: {
      ...mapGetters([
        'current_store'
      ])
    },
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
        orderData: [],
        listQuery: {
        orderTypeChoice: '0',
        orderDateChoice: '0',
          key: '',
          pageNumber: 1,
          pageSize: 10,
          sort: '+id'
        },
        loading: false,
        orderChangeDialog: false,
        orderRemarkDialog: false,
        orderDeliveryDialog: false,
        orderRefundDialog: false,
        orderDetailDialog: false,
        orderTemp: {},
        deliverNameList: [],
        refundAgree: 0
      }
    },
    mounted() {
      this.getList()
      this.getCompressList()
    },
    methods: {
      async getCompressList() {
        await new Promise((resolve, reject) => {
          getDeliverNameList().then(response => {
            this.deliverNameList = response.data.deliverNameList
          }).catch(error => {
            reject(error)
          })
        })
      },
      async getList() {
        this.loading = true
        await new Promise((resolve, reject) => {
          getSingleOrderList(this.listQuery)
            .then(response => {
              this.total = response.data.total
              this.orderData = response.data.orderList
              this.loading = false
            }).catch(error => {
            reject(error)
          })
        })
      },
      handleChangeOrder(row) {
        this.orderTemp = Object.assign({}, row) // copy obj
        this.orderChangeDialog = true
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].clearValidate()
        // })
      },
      handleRemarkOrder(row) {
        this.orderTemp = Object.assign({}, row)
        this.orderRemarkDialog = true
      },
      handleRefundOrder(row) {
        this.orderTemp = Object.assign({}, row)
        this.orderRefundDialog = true
      },
      handleDeliverOrder(row) {
        console.log(this.orderTemp)
        this.orderTemp = Object.assign({}, row)
        this.orderDeliveryDialog = true
      },
      handleDetailOrder(row) {
        this.orderTemp = Object.assign({}, row)
        this.orderDetailDialog = true
      },
      deliveryOrder() {
        this.orderDeliveryDialog = false
      },
      updateOrder() {
        this.orderChangeDialog = false
        this.orderRemarkDialog = false
      },
      refundOrder() {
        this.orderRefundDialog = false
        this.refundAgree = 0
      },
      refreshOrder() {
        this.getList()
      },
      searchOrder() {
        this.getList()
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

  .filter-choice-button {
    margin: 0 2px 4px 0;
  }

  .refund-img {
    width: 81%;
    height: 54%;
  }
</style>
