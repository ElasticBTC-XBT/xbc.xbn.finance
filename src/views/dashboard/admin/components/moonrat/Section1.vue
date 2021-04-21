<template>
  <div class="section-1 logo-wrapper">

    <img :src="xbcLogo" class="image-logo">

    <div class="title-1">
      <a href="https://moonrat.finance/" target="_blank">XBN Community (XBC)</a>
    </div>
    <div class="title-2">
      A new way to earn BNB
    </div>
    <div class="text-center" style="margin-top: 20px">

      <a
        href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x1396148f0f45888d9a57ad9bf35077cbf9d067d9"
        class="btn-custom"
        target="_blank"
      >
        <i class="el-icon-shopping-cart-full" />
        Buy $XBC
      </a>
    </div>

  </div>
</template>

<script>

import xbcLogo from '@/assets/images/XBC-logo.png'

export default {
  name: 'Section1',
  props: {},
  data() {
    return {
      xbcLogo: xbcLogo
    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    routerToBuyMRAT() {
      window.open('https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x6d949f9297a522c0f97c232cc209a67bd7cfa471')
    }
  }
}
</script>
<style lang="scss" scoped>
  .logo-wrapper {
    margin: auto;
    width: fit-content;
    text-align: center;
    padding: 20px 100px;
    border-radius: 0px;
    background: #fff;
    box-shadow: 0 32px 64px rgb(24 35 52 / 24%);

    .image-logo {
      width: 100px;
    }

    .title-1 {
      margin: 20px 0px 10px 0px;
      font-size: 30px;

    }

    .title-2 {
      font-size: 20px;
    }
  }
</style>
