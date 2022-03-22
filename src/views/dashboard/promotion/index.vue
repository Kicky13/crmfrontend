<template>
  <div>
    <iframe
      class="w-100"
      :src="promotionDashboard.dataMetabase"
      frameborder="0"
      height="600"
      allowtransparency
    ></iframe>
    <!-- <iframe
      src="https://mtb.aksestoko.com/public/dashboard/47812e1e-1dc4-4c26-a2ee-e4b32541e8ab"
      frameborder="0"
      width="800"
      class="w-100"
      allowtransparency
    ></iframe> -->
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
      promotionDashboard: state => state.promotionDashboard.data,
    }),
  },
  async mounted() {
    await this.getMetabasePromotion()
  },
  methods: {
    ...mapActions('promotionDashboard', ['getMetabasePromotion']),
  },
}
</script>
