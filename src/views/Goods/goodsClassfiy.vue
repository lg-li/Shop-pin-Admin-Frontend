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
    </el-card>
    <el-card>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="goodsData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
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
              :src="scope.row.imageUrls"
              fit="scale-down"
              lazy
            />
          </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="商品简介">
          <template slot-scope="scope">
            <span>{{ scope.row.info }}</span>
          </template>
        </el-table-column>

        <el-table-column width="150px" sortable align="center" label="父级分类">
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.edit"
              v-model="scope.row.tempParentCategoryId"
              placeholder="父级分类"
              @change="setParent($event,scope.row)"
            >
              <el-option
                v-for="item in categoryData"
                :key="item.parent.id"
                :label="item.parent.category_name"
                :value="item.parent.id"
              />
            </el-select>
            <span v-else>{{ scope.row.parentCategoryName }}</span>

          </template>
        </el-table-column>

        <el-table-column width="150px" sortable align="center" label="子级分类">
          <template slot-scope="scope">
            <el-select
              v-if="scope.row.edit"
              v-model="scope.row.tempChildCategoryId"
              placeholder="子级分类"
              @change="setChild($event,scope.row)"
            >
              <el-option
                v-for="child in childData"
                :key="child.id"
                :label="child.category_name"
                :value="child.id"
                @change="setChild($event,scope.row)"
              />
            </el-select>
            <span v-else>{{ scope.row.childCategoryName }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="150" label="操作" align="center">
          <template slot-scope="{row}">
            <el-button-group v-if="row.edit">
              <el-button
                type="success"
                size="small"
                icon="el-icon-circle-check-outline"
                @click="confirmEdit(row)"
              >确认
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="cancelEdit(row)"
              >取消
              </el-button>
            </el-button-group>

            <el-button v-else size="middle" @click="handleEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.pageNumber"
        :limit.sync="listQuery.pageSize"
        @pagination="getList"
      />
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getGoodsCategory, getCategoryList } from '@/api/goods'
import Pagination from '@/components/Pagination'

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
      categoryData: [],
      childData: [],
      listQuery: {
        pageNumber: 1,
        pageSize: 10,
        sort: '+id',
        Key: ''
      },
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    async getList() {
      this.loading = true
      await new Promise((resolve, reject) => {
        getGoodsCategory(this.listQuery)
          .then(response => {
            const items = response.data.list
            this.goodsData = items.map(v => {
              this.$set(v, 'edit', false)
              v.tempParentCategory = v.parentCategoryName
              v.tempParentCategoryId = v.parentCategoryId
              v.tempChildCategory = v.childCategoryName
              v.tempChildCategoryId = v.childCategoryId
              return v
            })
            this.total = this.goodsData.length
            this.loading = false
          }).catch(error => {
            reject(error)
          })
      })
    },
    async getCategoryList() {
      await new Promise((resolve, reject) => {
        getCategoryList().then(response => {
          this.categoryData = response.data.categoryList
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
          row.tempParentCategory = val.parent.category_name
        }
      }
    },
    setChild(childId, row) {
      for (const val of this.childData) {
        if (val.id === childId) {
          row.tempChildCategory = val.category_name
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
      row.parentCategoryName = row.tempParentCategory
      row.parentCategoryId = row.tempParentCategoryId
      row.childCategoryName = row.tempChildCategory
      row.childCategoryId = row.tempChildCategoryId
      this.$message({
        message: `商品 ${row.name} 的分类修改成功`,
        type: 'success'
      })
    },
    cancelEdit(row) {
      row.tempParentCategory = row.parentCategoryName
      row.tempParentCategoryId = row.parentCategoryId
      row.tempChildCategory = row.childCategoryName
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
    margin-top: 20px;
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
</style>

