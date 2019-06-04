<template>
  <div class="home-container">
    <el-card>
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

        <el-table-column min-width="150" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getGoodsCategory } from '@/api/goods'

  export default {
    computed: {
      ...mapGetters([
        'current_store'
      ])
    },

    data() {
      return {
        goodsData: [],
        listQuery: {
          page: 1,
          limit: 5,
          type: this.type,
          sort: '+id'
        },
        loading: false
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      async getList() {
        this.loading = true
        await new Promise((resolve, reject) => {
          getGoodsCategory(this.current_store.id)
            .then(response => {
              this.goodsData = response.data.goodsList
              this.loading = false
            }).catch(error => {
            reject(error)
          })
        })
      }
    }
  }
</script>

<style>
  .home-container {
    background-color: #f0f2f5;
    padding: 16px;
    min-height: calc(100vh - 84px);
  }
</style>

