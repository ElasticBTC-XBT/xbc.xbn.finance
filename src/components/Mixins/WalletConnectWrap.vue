<script>
import { getWeb3Client } from '@/libs/web3'

export default {
  name: 'WalletConnectWrap',
  data() {
    return {
      userAccount: null,
      walletClient: {}
    }
  },
  mounted() {
    this.handlePageOnLoad()
  },

  created() {
    this.$root.$emit('updateWalletClient', () => {
      this.connectWallet()
    })

    this.$root.$on('connectWallet', () => {
      this.connectWallet()
    })
  },

  methods: {
    async connectWallet() {
      await this.handleGetClient()
      await this.handleGetInitialData()
    },

    async handleGetClient() {
      const walletClient = await getWeb3Client()
      this.$set(this, 'walletClient', walletClient)
    },

    async handleGetInitialData() {
      const accounts = await this.walletClient.web3Client.eth.getAccounts()
      this.$set(this, 'userAccount', accounts.length > 0 ? accounts[0] : null)

      if (this.userAccount !== null) {
        this.$store.dispatch('app/connectWallet', accounts[0])
      }

      this.$emit('fetchStatus')
    },

    async handlePageOnLoad() {
      if (this.walletClient.web3Client) {
        await this.handleGetInitialData()
      }
    }
  }
}
</script>

<style scoped>

</style>
