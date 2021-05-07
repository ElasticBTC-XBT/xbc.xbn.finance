<template>
  <el-row style="background: #fff;">
    <el-col :md="12">
      <div class="section-1 logo-wrapper">
        <div class="">
          <a
            href="https://twitter.com/search?q=%24XBC&src=cashtag_click"
            target="_blank"
            ><span class="title-1">XBN Community </span><br /><span
              class="sub-title-1"
              >($XBC)</span
            ></a
          >
        </div>
        <img :src="xbcThumb" class="image-logo" />
        <div class="text-center">
          <a
            href="https://v1exchange.pancakeswap.finance/#/swap?outputCurrency=0x0321394309CaD7E0E424650844c3AB3b659315d3"
            class="btn-img-custom btn-buy"
            target="_blank"
          >
            <img :src="btnBuy" />
          </a>
        </div>
      </div>
      <div class="section-container">
        <div class="title-2">Hold XBC to earn BNB and more XBC</div>
        <el-row>
          <el-col :md="12" :sm="12">
            <a
              href="https://docs.xbc.xbn.finance/"
              class="btn-img-custom"
              target="_blank"
            >
              <img :src="btnWhitePaper" />
            </a>
          </el-col>
          <el-col :md="12" :sm="12">
            <a
              href="https://twitter.com/XbcXbn"
              class="btn-img-custom"
              target="_blank"
            >
              <img :src="btnTwitter" />
            </a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="12" :sm="12">
            <a
              href="https://t.me/XBCforeveryone"
              class="btn-img-custom"
              target="_blank"
            >
              <img :src="btnTele" />
            </a>
          </el-col>
          <el-col :md="12" :sm="12">
            <a
              href="https://www.xbn.finance/xbn/airdrop/"
              class="btn-img-custom"
              target="_blank"
            >
              <img :src="btnAirdrop" />
            </a>
          </el-col>
        </el-row>
        <!-- <div>
            <a href="https://www.xbn.finance/xbn/lottery/">
            <img :src="btnFomo" class="image-thumb" style="width: 300px"><br/>
           <b class="sub-title-2">Earn BNB with FomoLotto</b>
            </a>
        </div> -->
        <!-- <div class="text-center" style="margin-top: 20px">
          <p>
            <a
              href="https://medium.com/@emekadeboy/how-to-buy-xbc-and-claim-bnb-on-metamask-8ebcce5f2038"
              class=""
              target="_blank"
            >
              How to Buy?
            </a>
            /
            <a href="https://docs.xbc.xbn.finance/" class="" target="_blank">
              White Paper
            </a>
            / <a href="https://twitter.com/XbcXbn">Twitter</a> /
            <a href="https://t.me/XBCforeveryone">Telegram</a> /
            <a href="https://www.xbn.finance/xbn/airdrop/">XBN Airdrop</a>
            <br />
            
          </p>
          <p>
            <b style="color: #f3aa43">
              Community driven, 100% Liquidity Pool is burned.
              <br />
              <a
                href="https://docs.xbc.xbn.finance/tokenomics/xbc-community-driven-token"
                target="_blank"
                style="color: gray"
                >(🔗 Tokenomics)</a
              >
            </b>
          </p>
          <p style="font-style: italic">
            There are always something you can do everyday to help XBC grows.
            <br /><b>For example:</b> creating your Chat Group and tell your friends.
          </p>
          <p>
            More holders, stronger XBC, <br />more BNB to claim, more XBC to
            own! <br /><a
              href="https://docs.xbc.xbn.finance/features/transactional-tax"
              target="_blank"
              style="color: gray"
              >(🔗 Transactional Tax)</a
            >
          </p>
          
        </div> -->
      </div>
    </el-col>
    <el-col :md="12">
      <div class="section-1 logo-wrapper">
        <div class="">
          <span class="title-1">COMMUNITY DRIVEN </span><br />
          <span class="sub-title-2">100% Liquidity Pool is burned</span>
        </div>
        <div>
          <img :src="thumbTokenomic" class="image-thumb" />
          <div>
            <a
              type="button"
              role="button"
              href="https://docs.xbc.xbn.finance/tokenomics/xbc-community-driven-token"
              target="_blank"
              class="btn-custom btn-cus-default"
              >🔗 Tokenomics</a
            >
          </div>
          <div class="sub-title-2">
            There are always something you can do everyday to help XBC grows.<br />
            <b>For example:</b> creating your Chat Group and tell your friends.
          </div>
        </div>
        <div>
          <img :src="thumbTax" class="image-thumb" />
          
          <div class="sub-title-2">
            More holders, stronger XBC, more BNB to claim, more XBC to own!
          </div>

          <div>
            <a
              href="https://docs.xbc.xbn.finance/features/transactional-tax"
              target="_blank"
              class="btn-custom btn-cus-default"
              >🔗 Transactional Tax</a
            >
          </div>
        </div>
        <p style="margin-top: 50px">
            <a
              type="button"
              role="button"
              title="Share on twitter"
              href="https://twitter.com/intent/tweet?url=https://www.xbn.finance/xbc/"
              rel="noopener"
              target="_blank"
              class="btn-floating btn btn-tw"
              style="text-align: center"
            >
              Share if you care! <br data-v-15f5a93c="" /><img
                data-v-15f5a93c=""
                src="https://i.imgur.com/1AKV1Mc.gif"
                style="width: 37px; display: inline-block"
            /></a>
          </p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import xbcLogo from "@/assets/images/XBC-logo.png";
