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
          <el-col id="thumb-gif" :md="12" :sm="12" class="part-1">
            <!--            <img :src="require('@/assets/images/survivor.png')">-->
            <img id="thumb-gif-img" class="thumb-gif-img">
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
            <div v-if="countdownTimer != null && countdownTimer <=0 ">
              <h5 class="rainbow rainbow_text_animated">
                Congratulation! We have the winner!
              </h5>

              <a
                class="rainbow rainbow_text_animated"
                style="font-size: 11px; text-overflow: ellipsis"
                :href="'https://bscscan.com/address/' + lastBidder"
                target="_blank"
              >{{ lastBidder }}</a>
              <p>
                <el-button :loading="loadingCollectBNB" icon="el-icon-thumb" type="primary" size="large" tag="a" color="primary" wide-mobile style="margin: 10px" @click="playBNB">
                  Claim Reward
                </el-button></p>
            </div>
            <h3 style="text-align: center">
              The last survivor takes 50% of the reward pool
            </h3>

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

                  <div class="button-unlock-wallet">

                    <p class="rainbow rainbow_text_animated" style="font-size: 15px">Free XBN/PEPE airdrop when playing</p>

                    <p>                    Click button below to play! </p>

                    <el-button class="rainbow2" :loading="loadingCollectBNB" icon="el-icon-aim" type="primary" size="large" tag="a" color="primary" wide-mobile style="margin: 10px;" @click="playBNB">
                      Play with BNB
                    </el-button>
                    <el-button
                      v-if="xbcbalance >= 1000000000 && xbcbalance > pool/90"
                      class="rainbow1"
                      :loading="loadingCollectBNB"
                      icon="el-icon-video-play"
                      type="primary"
                      size="large"
                      tag="a"
                      color="primary"
                      wide-mobile
style="margin: 10px"
                      @click="play"
                    >
                      Play with XBC
                    </el-button>
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
            The Last Surivor has a ~ 888 + (Reward Pool/10^9)*5 seconds  countdown timer
            which will reset on each bid.
            <br>
            <br>
            Minimum Bid is 1% (>= 1000000000 XBC) of the pot. <b>You will get free $XBN or $PEPE when you play</b>

            <br>
            <br>
            When the countdown reaches zero, we will have the last survivor and
            the pot will be distributed:
            <br>
            <ul>
              <li>
                50% credited instantly to the last bidders address (the last
                survivor)
              </li>
              <li>50% is carried to the next round</li>

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
  props: ['pool', 'poolbusd', 'lastBidder', 'countdownTimer', 'xbcbalance'],
  data() {
    return {
      approve_wallet: false,
      amountApprove: 12.1212
    }
  },
  created() {
    var lmt = 30
    // this.$emit('update:layout', CLayout)
    function httpGetAsync(theUrl, callback) {
      // create the request object
      var xmlHttp = new XMLHttpRequest()

      // set the state change callback to capture when the response comes in
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          callback(xmlHttp.responseText)
        }
      }

      // open as a GET call, pass in the url and set async = True
      xmlHttp.open('GET', theUrl, true)

      // call send with no params as they were passed in on the url string
      xmlHttp.send(null)

      return
    }

    // callback for the top 8 GIFs of search
    function tenorCallback_search(responsetext) {
      // parse the json response
      var response_objects = JSON.parse(responsetext)

      var top_10_gifs = response_objects['results']

      var i = Math.floor(Math.random() * lmt)

      // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)

      document.getElementById('thumb-gif-img').src = top_10_gifs[i]['media'][0]['mediumgif']['url']

      return
    }

    // function to call the trending and category endpoints
    function grab_data() {
      // set the apikey and limit

      const apikey = '1SHHKX9LOT82'

      // test search term
      const word_list = ['funny',
        'cat',
        'dog',
        'crazy',
        'stupid',
        'seriously',
        'rich',
        'slow',
        'alaskan',
        'hello',
        'wtf',
        'omg',
        'mad',
        'wow',
        'extreme',
        'excited',
        'running man',
        'thank you',
        'shiba',
        'doge',
        'bitcoin',
        'binance',
        'love',
        'girl',
        'monkey',
        'baby',
        'cute',
        'hmm',
        'drama',
        'running',
        'surprised',
        'clap',
        'japan',
        'superman',
        'weird',
        'woah',
        'smilling',
        'shocked',
        'Chiaki',
        'puppy',
        'yeah',
        'blink',
        'hi',
        'no way',
        'money',
        'lucky',
        'hellokitty',
        'tripping',
        'gasp',
        'animals',
        'lespare',
        'grrr',
        'dancing',
        'puglife',
        'pepe',
        'screaming',
        'yay',
        'escape',
        'shrugs',
        'hug',
        'thank you',
        'yakuza',
        'happy',
        'pig',
        'laugh',
        'lol',
        'grin',
        'omfg',
        'penguin',
        'oops',
        'friends',
        'hot',
        'nice',
        'kiss'
      ]
      const shuffledArray = word_list.sort((a, b) => 0.5 - Math.random())
      const search_term = shuffledArray[0] // 'porn'

      // using default locale of en_US
      const search_url =
        'https://g.tenor.com/v1/search?q=' +
        search_term +
        '&key=' +
        apikey +
        '&limit=' +
        lmt

      httpGetAsync(search_url, tenorCallback_search)

      // data will be loaded by each call's callback
      return
    }

    // SUPPORT FUNCTIONS ABOVE
    // MAIN BELOW

    // start the flowF
    setInterval(function() { grab_data() }, 15000)
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
#thumb-gif{
  padding: 20px;
  vertical-align: middle;
  overflow: hidden;
}
.thumb-gif-img{
  min-height: 265px;
}
.rainbow2 {
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  padding: 8px 16px;
  background-image: linear-gradient(
    90deg,
    #00c0ff 0%,
    #ffcf00 49%,
    #fc4f4f 80%,
    #00c0ff 100%
  );
  animation: slidebg 5s linear infinite;
}

.rainbow1 {
  //background-color: #343A40;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  padding: 8px 16px;

  background-image: linear-gradient(
    to right,
    red,
    #e7484f 16.65%,
    #f68b1d 16.65%,
    #f68b1d 33.3%,
    #fced00 33.3%,
    #fced00 49.95%,
    #009e4f 49.95%,
    #009e4f 66.6%,
    #00aac3 66.6%,
    #00aac3 83.25%,
    #732982 83.25%,
    #732982 100%,
    #e7484f 100%
  );
  animation: slidebg 13s linear infinite;
}

@keyframes slidebg {
  to {
    background-position: 20vw;
  }
}

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
        max-width: 100%;
        height: auto;
        max-height: 325px;
        margin-bottom: -3px;
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
  .last-survior-wrapper .section-2 .part-2 .rainbow{
    font-size: 16px;
  }
  .last-survior-wrapper .section-3 .part-1 {
    margin-right: 0px;
  }
  .last-survior-wrapper .section-3 .part-2 {
    margin-top: 50px;
    margin-left: 0px;
  }
  .thumb-gif-img{
    min-height: auto;
  }
}

</style>

