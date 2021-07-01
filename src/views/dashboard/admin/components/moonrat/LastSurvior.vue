<template>
  <div>
    <section
      class="signin section illustration-section-01 last-survior-wrapper"
    >
      <div class="section-1 card-spec-wrapper">
        <div class="container">
          <div class="text-1">The Last Survivor</div>
          <div class="text-2">Participate with XBC or BNB</div>
          <div class="text-3">
            Be come the last survivor and win 50% of the pot
          </div>
        </div>
      </div>

      <div class="container">
        <el-row class="section-2 card-wrapper">
          <el-col :md="12" :sm="12" class="part-1">
            <!--            <img :src="require('@/assets/images/survivor.png')">-->
            <img src="https://i.imgur.com/2k6Bsi2.gif">
          </el-col>
          <el-col :md="12" :sm="12" class="part-2">
            <div v-if="countdownTimer > 0" class="count-down">
              <h3>Countdown until new winner</h3>
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
            <div v-else>
              <h5 class="rainbow rainbow_text_animated">
              Congratulation! We have the winner!</h5>

              <a
                class="rainbow rainbow_text_animated"
                style="font-size: 11px; text-overflow: ellipsis"
                :href="'https://bscscan.com/address/' + lastBidder"
                target="_blank"
              >{{ lastBidder }}</a>
            </div>
            <h3>The last survivor takes 50% of the reward pool</h3>

            <h2 class="rainbow rainbow_text_animated">
              {{ pool | numFormat }} XBC
            </h2>

            <h3 class="rainbow rainbow_text_animated">{{ poolbusd }} USD</h3>
          </el-col>
        </el-row>

        <div class="section-3">
          <el-row>
            <el-col :md="12" :sm="12">
              <div class="part-1 card-wrapper">
                <div class="text-1">Play to win!</div>

                <div class="content-part">
                  <div v-if="approve_wallet">
                    <div class="text-2">0 XBC Available</div>
                    <div class="input-amount">
                      <el-input v-model="amountApprove" readonly>
                        <template slot="append"> XBC </template>
                      </el-input>
                    </div>
                    <div class="button-approve">
                      <c-button
                        tag="a"
                        color="primary"
                        wide-mobile
                        @click="approveContract"
                      >
                        Approve Contract
                      </c-button>
                    </div>
                  </div>
                  <div v-else class="button-unlock-wallet">
                    <p>Amount required to play {{ pool/100| numFormat }} XBC or equivalent value in BNB. Play with XBC will be available soon! </p>
<!--                    <c-button tag="a" color="primary" wide-mobile style="margin: 10px" @click="play" >-->
<!--                      Play with XBC-->
<!--                    </c-button>-->

                    <c-button tag="a" color="primary" wide-mobile style="margin: 10px" @click="playBNB">
                      Play with BNB
                    </c-button>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :md="12" :sm="12">
              <div class="part-2 card-wrapper">
                <div class="text-1">Last Player</div>

                <div class="content-part">
                  <div style="with: 80px; overflow: hidden">
                    <a
                      class="rainbow rainbow_text_animated"
                      style="font-size: 11px; text-overflow: ellipsis"
                      :href="'https://bscscan.com/address/' + lastBidder"
                      target="_blank"
                    >{{ lastBidder }}</a>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="section-4 card-wrapper">
          <div class="text-1">Game Rules</div>

          <div class="content-part">
            The Last Surivor has a ~15 minutes (888 seconds) countdown timer
            which will reset on each bid.
            <br>
            <br>
            Minimum Bid is 1% of the pot.

            <br>
            When the countdown reaches zero, we will have the last survivor and
            the pot will be distributed:
            <br>
            <ul>
              <li>
                50% credited instantly to the last bidders address (the last
                survivor)
              </li>
              <li>40% is carried to the next round</li>
              <li>10% will be burned</li>
              <li>
                Once ended, the new game will start as soon as new fighter join
                the game.
              </li>
            </ul>
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

import WalletConnectWrap from '@/components/Mixins/WalletConnectWrap'

Vue.component(VueCountdown.name, VueCountdown)

export default {
  name: 'LastSurvior',
  components: {
    CButton
  },
  mixins: [WalletConnectWrap],
  props: ['pool', 'poolbusd', 'lastBidder', 'countdownTimer'],
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
    },
    async playBNB() {
      this.$emit('playLSBNB')
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
    background-image: linear-gradient(
      315deg,
      #ffffff 1%,
      #f4b151 20%,
      #935d0f 77%
    );

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
      img {
        width: 70%;
      }
    }

    .part-2 {
      text-align: right;
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
        margin-bottom: 20px;
      }

      .text-4 {
        font-size: 16px;
        color: black;
      }
    }
  }

  .section-3 {
    margin-top: 50px;
    display: block;
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
        margin-right: 20px;
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
      color: black;
      margin-left: 20px;
      min-height: 162px;
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
  background: #ffffff linear-gradient(135deg, #ffffff 80%, #f4b151 100%);
}

.button-primary {
  color: #ffffff !important;
  background-color: #f3aa43 !important;
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
  background-color: #ffffff;
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
  -webkit-transition: background 0.15s ease;
  transition: background 0.15s ease;
}
.clock-display {
  font-size: 45px;
  font-weight: bold;
  font-style: italic;
  margin: 50px;
}

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
    #6666ff,
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

@keyframes rainbow_animation {
  0%,
  100% {
    background-position: 0 0;
  }

  50% {
    background-position: 100% 0;
  }
}

@media (max-width: 500px) {
  .part-1 {
    text-align: center;
  }
  .last-survior-wrapper .section-2 .part-2 {
    text-align: center;
  }
.last-survior-wrapper .section-3 .part-1{
    margin-right: 0px;
}
  .last-survior-wrapper .section-3 .part-2 {
    margin-top: 50px;
    margin-left: 0px;
  }
}
</style>

