<template>

  <div class="section-4">

    <div>
      Disruptive Transfer between 2 wallets <span style="margin-left: 20px">
        <a href="https://docs.xbc.xbn.finance/innovation/anti-whales" target="_blank"><i class="el-icon-question" /></a>
      </span>

      <span style="margin-left: 40px; font-weight: bold">
        Balance: {{ computedXBCBalance }}
      </span>
    </div>

    <!--    <div style="font-size: 30px; color: black; margin-top: 20px; text-align: center">-->
    <!--      This will be available on the mainnet-->
    <!--    </div>-->

    <div class="form-wrapper">
      <el-form label-width="200px">
        <el-form-item label="Recipient (address)">
          <el-input v-model="recipient" />
        </el-form-item>
        <el-form-item label="Amount ($XBC)">
          <el-input v-model="amount">
            <el-button slot="append" style="color: white" @click="amount = mratBalance * 9999/10000">Max</el-button>
          </el-input>
        </el-form-item>
        <el-button
          type="primary"
          :loading="loadingSending"
          icon="el-icon-position"
          :disabled="amount <= 0"
          @click="onSubmit"
        >Send
        </el-button>
      </el-form>
    </div>

    <el-dialog
      title="xbc.xbn.finance"
      :visible.sync="dialogSuccess"
      width="30%"
    >
      <div class="content-dialog-claim-success">
        <!--        <img :src="congrateImage" style="width:200px"/>-->
        <img :src="xbcLogo" style="width:200px">
        <div class="text-1">
          Congratulations!
        </div>
        <div class="text-2">
          You transferred <span class="bnb">{{ computedAmount }} $XBC</span>
        </div>
        <div class="text-4">
          to {{ recipient }}
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

import xbcLogo from '@/assets/images/logos/xbc-icon-logo-02.png'

import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'
// import VueGoodshareReddit from "vue-goodshare/src/providers/Reddit.vue";
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter.vue'
import moment from 'moment'

import * as numeral from 'numeral'

export default {
  name: 'Section4',
  components: {
    VueGoodshareFacebook,
    VueGoodshareTwitter
  },
  filters: {
    date(val) {
      return moment(val).format('llll')
    }
  },
  props: [
    'maxTxAmount',
    'mratBalance',
    'showPopupDisruptive',
    'closeLoadingDisruptive'
  ],
  data() {
    return {
      recipient: '',
      amount: 0,
      dialogSuccess: false,
      xbcLogo: xbcLogo,
      loadingSending: false
    }
  },
  computed: {
    computedXBCBalance() {
      const number = Number(this.mratBalance).toFixed(5)
      return numeral(number).format('0,0.00')
    },

    computedAmount() {
      return numeral(this.amount).format('0,0.00')
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
  watch: {
    showPopupDisruptive(value) {
      if (value) {
        this.loadingSending = false
        this.dialogSuccess = true
      }
    },
    dialogSuccess(value) {
      if (!value) {
        this.$emit('closeDialogDisruptive')
      }
    },
    closeLoadingDisruptive(value) {
      if (value) {
        this.loadingSending = false
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    onSubmit() {
      const v = this
      if (this.amount <= this.maxTxAmount) {
        v.$swal.fire({
          title: 'Warning!',
          html: 'Your transfer amount is less than ' + `<strong>${numeral(this.maxTxAmount).format('0,0.00')} XBC</strong>` + ', you can transfer directly in your wallet. <br> <b style="color: red"> If you continue with the Disruptive Transfer, you will be charged for 2 BNB</b>',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Send'
        }).then((result) => {
          if (result.isConfirmed) {
            v.loadingSending = true
            console.log('submit!')
            v.$emit('disruptiveTransfer', this.recipient, this.amount)
          }
        })
      } else {
        v.loadingSending = true
        this.$emit('disruptiveTransfer', this.recipient, this.amount)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.section-4 {
  margin-top: 50px;
  background-color: white;
  padding: 40px;
  border-radius: 0px;
  box-shadow: 0 32px 64px rgb(24 35 52 / 24%);

  .form-wrapper {
    width: 50%;
    margin: 20px auto;
    text-align: center;
  }

}
</style>
