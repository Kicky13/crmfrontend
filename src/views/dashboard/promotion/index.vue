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
              ref="region"
              @change="regionHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label overflow-hidden">
                  {{ values.length }} selected
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
              ref="provinsi"
              @change="provinsiHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} selected
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
              ref="area"
              @change="areaHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} selected
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
              ref="distrik"
              @change="distrikHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} selected
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
              ref="distributor"
              @change="distributorHandle"
            >
              <template #multiplelabel="{ values }">
                <div class="multiselect-multiple-label">
                  {{ values.length }} selected
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
    await this.fetchAll()
    // this.$refs.region.selectAll()
    // this.$refs.provinsi.selectAll()
    // this.$refs.area.selectAll()
    // this.$refs.distrik.selectAll()
    // this.$refs.distributor.selectAll()
    await this.getMetabasePromotion({
      region: this.selectedRegion,
      provinsi: this.selectedProvinsi,
      area: this.selectedArea,
      distrik: this.selectedDistrik,
      distributor: this.selectedDistributor,
    })
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

    async fetchAll() {
      await this.getRegionList()
      await this.getProvinsiList()
      await this.getAreaList()
      await this.getDistrikList()
      await this.getDistributorList()

      this.regionMapping()
      this.provinsiMapping()
      this.areaMapping()
      this.distrikMapping()
      this.distributorMapping()

      this.region.map(item => {
        this.selectedRegion.push(item.label)
      })
      this.provinsi.map(item => {
        this.selectedProvinsi.push(item.label)
      })
      this.area.map(item => {
        this.selectedArea.push(item.label)
      })
      this.distrik.map(item => {
        this.selectedDistrik.push(item.label)
      })
      this.distributor.map(item => {
        this.selectedDistributor.push(item.label)
      })
    },

    async fetchRegionList() {
      await this.getRegionList()
      this.regionMapping()
    },

    regionMapping() {
      this.promotionDashboard.regionList.map(row => {
        const obj = {
          value: row.id_region,
          label: row.nama_region,
        }
        this.region.push(obj)
      })
    },

    async fetchProvinsiList(id) {
      await this.getProvinsiList({
        id_region: id,
      })
      this.provinsiMapping()
    },

    provinsiMapping() {
      this.promotionDashboard.provinsiList.map(row => {
        const obj = {
          value: row.id_provinsi,
          label: row.nama_provinsi,
        }
        this.provinsi.push(obj)
      })
    },

    async fetchAreaList(id) {
      await this.getAreaList({
        id_provinsi: id,
      })
      this.areaMapping()
    },

    areaMapping() {
      this.promotionDashboard.areaList.map(row => {
        const obj = {
          value: row.id_area,
          label: row.nama_area,
        }
        this.area.push(obj)
      })
    },

    async fetchDistrikList(id) {
      await this.getDistrikList({
        id_area: id,
      })
      this.distrikMapping()
    },

    distrikMapping() {
      this.promotionDashboard.distrikList.map(row => {
        const obj = {
          value: row.id_distrik,
          label: row.nama_distrik,
        }
        this.distrik.push(obj)
      })
    },

    async fetchDistributorList(id) {
      await this.getDistributorList({
        id_distrik: id,
      })
      this.distributorMapping()
    },

    distributorMapping() {
      this.promotionDashboard.distributorList.map(row => {
        const obj = {
          value: row.id_distributor,
          label: row.nama_distributor,
        }
        this.distributor.push(obj)
      })
    },

    async regionHandle(value) {
      this.provinsi = []
      this.selectedRegion = []
      value.map(item => {
        this.fetchProvinsiList(item)
        this.selectedRegion.push(this.region.find(row => row.value == item).label)
      })
    },

    async provinsiHandle(value) {
      this.area = []
      this.selectedProvinsi = []
      value.map(item => {
        this.fetchAreaList(item)
        this.selectedProvinsi.push(this.provinsi.find(row => row.value == item).label)
      })
    },

    async areaHandle(value) {
      this.distrik = []
      this.selectedArea = []
      value.map(item => {
        this.fetchDistrikList(item)
        this.selectedArea.push(this.area.find(row => row.value == item).label)
      })
    },

    async distrikHandle(value) {
      this.distributor = []
      this.selectedDistrik = []
      value.map(item => {
        this.fetchDistributorList(item)
        this.selectedDistrik.push(this.distrik.find(row => row.value == item).label)
      })
    },

    async distributorHandle(value) {
      this.selectedDistributor = []
      value.map(item => {
        this.selectedDistributor.push(this.distributor.find(row => row.value == item).label)
      })
    },

    async showMetabaseResult() {
      this.params.region = this.selectedRegion.length == 0 ? null : this.selectedRegion
      this.params.provinsi = this.selectedProvinsi == 0 ? null : this.selectedProvinsi
      this.params.area = this.selectedArea == 0 ? null : this.selectedArea
      this.params.distrik = this.selectedDistrik == 0 ? null : this.selectedDistrik
      this.params.distributor = this.selectedDistributor == 0 ? null : this.selectedDistributor

      await this.getMetabasePromotion({
        region: this.params.region,
        provinsi: this.params.provinsi,
        area: this.params.area,
        distrik: this.params.distrik,
        distributor: this.params.distributor,
      })
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
.overflow-hidden {
  text-overflow: ellipsis;
}
</style>