<template>
  <div>
    <a-form :model="sowDashboard.formData" label-align="left" layout="vertical">
      <div class="row">
        <div class="col-xs-2 col-md-2">
          <a-select
            class="col-lg-12 col-md-12 pr-2"
            style="width: 100% !important"
            placeholder="Provinsi"
            v-model:value="sowDashboard.formData.selectedProvinsi"
            show-search
            @change="handleArea"
          >
            <a-select-option
              v-for="(provinsi, index) in sowDashboard.dataProvinsi"
              :key="index"
              :value="provinsi.id_provinsi"
              >{{ provinsi.nama_provinsi }}</a-select-option
            >
          </a-select>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-select
            class="col-lg-12 col-md-12 pr-2"
            style="width: 100% !important"
            placeholder="Area"
            v-model:value="sowDashboard.formData.selectedArea"
            show-search
            @change="handleDistrik"
          >
            <a-select-option
              v-for="(area, index) in sowDashboard.dataArea"
              :key="index"
              :value="area.id_area"
            >
              {{ area.nama_area }}</a-select-option
            >
          </a-select>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-select
            class="col-lg-12 col-md-12 pr-2"
            style="width: 100% !important"
            placeholder="Distrik"
            v-model:value="sowDashboard.formData.selectedDistrik"
            show-search
            @change="handleDistributor"
          >
            <a-select-option
              v-for="(distrik, index) in sowDashboard.dataDistrik"
              :key="index"
              :value="distrik.id_distrik"
            >
              {{ distrik.nama_distrik }}</a-select-option
            >
          </a-select>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-select
            class="col-lg-12 col-md-12 pr-2"
            style="width: 100% !important"
            placeholder="Distributor"
            v-model:value="sowDashboard.formData.selectedDistributor"
            show-search
            @change="handleBrand"
          >
            <a-select-option
              v-for="(distributor, index) in sowDashboard.dataDistributor"
              :key="index"
              :value="distributor.id_distributor"
              >{{ distributor.nama_distributor }}</a-select-option
            >
          </a-select>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-select
            class="col-lg-12 col-md-12 pr-2"
            style="width: 100% !important"
            placeholder="Brand"
            v-model:value="sowDashboard.formData.selectedBrand"
            show-search
          >
            <a-select-option
              v-for="(brand, index) in sowDashboard.dataBrand"
              :key="index"
              :value="brand.id_brand"
            >
              {{ brand.nama_brand }}</a-select-option
            >
          </a-select>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-button type="primary" class="w-100" @click="handleOk()">
            <i class="fa fa-eye mr-2" />
            Tampilkan
          </a-button>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-xs-2 col-md-2">
          <a-select
            class="col-lg-12 col-md-12 pr-2"
            style="width: 100% !important"
            placeholder="Tahun"
            v-model:value="sowDashboard.formData.selectedYear"
          >
            <a-select-option value="2019">2019</a-select-option>
            <a-select-option value="2020">2020</a-select-option>
            <a-select-option value="2021">2021</a-select-option>
            <a-select-option value="2022">2022</a-select-option>
          </a-select>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-select
            class="col-lg-12 col-md-12 pr-2"
            style="width: 100% !important"
            placeholder="Bulan"
            v-model:value="sowDashboard.formData.selectedMonth"
          >
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
            <a-select-option value="3">3</a-select-option>
            <a-select-option value="4">4</a-select-option>
            <a-select-option value="5">5</a-select-option>
            <a-select-option value="6">6</a-select-option>
            <a-select-option value="7">7</a-select-option>
            <a-select-option value="8">8</a-select-option>
            <a-select-option value="9">9</a-select-option>
            <a-select-option value="10">10</a-select-option>
            <a-select-option value="11">11</a-select-option>
            <a-select-option value="12">12</a-select-option>
          </a-select>
        </div>
      </div>
    </a-form>
    <div class="row mt-4">
      <div class="col-md-4 col-sm-4">
        <div class="list_download d-flex mt-3 rounded shadow px-3 pb-3">
          <div class="list_download_information">
            <label for="">Produk (SKU)</label>
            <br />
            <span>{{ sowDashboard.dataLabel ? sowDashboard.dataLabel.produk : 0 }}</span>
          </div>
          <div class="list_download_icon ml-auto">
            <img src="@/assets/images/icon/package.png" alt="Logo SIG" v-once />
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-4">
        <div class="list_download d-flex mt-3  rounded shadow px-3 pb-3">
          <div class="list_download_information">
            <label for="">Brands</label>
            <br />
            <span>{{ sowDashboard.dataLabel ? sowDashboard.dataLabel.brand : 0 }}</span>
          </div>
          <div class="list_download_icon ml-auto">
            <img src="@/assets/images/icon/globe-1.png" alt="Logo SIG" v-once />
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-4">
        <div class="list_download d-flex mt-3  rounded shadow px-3 pb-3">
          <div class="list_download_information">
            <label for="">Total Customer</label>
            <br />
            <span>{{ sowDashboard.dataLabel ? sowDashboard.dataLabel.customer : 0 }}</span>
          </div>
          <div class="list_download_icon ml-auto">
            <img src="@/assets/images/icon/user-check.png" alt="Logo SIG" v-once />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="list_download d-flex mt-3  rounded shadow px-3 pb-3">
          <div class="list_download_information">
            <label for="">Distributor</label>
            <br />
            <span>{{ sowDashboard.dataLabel ? sowDashboard.dataLabel.distributor : 0 }}</span>
          </div>
          <div class="list_download_icon ml-auto">
            <img src="@/assets/images/icon/users-more.png" alt="Logo SIG" v-once />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="list_download d-flex mt-3  rounded shadow px-3 pb-3">
          <div class="list_download_information">
            <label for="">Registered Outled</label>
            <br />
            <span>0</span>
          </div>
          <div class="list_download_icon ml-auto">
            <img src="@/assets/images/icon/users-more.png" alt="Logo SIG" v-once />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="list_download d-flex mt-3  rounded shadow px-3 pb-3">
          <div class="list_download_information">
            <label for="">Outled Surveyed</label>
            <br />
            <span>0</span>
          </div>
          <div class="list_download_icon ml-auto">
            <img src="@/assets/images/icon/users-more.png" alt="Logo SIG" v-once />
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12 col-sm-12">
        <fieldset class="border border-dark shadow px-3 pb-3">
          <legend class="w-auto px-2">
            <small class="font-weight-light">
              Share Of Wallet & Product Position
            </small>
          </legend>
          <div class="row">
            <div class="col-md-4">
              <div class="bg-white p-3 style_donut">
                <vue-apex-charts
                  type="pie"
                  height="340"
                  :options="chartOptions"
                  :series="series"
                ></vue-apex-charts>
              </div>
            </div>
            <div class="col-md-8">
              <div class="bg-white p-3 style_area">
                <vue-apex-charts
                  type="bubble"
                  height="320"
                  :options="chartOptions_area"
                  :series="chartOptions_area.series_area"
                ></vue-apex-charts>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <!-- <div class="row mt-4">
      <div class="col-md-12 col-sm-12">
        <fieldset class="border border-dark shadow px-3 pb-3">
          <legend class="w-auto px-2">
            <small class="font-weight-light">
              Brand Leading
            </small>
          </legend>
          <div class="row">
            <div class="col-md-12">
              <div class="bg-white p-3">
                <iframe
                  width="250"
                  height="300"
                  id="gmap_canvas"
                  :src="link"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                >
                </iframe>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div> -->
    <div class="card card-top card-top-primary mt-3">
      <div class="card-body">
        <div class="row">
          <div class="col-xs-2 col-md-2">
            <a-select
              class="col-lg-12 col-md-12 pr-2"
              style="width: 100% !important"
              placeholder="Provinsi"
              v-model:value="sowDashboard.formData.selectedProvinsi"
              show-search
              @change="handleArea"
            >
              <a-select-option
                v-for="(provinsi, index) in sowDashboard.dataProvinsi"
                :key="index"
                :value="provinsi.id_provinsi"
                >{{ provinsi.nama_provinsi }}</a-select-option
              >
            </a-select>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-12 col-sm-12">
            <div class="table-responsive text-nowrap">
              <a-table
                :columns="sowDashboard.columns"
                :loading="sowDashboard.isLoading"
                :pagination="sowDashboard.pagination"
              >
              </a-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
