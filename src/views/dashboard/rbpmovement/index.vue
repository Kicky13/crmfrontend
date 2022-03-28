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

  data() {
    return {}
  },
  computed: {
    ...mapState({
      filter: state => state.filter.data,
      rbpMovement: state => state.rbpMovement.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  data() {
    return {
      listDistrik: [],
    }
  },
  async mounted() {
    await this.getAllProvinsi()
    await this.getAllDistrik()
    await this.getAllDistributor()
    await this.getAllKategori()
    await this.getAllBrand()
    await this.getMetabaseRBPMovement()
    this.listDistrik = this.filter.listDistrik
  },
  methods: {
    ...mapActions('filter', [
      'getAllProvinsi',
      'getAllArea',
      'getAllDistrik',
      'getAllDistributor',
      'getAllKategori',
      'getAllBrand',
    ]),
    ...mapActions('rbpMovement', ['getMetabaseRBPMovement']),
    async handleProvinsi(value) {
      this.listDistrik = []
      const idProvinsi = value.split('-')[0]
      await this.getAllArea({ id_provinsi: idProvinsi })
      const allArea = this.filter.listArea
      allArea.map(async item => {
        await this.getAllDistrik({ id_area: item.id_area })
        this.filter.listDistrik.map(distrik => this.listDistrik.push(distrik))
      })
    },
    async handleArea(value) {
      const idArea = value.split('-')[0]
      await this.getAllDistrik({ id_area: idArea })
    },
    async handleDistrik(value) {
      const idDistrik = value.split('-')[0]
      await this.getAllDistributor({ id_distrik: idDistrik })
    },
    async handleKategori(value) {
      const idKategori = value.split('-')[0]
      await this.getAllBrand({ id_kategori: idKategori })
    },
    async handleRefresh() {
      await this.getMetabaseRBPMovement()
    },
  },
}
</script>
