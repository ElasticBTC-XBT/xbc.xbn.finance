<template>
  <div class="dashboard-container">
    <popup-dashboard/>
  </div>
</template>

<script>
import popupDashboard from './test-popup'

export default {
  name: 'Dashboard2',
  components: { popupDashboard },
  data() {
    return {

    }
  },
  computed: {

  },
  created() {

  }
}
</script>

<style>
 .dashboard-container{
   min-height: 100vh;
   padding: 0px 5vw;
 }
</style>
