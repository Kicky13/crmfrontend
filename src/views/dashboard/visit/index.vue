<template>
  <div class="analytcs">
    <div class="analytcs_filter">
      <div class="row">
        <div class="col-md-2">
          <a-select placeholder="Distrik" class="w-100">
            <a-select-option disabled value="">Pilih Distrik</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Distrik</a-select-option>
          </a-select>
        </div>
        <div class="col-md-2">
          <a-select placeholder="Salesman" class="w-100">
            <a-select-option disabled value="">Pilih Salesman</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Salesman</a-select-option>
          </a-select>
        </div>

        <div class="col-md-2">
          <a-select placeholder="Tahun" class="w-100">
            <a-select-option disabled value="">Pilih Tahun</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Tahun</a-select-option>
          </a-select>
        </div>
        <div class="col-md-2">
          <a-select placeholder="Bulan" class="w-100">
            <a-select-option disabled value="">Pilih Bulan</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Bulan</a-select-option>
          </a-select>
        </div>
        <!-- <div class="col-md-2">
          <a-select placeholder="Tahun" class="w-100">
            <a-select-option disabled value="">Pilih Tahun</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Tahun</a-select-option>
          </a-select>
        </div> -->
        <div class="col-md-2">
          <a-button type="primary" class="w-100">
            <i class="fa fa-filter mr-2"></i> Tampilkan</a-button
          >
        </div>
      </div>
    </div>

    <div class="analytcs_chart mt-4">
      <div class="row">
        <div class="col-md-6">
          <fieldset class="border border-dark shadow px-3 pb-3">
            <legend class="w-auto px-2">
              <small class="font-weight-light">Customer</small>
            </legend>
            <div class="row">
              <div class="col-md-6">
                <div class="box p-3">
                  <div class="customer-visit">
                    <div class="d-flex">
                      <label class="align-self-center">Customer Active</label>
                      <div class="icon_image ml-auto">
                        <img src="@/assets/images/icon/users-more.png" alt="Logo SIG" v-once />
                      </div>
                    </div>
                    <span>4000</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="box p-3">
                  <div class="customer-visit">
                    <div class="d-flex">
                      <label class="align-self-center">Total Customer</label>
                      <div class="icon_image ml-auto">
                        <img src="@/assets/images/icon/users-more.png" alt="Logo SIG" v-once />
                      </div>
                    </div>
                    <span>4000</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="box mt-4">
              <div class="row ">
                <div class="col-md-6">
                  <div>
                    <apexchart
                      type="pie"
                      :options="dataPieMapping.chartOptions"
                      :series="dataPieMapping.series"
                    ></apexchart>
                  </div>
                </div>
                <div class="col-md-6">
                  <div>
                    <apexchart
                      type="pie"
                      :options="dataPieJadwal.chartOptions"
                      :series="dataPieJadwal.series"
                    ></apexchart>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-2"></div>
                <div class="col-md-8 text-center">
                  <div>
                    <apexchart
                      type="pie"
                      :options="dataPieKunjungan.chartOptions"
                      :series="dataPieKunjungan.series"
                    ></apexchart>
                  </div>
                </div>
                <div class="col-md-2"></div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="col-md-6">
          <fieldset class="border border-dark shadow px-3 pb-3">
            <legend class="w-auto px-2">
              <small class="font-weight-light">Visit</small>
            </legend>
            <div class="row">
              <div class="col-md-6">
                <div class="box p-3">
                  <div class="customer-visit">
                    <div class="d-flex">
                      <div class="align-self-center">
                        <label>Realisasi Visit</label>
                        <span>4000</span>
                      </div>
                      <div class="icon_image ml-auto">
                        <img src="@/assets/images/icon/user-check.png" alt="Logo SIG" v-once />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="box p-3">
                  <div class="customer-visit">
                    <div class="d-flex">
                      <div class="align-self-center">
                        <label>Customer Visited</label>
                        <span>4000</span>
                      </div>
                      <div class="icon_image ml-auto">
                        <img src="@/assets/images/icon/user-check.png" alt="Logo SIG" v-once />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-6">
                <div class="box p-3">
                  <div class="customer-visit">
                    <div class="text-center">
                      <div class="">
                        <label>Planned</label>
                        <br />
                        <span>4000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="box p-3">
                  <div class="customer-visit">
                    <div class="text-center">
                      <div class="">
                        <label>Un - Planned</label>
                        <span>4000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="box mt-2">
              <div class="row ">
                <div class="col-md-12">
                  <div>
                    <apexchart
                      type="bar"
                      :options="dataBarVisited.chartOptions"
                      :series="dataBarVisited.series"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
    <div class="analytcs_information mt-4">
      <div class="row ">
        <div class="col-md-3">
          <fieldset class="border border-dark shadow px-3 pb-3">
            <legend class="w-auto px-2">
              <small class="font-weight-light">Toko Belum di Mapping</small>
            </legend>
            <div class="row">
              <div class="col-md-12">
                <div class="box p-3">
                  <div class="customer-visit">
                    <div class="d-flex">
                      <div class="align-self-center">
                        <label>Total Customer</label>
                        <span>4000</span>
                      </div>
                      <div class="icon_image ml-auto">
                        <img src="@/assets/images/icon/user-check.png" alt="Logo SIG" v-once />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="box mt-2">
                  <div class="table-responsive text-nowrap">
                    <a-table :columns="visitDashboard.columns_toko"></a-table>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="col-md-3">
          <fieldset class="border border-dark shadow px-3 pb-3">
            <legend class="w-auto px-2">
              <small class="font-weight-light">Sales Belum di Mapping</small>
            </legend>
            <div class="row">
              <div class="col-md-12">
                <div class="box p-3">
                  <div class="customer-visit">
                    <div class="d-flex">
                      <div class="align-self-center">
                        <label>Total Sales</label>
                        <span>4000</span>
                      </div>
                      <div class="icon_image ml-auto">
                        <img src="@/assets/images/icon/user-check.png" alt="Logo SIG" v-once />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="box mt-2">
                  <div class="table-responsive text-nowrap">
                    <a-table :columns="visitDashboard.columns_sales"></a-table>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="col-md-3">
          <fieldset class="border border-dark shadow px-3 pb-3">
            <legend class="w-auto px-2">
              <small class="font-weight-light">Toko Belum di Jadwalkan</small>
            </legend>
            <div class="row">
              <div class="col-md-12">
                <div class="box p-3">
                  <div class="customer-visit">
                    <div class="d-flex">
                      <div class="align-self-center">
                        <label>Total Customer</label>
                        <span>4000</span>
                      </div>
                      <div class="icon_image ml-auto">
                        <img src="@/assets/images/icon/user-check.png" alt="Logo SIG" v-once />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="box mt-2">
                  <div class="table-responsive text-nowrap">
                    <a-table :columns="visitDashboard.columns_jadwal"></a-table>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="col-md-3">
          <fieldset class="border border-dark shadow px-3 pb-3">
            <legend class="w-auto px-2">
              <small class="font-weight-light">Toko Belum di Kunjungi</small>
            </legend>
            <div class="row">
              <div class="col-md-12">
                <div class="box p-3">
                  <div class="customer-visit">
                    <div class="d-flex">
                      <div class="align-self-center">
                        <label>Total Customer</label>
                        <span>4000</span>
                      </div>
                      <div class="icon_image ml-auto">
                        <img src="@/assets/images/icon/user-check.png" alt="Logo SIG" v-once />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="box mt-2">
                  <div class="table-responsive text-nowrap">
                    <a-table :columns="visitDashboard.columns_kunjungan"></a-table>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
    <!-- <div class="card card-top card-top-primary mt-4">
      <div class="card-body">
        <div class="d-flex mb-3">
          <div class="align-self-center">
            <span>Show :</span>
          </div>
          <a-select
            :default-value="visitDashboard.itemsPerPage[1]"
            class="mx-2"
            @change="handlePaginationSize"
          >
            <a-select-option v-for="itemPerPage in visitDashboard.itemsPerPage" :key="itemPerPage">
              {{ itemPerPage }}
            </a-select-option>
          </a-select>
          <div class="align-self-center">
            <span>entries</span>
          </div>
        </div>
        <div class="table-responsive text-nowrap mt-4">
          <a-table
            :columns="visitDashboard.columns"
            :pagination="visitDashboard.pagination"
            :loading="visitDashboard.isLoading"
          >
          </a-table>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import VueApexCharts from 'vue3-apexcharts'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'VisitDashboard',
  components: {
    apexchart: VueApexCharts,
  },

  data() {
    return {
      dataPieMapping: {
        series: [44, 55],
        chartOptions: {
          chart: {
            width: '100%',
            type: 'pie',
          },
          colors: ['#7EACEF', '#FE2E7E'],

          labels: ['Mapping', 'Belum'],
          legend: {
            position: 'bottom',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: '100%',
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        },
      },
      dataPieJadwal: {
        series: [44, 55],
        chartOptions: {
          chart: {
            width: '100%',
            type: 'pie',
          },
          colors: ['#66ff76', '#444248'],

          labels: ['Terjadwal', 'Tidak Terjadwal'],
          legend: {
            position: 'bottom',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: '100%',
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        },
      },
      dataPieKunjungan: {
        series: [44, 55],
        chartOptions: {
          chart: {
            width: `100%`,

            type: 'pie',
          },
          colors: ['#9065ED', '#FCA452'],

          labels: ['Dikunjungi', 'Belum Dikunjungi'],
          legend: {
            position: 'bottom',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: '100%',
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        },
      },
      dataBarVisited: {
        series: [
          {
            name: 'Target',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
          },
          {
            name: 'Realisasi',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
          },
        ],
        chartOptions: {
          chart: {
            type: 'bar',
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded',
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          },
          yaxis: {
            // title: {
            //   text: '$ (thousands)',
            // },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return '$ ' + val + ' thousands'
              },
            },
          },
        },
      },
    }
  },
  computed: {
    ...mapState({
      visitDashboard: state => state.visitDashboard.data,
    }),
  },
  methods: {
    handlePaginationSize(size) {
      this.visitDashboard.pagination.pageSize = size
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/Dashboard/Visit/index.scss';
</style>
