<template>
  <div class="section-3">

    <div class="info-wrapper">
      <h2 class="text-reward" style="text-align: center"> Hold $XBC, earn weekly $BNB passive income</h2>



      <!--            <div v-if="percentProgress < 100" class="days-left">-->
      <!--              {{ daysLeft }} hours left to claim-->
      <!--            </div>-->
    </div>

    <div class="text-center">
      <h2 v-if="!availableToClaim" style="margin-top: 1.4em" class="text-reward">
        Next earning date: <br/>{{ nextAvailableClaimDate | date }}
      </h2>
    </div>

    <div class="claim-bnb-wrapper">
      <el-button :loading="loadingCollectBNB" icon="el-icon-thumb" type="primary" size="large" :disabled="!availableToClaim || mratBalance === 0" @click="claimBNB">
        Collect my BNB
      </el-button>
      <p class="text-reward">
        <span class="">Your weekly earning</span> <br/>
        <span class="rainbow rainbow_text_animated"> {{ estimatedReward }} BNB  </span> <br/>
        <a href="https://docs.xbc.xbn.finance/innovation/earn-bnb" target="_blank"><i class="el-icon-question" /></a>
      </p>
    </div>

    <el-dialog
      title="xbc.xbn.finance"
      :visible.sync="dialogClaimBNBSuccess"
      width="30%"
    >
      <div class="content-dialog-claim-success">
        <!--        <img :src="congrateImage" style="width:200px"/>-->
        <img :src="xbcLogo" style="width:200px">
        <div class="text-1">
          Congratulations!
        </div>
        <div class="text-2">
          You collected <span class="bnb">{{ displayedReceivedETH }} BNB</span>
        </div>
        <div class="text-3">
          Next collectable date: {{ bnbReceivedData.nextAvailableClaimDate | date }} (at your time zone)
        </div>

        <div class="button-share-wrapper">
          <vue-goodshare-twitter :page_title="pageQuote" :page_url="pageUrl" has_icon />
          <vue-goodshare-facebook
            :quote="pageQuote"
            :page_title="pageTitle"
            :page_url="pageUrl"
            has_icon
            button_design="flat"
          />
        </div>

      </div>
    </el-dialog>

  </div>
</template>

<script>

import congrate from '@/assets/images/congratulation.png'
import xbcLogo from '@/assets/images/logos/xbc-icon-logo-02.png'
import facebook from '@/assets/images/facebook.png'
import share from '@/assets/images/share.png'
import twitter from '@/assets/images/twitter.png'

import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'
// import VueGoodshareReddit from "vue-goodshare/src/providers/Reddit.vue";
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter.vue'
import moment from 'moment'
import WalletConnectWrap from '@/components/Mixins/WalletConnectWrap'

import * as numeral from 'numeral'

export default {
  name: 'Section3',
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
    'mratBalance',
    'loadingCollectBNB'
  ],
  data() {
    return {
      bnbReceivedData: {},
      myClaimableBNB: 100,
      dialogClaimBNBSuccess: false,
      congrateImage: congrate,
      xbcLogo: xbcLogo,
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
    estimatedReward() {
      return numeral(this.estimatedBNBClaim < 0.0001 ? 0 : this.estimatedBNBClaim).format('0,0.0000')
    },
    displayedReceivedETH() {
      return numeral(this.bnbReceivedData.ethReceived < 0.0001 ? 0 : this.bnbReceivedData.ethReceived).format('0,0.0000')
    },

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

.rainbow {
  text-align: center;
  text-decoration: underline;
  font-size: 32px;
  font-family: monospace;
  letter-spacing: 5px;
}
.rainbow_text_animated {
  background: linear-gradient(
          to right,
          red,
          #0099ff,
          #00ff00,
          #ff3399,
          #6666ff
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: rainbow_animation 6s ease-in-out infinite;
  background-size: 400% 100%;
}
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
