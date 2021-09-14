<template>
  <div class="dashboard-editor-container">

    <div class="title-show-mobile">
      XBC Playground
    </div>

    <div v-if="!userAccount">
      <section2 />
    </div>

    <div v-else>
      <last-survior
        :last-bidder="lastBidder"
        :countdown-timer="countdownTimer"
        :pool="lsPool"
        :poolbusd="lsPoolUSD"
        :xbcbalance="mratBalance"
        :loading-collect-b-n-b="loadingCollectBNB"
        @playLS="play"
        @playLSBNB="playBNB"
        @migrateXBC="migrateXBC"
      />
      <panel-group
        :max-tx-amount="contractInfo.maxTxAmount || 0"
        :max-bnb-amount="contractInfo.maxBNBAmount || 0"
        :current-m-rat-price="currentMRatPrice"
        :total-b-n-b-in-pool="contractInfo.bnbBalance"
        :total-liquidity-pool-value="totalLiquidityInPool"
        :bnb-in-reward-pool="contractInfo.bnbInPool"
        :mrat-balance="mratBalance"
      />

      <section3
        :reward-cycle-block="contractInfo.rewardCycleBlock"
        :estimated-b-n-b-claim="contractInfo.estimatedBNBReward"
        :next-available-claim-date="contractInfo.nextAvailableClaimDate"
        :mrat-balance="mratBalance"
        :loading-collect-b-n-b="loadingCollectBNB"
        @submitClaim="submitClaimBNB"
      />
    </div>

    <section1 />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import Section1 from './components/moonrat/Section1'
import LastSurvior from './components/moonrat/LastSurvior.vue'
import Section3 from './components/moonrat/Section3'
// import Section4 from './components/moonrat/Section4'
// import Section5 from './components/moonrat/Section5'
import Section2 from './components/moonrat/Section2'

import { mapGetters } from 'vuex'
import WalletConnectWrap from '@/components/Mixins/WalletConnectWrap'
import {
  claimBNBReward,
  getContractInfo,
  getXBCBalance,
  subscribeClaimBNBSuccessfully
} from '@/libs/moonrat'
import { claimLS, getLastSurivorInfo, participateLS, _migrateXBC } from '@/libs/lastsurvivor'
// import Section6 from './components/moonrat/Section6'

export default {
  name: 'DashboardAdmin',
  components: {
    // Section6,
    Section2,
    // Section5,
    // Section4,
    Section3,
    Section1,
    PanelGroup,
    LastSurvior
  },
  mixins: [WalletConnectWrap],
  data() {
    return {
      contractInfo: {},
      hasBgColor: false,
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
      loadingCollectBNB: false,
      lastBidder: null,
      lsPool: 0,
      lsPoolUSD: 0,
      countdownTimer: null
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
      const result = await getXBCBalance(this.walletClient.web3Client)
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
    async play(using_xbc = true) {
      const v = this

      console.info(`using_xbc ${using_xbc}`)

      v.loadingCollectBNB = true

      try {
        await participateLS(v.walletClient.web3Client, using_xbc)
        v.loadingCollectBNB = false
      } catch (e) {
        v.loadingCollectBNB = false
      }
    },
    async claimLS() {
      const v = this
      v.loadingCollectBNB = true

      try {
        await claimLS(v.walletClient.web3Client)
        v.loadingCollectBNB = false
      } catch (e) {
        v.loadingCollectBNB = false
      }
    },
    async playBNB() {
      await this.play(false)
    },
    async migrateXBC() {
      console.info('#185 migrateXBC')
      const v = this

      v.loadingCollectBNB = true

      try {
        await _migrateXBC(v.walletClient.web3Client)
        v.loadingCollectBNB = false
      } catch (e) {
        console.info(`#194 ${e}`)
        v.loadingCollectBNB = false
      }
    },
    handleClaimSuccessfullyBNB(eventObj) {
      if (eventObj.recipient === this.connected_wallet) {
        this.$root.$emit('receivedBNB', eventObj)
        this.fetchStatus()
      }
    },

    async fetchLSInfo() {
      // const walletClient = await getWeb3Client()
      const result = await getLastSurivorInfo(this.walletClient.web3Client)
      //  this.$set(this, 'lastBidTime', result.lastBidTime)
      this.$set(this, 'lastBidder', result.lastBidder)
      this.$set(this, 'lsPool', result.lsPool)
      this.$set(this, 'lsPoolUSD', result.lsPoolUSD)

      const collapseDelay = result.collapseDelay
      let countdownTimer = (collapseDelay * 1000 + result.lastBidTime - new Date().getTime())
      if (countdownTimer < 0) {
        countdownTimer = 0
      }

      this.$set(this, 'countdownTimer', countdownTimer)
    },
    async fetchStatus() {
      await this.fetchContractInfo()
      await this.fetchBNBPrice()
      await this.fetchLSInfo()
      await this.fetchCurrentMratBalance()
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
