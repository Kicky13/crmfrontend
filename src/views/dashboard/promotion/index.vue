<template>
  <div>
    <div v-if="isHidden" class="card card-top card-top-primary" style="height: 50vh"></div>
    <div v-else class="card card-top card-top-primary">
      <div class="card-body p-2">
        <a-row :gutter="[8, 8]" class="mb-3">
          <a-col :xs="24" :md="3">
            <!-- <Multiselect
              placeholder="Region"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="region"
              @change="regionHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label overflow-hidden">
                  Region
                </div>
              </template>
            </Multiselect> -->
          </a-col>
          <a-col :xs="24" :md="3">
            <!-- <Multiselect
              placeholder="Provinsi"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="provinsi"
              no-options-text="List masih kosong"
              @change="provinsiHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label">
                  Provinsi
                </div>
              </template>
            </Multiselect>   -->
          </a-col>
          <a-col :xs="24" :md="3">
            <!-- <Multiselect
              placeholder="Area"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="area"
              no-options-text="List masih kosong"
              @change="areaHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label">
                  Area
                </div>
              </template>
            </Multiselect> -->
          </a-col>
          <a-col :xs="24" :md="3">
            <!-- <Multiselect
              placeholder="Distrik"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="distrik"
              no-options-text="List masih kosong"
              @change="distrikHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label">
                  Distrik
                </div>
              </template>
            </Multiselect> -->
          </a-col>
          <a-col :xs="24" :md="3">
            <!-- <Multiselect
              placeholder="Distributor"
              mode="multiple"
              :close-on-select="false"
              :hide-selected="false"
              :options="distributor"
              no-options-text="List masih kosong"
              @change="distributorHandle"
            >
              <template #multiplelabel="{}">
                <div class="multiselect-multiple-label">
                  Distributor
                </div>
              </template>
            </Multiselect> -->
          </a-col>
          <a-col :xs="24" :md="5">
            <!-- <a-button type="primary" @click="showMetabaseResult" class="mb-3">
              <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
              Tampilkan
            </a-button> -->
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
// import Multiselect from '@vueform/multiselect'

