<template>
  <div class="navbar">
    <div style="display: flex; flex-wrap: wrap;align-items: center;">
      <div style="width: 70px">
        <logo v-if="true" :collapse="true" />
      </div>

      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div class="right-menu" style="padding-right: 15px">
      <el-button icon="el-icon-connection" type="primary" :disabled="connected_wallet!==null" @click="connectWallet()">
        {{ connected_wallet !== null ? truncatedAddress : 'Connect wallet' }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Sidebar/Logo.vue'
import Breadcrumb from '@/components/Breadcrumb'
import _ from 'lodash'

export default {
  components: {
    Breadcrumb,
    Logo
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'connected_wallet'
    ]),
    truncatedAddress() {
      return _.truncate(this.connected_wallet || '', {
        length: 15
      })
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    connectWallet() {
      this.$root.$emit('connectWallet')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 70px;
    overflow: hidden;
    position: relative;
    max-width: 1140px;
    margin: auto;

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;
      display: flex;
      padding: 18px 0px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50px;;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
