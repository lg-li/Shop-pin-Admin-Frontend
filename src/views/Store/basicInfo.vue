<template>
  <div class="home-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="18" :lg="18">
        <div>
          <div class="store-name">{{ current_store.name }}</div>

          <div class="store-info-item">
            <div class="item-name">店铺简介</div>
            <div class="item-data">{{ current_store.description }}</div>
          </div>

          <div class="store-info-item">
            <div class="item-name">店铺LOGO</div>
            <el-image
              :src="current_store.logoUrl"
              style="width: 30%; height: 30%"
              :fit="scale-down"
            />
          </div>

          <div class="store-info-item">
            <div class="item-name">店铺电话</div>
            <div class="item-data">{{ current_store.phone }}</div>
          </div>

          <div class="store-info-item">
            <div class="item-name">店铺邮箱</div>
            <div class="item-data">{{ current_store.email }}</div>
          </div>

          <div class="store-info-item">
            <div class="item-name">创建时间</div>
            <div class="item-data">{{ current_store.createTime |parseTime }}</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="6" :lg="6">
        <div class="right-card" style="text-align:center">
          <el-button style="margin-bottom: 8px" @click="handleChangeStoreInfo(current_store,1)">修改店铺</el-button>
          <el-button style="margin-left:0px" @click="handleChangeStoreInfo({},2)">新增店铺</el-button>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      top="2vh"
      :title="dialogType===1?'修改店铺信息':'创建店铺'"
      :visible.sync="changeStoreDialog"
      :close-on-click-modal="false"
    >
      <el-form ref="dataForm" :model="storeTemp" label-position="left" label-width="70px" style="margin:16px;">
        <el-form-item label="店铺名称">
          <el-input v-model="storeTemp.name" />
        </el-form-item>

        <el-form-item label="店铺简介" prop="description">
          <el-input v-model="storeTemp.description" />
        </el-form-item>
        <el-form-item label="店铺电话" prop="phone">
          <el-input v-model="storeTemp.phone" />
        </el-form-item>
        <el-form-item label="店铺邮箱" prop="email">
          <el-input v-model="storeTemp.email" />
        </el-form-item>
        <el-form-item label="店铺LOGO" prop="url">
          <el-button style="margin-bottom: 8px" @click="toggleShow">设置图片</el-button>
          <my-upload
            v-model="show"
            method="post"
            :field="storeTemp.name+'_store_logo'"
            :width="200"
            :height="200"
            url="http://localhost:5488/manager/store/upload"
            img-format="png"
            :params="uploadParams"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
          />
          <el-image
            v-if="storeTemp.logoUrl"
            :src="storeTemp.logoUrl"
            style="width: 40%; height: 40%"
            :fit="scale-down"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="storeTemp = {};changeStoreDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="changeStoreInfo()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import myUpload from '@/components/ImageUpload/index'
import { parseTime } from '@/utils/index'
import { updateStore } from '@/api/store'
import store from '@/store'
export default {
  name: 'Store',
  components: {
    'my-upload': myUpload
  },
  filters: {
    parseTime
  },
  computed: {
    ...mapGetters([
      'current_store'
    ])
  },
  data() {
    return {
      storeTemp: {},
      changeStoreDialog: false,
      dialogType: 1,
      show: false,
      imgDataUrl: '', // the datebase64 url of created image
      uploadParams: {
        smfile: 'StoreLogoUrl'
      }
    }
  },
  methods: {
    changeStoreInfo() {
      if (this.dialogType === 1) {
        new Promise((resolve, reject) => {
          updateStore(this.storeTemp).then(async response => {
            resolve(response)
            this.$message({
              'message': '修改成功',
              'type': 'success'
            })
            this.changeStoreDialog = false
            await store.dispatch('store/getStoreList')
          }).catch(error => {
            reject(error)
          })
        }).then((resolve) => {

        })
      }
    },
    handleChangeStoreInfo(store, type) {
      if (type === 1) {
        this.storeTemp = Object.assign({}, store)
        this.dialogType = 1
      } else {
        this.storeTemp = {}
        this.storeTemp.createTime = new Date()
        this.dialogType = 2
      }
      this.changeStoreDialog = true
    },
    toggleShow() {
      this.show = !this.show
    },
    cropSuccess(imgDataUrl, field) {
      console.log(field + '选取成功！' + imgDataUrl)
      this.imgDataUrl = imgDataUrl
    },
    cropUploadSuccess(jsonData, field) {
      // console.log('-------- upload success --------')
      console.log(jsonData)
      // console.log('field: ' + field)
      this.storeTemp.imageDataUrl = jsonData.data.url
    },
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    }

  }
}
</script>

<style scoped>
  .home-container {
    /*background-color: #f0f2f5;*/
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
