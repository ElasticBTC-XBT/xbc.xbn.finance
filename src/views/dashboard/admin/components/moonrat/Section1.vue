<template>
  <div class="section-1 logo-wrapper">

    <img :src="xbcLogo" class="image-logo">

    <div class="title-1">
      <a href="https://www.xbn.finance" target="_blank">XBN Community (XBC)</a>
    </div>
    <div class="title-2">
      Hold XBC to earn BNB and more XBC
    </div>
    <div class="text-center" style="margin-top: 20px">

      <a
        href="https://v1exchange.pancakeswap.finance/#/swap?outputCurrency=0x0321394309CaD7E0E424650844c3AB3b659315d3"
        class="btn-custom"
        target="_blank"
      >
        <i class="el-icon-shopping-cart-full" />
        Buy $XBC
      </a>
      <p>
        <a
            href="https://docs.xbc.xbn.finance/"
            class=""
            target="_blank"
        > White Paper
        </a>
        / <a href="https://twitter.com/XbcXbn">Twitter</a>
        / <a href="https://t.me/XBCforeveryone">Telegram</a>
        / <a href="https://www.xbn.finance/xbn/airdrop/">XBN Airdrop</a>
        / <a href="https://www.xbn.finance/xbn/lottery/">FomoLotto</a>
      </p>
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
