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
          height="800"
          src="https://datastudio.google.com/embed/reporting/d23218ab-bb90-430e-884b-0f764f5959ec/page/oFpoC"
          frameborder="0"
          style="border:0"
          allowfullscreen
        ></iframe>
        <!-- <iframe
          class="w-100"
          :src="sowDashboard.dataMetabase"
          frameborder="0"
          height="800"
          allowtransparency
        ></iframe> -->
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
      filter: state => state.filter.data,
      sowDashboard: state => state.sowDashboard.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    await this.getMetabase()
  },
  methods: {
    ...mapActions('sowDashboard', ['getMetabase']),

    async handleRefresh() {
      await this.getMetabase()
    },
  },
}
</script>
