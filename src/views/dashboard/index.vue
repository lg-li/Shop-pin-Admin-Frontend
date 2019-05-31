<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import adminDashboard from './admin'
  import merchantDashboard from './merchant'
  // import store from './store'

  export default {
    name: 'Dashboard',
    components: { adminDashboard, merchantDashboard },
    data() {
      return {
        currentRole: 'merchantDashboard'
      }
    },
    computed: {
      ...mapGetters([
        'roles',
      ])
    },
    created() {
      // try {
      //   await store.dispatch('store/getStoreInfo')
      // }catch {
      //
      // }
      // if (!this.roles.includes('admin')) {
      //   this.currentRole = 'merchantDashboard'
      // }
    }
  }
</script>
