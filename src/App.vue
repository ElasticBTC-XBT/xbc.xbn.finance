<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$root.$once('updateWalletClient', async(callbackHandler) => {
      await callbackHandler()
    })
  }
}
</script>
