<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-body p-2">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-3"></div>
          <div class="col-md-3"></div>
          <div class="col-md-3">
            <a-button type="primary" @click="handleRefresh()" class="mb-3 float-right">
              <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
              Refresh
            </a-button>
          </div>
        </div>
        <iframe
          class="w-100"
          :src="priceMonitoring.dataMetabase"
          frameborder="0"
          height="800"
          allowtransparency
        ></iframe>
        <!-- <iframe
          src="https://mtb.aksestoko.com/public/dashboard/47812e1e-1dc4-4c26-a2ee-e4b32541e8ab"
          frameborder="0"
          height="800"
          class="w-100 border-0 rounded"
          allowtransparency
        ></iframe> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {},

  data() {
    return {}
  },
  computed: {
    ...mapState({
      priceMonitoring: state => state.priceMonitoring.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    // await this.getMetabasePriceMonitoring()
    await this.getData()
  },
  methods: {
    ...mapActions(
      'priceMonitoring',
      [
        'getMetabasePriceMonitoring',
        'getMetabasePriceMonitoringTSO',
        'getMetabasePriceMonitoringSPC',
        'getMetabasePriceMonitoringASM',
        'getMetabasePriceMonitoringAdmin',
        'getDataTso',
        'getDataAdminDistributor',
        'getDataDistributor',
        'getDataSpc',
        'getDataAsm',
      ],
    ),

    errorMessageUser(text) {
      this.$swal({
        icon: 'error',
        title: 'Oops...',
        text,
      });
    },

    async handleRefresh() {
      // await this.getMetabasePriceMonitoring()
      await this.getData()
    },

    async getData() {
      const userData = JSON.parse(localStorage.getItem('userData'))
      const roleUser = userData.role
      
      switch (roleUser) {
        case 'TSO':
          await this.getDataTso({
            id: userData.userid,
          })

          await this.getMetabasePriceMonitoringTSO({
            pregion: this.priceMonitoring.getDataTsoResult.pregion,
          })

          if (!this.priceMonitoring.getDataTsoResult.status) {
            this.errorMessageUser('TSO belum dimapping ke Distrik')
          }
        break
        case 'SPC':
          await this.getDataSpc({
            id: userData.userid,
          })

          await this.getMetabasePriceMonitoringSPC({
            pregion: this.priceMonitoring.getDataSpcResult.pregion,
          })

          if (!this.priceMonitoring.getDataSpcResult.status) {
            this.errorMessageUser('SPC belum dimapping ke Region')
          }
        break
        case 'ASM':
          await this.getDataAsm({
            id: userData.userid,
          })

          await this.getMetabasePriceMonitoringASM({
            pregion: this.priceMonitoring.getDataAsmResult.pregion,
          })

          if (!this.priceMonitoring.getDataAsmResult.status) {
            this.errorMessageUser('ASM belum dimapping ke TSO')
          }
        break
        case 'Admin Dist':
          await this.getDataAdminDistributor({
            id: userData.userid,
          })

          await this.getDataDistributor({
            id: this.priceMonitoring.getDataAdminDistributorResult.id_distributor,
          })

          await this.getMetabasePriceMonitoring({
            pdistrik: this.priceMonitoring.getDataDistributorResult.pdistrik,
            pdistributor: this.priceMonitoring.getDataDistributorResult.pdistributor,
          })

          if (!this.priceMonitoring.getDataDistributorResult.status) {
            this.errorMessageUser('Distributor belum dimapping ke toko')
          }
        break
        case 'Admin':
          await this.getMetabasePriceMonitoringAdmin({
            pdistrik: [],
            pdistributor: [],
          })
        break
        default:
          // await this.getMetabasePriceMonitoring({
          //   pdistrik: [],
          //   pdistributor: [],
          // })
      }
    },
  },
}
</script>
