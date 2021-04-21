<template>
  <div class="section-2">

    <div class="connect-to-wallet">
      <div class="line-1">
        You need to connect wallet to continue
      </div>
      <div class="line-2">
        Please switch to
        <a href="https://docs.binance.org/smart-chain/wallet/metamask.html" target="_blank"> BSC network</a>
      </div>
      <div class="line-3">
        Hint: If you do not have BNB wallet, please download
        <a href="https://trustwallet.com/" target="_blank">Trust Wallet</a>
        or
        <a href="https://metamask.io/" target="_blank">Metamask</a>
      </div>
      <div class="line-4">
        If you have any questions, please ask us
        <a href="https://t.me/MoonRatFinance" target="_blank">here</a>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'WalletNotConnect',
  props: {},
  data() {
    return {}
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {}
}
</script>
<style lang="scss" scoped>

  .section-2 {
    width: 80%;
    margin: 40px auto;
    background-color: white;
    padding: 40px 20px;
    border-radius: 50px;;
    box-shadow: 0 31px 35px rgb(0 0 0 / 10%);
    text-align: center;

    .line-1 {
      font-size: 30px;
      font-weight: bold;
    }

    .line-2 {
      margin-top: 20px;
      font-size: 25px;

      a {
        color: #2ac06d;
      }
    }

    .line-3 {
      margin-top: 20px;
      font-size: 15px;

      a {
        color: #2ac06d;
      }
    }

    .line-4 {
      margin-top: 20px;
      font-size: 15px;

      a {
        color: #2ac06d;
      }
    }

  }
</style>