// import { getRegionList,getDataListArea,getDataListDistrik,getDataListBrand,getDataListDistributor } from '@/services/connection/dashboard/api'

import { mapState, mapActions } from 'vuex'
import { _ } from 'vue-underscore'
// const itemsPerPage = [5, 10, 15, 20]
export default {
  components: {
    VueApexCharts,
  },
  setup() {
    return {
      // itemsPerPage,
    }
  },
  data: function() {
    return {
      link: '',

      //fungsi menampilkan google map
      ready: false,
      fallbackProcedure: 'gps', //gps | geolocation | address | manually
      zoom: 17, //Default Zoom
      geolocation: {
        // If GPS and Find by address fails then, map will be positioned by a default geolocation
        lat: 31.73858,
        lng: -35.98628,
        zoom: 2,
      },
      address: {
        query: 'Albania, Tirane', //If GPS fails, Find by address is triggered
        zoom: 10,
      },
      manually: {
        address_description: '21 Dhjetori, Tirana, Albania',
        city: 'Tirana',
        country: 'Albania',
        lat: 41.3267905,
        lng: 19.8060475,
        state: 'Tirana County',
        zip_code: '',
        zoom: 17,
      },
      place: {},

      //fungsi menampilkan chart
      chartOptions: {
        chart: {
          width: '400',
          type: 'pie',
        },
        legend: {
          position: 'bottom',
        },
        labels: ['Semen Gresik', 'Semen Rembang', 'Semen Tuban', 'Semen Padang', 'Semen Mortar'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
      series: [25, 15, 44, 55, 41],

      chartOptions_area: {
        chart: {
          height: 350,
          type: 'bubble',
          zoom: {
            enabled: true,
            type: 'xy',
          },
        },
        series: [
          {
            name: 'Bubble1',
            data: {
              min: 10,
              max: 60,
            },
          },
          {
            name: 'Bubble2',
            data: {
              min: 10,
              max: 60,
            },
          },
          {
            name: 'Bubble3',
            data: {
              min: 10,
              max: 60,
            },
          },
          {
            name: 'Bubble4',
            data: {
              min: 10,
              max: 60,
            },
          },
        ],
        xaxis: {
          tickAmount: 10,
          labels: {
            formatter: function(val) {
              return parseFloat(val).toFixed(1)
            },
          },
        },
        yaxis: {
          tickAmount: 7,
        },
      },
    }
  },
  computed: {
    ...mapState({
      sowDashboard: state => state.sowDashboard.data,
    }),
  },
  async mounted() {
    await this.getProvinsi()
    this.urlMap()
    await this.submitLabel()
  },
  methods: {
    ...mapActions('sowDashboard', [
      'getProvinsi',
      'getListTabel',
      'getArea',
      'getDistrik',
      'getDistributor',
      'getBrand',
      'submitLabel',
    ]),
    urlMap() {
      // let lat =
      //   this.koordinatLock.dataDetailHistory.latitude === null ? 0 : this.detail_visit.latitude
      // let long =
      //   this.koordinatLock.dataDetailHistory.longitude === null
      //     ? 0
      //     : this.detail_visit.latitude.longitude
      let keyApi = `AIzaSyD89e9RP1mKfBHWE16auSGPJOUoJ1oxMSI`
      this.link =
        `https://www.google.com/maps/embed/v1/view?key=` +
        keyApi +
        `&center=` +
        `&zoom=18&maptype=satellite`
    },
    getMapData(place) {
      this.place = place
    },
    handleArea(value) {
      const id = value
      this.getArea(id)
    },

    handleDistrik(value) {
      const id = value
      this.getDistrik(id)
    },
    handleDistributor(value) {
      const id = value
      this.getDistributor(id)
    },
    handleBrand(value) {
      const id = value
      this.getBrand(id)
    },
    async handleOk() {
      if (this.sowDashboard.formData.selectedProvinsi == null && this.sowDashboard.selectedArea) {
      } else {
        await this.submitLabel()
      }
    },
  },
}
</script>

<style>
.style_donut {
  height: 350px;
}

.style_area {
  height: 350px;
}

.list_download {
  width: 100%;
  background-color: white;

  height: auto;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0px 12px 21px -14px rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 0px 12px 21px -14px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 12px 21px -14px rgba(0, 0, 0, 0.16);
}

.style_icon {
  font-size: 30px;
}
</style>
<style lang="scss" scoped>
@import '@/assets/scss/Dashboard/Sow/index.scss';
</style>
