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
          :src="visitDashboard.dataMetabase"
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
      visitDashboard: state => state.visitDashboard.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    // await this.getMetabase()
    await this.getData()
  },
  methods: {
    ...mapActions(
      'visitDashboard',
      [
        'getMetabase',
        'getDataTso',
        'getDataAdminDistributor',
        'getDataDistributor',
      ],
    ),

    async handleRefresh() {
      // await this.getMetabase()
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

          await this.getMetabase({
            pdistrik: this.visitDashboard.getDataTsoResult.pdistrik,
            pdistributor: this.visitDashboard.getDataTsoResult.pdistributor,
          })
        break
        case 'Admin Dist':
          await this.getDataAdminDistributor({
            id: userData.userid,
          })

          await this.getDataDistributor({
            id: this.visitDashboard.getDataAdminDistributorResult.id_distributor,
          })
          console.log(this.visitDashboard)

          await this.getMetabase({
            pdistrik: this.visitDashboard.getDataDistributorResult.pdistrik,
            pdistributor: this.visitDashboard.getDataDistributorResult.pdistributor,
          })
        break
        case 'Admin':
          await this.getMetabase({
            pdistrik: [],
            pdistributor: [],
          })
        break
        default:
          // await this.getMetabase({
          //   pdistrik: [],
          //   pdistributor: [],
          // })
      }
    },
  },
}
</script>
