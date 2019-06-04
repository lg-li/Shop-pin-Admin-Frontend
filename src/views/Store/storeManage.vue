<template>
  <div class="home-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="18" :lg="18">
        <el-card>
          <div>
            <div class="store-name">{{current_store.name}}</div>

            <div class="store-info-item">
              <div class="item-name">店铺简介</div>
              <div class="item-data">{{current_store.description}}</div>
            </div>

            <div class="store-info-item">
              <div class="item-name">店铺图片</div>
              <el-image
                :src="current_store.logo_url"
                style="width: 300px; height: 200px"
                :fit="scale-down">
              </el-image>
            </div>

            <div class="store-info-item">
              <div class="item-name">店铺电话</div>
              <div class="item-data">{{current_store.phone}}</div>
            </div>

            <div class="store-info-item">
              <div class="item-name">店铺邮箱</div>
              <div class="item-data">{{current_store.email}}</div>
            </div>

            <div class="store-info-item">
              <div class="item-name">创建时间</div>
              <div class="item-data">{{current_store.createTime}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="6" :lg="6">
        <el-card class="right-card">
          <el-button>修改店铺信息</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Store',
    computed: {
      ...mapGetters([
        'current_store'
      ])
    }
}
</script>

<style scoped>
  .home-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: calc(100vh - 84px);
  }

  .store-name {
    font-family: "Microsoft YaHei UI";
    font-size: 33px
  }

  .store-info-item {
    margin-top: 30px;
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
