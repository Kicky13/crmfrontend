<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-body p-2">
        <!-- <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-3"></div>
          <div class="col-md-3"></div>
          <div class="col-md-3">
            <a-button type="primary" @click="handleRefresh()" class="mb-3 float-right">
              <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
              Refresh
            </a-button>
          </div>
        </div> -->
        <a-row :gutter="[8, 8]" class="mb-3">
          <a-col :xs="24" :md="3">
            <Multiselect
              placeholder="Region"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="region"
              class="multiselect-blue"
              @change="regionHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} opsi terpilih
                </div>
              </template>
            </Multiselect>
          </a-col>
          <a-col :xs="24" :md="3">
            <Multiselect
              placeholder="Provinsi"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="provinsi"
              no-options-text="List masih kosong"
              @change="provinsiHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} opsi terpilih
                </div>
              </template>
            </Multiselect>  
          </a-col>
          <a-col :xs="24" :md="3">
            <Multiselect
              placeholder="Area"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="area"
              no-options-text="List masih kosong"
              @change="areaHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} opsi terpilih
                </div>
              </template>
            </Multiselect>
          </a-col>
          <a-col :xs="24" :md="3">
            <Multiselect
              placeholder="Distrik"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="distrik"
              no-options-text="List masih kosong"
              @change="distrikHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} opsi terpilih
                </div>
              </template>
            </Multiselect>
          </a-col>
          <a-col :xs="24" :md="3">
            <Multiselect
              placeholder="Distributor"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="distributor"
              no-options-text="List masih kosong"
              @change="distributorHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} opsi terpilih
                </div>
              </template>
            </Multiselect>
          </a-col>
          <a-col :xs="24" :md="5">
            <a-button type="primary" @click="showMetabaseResult" class="mb-3">
              <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
              Tampilkan
            </a-button>
          </a-col>
          <a-col :xs="24" :md="4">
            <a-button type="primary" @click="handleRefresh()" class="mb-3 float-right">
              <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
              Refresh
            </a-button>
          </a-col>
        </a-row>
        <iframe
          class="w-100"
          :src="promotionDashboard.dataMetabase"
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
import Multiselect from '@vueform/multiselect'

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      region: [],
      selectedRegion: [],
      provinsi: [],
      selectedProvinsi: [],
      area: [],
      selectedArea: [],
      distrik: [],
      selectedDistrik: [],
      distributor: [],
      selectedDistributor: [],
      params: {
        region: null,
        provinsi: null,
        area: null,
        distrik: null,
        distributor: null,
      },
    }
  },
  computed: {
    ...mapState({
      promotionDashboard: state => state.promotionDashboard.data,
    }),
  },
  async mounted() {
    await this.getMetabasePromotion({
      region: null,
      provinsi: null,
      area: null,
      distrik: null,
      distributor: null,
    })
    await this.fetchRegionList()
  },
  methods: {
    ...mapActions('promotionDashboard', ['getMetabasePromotion', 'getRegionList', 'getProvinsiList', 'getAreaList', 'getDistrikList', 'getDistributorList']),

    async handleRefresh() {
      await this.getMetabasePromotion({
        region: null,
        provinsi: null,
        area: null,
        distrik: null,
        distributor: null,
      })
    },

    async fetchRegionList() {
      await this.getRegionList()
      this.promotionDashboard.regionList.map(row => {
        const obj = {
          value: `${row.id_region}-${row.nama_region}`,
          label: row.nama_region,
        }
        this.region.push(obj)
      })
    },

    async fetchProvinsiList(id) {
      await this.getProvinsiList({
        id_region: id,
      })
      this.promotionDashboard.provinsiList.map(row => {
        const obj = {
          value: `${row.id_provinsi}-${row.nama_provinsi}`,
          label: row.nama_provinsi,
        }
        this.provinsi.push(obj)
      })
    },

    async fetchAreaList(id) {
      await this.getAreaList({
        id_provinsi: id,
      })
      this.promotionDashboard.areaList.map(row => {
        const obj = {
          value: `${row.id_area}-${row.nama_area}`,
          label: row.nama_area,
        }
        this.area.push(obj)
      })
    },

    async fetchDistrikList(id) {
      await this.getDistrikList({
        id_area: id,
      })
      this.promotionDashboard.distrikList.map(row => {
        const obj = {
          value: `${row.id_distrik}-${row.nama_distrik}`,
          label: row.nama_distrik,
        }
        this.distrik.push(obj)
      })
    },

    async fetchDistributorList(id) {
      await this.getDistributorList({
        id_distrik: id,
      })
      this.promotionDashboard.distributorList.map(row => {
        const obj = {
          value: `${row.id_distributor}-${row.nama_distributor}`,
          label: row.nama_distributor,
        }
        this.distributor.push(obj)
      })
    },

    async regionHandle(value) {
      this.provinsi = []
      this.selectedRegion = value
      this.selectedRegion.map(item => {
        this.fetchProvinsiList(parseInt(item.split('-')[0]))
      })
    },

    async provinsiHandle(value) {
      this.area = []
      this.selectedProvinsi = value
      this.selectedProvinsi.map(item => {
        this.fetchAreaList(parseInt(item.split('-')[0]))
      })
    },

    async areaHandle(value) {
      this.distrik = []
      this.selectedArea = value
      this.selectedArea.map(item => {
        this.fetchDistrikList(parseInt(item.split('-')[0]))
      })
    },

    async distrikHandle(value) {
      this.distributor = []
      this.selectedDistrik = value
      console.log(this.selectedDistrik)
      this.selectedDistrik.map(item => {
        this.fetchDistributorList(item.split('-')[0])
      })
    },

    async distributorHandle(value) {
      this.selectedDistributor = value
    },

    async showMetabaseResult() {
      this.params.region = this.selectedRegion.length == 0 ? null : this.getSelectedItemName(this.selectedRegion)
      this.params.provinsi = this.selectedProvinsi == 0 ? null : this.getSelectedItemName(this.selectedProvinsi)
      this.params.area = this.selectedArea == 0 ? null : this.getSelectedItemName(this.selectedArea)
      this.params.distrik = this.selectedDistrik == 0 ? null : this.getSelectedItemName(this.selectedDistrik)
      this.params.distributor = this.selectedDistributor == 0 ? null : this.getSelectedItemName(this.selectedDistributor)

      // await this.getMetabasePromotion({
      //   region: this.params.region,
      //   provinsi: this.params.provinsi,
      //   area: this.params.area,
      //   distrik: this.params.distrik,
      //   distributor: this.params.distributor,
      // })
    },

    getSelectedItemName(item) {
      const temp = []
      item.map((row, index) => {
        temp.push(row.split('-')[1])
      })

      return temp
    },
  },
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
.multiselect-option.is-selected {
  background: #b20838;
}
.multiselect-option.is-selected.is-pointed {
  background: rgb(255, 28, 92);
}
</style>