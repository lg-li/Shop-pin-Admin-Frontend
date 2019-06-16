<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
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
      'roles'
    ])
  },
  created() {
    if (this.roles.includes('ROLE_MERCHANT')) {
      this.currentRole = 'merchantDashboard'
    } else if (this.roles.includes('ROLE_ADMIN')) {
      this.currentRole = 'adminDashboard'
    }
  }
}
</script>
