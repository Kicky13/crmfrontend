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
              <i class="fa fa-eye mr-2" />
              Refresh
            </a-button>
          </div>
        </div>
        <iframe
          class="w-100"
          :src="sowDashboard.dataMetabase"
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
      sowDashboard: state => state.sowDashboard.data,
    }),
  },
  async mounted() {
    await this.getMetabaseSOW()
  },
  methods: {
    ...mapActions('sowDashboard', ['getMetabaseSOW']),

    async handleRefresh() {
      await this.getMetabaseSOW()
    },
  },
}
</script>
