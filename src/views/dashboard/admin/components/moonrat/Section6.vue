<template>
  <div class="section-3">

    <div class="info-wrapper">
      <div>
        AirDrop
      </div>
    </div>

    <div style="margin-top: 40px; font-size: 25px; font-weight: bold; text-align: center">
      Coming Soon
    </div>

    <!--    <div class="text-center">-->
    <!--      <h1 v-if="!availableToClaim">-->
    <!--        Next collectable date: {{ nextAvailableClaimDate | date }}-->
    <!--      </h1>-->
    <!--    </div>-->

    <!--    <div class="claim-bnb-wrapper">-->
    <!--      <el-button icon="el-icon-thumb" type="primary" size="large" :disabled="!availableToClaim || mratBalance === 0"-->
    <!--                 @click="claimBNB">-->
    <!--        Airdrop-->
    <!--      </el-button>-->
    <!--    </div>-->

    <!--    <el-dialog-->
    <!--      title="MoonRat.finance"-->
    <!--      :visible.sync="dialogClaimBNBSuccess"-->
    <!--      width="30%"-->
    <!--    >-->
    <!--      <div class="content-dialog-claim-success">-->
    <!--        <img :src="moonRatLogo" style="width:200px">-->
    <!--        <div class="text-1">-->
    <!--          Congratulations!-->
    <!--        </div>-->
    <!--        <div class="text-2">-->
    <!--          You collect <span class="bnb">{{ displayedReceivedETH }} BNB</span>-->
    <!--        </div>-->
    <!--        <div class="text-3">-->
    <!--          Next collectable date: {{ bnbReceivedData.nextAvailableClaimDate | date }}-->
    <!--        </div>-->

    <!--        <div class="button-share-wrapper">-->
    <!--          <vue-goodshare-twitter :page_title="pageQuote" :page_url="pageUrl" has_icon/>-->
    <!--          <vue-goodshare-facebook-->
    <!--            :quote="pageQuote"-->
    <!--            :page_title="pageTitle"-->
    <!--            :page_url="pageUrl"-->
    <!--            has_icon-->
    <!--            button_design="flat"-->
    <!--          />-->
    <!--        </div>-->

    <!--      </div>-->
    <!--    </el-dialog>-->

  </div>
</template>

<script>

import congrate from '@/assets/images/congratulation.png'
import moonRatLogo from '@/assets/images/RatBNB.png'
import facebook from '@/assets/images/facebook.png'
import share from '@/assets/images/share.png'
import twitter from '@/assets/images/twitter.png'

import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'
// import VueGoodshareReddit from "vue-goodshare/src/providers/Reddit.vue";
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter.vue'
import moment from 'moment'
import WalletConnectWrap from '@/components/Mixins/WalletConnectWrap'

// import {getMoonRatBalance} from '@/libs/moonrat'
import * as numeral from 'numeral'

export default {
  name: 'Section6',
  components: {
    VueGoodshareFacebook,
    VueGoodshareTwitter
  },
  filters: {
    date(val) {
      return moment(val).format('llll')
    }
  },
  mixins: [WalletConnectWrap],
  props: [
    'estimatedBNBClaim',
    'nextAvailableClaimDate',
    'rewardCycleBlock',
    'mratBalance'
  ],
  data() {
    return {
      bnbReceivedData: {},
      myClaimableBNB: 100,
      dialogClaimBNBSuccess: false,
      congrateImage: congrate,
      moonRatLogo: moonRatLogo,
      facebookIcon: facebook,
      twitterIcon: twitter,
      shareIcon: share,
      wallet_mrat_balance: -1
    }
  },
  computed: {
    availableToClaim() {
      return moment() >= moment(this.nextAvailableClaimDate)
    },
    // percentProgress() {
    //   if (this.nextAvailableClaimDate === 0) return 100
    //
    //   const startDate = this.nextAvailableClaimDate - this.rewardCycleBlock
    //   const currentProgress = moment().toDate().getTime() - startDate
    //   const endDate = this.nextAvailableClaimDate
    //   const delta = endDate - startDate
    //   const percentage = currentProgress / delta >= 1 ? 1 : currentProgress / delta
    //
    //   return ((percentage) * 100).toFixed(0)
    // },
    estimatedReward() {
      return numeral(this.estimatedBNBClaim < 0.00000001 ? 0 : this.estimatedBNBClaim).format('0,0.0000')
    },
    displayedReceivedETH() {
      return numeral(this.bnbReceivedData.ethReceived < 0.00000001 ? 0 : this.bnbReceivedData.ethReceived).format('0,0.0000')
    },
    // daysLeft() {
    //   const startDate = this.nextAvailableClaimDate
    //   const eventdate = moment(startDate)
    //   const todaysdate = moment()
    //   return eventdate.diff(todaysdate, 'hours')
    // },
    // daysDelta() {
    //   const startDate = this.nextAvailableClaimDate - this.rewardCycleBlock
    //   const eventdate = moment(startDate)
    //   const endDate = moment(this.nextAvailableClaimDate)
    //   return endDate.diff(eventdate, 'days')
    // },
    // daysThrough() {
    //   const startDate = this.nextAvailableClaimDate - this.rewardCycleBlock
    //   const eventdate = moment(startDate)
    //   const endDate = moment()
    //   return endDate.diff(eventdate, 'days')
    // },
    pageTitle() {
      return 'XBC Finance'
    },
    pageUrl() {
      return 'https://xbc.xbn.finance'
    },
    pageQuote() {
      return 'I just collected ' + this.displayedReceivedETH + ' BNB at xbc.xbn.finance! You should give it a try!\n' +
        '#XBC #EarnBNB #BinanceSmartChain #BSC'
    }
  },
  created() {
    this.$root.$on('receivedBNB', ({ ethReceived, nextAvailableClaimDate }) => {
      this.$set(this, 'bnbReceivedData', {
        ethReceived,
        nextAvailableClaimDate
      })

      this.$set(this, 'dialogClaimBNBSuccess', true)
    })
  },
  methods: {
    format(percentage) {
      return this.daysThrough + ' days'
    },
    claimBNB() {
      if (this.mratBalance > 0) {
        this.$emit('submitClaim')
      }
    }
  }
}
</script>
<style lang="scss" scoped>

  .section-3 {
    background-color: white;
    padding: 40px;
    border-radius: 0px;;
    box-shadow: 0 32px 64px rgb(24 35 52 / 24%);
    margin-top: 50px;

    .claim-bnb-wrapper {
      margin-top: 50px;
      text-align: center;
    }

    .info-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .days-left {
        color: #ff4719;
      }
    }

    .progress-content {
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;

      .progress-wrapper {
        width: calc(100% - 100px);

      }

      .total-day {
        padding-left: 20px;
        width: 100px;
      }
    }
  }

</style>
