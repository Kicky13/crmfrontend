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
            <a-select-option disabled value="">Pilih Tahun</a-select-option>
            <a-select-option v-for="(tahun, index) in years" :value="tahun" :key="index">
              {{ tahun }}
            </a-select-option>
          </a-select>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-select
            class="col-lg-12 col-md-12 pr-2"
            style="width: 100% !important"
            placeholder="Bulan"
            v-model:value="sowDashboard.formData.selectedMonth"
          >
            <a-select-option disabled value="">Bulan</a-select-option>
            <a-select-option
              v-for="(bulan, index) in sowDashboard.data_bulan"
              :value="bulan.id"
              :key="index"
            >
              {{ bulan.name }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </a-form>
    <div class="row mt-4">
      <div class="col-md-4 col-sm-4">
        <div class="list_download d-flex mt-3 rounded shadow px-3 pb-3">
          <a-skeleton active :loading="sowDashboard.isLoadingLabel" :paragraph="{ rows: 1 }">
            <div class="list_download_information">
              <label for="">Produk (SKU)</label>
              <br />
              <span>{{ sowDashboard.dataLabel ? sowDashboard.dataLabel.produk : 0 }}</span>
            </div>
            <div class="list_download_icon ml-auto">
              <img src="@/assets/images/icon/package.png" alt="Logo SIG" v-once />
            </div>
          </a-skeleton>
        </div>
      </div>
      <div class="col-md-4 col-sm-4">
        <div class="list_download d-flex mt-3  rounded shadow px-3 pb-3">
          <a-skeleton active :loading="sowDashboard.isLoadingLabel" :paragraph="{ rows: 1 }">
            <div class="list_download_information">
              <label for="">Brands</label>
              <br />
              <span>{{ sowDashboard.dataLabel ? sowDashboard.dataLabel.brand : 0 }}</span>
            </div>
            <div class="list_download_icon ml-auto">
              <img src="@/assets/images/icon/globe-1.png" alt="Logo SIG" v-once />
            </div>
          </a-skeleton>
        </div>
      </div>
      <div class="col-md-4 col-sm-4">
        <div class="list_download d-flex mt-3  rounded shadow px-3 pb-3">
          <a-skeleton active :loading="sowDashboard.isLoadingLabel" :paragraph="{ rows: 1 }">
            <div class="list_download_information">
              <label for="">Total Customer</label>
              <br />
              <span>{{ sowDashboard.dataLabel ? sowDashboard.dataLabel.customer : 0 }}</span>
            </div>
            <div class="list_download_icon ml-auto">
              <img src="@/assets/images/icon/user-check.png" alt="Logo SIG" v-once />
            </div>
          </a-skeleton>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="list_download d-flex mt-3  rounded shadow px-3 pb-3">
          <a-skeleton active :loading="sowDashboard.isLoadingLabel" :paragraph="{ rows: 1 }">
            <div class="list_download_information">
              <label for="">Distributor</label>
              <br />
              <span>{{ sowDashboard.dataLabel ? sowDashboard.dataLabel.distributor : 0 }}</span>
            </div>
            <div class="list_download_icon ml-auto">
              <img src="@/assets/images/icon/users-more.png" alt="Logo SIG" v-once />
            </div>
          </a-skeleton>
        </div>
      </div>
      <div class="col-md-4">
        <div class="list_download d-flex mt-3  rounded shadow px-3 pb-3">
          <a-skeleton active :loading="sowDashboard.isLoadingLabel" :paragraph="{ rows: 1 }">
            <div class="list_download_information">
              <label for="">Registered Outled</label>
              <br />
              <span>0</span>
            </div>
            <div class="list_download_icon ml-auto">
              <img src="@/assets/images/icon/users-more.png" alt="Logo SIG" v-once />
            </div>
          </a-skeleton>
        </div>
      </div>
      <div class="col-md-4">
        <div class="list_download d-flex mt-3  rounded shadow px-3 pb-3">
          <a-skeleton active :loading="sowDashboard.isLoadingLabel" :paragraph="{ rows: 1 }">
            <div class="list_download_information">
              <label for="">Outled Surveyed</label>
              <br />
              <span>0</span>
            </div>
            <div class="list_download_icon ml-auto">
              <img src="@/assets/images/icon/users-more.png" alt="Logo SIG" v-once />
            </div>
          </a-skeleton>
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
                <a-skeleton active :loading="sowDashboard.isLoadingChart" :paragraph="{ rows: 4 }">
                  <vue-apex-charts
                    type="pie"
                    height="340"
                    :options="chartOptions"
                    :series="chartOptions.series"
                  ></vue-apex-charts>
                </a-skeleton>
              </div>
            </div>
            <div class="col-md-8">
              <div class="bg-white p-3 style_area">
                <a-skeleton active :loading="sowDashboard.isLoadingChart" :paragraph="{ rows: 4 }">
                  <vue-highcharts :highcharts="Highcharts" :options="chartBubble"></vue-highcharts>
                </a-skeleton>
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
        <div class="d-flex justify-content-between mb-3">
          <div class="d-flex mb-2">
            <div class="align-self-center">
              <span>Show :</span>
            </div>
            <a-select
              :default-value="sowDashboard.itemsPerPage[0]"
              class="mx-2"
              @change="handlePagination"
            >
              <a-select-option v-for="itemPerPage in sowDashboard.itemsPerPage" :key="itemPerPage">
                {{ itemPerPage }}
              </a-select-option>
            </a-select>
            <div class="align-self-center">
              <span>entries</span>
            </div>
          </div>
          <a-input-search
            v-model:value="sowDashboard.bodyList.filter"
            placeholder="Cari nama toko"
            @search="searchToko"
            style="width: 200px; height:34px;"
          />
        </div>
        <div class="table-sow table-responsive text-nowrap">
          <a-table
            :data-source="sowDashboard.dataTable"
            :columns="sowDashboard.columns"
            :loading="sowDashboard.isLoading"
            :pagination="sowDashboard.pagination"
            :row-class-name="tableRowClassName"
            :row-key="data => data.id_toko"
          >
            <template #no="{ index }">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template #distrik="{ text }">
              <div>
                {{ text.nm_wilayah }}
              </div>
            </template>
            <template #id_toko="{ text }">
              <div>
                {{ text.id_toko }}
              </div>
            </template>
            <template #nama_toko="{ text }">
              <div>
                {{ text.nm_customer }}
              </div>
            </template>
            <template #produk="{ text }">
              <div>
                {{ text.nm_produk }}
              </div>
            </template>
            <template #kapasitas_jual="{ text }">
              <div>
                {{ text.kapasitas_jual }}
              </div>
            </template>
            <template #volume_jual="{ text }">
              <div>
                {{ text.volume_penjualan_total }}
              </div>
            </template>
            <template #sow="{ text }">
              <div>
                {{ text.sow }}
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import { notification, message } from 'ant-design-vue'
import { mapState, mapActions } from 'vuex'
import { _ } from 'vue-underscore'
import VueHighcharts from 'vue3-highcharts'
import Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
More(Highcharts)

export default {
  components: {
    VueApexCharts,
    VueHighcharts,
  },
  setup() {
    return {
      // itemsPerPage,
    }
  },
  data: function() {
    return {
      link: '',
      Highcharts,
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
        series: [25, 15, 44, 55, 41],

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

      // bubble chart
      chartBubble: {
        chart: {
          type: 'bubble',
          plotBorderWidth: 1,
          zoomType: 'xy',
          height: 320,
        },
        legend: {
          enabled: false,
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },
        xAxis: {
          gridLineWidth: 1,
          title: {
            text: '',
          },
          labels: {
            format: '{value} gr',
          },
          // plotLines: [
          //   {
          //     color: 'black',
          //     dashStyle: 'dot',
          //     width: 2,
          //     value: 65,
          //     // label: {
          //     //   rotation: 0,
          //     //   y: 15,
          //     //   style: {
          //     //     fontStyle: 'italic',
          //     //   },
          //     //   text: 'Safe fat intake 65g/day',
          //     // },
          //     zIndex: 3,
          //   },
          // ],
        },
        yAxis: {
          startOnTick: false,
          endOnTick: false,
          title: {
            text: '',
          },
          labels: {
            format: '{value} gr',
          },
          maxPadding: 0.2,
          // plotLines: [
          //   {
          //     color: 'black',
          //     dashStyle: 'dot',
          //     width: 2,
          //     value: 50,
          //     // label: {
          //     //   align: 'right',
          //     //   style: {
          //     //     fontStyle: 'italic',
          //     //   },
          //     //   text: 'Safe sugar intake 50g/day',
          //     //   x: -10,
          //     // },
          //     zIndex: 3,
          //   },
          // ],
        },
        tooltip: {
          useHTML: true,
          headerFormat: '<table>',
          pointFormat:
            '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
            '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
            '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
            '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
          footerFormat: '</table>',
          followPointer: true,
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
          },
        },
        series: [
          {
            data: [
              { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
              { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
              { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
              { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
              { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
              { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
              { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
              { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
              { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
              { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
              { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
              { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
              { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
              { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
              { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' },
            ],
          },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      sowDashboard: state => state.sowDashboard.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2019 }, (value, index) => 2020 + index)
    },
  },
  async mounted() {
    await this.getProvinsi()
    this.urlMap()
    this.handlePagination(5)
    // await this.submitLabel()
    // await this.getDataTable()
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
      'getDataTable',
      'getDataScatterChart',
      'getDataChart',
    ]),
    tableRowClassName(text) {
      if (text.sow > '100%') {
        return 'non-active'
      } else {
        return ''
      }
    },
    handlePagination(size) {
      this.sowDashboard.pagination.pageSize = size
    },
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
    searchToko(keyword) {
      this.sowDashboard.isLoading = true

      if (keyword) {
        let data = this.sowDashboard.dataTable.filter(dataSource =>
          dataSource.nm_customer.toLowerCase().includes(keyword.toLowerCase()),
        )

        if (data.length > 0) {
          setTimeout(() => {
            this.sowDashboard.dataTable = data
            this.sowDashboard.isLoading = false
          }, 500)

          return false
        }
      } else {
        setTimeout(() => {
          this.sowDashboard.dataTable = this.sowDashboard.dataTableSearch
          this.sowDashboard.isLoading = false
        }, 500)
      }
    },
    async handleOk() {
      if (
        this.sowDashboard.formData.selectedProvinsi == null &&
        this.sowDashboard.selectedArea == null &&
        this.sowDashboard.selectedMonth == null &&
        this.sowDashboard.selectedYear == null
      ) {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Provinsi, Area , Bulan dan Tahun tidak boleh kosong.',
        })
      } else {
        await this.submitLabel()

        await this.getDataChart()
        if (this.sowDashboard.statusPie == 'sukses') {
          console.log(`---- this.sowDashboard.chartDashboard`, this.sowDashboard.chartDashboard)
          this.sowDashboard.chartDashboard.forEach(element => {
            this.chartOptions.series.push(element.persentase_data)
            this.chartOptions.labels.push(element.nama)
          })
        }

        await this.getDataScatterChart()
        console.log(`---- this.sowDashboard.statusScatter`, this.sowDashboard.statusScatter)

        if (this.sowDashboard.statusScatter == 'sukses') {
          this.chartBubble.series = this.sowDashboard.scatterChart
        }

        await this.getDataTable()
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
.table-sow .ant-table-tbody .non-active td {
  background-color: red !important;
  color: white;
}
.style_icon {
  font-size: 30px;
}
</style>
<style lang="scss" scoped>
@import '@/assets/scss/Dashboard/Sow/index.scss';
</style>
