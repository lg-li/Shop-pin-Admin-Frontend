<template>
  <div>
    <el-dropdown class="navbar">
      <span>
        {{ current_store.name }}
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="store in store_list">{{ store.name }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  name: 'StoreChange',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'store_list',
      'current_store'
    ])
  },
  mounted() {
    this.getStoreList()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    async getStoreList() {
      try {
        await store.dispatch('store/getStoreList')
      } catch {

      }
    }
  }
}
</script>

<style scoped>
  .navbar {
    font-size: 16px;
  }
</style>