export default {
  // components: {
  //   Multiselect,
  // },
  data() {
    return {
  //     region: [],
  //     selectedRegion: [],
  //     provinsi: [],
  //     selectedProvinsi: [],
  //     area: [],
  //     selectedArea: [],
  //     distrik: [],
  //     selectedDistrik: [],
  //     distributor: [],
  //     selectedDistributor: [],
  //     params: {
  //       region: [],
  //       provinsi: [],
  //       area: [],
  //       distrik: [],
  //       distributor: [],
  //     },
      isHidden: false,
    }
  },
  computed: {
    ...mapState({
      promotionDashboard: state => state.promotionDashboard.data,
    }),
  },
  async mounted() {
    // await this.fetchAll()
    // await this.getMetabasePromotion({
    //   region: [],
    //   provinsi: [],
    //   area: [],
    //   distrik: [],
    //   distributor: [],
    // })
    await this.getData()
  },
  methods: {
    ...mapActions(
      'promotionDashboard',
      [
        // 'getRegionList',
        // 'getProvinsiList',
        // 'getAreaList',
        // 'getDistrikList',
        // 'getDistributorList',
        'getMetabasePromotion',
        'getMetabasePromotionAdmin',
        'getMetabasePromotionTSO',
        'getMetabasePromotionSPC',
        'getMetabasePromotionASM',
        'getDataTso',
        'getDataRegionTSO',
        'getDataAdminDistributor',
        'getDataDistributor',
        'getDataSpc',
        'getDataAsm',
      ],
    ),

    errorMessageUser(text) {
      this.$swal({
        icon: 'error',
        title: 'Oops...',
        text,
      });
    },

    async handleRefresh() {
      // await this.getMetabasePromotion({
      //   region: [],
      //   provinsi: [],
      //   area: [],
      //   distrik: [],
      //   distributor: [],
      // })
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

          await this.getMetabasePromotionTSO({
            pregion: this.promotionDashboard.getDataTsoResult.pregion,
          })

          if (!this.promotionDashboard.getDataTsoResult.status) {
            this.errorMessageUser('TSO belum dimapping ke Distrik')
            this.isHidden = true
          }
        break
        case 'SPC':
          await this.getDataSpc({
            id: userData.userid,
          })

          await this.getMetabasePromotionSPC({
            pregion: this.promotionDashboard.getDataSpcResult.pregion,
          })

          if (!this.promotionDashboard.getDataSpcResult.status) {
            this.errorMessageUser('SPC belum dimapping ke Region')
            this.isHidden = true
          }
        break
        case 'ASM':
          await this.getDataAsm({
            id: userData.userid,
          })

          await this.getMetabasePromotionASM({
            pregion: this.promotionDashboard.getDataAsmResult.pregion,
          })

          if (!this.promotionDashboard.getDataAsmResult.status) {
            this.errorMessageUser('ASM belum dimapping ke TSO')
            this.isHidden = true
          }
        break
        case 'Admin Dist':
          await this.getDataAdminDistributor({
            id: userData.userid,
          })

          await this.getDataDistributor({
            id: this.promotionDashboard.getDataAdminDistributorResult.id_distributor,
          })

          await this.getMetabasePromotion({
            pdistrik: this.promotionDashboard.getDataDistributorResult.pdistrik,
            pdistributor: this.promotionDashboard.getDataDistributorResult.pdistributor,
          })

          if (!this.promotionDashboard.getDataDistributorResult.status) {
            this.errorMessageUser('Distributor belum dimapping ke toko')
            this.isHidden = true
          }
        break
        case 'Admin':
          await this.getMetabasePromotionAdmin({
            pdistrik: [],
            pdistributor: [],
          })
        break
        default:
          // await this.getMetabasePromotion({
          //   pdistrik: [],
          //   pdistributor: [],
          // })
      }
    },

    // async fetchAll() {
    //   await this.getRegionList()
    //   await this.getProvinsiList({
    //     id_region: undefined,
    //   })
    //   await this.getAreaList({
    //     id_provinsi: undefined,
    //   })
    //   await this.getDistrikList({
    //     id_area: undefined,
    //   })
    //   await this.getDistributorList({
    //     id_distrik: undefined,
    //   })

    //   this.regionMapping()
    //   this.provinsiMapping()
    //   this.areaMapping()
    //   this.distrikMapping()
    //   this.distributorMapping()
    // },

    // async fetchRegionList() {
    //   await this.getRegionList()
    //   this.regionMapping()
    // },

    // regionMapping() {
    //   this.promotionDashboard.regionList.map(row => {
    //     const obj = {
    //       value: row.id_region,
    //       label: row.nama_region,
    //     }
    //     this.region.push(obj)
    //   })
    // },

    // async fetchProvinsiList(id) {
    //   await this.getProvinsiList({
    //     id_region: id,
    //   })
    //   this.provinsiMapping()
    // },

    // provinsiMapping() {
    //   this.promotionDashboard.provinsiList.map(row => {
    //     const obj = {
    //       value: row.id_provinsi,
    //       label: row.nama_provinsi,
    //     }
    //     this.provinsi.push(obj)
    //   })
    // },

    // async fetchAreaList(id) {
    //   await this.getAreaList({
    //     id_provinsi: id,
    //   })
    //   this.areaMapping()
    // },

    // areaMapping() {
    //   this.promotionDashboard.areaList.map(row => {
    //     const obj = {
    //       value: row.id_area,
    //       label: row.nama_area,
    //     }
    //     this.area.push(obj)
    //   })
    // },

    // async fetchDistrikList(id) {
    //   await this.getDistrikList({
    //     id_area: id,
    //   })
    //   this.distrikMapping()
    // },

    // distrikMapping() {
    //   this.promotionDashboard.distrikList.map(row => {
    //     const obj = {
    //       value: row.id_distrik,
    //       label: row.nama_distrik,
    //     }
    //     this.distrik.push(obj)
    //   })
    // },

    // async fetchDistributorList(id) {
    //   await this.getDistributorList({
    //     id_distrik: id,
    //   })
    //   this.distributorMapping()
    // },

    // distributorMapping() {
    //   this.promotionDashboard.distributorList.map(row => {
    //     const obj = {
    //       value: row.id_distributor,
    //       label: row.nama_distributor,
    //     }
    //     this.distributor.push(obj)
    //   })
    // },

    // async regionHandle(value) {
    //   this.provinsi = []
    //   this.selectedRegion = []
    //   if (value.length == 0) {
    //     await this.getProvinsiList({
    //       id_region: undefined,
    //     })
    //     this.provinsiMapping()
    //   } else {
    //     await this.fetchProvinsiList(value)
    //     value.map(item => {
    //       this.selectedRegion.push(this.region.find(region => region.value == item).label)
    //     })
    //   }
    // },

    // async provinsiHandle(value) {
    //   this.area = []
    //   this.selectedProvinsi = []
    //   if (value.length == 0) {
    //     await this.getAreaList({
    //       id_provinsi: undefined,
    //     })
    //     this.areaMapping()
    //   } else {
    //     await this.fetchAreaList(value)
    //     value.map(item => {
    //       this.selectedProvinsi.push(this.provinsi.find(provinsi => provinsi.value == item).label)
    //     })
    //   }
    // },

    // async areaHandle(value) {
    //   this.distrik = []
    //   this.selectedArea = []
    //   if (value.length == 0) {
    //     await this.getDistrikList({
    //       id_area: undefined,
    //     })
    //     this.distrikMapping()
    //   } else {
    //     await this.fetchDistrikList(value)
    //     value.map(item => {
    //       this.selectedArea.push(this.area.find(area => area.value == item).label)
    //     })
    //   }
    // },

    // async distrikHandle(value) {
    //   this.distributor = []
    //   this.selectedDistrik = []
    //   if (value.length == 0) {
    //     await this.getDistributorList({
    //       id_distrik: undefined,
    //     })
    //     this.distributorMapping()
    //   } else {
    //     await this.fetchDistributorList(value)
    //     value.map(item => {
    //       this.selectedDistrik.push(this.distrik.find(distrik => distrik.value == item).label)
    //     })
    //   }
    // },

    // async distributorHandle(value) {
    //   this.selectedDistributor = []
    //   value.map(item => {
    //     this.selectedDistributor.push(this.distributor.find(distributor => distributor.value == item).label)
    //   })
    // },

    // async showMetabaseResult() {
    //   await this.getMetabasePromotion({
    //     region: this.selectedRegion,
    //     provinsi: this.selectedProvinsi,
    //     area: this.selectedArea,
    //     distrik: this.selectedDistrik,
    //     distributor: this.selectedDistributor,
    //   })
    // },
  },
}
</script>

<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->

<!-- <style>
.multiselect-option.is-selected {
  background: #b20838;
}
.multiselect-option.is-selected.is-pointed {
  background: rgb(255, 28, 92);
}
.overflow-hidden {
  text-overflow: ellipsis;
}
</style> -->