import xbcThumb from "@/assets/images/xbc_thumb.png";
import btnBuy from "@/assets/images/buy_xbc.png";
import btnWhitePaper from "@/assets/images/btn_whitepaper.png";
import btnTwitter from "@/assets/images/btn_twitter.png";
import btnTele from "@/assets/images/btn_tele.png";
import btnFomo from "@/assets/images/btn_fomolotto.png";
import btnAirdrop from "@/assets/images/btn_airdrop.png";
import thumbTokenomic from "@/assets/images/thumb_tokenomic.png";
import thumbTax from "@/assets/images/thumb_tax.png";

export default {
  name: "Section1",
  props: {},
  data() {
    return {
      xbcLogo: xbcLogo,
      xbcThumb: xbcThumb,
      btnBuy: btnBuy,
      btnWhitePaper: btnWhitePaper,
      btnTwitter: btnTwitter,
      btnTele: btnTele,
      btnFomo: btnFomo,
      btnAirdrop: btnAirdrop,
      thumbTax: thumbTax,
      thumbTokenomic: thumbTokenomic,
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.section-container {
  padding: 20px;
  background: #fff;
  // box-shadow: 0 32px 64px rgb(24 35 52 / 24%);
  text-align: center;
  // width: fit-content;
  margin-top: 30px;

  .title-2 {
    font-size: 20px;
    font-weight: bold;
    color: #3d3d3d;
    margin-bottom: 30px;
    margin-top: 20px;
  }
}

.logo-wrapper {
  margin: auto;
  width: fit-content;
  text-align: center;
  padding: 30px 100px 0px;
  border-radius: 0px;
  background: #fff;

  .image-logo {
    max-width: 100%;
    padding-top: 40px;
  }

  

  .title-1 {
    margin: 50px 0px 10px 0px;
    font-size: 30px;
    font-weight: bold;
    color: #3d3d3d;
  }
  .sub-title-1 {
    font-size: 30px;
    line-height: 1.5;
    color: #3d3d3d;
  }
  
}
.image-thumb {
    max-width: 100%;
    width: 150px;
    padding-top: 40px;
  }
  .sub-title-2 {
    font-size: 20px;
    line-height: 1.5;
    color: #3d3d3d;
  }
  .btn-buy{
    margin-top: 20px;
  }
</style>
