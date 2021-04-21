<template>
  <div class="dashboard-editor-container">

    <div class="title-show-mobile">
      MoonRat Dashboard
    </div>

    <section1 />

    <div v-if="!userAccount">
      <section2 />
    </div>

    <div v-else>
      <section3
        :reward-cycle-block="contractInfo.rewardCycleBlock"
        :estimated-b-n-b-claim="contractInfo.estimatedBNBReward"
        :next-available-claim-date="contractInfo.nextAvailableClaimDate"
        :mrat-balance="mratBalance"
        :loading-collect-b-n-b="loadingCollectBNB"
        @submitClaim="submitClaimBNB"
      />
      <section4
        :max-tx-amount="contractInfo.maxTxAmount || 0"
        :mrat-balance="mratBalance"
        :show-popup-disruptive="showPopupDisruptive"
        :close-loading-disruptive="closeLoadingDisruptive"
        @disruptiveTransfer="whaleTransfer"
        @closeDialogDisruptive="closeDialogDisruptive"
      />
    </div>

  </div>
</template>

<script>
import Section1 from './components/moonrat/Section1'
import Section3 from './components/moonrat/Section3'
import Section4 from './components/moonrat/Section4'
import Section2 from './components/moonrat/Section2'

import { mapGetters } from 'vuex'
import WalletConnectWrap from '@/components/Mixins/WalletConnectWrap'
import {
  claimBNBReward,
  disruptiveTransfer,
  getContractInfo,
  getMoonRatBalance,
  subscribeClaimBNBSuccessfully
} from '@/libs/moonrat'

export default {
  name: 'PopupDashboard',
  components: {
    Section2,
    Section4,
    Section3,
    Section1
  },
  mixins: [WalletConnectWrap],
  data() {
    return {
      contractInfo: {},
      priceFeedData: {
        RAW: {
          BNB: {
            USD: {
              PRICE: 0
            }
          }
        }
      },
      mratBalance: 0,
      showPopupDisruptive: false,
      closeLoadingDisruptive: false,
      loadingCollectBNB: false
    }
  },
  computed: {
    ...mapGetters([
      'connected_wallet'
    ]),
    totalLiquidityInPool() {
      return (this.contractInfo.bnbBalance * this.priceFeedData.RAW.BNB.USD.PRICE) * 2 || 0
    },
    currentMRatPrice() {
      return ((this.totalLiquidityInPool / 2) / this.contractInfo.mratBalance) || 0
    }
  },

  created() {
    this.$on('fetchStatus', () => {
      this.fetchStatus()

      setTimeout(() => {
        subscribeClaimBNBSuccessfully(this.walletClient.web3Client, this.handleClaimSuccessfullyBNB)

        this.intervalFetchStatus()
      }, 1000)
    })
  },

  methods: {
    closeDialogDisruptive() {
      this.showPopupDisruptive = false
    },
    async fetchBNBPrice() {
      const response = await fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BNB&tsyms=USD')
      const priceFeedData = await response.json()
      this.$set(this, 'priceFeedData', priceFeedData)
    },
    async fetchContractInfo() {
      const result = await getContractInfo(this.walletClient.web3Client)
      this.$set(this, 'contractInfo', result)
    },
    async fetchCurrentMratBalance() {
      const result = await getMoonRatBalance(this.walletClient.web3Client)
      this.$set(this, 'mratBalance', result)
    },
    async submitClaimBNB() {
      const v = this
      v.loadingCollectBNB = true

      try {
        await claimBNBReward(v.walletClient.web3Client)
        v.loadingCollectBNB = false
      } catch (e) {
        v.loadingCollectBNB = false
      }
    },
    async whaleTransfer(recipient, amount) {
      var self = this

      try {
        await disruptiveTransfer(self.walletClient.web3Client, recipient, amount)
        self.showPopupDisruptive = true
      } catch (e) {
        self.closeLoadingDisruptive = true
      }
    },
    handleClaimSuccessfullyBNB(eventObj) {
      if (eventObj.recipient === this.connected_wallet) {
        this.$root.$emit('receivedBNB', eventObj)
        this.fetchStatus()
      }
    },
    async fetchStatus() {
      this.fetchContractInfo()
      this.fetchBNBPrice()
      this.fetchCurrentMratBalance()
    },
    intervalFetchStatus() {
      setInterval(() => {
        this.fetchStatus()
      }, 5000)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 60px 0px;
  position: relative;
  min-height: 100vh;
  max-width: 1140px;
  margin: auto;
}

</style>
