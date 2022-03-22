<template>
  <div>
    <iframe
      class="w-100"
      :src="promotionDashboard.dataMetabase"
      frameborder="0"
      height="600"
      allowtransparency
    ></iframe>
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
