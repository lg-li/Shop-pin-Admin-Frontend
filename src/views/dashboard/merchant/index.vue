<template>
  <div class="home-container">
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :lg="12" class="card-line">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>当前店铺</span>
            <el-button style="float: right; padding: 3px 0" @click="switchStore"type="text">切换店铺</el-button>
          </div>
          <div class="store-name">{{current_store.name}}</div>
          <div class="store-intro">{{current_store.description}}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :lg="6" class="card-line">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单</span>
          </div>
          <div class="number">{{readyToDeliver}}</div>
          <div class="little-text">待发货</div>
        </el-card>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-line">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单</span>
          </div>
          <div class="number">{{salesReturn}}</div>
          <div class="little-text">退换货</div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-line">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品</span>
          </div>
          <div class="number">{{inventory}}</div>
          <div class="little-text">库存预警</div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-line">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>评论</span>
          </div>
          <div class="number">{{comment}}</div>
          <div class="little-text">新评论</div>
        </el-card>
      </el-col>

    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="12" class="card-line">
        <el-card>
          <line-chart :chart-data="lineChartData"/>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="12" class="card-line">
        <el-card>
          <bar-chart/>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BarChart from './charts/BarChart'
  import LineChart from './charts/LineChart'
  import store from '@/store'

  export default {
    name: 'Dashboard',
    components: {
      BarChart,
      LineChart
    },
    data() {
      return {
        readyToDeliver: 14, //待发货
        salesReturn: 22, //退换货
        inventory: 3, //库存预警
        comment: 99, //评论
        lineChartData: {
          expectedData: [100, 120, 161, 134, 105, 160, 165],
          actualData: [120, 82, 91, 154, 162, 140, 145]
        }
      }

    },
    computed: {
      ...mapGetters([
        'store_list',
        'current_store'
      ])
    },
    methods:{
      async getStoreInfo(){
        try {
          await store.dispatch('store/getStoreInfo')
        }catch {

        }
      }
    },
    created() {
     this.getStoreInfo()
      // if (!this.roles.includes('admin')) {
      //   this.currentRole = 'merchantDashboard'
      // }
    }
  }
</script>

<style lang="scss" scoped>


  .home-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: calc(100vh - 84px);
  }

  .number {
    font-size: 33px;
  }
  .store-name {
    font-family: "Microsoft JhengHei";
    font-size:25px;
  }

  .store-intro {
    margin-top:20px;
    font-size:15px;
  }

  .component-item {
    min-height: 100px;
  }

  .card-line {
    margin-bottom: 16px;
  }

  .little-text {
    font-size: 16px;
    margin-top: 8px;
  }


  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 16px;
  }
</style>



