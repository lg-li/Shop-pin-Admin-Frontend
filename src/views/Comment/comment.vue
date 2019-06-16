<template>
  <div class="home-container">
    <el-card style="margin-bottom: 8px">
      <div class="filter-item">
        <div class="filter-input">
          <el-input v-model="listQuery.Key" style="width: 250px" placeholder="商品名称 编号" />
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
            :key="'good'+index"
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
                                                 style="font-size: 30px;font-weight: 500"
                                               >{{ good.nums }}</span>
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
      <div style="position: relative; display:inline-block; width: 100%">
        <div v-for="(comment,index) in commentData" :key="'comment'+index" style="display:inline-block">
          <el-card class="good-card">
            <div slot="header" class="clearfix" style="vertical-align:middle">
              <el-image
                class="user-icon"
                :src="comment.avatal_url"
                :fit="contain"
                lazy
              />
              <el-col :span="16" />
              <span>{{ comment.nickname }}</span>
              <el-tag style="float: right;" :type="comment.grade===0?'success':comment.grade===1?'warning':'danger'">
                <span>{{ comment.grade===0?'好评':comment.grade===1?'中评':'差评' }}</span>
              </el-tag>
            </div>
            <el-row>
              <span>{{ comment.content }}</span>
            </el-row>
            <el-divider />
            <el-row>
              <span style="font-weight: 500;font-size: 14px">产品评分</span>
              <el-rate v-model="comment.productScore" disabled :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" />
            </el-row>
            <el-row>
              <span style="font-weight: 500;font-size: 14px">服务评分</span>
              <el-rate v-model=" comment.serviceScore" disabled :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="5" />
              <span style="float:right">
                <el-button
                  v-if="!comment.merchantCommentContent"
                  type="text"
                  style="margin-right: 4px"
                  @click.native="replyComment(comment)"
                >回复</el-button>
                <el-button type="text" @click.native="seeCommentDetail(comment)">详情</el-button>
              </span>
            </el-row>
          </el-card>
        </div>
      </div>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.pageNumber"
        :limit.sync="listQuery.pageSize"
        @pagination="getCommentByGoods"
      />
    </el-card>

    <el-dialog top="4vh" title="评论详情" :visible.sync="detailDialog">
      <el-form ref="dataForm" :model="commentTemp" label-position="left" label-width="100px" style="margin:16px">
        <el-form-item label="用户">
          <el-image
            v-if="commentTemp.avatal_url"
            class="user-icon-detail"
            :src="commentTemp.avatal_url"
            :fit="contain"
            lazy
          />
          <span>{{ commentTemp.nickname }}</span>
        </el-form-item>
        <el-form-item label="购买商品">
          <span>{{ commentTemp.name }}</span>

          <el-tag type="info" style="margin-right: 4px" v-if="commentTemp.sku" v-for="a in commentTemp.sku.split(';')">  {{ a }}</el-tag>
        </el-form-item>
        <el-form-item label="评论">
          <span>{{ commentTemp.content }}</span>
          <el-tag
            style="float: right;"
            :type="commentTemp.grade===0?'success':commentTemp.grade===1?'warning':'danger'"
          >
            <span>{{ commentTemp.grade===0?'好评':commentTemp.grade===1?'中评':'差评' }}</span>
          </el-tag>
        </el-form-item>
        <el-form-item label="评论图片">
          <el-image
            class="commentImg"
            :src="commentTemp.imagesUrls"
            :fit="contain"
            lazy
          />
        </el-form-item>
        <el-form-item label="评论时间">
          <span>{{ commentTemp.createTime | parseTime }}</span>
        </el-form-item>
        <div v-if="commentTemp.merchantCommentContent!==''">
          <el-form-item label="商家回复" prop="merchantCommentContent">
            <span> {{ commentTemp.merchantCommentContent }}</span>
          </el-form-item>
          <el-form-item label="商家回复时间" prop="merchantCommentTime">
            <span> {{ commentTemp.merchantCommentTime | parseTime}}</span>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailDialog=false">
          好
        </el-button>
      </div>
    </el-dialog>

    <el-dialog top="4vh" title="回复评论" :visible.sync="commentDialog">
      <el-form ref="dataForm" :model="commentTemp" label-position="left" label-width="70px" style="margin:16px">
        <el-form-item label="评论">
          <span>{{ commentTemp.content }}</span>
          <el-tag
            style="float: right;"
            :type="commentTemp.grade===0?'success':commentTemp.grade===1?'warning':'danger'"
          >
            <span>{{ commentTemp.grade===0?'好评':commentTemp.grade===1?'中评':'差评' }}</span>
          </el-tag>
        </el-form-item>
        <el-form-item label="回复" prop="merchantCommentContent">
          <el-input v-model="commentTemp.merchantCommentContent" :rows="8" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="commentDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateComment()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getGoodsWithComment } from '@/api/goods'
import { getCommentByGoods,replyComment} from '@/api/comment'
import Pagination from '@/components/Pagination'
import { parseTime } from '../../utils'

export default {
  components: {
    Pagination
  },
  computed: {
    ...mapGetters([
      'current_store'
    ])
  },
  filters: {
    parseTime
  },

  data() {
    return {
      total: 0,
      goodsData: [],
      commentData: [],
      commentTemp: {
        sku:''
      },
      listQuery: {
        productId: 0,
        pageNumber: 1,
        pageSize: 10,
        sort: '+id'
      },
      detailDialog: false,
      commentDialog: false,
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
            this.goodsData = response.data.list
            this.goodsListLoading = false
          }).catch(error => {
            reject(error)
          })
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
    seeCommentDetail(comment) {
      this.commentTemp = Object.assign({}, comment)
      this.detailDialog = true
    },
    replyComment(comment) {
      this.commentTemp = Object.assign({}, comment)
      this.commentDialog = true
    },

    async updateComment() {
      await new Promise((resolve, reject) => {
        replyComment({
          commentId: this.commentTemp.id,
          commentContent: this.commentTemp.merchantCommentContent,
        })
          .then(response => {
            this.$message({
                message: '评论成功',
                type: 'success'
              }
            )
            this.commentDialog = false
            this.getCommentByGoods(this.commentTemp.id)
          }).catch(error => {
          this.$message.error('评论失败 请重试')
          reject(error)
        })
      })
    },
    async getCommentByGoods(goods) {
      this.total = goods.nums
      this.listQuery.productId = goods.id
      this.commentListLoading = true
      await new Promise((resolve, reject) => {
        getCommentByGoods(goods.id, this.listQuery)
          .then(response => {
            this.commentData = response.data.list
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

  .user-icon {
    width: 2vw;
    height: 2vw
  }

  .user-icon-detail {
    width: 5vw;
    height: 5vw;
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
    width: 24vw;
    display: inline-block;
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

  .good-card .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 12px 0;
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

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;

  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

