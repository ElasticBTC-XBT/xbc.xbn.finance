<template>
  <el-row :gutter="40" class="panel-group">

    <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <img :src="max_trans">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Max transaction amount
          </div>
          <div>
            <span style="font-size: 15px">$XBC</span>
            <count-to :start-val="0" :end-val="maxTxAmount" :decimals="0" :duration="1000" class="card-panel-num" />
            <a @click="copyMaxTransaction"><i class="el-icon-document-copy" /></a>
            <span>  |  </span>
            <span style="font-size: 15px">$BNB</span>
            <count-to :start-val="0" :end-val="maxBnbAmount" :decimals="4" :duration="1000" class="card-panel-num" />
            <a @click="copyMaxBNBTx"><i class="el-icon-document-copy" /></a>
          </div>
        </div>

      </div>
    </el-col>

    <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper">
          <img :src="total_liquid">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Total liquidity pool
          </div>
          <span style="font-size: 15px">$</span>
          <count-to
            :start-val="0"
            :end-val="totalLiquidityPoolValue"
            :decimals="2"
            :duration="1000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper">
          <img :src="current_mrat_price">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Current 1 mil $XBC Price
          </div>
          <span style="font-size: 15px">$</span>
          <count-to
            :start-val="0"
            :end-val="currentMRatPrice * 10**6"
            :duration="1000"
            :decimals="9"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <img :src="total_bnb_liquid">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Total BNB in liquidity pool
          </div>
          <span style="font-size: 15px">$BNB</span>
          <count-to :start-val="0" :end-val="totalBNBInPool" :decimals="2" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>

    <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <img :src="total_bnb_reward">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Total BNB in reward pool
          </div>
          <span style="font-size: 15px">$BNB</span>
          <count-to
            :start-val="0"
            :end-val="bnbInRewardPool"
            :duration="1000"
            :decimals="2"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col :xs="24" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <img :src="mrat_banlance">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Your $XBC balance
          </div>
          <span style="font-size: 15px">$XBC</span>
          <count-to :start-val="0" :end-val="mratBalance" :decimals="2" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>

    <el-input id="copy-value" v-model="maxTxAmount" class="hidden-input" />
    <el-input id="copy-value-bnb" v-model="maxBnbAmount" class="hidden-input" />
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

import max_trans from '@/assets/images/new-icon/max_trans.png'
import total_liquid from '@/assets/images/new-icon/total_liquid.png'
import current_mrat_price from '@/assets/images/new-icon/current_mrat_price.png'
import total_bnb_liquid from '@/assets/images/new-icon/total_bnb_liquid.png'
import total_bnb_reward from '@/assets/images/new-icon/total_bnb_reward.png'
import mrat_banlance from '@/assets/images/new-icon/mrat_banlance.png'

export default {
  components: {
    CountTo
  },
  props: [
    'maxTxAmount',
    'totalLiquidityPoolValue',
    'totalBNBInPool',
    'currentMRatPrice',
    'bnbInRewardPool',
    'mratBalance',
    'maxBnbAmount'
  ],
  data() {
    return {
      max_trans: max_trans,
      total_liquid: total_liquid,
      current_mrat_price: current_mrat_price,
      total_bnb_liquid: total_bnb_liquid,
      total_bnb_reward: total_bnb_reward,
      mrat_banlance: mrat_banlance
    }
  },
  methods: {
    copyMaxTransaction() {
      var self = this
      const testingCodeToCopy = document.querySelector('#copy-value')
      testingCodeToCopy.setAttribute('type', 'text') // 不是 hidden 才能複製
      testingCodeToCopy.select()

      try {
        var successful = document.execCommand('copy')
        var msg = successful ? 'successful' : 'unsuccessful'

        self.$notify({
          title: 'Success',
          message: 'Copied value ' + msg,
          type: 'success'
        })
      } catch (err) {
        self.$notify({
          title: 'Error',
          message: 'Oops, unable to copy',
          type: 'success'
        })
      }

      window.getSelection().removeAllRanges()
    },
    copyMaxBNBTx() {
      var self = this
      const testingCodeToCopy = document.querySelector('#copy-value-bnb')
      testingCodeToCopy.setAttribute('type', 'text') // 不是 hidden 才能複製
      testingCodeToCopy.select()

      try {
        var successful = document.execCommand('copy')
        var msg = successful ? 'successful' : 'unsuccessful'

        self.$notify({
          title: 'Success',
          message: 'Copied value ' + msg,
          type: 'success'
        })
      } catch (err) {
        self.$notify({
          title: 'Error',
          message: 'Oops, unable to copy',
          type: 'success'
        })
      }

      window.getSelection().removeAllRanges()
    },
    handleSetLineChartData(type) {
      // this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 50px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      padding: 30px 5px;
      border-radius: 0px;
      font-size: 12px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      position: relative;
      text-align: center;
      color: #666;
      background: #fff;
      box-shadow: 0 32px 64px rgb(24 35 52 / 24%);

      .icon-people {
        color: #dd9c3c;
      }

      .icon-message {
        color: #dd9c3c;
      }

      .card-panel-icon-wrapper {
        padding: 10px;
        transition: all 0.38s ease-out;
        border-radius: 6px;

        img {
          width: 130px;
          height: 100px;
          object-fit: contain;
        }
      }

      .card-panel-icon {
        width: 100%;
        font-size: 48px;
        font-weight: bold;
      }

      .card-panel-description {
        width: 100%;
        font-weight: bold;
        margin-top: 20px;
        color: black;

        .card-panel-text {
          line-height: 18px;
          color: black;
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 15px;
          color: black;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      /*display: none;*/
    }
    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      img {
        width: 130px;
        height: 100px;
        object-fit: contain;
      }

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
