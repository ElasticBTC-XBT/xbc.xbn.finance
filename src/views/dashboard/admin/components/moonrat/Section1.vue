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
      <p><b style="color:#f3aa43">
        Community driven, 100% Liquidity Pool is burned.

        <a href="https://docs.xbc.xbn.finance/tokenomics/xbc-community-driven-token" target="_blank" style="color: gray">(🔗 Tokenomics)</a>
      </b>

      </p>
      <p style="font-style: italic">There are always something you can do everyday to help XBC grows. The obvious thing you can do is creating your XBC Chat Group and tell your friends.</p>
      <p>
        <a  type="button" role="button" title="Share on twitter" href="https://twitter.com/intent/tweet?url=https://www.xbn.finance/xbc/" rel="noopener" target="_blank" class="btn-floating btn btn-tw" style="text-align: center;">

          Share if you care!  <br data-v-15f5a93c=""><img data-v-15f5a93c="" src="https://i.imgur.com/1AKV1Mc.gif" style="width: 37px; display: inline-block;"></a>
      </p>
      <p>More holders, stronger XBC, more BNB to claim, more XBC to own! <a href="https://docs.xbc.xbn.finance/features/transactional-tax" target="_blank" style="color: gray">(🔗 Transactional Tax)</a></p>
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
