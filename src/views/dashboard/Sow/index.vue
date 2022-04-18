<template>
  <div>
    <a-form :model="sowDashboard.formData" label-align="left" layout="vertical">
      <div class="row">
        <div class="col-xs-3 col-md-3">
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
              :value="provinsi.nama_provinsi"
              :title="provinsi.nama_provinsi"
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
        <div class="col-xs-3 col-md-3">
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
              :value="distrik.nama_distrik"
              :title="distrik.nama_distrik"
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
          <a-button type="primary" class="w-100" @click="handleOk()">
            <i class="fa fa-eye mr-2" />
            Tampilkan
          </a-button>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-xs-3 col-md-3">
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
              <span>{{ sowDashboard.dataLabel ? sowDashboard.dataLabel.OutledSurveyed : 0 }}</span>
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
            <div class="col-md-5">
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
            <div class="col-md-7">
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
        series: [100],
        labels: ['Default'],
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
            text: 'Persentasi SOW',
          },
          labels: {
            format: '{value}',
          },
          plotLines: [
            {
              // color: 'black',
              // dashStyle: 'dot',
              // width: 2,
              // value: 65
              // showInLegend: true,
              // label: {
              //   rotation: 0,
              //   y: 15,
              //   style: {
              //     fontStyle: 'italic',
              //   },
              //   text: 'Safe fat intake 65g/day',
              // },
              // zIndex: 3,
            },
          ],
        },
        yAxis: {
          startOnTick: false,
          endOnTick: false,
          title: {
            text: 'Total Customer',
          },
          labels: {
            format: '{value}',
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
            '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
            '<tr><th>Persentase:</th><td>{point.x}%</td></tr>' +
            '<tr><th>Total Customer:</th><td>{point.y}</td></tr>' +
            '<tr><th>Volume Penjualan:</th><td>{point.z}</td></tr>',
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
            data: [],
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
    async handleArea() {
      let dataSource = [...this.sowDashboard.dataProvinsi]
      let filtered = dataSource.filter(
        x => x.nama_provinsi == this.sowDashboard.formData.selectedProvinsi,
      )
      this.sowDashboard.formData.id_provinsi = filtered[0].id_provinsi

      await this.getArea({
        provinsi_id: this.sowDashboard.formData.id_provinsi,
      })
    },

    handleDistrik(value) {
      const id = value
      this.getDistrik(id)
    },
    handleDistributor() {
      let dataSource = [...this.sowDashboard.dataDistrik]
      let filtered = dataSource.filter(
        x => x.nama_distrik == this.sowDashboard.formData.selectedDistrik,
      )
      this.sowDashboard.formData.id_distrik = filtered[0].id_distrik
      this.getDistributor({
        distrik_id: this.sowDashboard.formData.id_distrik,
      })
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
        // post data submit all label
        await this.submitLabel({
          provinsi_id: this.sowDashboard.formData.id_provinsi,
          distrik_id: this.sowDashboard.formData.id_distrik,
        })

        // get data chart pie
        await this.getDataChart({
          provinsi_id: this.sowDashboard.formData.id_provinsi,
          distrik_id: this.sowDashboard.formData.id_distrik,
        })
        if (this.sowDashboard.statusPie == 'sukses') {
          let labelName = []
          let presentaseData = []
          this.sowDashboard.chartDashboard.forEach(element => {
            presentaseData.push(element.persentase_data)
            labelName.push(element.nama)
          })

          let dataLabel = _.filter(labelName, function(x) {
            return x != null
          })
          let dataPersentase = _.filter(presentaseData, function(x) {
            return x != 0
          })

          this.chartOptions.series = dataPersentase
          this.chartOptions.labels = dataLabel
        }

        // get data bubble chart
        await this.getDataScatterChart({
          provinsi_id: this.sowDashboard.formData.id_provinsi,
          distrik_id: this.sowDashboard.formData.id_distrik,
        })

        if (this.sowDashboard.statusScatter == 'sukses') {
          let persentaseWithColor = []

          this.sowDashboard.scatterChart.data.forEach(element => {
            persentaseWithColor.push({
              name: element.name,
              x: element.x,
              y: element.y,
              z: element.z,
              color: '#' + Math.floor(Math.random() * 16777215).toString(16),
            })
          })
          // console.log(`-this.sowDashboard.scatterChart`, persentaseWithColor)
          // console.log(`this.sowDashboard.scatterChart`, this.sowDashboard.scatterChart)

          this.chartBubble.series[0].data = persentaseWithColor

          console.log(` this.chartBubble.series.data`, this.chartBubble.series[0])
        }

        // get data table
        await this.getDataTable({
          provinsi_id: this.sowDashboard.formData.id_provinsi,
          distrik_id: this.sowDashboard.formData.id_distrik,
        })
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
