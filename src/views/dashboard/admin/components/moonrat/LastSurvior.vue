<template>
  <div>
    <section
      class="signin section illustration-section-01 last-survior-wrapper"
    >

      <div class="section-1 card-spec-wrapper">
        <div class="container">
          <div class="text-1">
            The Last Survivor
          </div>
          <div class="text-2">
            Participate with XBC or BNB
          </div>
          <div class="text-3">
            Be come the last survivor and win 50% of the pot
          </div>
        </div>
      </div>

      <div class="container">
        <div class="section-2 card-wrapper">

          <div class="part-1">

            <img :src="require('@/assets/images/survivor.png')">

          </div>
          <div class="part-2">
            <div class="text-1">
              Conquer all fighters, <br>
              The winner takes it all!
            </div>
            <div class="count-down">
              <countdown
                v-slot="{ days, hours, minutes, seconds }"
                :time="countdownTimer"
              >
                <div class="clock-display">
                  <span>{{ days }} : </span>
                  <span>{{ hours }} : </span>
                  <span>{{ minutes }} : </span>
                  <span> {{ seconds }}</span>
                </div>
              </countdown>
            </div>

            <div class="text-2">
              {{ pool | numFormat }} XBC
            </div>

            <div class="text-3">
              $117.78
            </div>
            <div class="text-4">
              Last bidder: <a :href="'https://bscscan.com/address/' + lastBidder" target="_blank">{{ lastBidder }}</a>
            </div>

          </div>

        </div>

        <div class="section-3">

          <div class="part-1 card-wrapper">

            <div class="text-1">
              Play to win!
            </div>

            <div class="content-part">
              <div v-if="approve_wallet">

                <div class="text-2">
                  0 XBC Available
                </div>
                <div class="input-amount">
                  <el-input v-model="amountApprove" readonly>
                    <template slot="append">
                      XBC
                    </template>
                  </el-input>
                </div>
                <div class="button-approve">
                  <c-button tag="a" color="primary" wide-mobile @click="approveContract">
                    Approve Contract
                  </c-button>
                </div>

              </div>
              <div v-else class="button-unlock-wallet">
                <c-button tag="a" color="primary" wide-mobile @click="play">
                  Play
                </c-button>
              </div>
            </div>

          </div>
          <div class="part-2 card-wrapper">

            <div class="text-1">
              Last events
            </div>

            <div class="content-part">

              <div>
                Tx: 0xf35...ecd1c
                BID
                10.5644 XBC
              </div>

              <div>
                Tx: 0x622...8abf1
                BID
                10.4512 XBC
              </div>

            </div>

          </div>

        </div>

        <div class="section-4 card-wrapper">

          <div class="text-1">
            Game Rules
          </div>

          <div class="content-part">
            The Last Surivor has a 17 minutes countdown timer which will reset on each bid.
            <br>
            <br>
            Minimum Bid is 1% of the pot.
            <br>
            10% of bid will be added to XBN liquidity pool and burned.
            <br>
            <br>
            When the countdown reaches zero, we will have the last survivor and the pot will be distributed:
            <br>
            50% credited instantly to the last bidders address (the last survivor)
            <br>
            33% is carried to the next round
            <br>
            17% will be added to XBN liquidity pool and burned
            <br>
            <br>
            Once ended, the new game will start as soon as new fighter join the game.
            <br>
            <br>

          </div>

        </div>

      </div>

    </section>
  </div>

</template>

<script>
// import layout
// import CLayout from '@/layouts/LayoutDefault.vue'
// import sections
import CButton from '@/components/elements/Button.vue'
import Vue from 'vue'
import VueCountdown from '@chenfengyuan/vue-countdown'

import { getLastSurivorInfo, participateLS } from '@/libs/lastsurvivor'
import { getWeb3Client } from '@/libs/web3'
import WalletConnectWrap from '@/components/Mixins/WalletConnectWrap'

Vue.component(VueCountdown.name, VueCountdown)

export default {
  name: 'LastSurvior',
  components: {
    CButton
  },
  mixins: [WalletConnectWrap],
  props: [
    'pool',
    'lastBidder',
    'countdownTimer'
  ],
  data() {
    return {
      approve_wallet: false,
      amountApprove: 12.1212
    }
  },
  created() {
    // this.$emit('update:layout', CLayout)
  },
  methods: {
    async play() {
      this.$emit('playLS')
    }
  }
}
</script>
<style lang="scss" scoped>
.last-survior-wrapper {
  padding-bottom: 100px;

  .card-spec-wrapper {
    background-color: white;
    width: 100%;
    padding: 30px;
    background-image: linear-gradient(315deg, #ffffff 1%, #f4b151 20%, #935d0f 77%);

    .text-1 {
      font-size: 25px;
      font-weight: bold;
      color: white;
    }

    .text-2 {
      font-size: 20px;
      font-weight: bold;
      color: white;
    }

    .text-3 {
      font-size: 18px;
      color: white;
    }
  }

  .section-1 {
    margin-top: 70px;
  }

  .section-2 {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 !important;

    .part-1 {
      width: 50%;

      img {
        width: 70%;
      }
    }

    .part-2 {
      text-align: right;
      width: 50%;
      padding: 30px;

      .clock-display {
        font-size: 35px;
        font-style: normal;
        color: black;
        margin: 30px 20px;

      }

      .text-1 {
        font-size: 35px;
        font-weight: bold;
        color: black;
        line-height: 1.4;
      }

      .text-2 {
        font-size: 25px;
        font-weight: bold;
        color: black;
      }

      .text-3 {
        font-size: 20px;
        font-weight: bold;
        color: black;
        margin-top: 20px;
      }

      .text-4 {
        font-size: 16px;
        color: black;
      }
    }
  }

  .section-3 {

    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .content-part {
      margin-top: 20px;
    }

    .text-1 {
      font-size: 30px;
      font-weight: bold;
      color: black;
    }

    .part-1 {
      width: 48%;

      .text-2 {
        font-size: 15px;
        color: black;
        text-align: right;
        font-weight: bold;
      }

      .button-approve {
        margin-top: 20px;
        text-align: center;
      }

    }

    .part-2 {
      width: 48%;
      color: black;

    }

  }

  .section-4 {
    margin-top: 50px;

    .text-1 {
      font-size: 35px;
      font-weight: bold;
      color: black;
    }

    .content-part {
      margin-top: 30px;
      color: black;
      font-size: 16px;
      line-height: 1.4;
    }

  }

}
.card-wrapper {
  box-shadow: 0 32px 64px rgb(24 35 52 / 24%);
  padding: 30px;
  background: #FFFFFF linear-gradient(135deg, #ffffff 80%, #f4b151 100%);
}

    .button-primary {
    color: #FFFFFF !important;
    background-color: #F3AA43 !important;
    border-color: transparent !important;
}
.button {

    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 14px;
    line-height: 22px;
    font-weight: 700;
    padding: 12px 43px;
    height: 48px;
    text-decoration: none !important;
    text-transform: uppercase;
    color: #182334;
    background-color: #FFFFFF;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-radius: 2px;
    cursor: pointer;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
    letter-spacing: inherit;
    white-space: nowrap;
    -webkit-transition: background .15s ease;
    transition: background .15s ease;
}
.clock-display {
    font-size: 45px;
    font-weight: bold;
    font-style: italic;
    margin: 50px;
}
</style>

