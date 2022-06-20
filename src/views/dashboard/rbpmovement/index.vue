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
          :src="rbpMovement.dataMetabase"
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
  computed: {
    ...mapState({
      rbpMovement: state => state.rbpMovement.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    // await this.getMetabaseRBPMovement()
    await this.getData()

  },
  methods: {
    ...mapActions(
      'rbpMovement',
      [
        'getMetabaseRBPMovement',
        'getMetabaseRBPMovementTSO',
        'getMetabaseRBPMovementSPC',
        'getMetabaseRBPMovementAdmin',
        'getDataTso',
        'getDataAdminDistributor',
        'getDataDistributor',
        'getDataSpc',
      ],
    ),

    async handleRefresh() {
      // await this.getMetabaseRBPMovement()
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

          await this.getMetabaseRBPMovementTSO({
            pregion: this.rbpMovement.getDataTsoResult.pregion,
          })
        break
        case 'SPC':
          await this.getDataSpc({
            id: userData.userid,
          })

          await this.getMetabaseRBPMovementSPC({
            pregion: this.rbpMovement.getDataSpcResult.pregion,
          })
        break
        case 'Admin Dist':
          await this.getDataAdminDistributor({
            id: userData.userid,
          })

          await this.getDataDistributor({
            id: this.rbpMovement.getDataAdminDistributorResult.id_distributor,
          })

          await this.getMetabaseRBPMovement({
            pdistrik: this.rbpMovement.getDataDistributorResult.pdistrik,
            pdistributor: this.rbpMovement.getDataDistributorResult.pdistributor,
          })
        break
        case 'Admin':
          await this.getMetabaseRBPMovementAdmin({
            pdistrik: [],
            pdistributor: [],
          })
        break
        default:
          // await this.getMetabaseRBPMovement({
          //   pdistrik: [],
          //   pdistributor: [],
          // })
      }
    },
  },
}
</script>
