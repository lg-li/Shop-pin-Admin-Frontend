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
              <el-radio style="margin-right:2px" v-model="orderTypeChoice" label="0" border size="medium">全部</el-radio>
              <el-radio style="margin-right:2px" v-model="orderTypeChoice" label="1" border size="medium">未支付</el-radio>
              <el-radio style="margin-right:2px" v-model="orderTypeChoice" label="2" border size="medium">未发货</el-radio>
              <el-radio style="margin-right:2px" v-model="orderTypeChoice" label="3" border size="medium">待收货</el-radio>
              <el-radio style="margin-right:2px" v-model="orderTypeChoice" label="4" border size="medium">待评价</el-radio>
              <el-radio style="margin-right:2px" v-model="orderTypeChoice" label="5" border size="medium">交易完成
              </el-radio>
              <el-radio style="margin-right:2px" v-model="orderTypeChoice" label="6" border size="medium">退款中</el-radio>
              <el-radio style="margin-right:2px" v-model="orderTypeChoice" label="7" border size="medium">已退款</el-radio>
            </div>
          </div>
          <div class="filter-item">
            <span>创建时间</span>
            <div class="filter-choice">
              <el-radio style="margin-right:2px" v-model="orderDateChoice" label="0" border size="medium">全部</el-radio>
              <el-radio style="margin-right:2px" v-model="orderDateChoice" label="1" border size="medium">昨天</el-radio>
              <el-radio style="margin-right:2px" v-model="orderDateChoice" label="2" border size="medium">今天</el-radio>
              <el-radio style="margin-right:2px" v-model="orderDateChoice" label="3" border size="medium">本周</el-radio>
              <el-radio style="margin-right:2px" v-model="orderDateChoice" label="4" border size="medium">本月</el-radio>
              <el-radio style="margin-right:2px" v-model="orderDateChoice" label="5" border size="medium">本季度</el-radio>
              <el-radio style="margin-right:2px" v-model="orderDateChoice" label="6" border size="medium">本年</el-radio>
              <el-radio style="margin-right:2px" v-model="orderDateChoice" label="7" border size="medium">自定义</el-radio>
            </div>
          </div>
          <div class="filter-item">
            <span>关键字</span>
            <div class="filter-input">
              <el-input :model="orderKey" style="width: 250px" placeholder="姓名、电话、订单号"></el-input>
            </div>
          </div>
          <div class="filter-item">
            <el-button>搜索</el-button>
            <el-button>刷新</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
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
                :fit="scale-down"></el-image>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="商品简介">
            <template slot-scope="scope">
              <span>{{ scope.row.info}}</span>
            </template>
          </el-table-column>

          <el-table-column width="150px" sortable align="center" label="父级分类">
            <template slot-scope="scope">
              <span>{{ scope.row.father_category}}</span>
            </template>
          </el-table-column>


          <el-table-column width="150px" sortable align="center" label="子级分类">
            <template slot-scope="scope">
              <span>{{ scope.row.child_category }}</span>
            </template>
          </el-table-column>

          <el-table-column min-width="200" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'OrderManage',
    data() {
      return {
        orderTypeChoice: '0',
        orderDateChoice: '0',
        orderKey: ''
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

</style>
