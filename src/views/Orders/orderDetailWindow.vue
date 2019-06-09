<template>
  <div>
    <h2>基本信息</h2>
    <el-form label-position="left" inline class="demo-table-expand">
      <el-form-item label="订单编号">
        <span>{{ order.id }}</span>
      </el-form-item>
      <el-form-item label="用户姓名">
        <span>{{ order.receiverName }}</span>
      </el-form-item>
      <el-form-item label="商品总数">
        <span>{{ order.totalProductNumber }}</span>
      </el-form-item>
    </el-form>
    <h2>金额</h2>
    <el-form label-position="left" inline class="demo-table-expand">
      <el-form-item label="商品总价">
        <span>{{ order.totalPrice }}</span>
      </el-form-item>
      <el-form-item label="实际支付金额">
        <span>{{ order.payPrice }}</span>
      </el-form-item>
      <el-form-item label="余额支付的金额部分">
        <span>{{ order.balancePaidPrice }}</span>
      </el-form-item>
      <el-form-item label="赠送积分">
        <span>{{ order.gainedCredit }}</span>
      </el-form-item>
    </el-form>
    <h2>商品</h2>
    <div style="height: 30vh;">
      <el-scrollbar style="height: 100%">
        <div v-for="(good,index) in order.goodsList">
          <el-col :span="24" style="margin-bottom: 4px">
            <el-card class="good-card">
              <el-col :span="5">
                <el-image :src="good.imageUrls" :fit="contain" lazy>
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
              </el-col>
              <el-col :span="16">
                <div style="margin-bottom: 8px"><span class="good-text">商品名称</span> <span class="good-text-info">{{ good.name }}</span>
                </div>
                <div style="margin-bottom: 8px"><span class="good-text">商品价格</span> <span class="good-text-info">{{ good.price }}</span>
                </div>
                <div style="margin-bottom: 8px"><span class="good-text">商品数量</span> <span class="good-text-info">{{ good.amount }}</span>
                </div>
              </el-col>
            </el-card>
          </el-col>
        </div>
      </el-scrollbar>
    </div>
    <h2>配送</h2>
    <el-form label-position="left" inline class="demo-table-expand">

      <el-form-item label="电话">
        <span>{{ order.receiverPhone }}</span>
      </el-form-item>
      <el-form-item label="地址">
        <span>{{ order.deliveryAddress }}</span>
      </el-form-item>
      <el-form-item label="邮费">
        <span>{{ order.postage }}</span>
      </el-form-item>
      <el-form-item label="支付邮费">
        <span>{{ order.payPostage }}</span>
      </el-form-item>

      <el-form-item label="快递名称">
        <span>{{ order.deliveryName }}</span>
      </el-form-item>
      <el-form-item label="发货类型">
        <span>{{ order.deliveryType }}</span>
      </el-form-item>
      <el-form-item label="快递单号">
        <span>{{ order.deliveryId }}</span>
      </el-form-item>
    </el-form>

    <h2>备注</h2>
    <el-form label-position="left" inline class="demo-table-expand">
      <el-form-item label="商家备注">
        <span>{{ order.merchantRemark }}</span>
      </el-form-item>
      <el-form-item label="用户备注">
        <span>{{ order.userRemark }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'OrderDetailWindow',
    props: {
      order: {
        type: Object,
        required: true
      },
      test: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 45px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 16px;
    margin-bottom: 0;
    width: 45%;
  }

  .good-img {
    width: 100px;
    height: 100px;
  }

  .good-card {
    margin: 0px 8px;
  }

  .good-card .good-text {
    font-size: 14px;
    color: #606266;
    line-height: 20px;
    margin: 0 12px 0 4px;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  }

  .good-card .good-text-info {
    font-size: 14px;
    line-height: 20px;
  }

  .el-dialog__body {
    padding: 5px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }

</style>
