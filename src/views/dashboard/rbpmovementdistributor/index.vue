<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-body p-2">
        <a-row :gutter="[8, 8]" class="mb-3">
          <a-col :xs="24" :md="3">
            <Multiselect
              placeholder="Region"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :groups="true"
              :options="[
                {
                  label: '-- Select All --',
                  options: region,
                }
              ]"
              no-options-text="List kosong"
              @change="regionHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label overflow-hidden">
                  Region
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
              :groups="true"
              :options="[
                {
                  label: '-- Select All --',
                  options: provinsi,
                }
              ]"
              no-options-text="List kosong"
              @change="provinsiHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label">
                  Provinsi
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
              :groups="true"
              :options="[
                {
                  label: '-- Select All --',
                  options: area,
                }
              ]"
              no-options-text="List kosong"
              @change="areaHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label">
                  Area
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
              :groups="true"
              :options="[
                {
                  label: '-- Select All --',
                  options: distrik,
                }
              ]"
              no-options-text="List kosong"
              @change="distrikHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label">
                  Distrik
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
          <a-col :xs="24" :md="7">
            <a-button type="primary" @click="handleRefresh()" class="mb-3 float-right">
              <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
              Refresh
            </a-button>
          </a-col>
        </a-row>
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
      provinsiTemp: [],
      selectedProvinsi: [],
      area: [],
      areaTemp: [],
      selectedArea: [],
      distrik: [],
      distrikTemp: [],
      selectedDistrik: [],
      distributor: [],
      distributorTemp: [],
      selectedDistributor: [],
    }
  },
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
    await this.fetchAll()
    await this.getMetabaseRBPMovement()
  },
  methods: {
    ...mapActions(
      'rbpMovement',
      [
        'getMetabaseRBPMovement',
        'getRegionList',
        'getProvinsiList',
        'getAreaList',
        'getDistrikList',
        'getDistributorList',
      ],
    ),

    async handleRefresh() {
      await this.getMetabaseRBPMovement()
    },

    async fetchAll() {
      await this.getRegionList()
      await this.getProvinsiList({
        id_region: undefined,
      })
      await this.getAreaList({
        id_provinsi: undefined,
      })
      await this.getDistrikList({
        id_area: undefined,
      })
      await this.getDistributorList({
        id_distrik: undefined,
      })

      this.regionMapping()
      this.provinsiMapping()
      this.areaMapping()
      this.distrikMapping()
      this.distributorMapping()
    },

    regionMapping() {
      this.rbpMovement.regionList.map(row => {
        const obj = {
          value: row.id_region,
          label: row.nama_region,
        }
        this.region.push(obj)
      })
    },

    provinsiMapping() {
      this.rbpMovement.provinsiList.map(row => {
        const obj = {
          value: row.id_provinsi,
          label: row.nama_provinsi,
        }
        this.provinsi.push(obj)
      })
      this.provinsi.map(row => this.provinsiTemp.push(row))
    },

    areaMapping() {
      this.rbpMovement.areaList.map(row => {
        const obj = {
          value: row.id_area,
          label: row.nama_area,
        }
        this.area.push(obj)
      })
      this.area.map(row => this.areaTemp.push(row))
    },

    distrikMapping() {
      this.rbpMovement.distrikList.map(row => {
        const obj = {
          value: row.id_distrik,
          label: row.nama_distrik,
        }
        this.distrik.push(obj)
      })
      this.distrik.map(row => this.distrikTemp.push(row))
    },

    distributorMapping() {
      this.rbpMovement.distributorList.map(row => {
        const obj = {
          value: row.id_distributor,
          label: row.nama_distributor,
        }
        this.distributor.push(obj)
      })
      this.distributor.map(row => this.distributorTemp.push(row))
    },

    async regionHandle(value) {
      this.provinsi = []
      this.selectedRegion = []
      if (value.length == 0) {
        this.provinsi = this.provinsiTemp
      } else {
        await this.getProvinsiList({
          id_region: value,
        })
        this.rbpMovement.provinsiList.map(row => {
          const obj = {
            value: row.id_provinsi,
            label: row.nama_provinsi,
          }
          this.provinsi.push(obj)
        })
        value.map(item => {
          this.selectedRegion.push(this.region.find(region => region.value == item).label)
        })
      }
    },

    async provinsiHandle(value) {
      this.area = []
      this.selectedProvinsi = []
      if (value.length == 0) {
        this.area = this.areaTemp
      } else {
        await this.getAreaList({
          id_provinsi: value,
        })
        this.rbpMovement.areaList.map(row => {
          const obj = {
            value: row.id_area,
            label: row.nama_area,
          }
          this.area.push(obj)
        })
        value.map(item => {
          this.selectedProvinsi.push(this.provinsi.find(provinsi => provinsi.value == item).label)
        })
      }
    },

    async areaHandle(value) {
      this.distrik = []
      this.selectedArea = []
      if (value.length == 0) {
        this.distrik = this.distrikTemp
      } else {
        await this.getDistrikList({
          id_area: value,
        })
        this.rbpMovement.distrikList.map(row => {
          const obj = {
            value: row.id_distrik,
            label: row.nama_distrik,
          }
          this.distrik.push(obj)
        })
        value.map(item => {
          this.selectedArea.push(this.area.find(area => area.value == item).label)
        })
      }
    },

    async distrikHandle(value) {
      this.distributor = []
      this.selectedDistrik = []
      if (value.length == 0) {
        this.distributor = this.distributorTemp
      } else {
        await this.getDistributorList({
          id_distrik: value,
        })
        this.rbpMovement.distributorList.map(row => {
          const obj = {
            value: row.id_distributor,
            label: row.nama_distributor,
          }
          this.distributor.push(obj)
        })
        value.map(item => {
          this.selectedDistrik.push(this.distrik.find(distrik => distrik.value == item).label)
        })
      }
    },

    distributorHandle(value) {
      this.selectedDistributor = []
      value.map(item => this.selectedDistributor.push(this.distributor.find(distributor => distributor.value == item).label))
    },

    showMetabaseResult() {
      console.log(this.selectedRegion)
      console.log(this.selectedProvinsi)
      console.log(this.selectedArea)
      console.log(this.selectedDistrik)
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
.multiselect-group-label.is-selected {
  background: #67001d;
}
.multiselect-group-label.is-selected.is-pointed {
  background: rgb(255, 28, 92);
}
</style>