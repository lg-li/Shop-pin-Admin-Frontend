<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" type="border-card" style="margin-top:15px;">
      <el-tab-pane key="basic" label="基本信息" name="basic">
        <keep-alive>
          <basic-info v-if="activeName==='basic'"/>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane key="time" label="收团时间" name="time">
        <keep-alive>
          <time-set v-if="activeName==='time'"/>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import basicInfo from './basicInfo'
  import timeSet from './timeSet'

  export default {
    name: 'Tab',
    components: { basicInfo, timeSet },
    data() {
      return {
        activeName: 'basic'
      }
    },
    watch: {
      activeName(val) {
        this.$router.push(`${this.$route.path}?tab=${val}`)
      }
    },
    created() {
      // init the default  selected tab
      const tab = this.$route.query.tab
      if (tab) {
        this.activeName = tab
      }
    }
}
</script>

<style scoped>
  .tab-container {
    background-color: #f0f2f5;
    padding: 16px;
    min-height: calc(100vh - 84px);
  }

  .store-info-item .item-name {
    margin-bottom: 15px;
    font-size: 16px;
    color: #1482f0;
  }

  .store-info-item .item-data {
    font-size: 20px
  }

  .right-card {
    align: center;
  }
</style>
