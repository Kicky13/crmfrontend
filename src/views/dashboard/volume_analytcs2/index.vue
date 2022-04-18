<template>
  <div class="analytcs">
    <div class="analytcs_filter">
      <div class="row">
        <div class="col-md-2">
          <a-select placeholder="Area" class="w-100">
            <a-select-option disabled value="">Pilih Area</a-select-option>
            <a-select-option
              data-toggle="tooltip"
              data-placement="top"
              v-for="(item, index) in dataDummy.area.data"
              :key="`index_${index}`"
              >{{ item.area_id }} - {{ item.nama }}</a-select-option
            >
          </a-select>
        </div>
        <div class="col-md-2">
          <a-select placeholder="Distrik" class="w-100">
            <a-select-option disabled value="">Pilih Distrik</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Distrik</a-select-option>
          </a-select>
        </div>
        <div class="col-md-2">
          <a-select placeholder="Distributor" class="w-100">
            <a-select-option disabled value="">Pilih Distributor</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top"
              >Distributor</a-select-option
            >
          </a-select>
        </div>
        <div class="col-md-2">
          <a-select placeholder="Tahun" class="w-100">
            <a-select-option disabled value="">Pilih Tahun</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Tahun</a-select-option>
          </a-select>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-2">
          <a-button type="primary" class="w-100">
            <i class="fa fa-filter mr-2"></i> Tampilkan</a-button
          >
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-2">
          <a-select placeholder="Bulan" class="w-100">
            <a-select-option disabled value="">Pilih Bulan</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Bulan</a-select-option>
          </a-select>
        </div>
        <div class="col-md-2">
          <a-select placeholder="Kategori" class="w-100">
            <a-select-option disabled value="">Pilih Kategori</a-select-option>
            <a-select-option
              data-toggle="tooltip"
              data-placement="top"
              v-for="(item, index) in dataDummy.kategori.data"
              :key="`index_${index}`"
              >{{ item.id }} - {{ item.nama }}</a-select-option
            >
          </a-select>
        </div>
        <div class="col-md-2">
          <a-select placeholder="Brand SIG" class="w-100">
            <a-select-option disabled value="">Pilih Brand SIG</a-select-option>
            <a-select-option
              data-toggle="tooltip"
              data-placement="top"
              v-for="(item, index) in dataDummy.brand.data"
              :key="`index_${index}`"
              >{{ item.id }} - {{ item.nama }}</a-select-option
            >
          </a-select>
        </div>
      </div>
    </div>
    <div class="analytcs_information mt-4">
      <div class="row">
        <div class="col-md-4">
          <div class="analytcs_info">
            <div class="d-flex">
              <div class="icon_image">
                <img src="@/assets/images/icon/registerOutlet.png" alt="Logo SIG" v-once />
              </div>
              <div class="information ml-2">
                <label for="">Registerd Outlet</label>
                <br />
                <span>
                  {{ formatNumber(dataDummy.information.data.register_outlet) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="analytcs_info">
            <div class="d-flex">
              <div class="icon_image">
                <img src="@/assets/images/icon/visitedOutlet.png" alt="Logo SIG" v-once />
              </div>
              <div class="information ml-1">
                <label for="">Visited Outled</label>
                <br />
                <span>
                  {{ formatNumber(dataDummy.information.data.visited_outlet) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="analytcs_info">
            <div class="d-flex">
              <div class="icon_image">
                <img src="@/assets/images/icon/customerActive.png" alt="Logo SIG" v-once />
              </div>
              <div class="information ml-1">
                <label for="">Customer Active</label>
                <br />
                <span>
                  {{ formatNumber(dataDummy.information.data.customer_active) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-4">
          <div class="analytcs_info">
            <div class="d-flex">
              <div class="icon_image">
                <img src="@/assets/images/icon/nov.png" alt="Logo SIG" v-once />
              </div>
              <div class="information ml-1">
                <label for="">Number Of Visited</label>
                <br />
                <span>
                  {{ formatNumber(dataDummy.information.data.number_visit) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="analytcs_info">
            <div class="d-flex">
              <div class="icon_image">
                <img src="@/assets/images/icon/transaction.png" alt="Logo SIG" v-once />
              </div>
              <div class="information ml-1">
                <label for="">Transaction (SO)</label>
                <br />
                <span>
                  {{ formatNumber(dataDummy.information.data.transaction) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="analytcs_info">
            <div class="d-flex">
              <div class="icon_image">
                <img src="@/assets/images/icon/volume.png" alt="Logo SIG" v-once />
              </div>
              <div class="information ml-1">
                <label for="">Volume (SO)</label>
                <br />
                <span>
                  {{ formatNumber(dataDummy.information.data.volume) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-2"></div>
      <div class="col-md-2"></div>
      <div class="col-md-2"></div>
      <div class="col-md-2"></div>
      <div class="col-md-2"></div>
      <div class="col-md-2">
        <a-select placeholder="Jangka waktu" class="w-100">
          <a-select-option disabled value="">Pilih</a-select-option>
          <a-select-option data-toggle="tooltip" data-placement="top">6 Bulan</a-select-option>
          <a-select-option data-toggle="tooltip" data-placement="top">12 Bulan</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="analytcs_chart mt-4">
      <div class="row">
        <div class="col-md-6">
          <div class="box">
            <fieldset>
              <legend class="w-auto px-2">
                <small class="font-weight-light">Customer Active</small>
              </legend>
              <div style="background: white">
                <vue-apex-charts
                  type="area"
                  height="260"
                  :options="dataCustomer.chartOptions"
                  :series="dataCustomer.series"
                />
              </div>
            </fieldset>
          </div>
        </div>
        <div class="col-md-6">
          <div class="box">
            <fieldset>
              <legend class="w-auto px-2">
                <small class="font-weight-light">Visit</small>
              </legend>
              <div style="background: white">
                <vue-apex-charts
                  type="area"
                  height="260"
                  :options="dataVisit.chartOptions"
                  :series="dataVisit.series"
                />
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-12">
          <div class="box">
            <fieldset>
              <legend class="w-auto px-2">
                <small class="font-weight-light">Selling</small>
              </legend>
              <div style="background: white">
                <vue-apex-charts
                  type="area"
                  height="400"
                  :options="dataSell.chartOptions"
                  :series="dataSell.series"
                />
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
    <div class="card card-top card-top-primary mt-4">
      <div class="card-body">
        <div class="d-flex mb-3">
          <div class="align-self-center">
            <span>Show :</span>
          </div>
          <a-select
            :default-value="volumeAnalytcs.itemsPerPage[1]"
            class="mx-2"
            @change="handlePaginationSize"
          >
            <a-select-option v-for="itemPerPage in volumeAnalytcs.itemsPerPage" :key="itemPerPage">
              {{ itemPerPage }}
            </a-select-option>
          </a-select>
          <div class="align-self-center">
            <span>entries</span>
          </div>
        </div>
        <div class="table-responsive text-nowrap mt-4">
          <a-table
            :columns="volumeAnalytcs.columns"
            :pagination="volumeAnalytcs.pagination"
            :loading="volumeAnalytcs.isLoading"
          >
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueApexCharts from 'vue3-apexcharts'
import { mapState, mapActions } from 'vuex'
import DataDummy from './data.json'
import numeral from 'numeral'

export default {
  name: 'VolumeAnalytcs',
  components: {
    VueApexCharts,
  },

  data() {
    return {
      dataCustomer: {
        series: [
          {
            name: 'Customer Active',
            data: [31, 40, 28, 51, 42, 109, 100],
          },
        ],

        chartOptions: {
          chart: {
            height: 350,
            type: 'area',
          },
          legend: {
            show: true,
            showForSingleSeries: true,
            showForNullSeries: true,
            showForZeroSeries: true,
          },
          dataLabels: {
            enabled: false,
          },

          // fill: {
          //   colors: ['#F44336'],
          // },
          colors: ['#9DC8F1'],

          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            // type: 'datetime',
            // categories: [
            //   '2018-09-19T00:00:00.000Z',
            //   '2018-09-19T01:30:00.000Z',
            //   '2018-09-19T02:30:00.000Z',
            //   '2018-09-19T03:30:00.000Z',
            //   '2018-09-19T04:30:00.000Z',
            //   '2018-09-19T05:30:00.000Z',
            //   '2018-09-19T06:30:00.000Z',
            // ],
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm',
            },
          },
        },
      },
      dataVisit: {
        series: [
          {
            name: 'Visit',
            data: [31, 40, 28, 51, 42, 109, 100],
          },
        ],

        chartOptions: {
          chart: {
            height: 350,
            type: 'area',
            stacked: true,
          },
          legend: {
            show: true,
            showForSingleSeries: true,
            showForNullSeries: true,
            showForZeroSeries: true,
          },
          dataLabels: {
            enabled: false,
          },

          // fill: {
          //   colors: ['#F44336'],
          // },
          colors: ['#F44336'],

          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            // type: 'datetime',
            // categories: [
            //   '2018-09-19T00:00:00.000Z',
            //   '2018-09-19T01:30:00.000Z',
            //   '2018-09-19T02:30:00.000Z',
            //   '2018-09-19T03:30:00.000Z',
            //   '2018-09-19T04:30:00.000Z',
            //   '2018-09-19T05:30:00.000Z',
            //   '2018-09-19T06:30:00.000Z',
            // ],
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm',
            },
          },
        },
      },
      dataSell: {
        series: [
          {
            name: 'Sell Out',
            data: [31, 40, 28, 51, 42, 109, 100],
          },
          {
            name: 'Sell In',
            data: [50, 40, 50, 51, 21, 120, 110],
          },
        ],

        chartOptions: {
          chart: {
            height: 350,
            type: 'area',
          },
          dataLabels: {
            enabled: false,
          },

          // fill: {
          //   colors: ['#F44336'],
          // },
          colors: ['#F44336', '#41B883'],

          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            // type: 'datetime',
            // categories: [
            //   '2018-09-19T00:00:00.000Z',
            //   '2018-09-19T01:30:00.000Z',
            //   '2018-09-19T02:30:00.000Z',
            //   '2018-09-19T03:30:00.000Z',
            //   '2018-09-19T04:30:00.000Z',
            //   '2018-09-19T05:30:00.000Z',
            //   '2018-09-19T06:30:00.000Z',
            // ],
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm',
            },
          },
        },
      },
      dataDummy: DataDummy,
    }
  },
  computed: {
    ...mapState({
      volumeAnalytcs: state => state.volumeAnalytcs.data,
    }),
  },
  methods: {
    formatNumber(value) {
      let formatted = numeral(value).format('0,0')
      return formatted
    },
    handlePaginationSize(size) {
      this.volumeAnalytcs.pagination.pageSize = size
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/Dashboard/VolumeAnalytcs/index.scss';
</style>
