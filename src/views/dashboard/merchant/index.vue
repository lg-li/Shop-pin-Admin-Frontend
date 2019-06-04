<template>
  <div class="home-container">
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :lg="12" class="card-line">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>当前店铺</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="switchDialog = true">切换店铺</el-button>
          </div>
          <div class="store-name">{{ current_store.name }}</div>
          <div class="store-intro">{{ current_store.description }}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :lg="6" class="card-line">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单</span>
          </div>
          <div class="number">{{ storeData.readyToDeliver }}</div>
          <div class="little-text">待发货</div>
        </el-card>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-line">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单</span>
          </div>
          <div class="number">{{ storeData.salesReturn }}</div>
          <div class="little-text">退换货</div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-line">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品</span>
          </div>
          <div class="number">{{ storeData.inventory }}</div>
          <div class="little-text">库存预警</div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-line">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>评论</span>
          </div>
          <div class="number">{{ storeData.comment }}</div>
          <div class="little-text">新评论</div>
        </el-card>
      </el-col>

    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="12" class="card-line">
        <el-card>
          <line-chart :chart-data="storeData.ChartData"/>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="12" class="card-line">
        <el-card>
          <bar-chart :chart-data="storeData.ChartData"/>
        </el-card>
      </el-col>

    </el-row>

    <el-dialog title="切换店铺" :visible.sync="switchDialog">
      <div>
        <el-radio-group v-model="targetStore">
          <el-radio-button v-for="(store,index) in store_list" :label="index">{{ store.name }}</el-radio-button>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="switchDialog = false">取 消</el-button>
        <el-button type="primary" @click="switchStore">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BarChart from './charts/BarChart'
  import LineChart from './charts/LineChart'
  import store from '@/store'
  import { getStoreInfo } from '@/api/store'

  export default {
    name: 'Dashboard',
    components: {
      BarChart,
      LineChart
    },
    data() {
      return {
        storeData: {},
        temp: {},
        switchDialog: false,
        targetStore: 0

      }
    },
    computed: {
      ...mapGetters([
        'store_list',
        'current_store'
      ])
    },
    mounted() {
      this.getStoreData()
    },
    created() {
      this.getStoreDatas()
    },
    methods: {
      switchStore() {
        store.dispatch('store/changeCurrentStore', this.targetStore)
        this.switchDialog = false
        this.getStoreNum()
      },
      getStoreNum() {
        return new Promise((resolve, reject) => {
          getStoreInfo(this.current_store.id)
            .then(response => {
              this.storeData = response.data.storeData
            }).catch(error => {
            reject(error)
          })
        })
      },

      async getStoreData() {
        try {
          await store.dispatch('store/getStoreList')
          await this.getStoreNum()
        } catch {
      }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .home-container {
    background-color: #f0f2f5;
    padding: 16px;
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

