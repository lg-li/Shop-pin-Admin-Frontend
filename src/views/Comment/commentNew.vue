<template>
  <div class="home-container">
    <el-card style="margin-bottom: 8px">
      <div class="filter-item">
        <div class="filter-input">
          <el-input v-model="listQuery.Key" style="width: 250px" placeholder="商品名称 编号"/>
        </div>
        <el-button style="margin-left:8px" @click="searchGoods">搜索</el-button>
        <el-button @click="refreshGoods">刷新</el-button>
      </div>
      <el-row v-loading="goodsListLoading" style="margin-top: 8px">
        <el-col
          style=" width: 100%;
                height: 100%;
                float: left;
                overflow-y: hidden;
                overflow-x: auto;
                white-space: nowrap;"
        >
          <el-card
            v-for="(good,index) in goodsData"
            class="good-card"
            style="width: 25vw;
            height: 100%;
            margin: 4px 2px 4px 2px;
            position: relative;
            display: inline-block;"
            @click.native="getCommentByGoods(good)"
          >

            <el-col :span="12">
              <el-image class="good-img" :src="good.imageUrls" :fit="contain" lazy>
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </el-col>
            <el-col :span="12">
              <div style="margin-bottom: 8px">
                <span class="good-text-info">{{ good.name }}</span>
              </div>
              <div style="margin-bottom: 20px"><span
                style="font-size: 30px;font-weight: 500">{{ good.commentNum }}</span>
                <span>条评论</span>
              </div>
            </el-col>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-card>
      <div slot="header" class="clearfix">
        <span>评论列表</span>
      </div>
      <div v-if="commentData.length===0">选择商品以查看评论</div>
      <div style="display:inline">
        <div v-for="(comment,index) in commentData" style="display: inline">
          <el-card class="good-card">
            <div slot="header" class="clearfix">
              <span>{{ comment.createTime }}</span>
              <el-tag style="float: right; padding: 0 3px"
                      :type="comment.grade===0?'success':comment.grade===1?'warning':'danger'">
                <span>{{ comment.grade===0?'好评':comment.grade===1?'中评':'差评' }}</span>
              </el-tag>
            </div>
            <el-col :span="5">
              <el-image class="commentImg" :src="comment.imagesUrls" :fit="contain" lazy>
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </el-col>
            <el-col :span="16"/>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getGoodsWithComment } from '@/api/goods'
  import { getCommentByGoods } from '@/api/comment'
  import Pagination from '@/components/Pagination'
  import { formatTime } from '../../utils'

  export default {
    components: {
      Pagination
    },
    computed: {
      ...mapGetters([
        'current_store'
      ])
    },

    data() {
      return {
        total: 0,
        goodsData: [],
        commentData: [],
        listQuery: {
          pageNumber: 1,
          pageSize: 10,
          sort: '+id',
          Key: ''
        },
        goodsListLoading: false,
        commentListLoading: false
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      async getList() {
        this.goodsListLoading = true
        await new Promise((resolve, reject) => {
          getGoodsWithComment(this.listQuery)
            .then(response => {
              this.goodsData = response.data.goodsList
              this.goodsListLoading = false
            }).catch(error => {
            reject(error)
          })
        })
      },
      setParent(parentId, row) {
        this.childData = []
        row.tempChildCategory = ''
        row.tempChildCategoryId = ''
        for (const val of this.categoryData) {
          if (val.parent.id === parentId) {
            this.childData = val.child
            row.tempParentCategory = val.parent.text
          }
        }
      },
      setChild(childId, row) {
        for (const val of this.childData) {
          if (val.id === childId) {
            row.tempChildCategory = val.text
          }
        }
      },
      confirmEdit(row) {
        if (row.tempChildCategory === '') {
          this.$message({
            message: `商品 ${row.name} 的子级分类未选择`,
            type: 'warning'
          })
          return
        }
        row.edit = false
        row.parentCategory = row.tempParentCategory
        row.parentCategoryId = row.tempParentCategoryId
        row.childCategory = row.tempChildCategory
        row.childCategoryId = row.tempChildCategoryId
        this.$message({
          message: `商品 ${row.name} 的分类修改成功`,
          type: 'success'
        })
      },
      cancelEdit(row) {
        row.tempParentCategory = row.parentCategory
        row.tempParentCategoryId = row.parentCategoryId
        row.tempChildCategory = row.childCategory
        row.tempChildCategoryId = row.childCategoryId
        row.edit = false
        this.$message({
          message: `商品 ${row.name} 的分类修改已撤回`,
          type: 'warning'
        })
      },
      handleEdit(row) {
        row.edit = !row.edit
        for (const val of this.categoryData) {
          if (val.parent.id === row.parentCategoryId) {
            this.childData = val.child
          }
        }
      },
      searchGoods() {
        this.getList()
      },
      refreshGoods() {
        this.getList()
      },
      async getCommentByGoods(goods) {
        this.commentListLoading = true
        await new Promise((resolve, reject) => {
          getCommentByGoods(goods.id)
            .then(response => {
              this.commentData = response.data.goodsCommentList
              this.commentListLoading = false
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

  .filter-item {
    margin-top: 2px;
  }

  .filter-item .filter-choice {
    margin-left: 15px;
    display: inline;
  }

  .filter-item .filter-input {
    display: inline
  }

  .filter-choice-button {
    margin: 0 2px 4px 0;
  }

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
    width: 10vw;
    height: 10vw;
  }

  .commentImg {
    width: 10vw;
    height: 10vw
  }

  .good-card {
    margin: 0 8px 8px 0;
    width: 20vw;
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

  .good-card .el-card__header {
    padding: 8px 8px;
    border-bottom: 1px solid #EBEEF5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>

