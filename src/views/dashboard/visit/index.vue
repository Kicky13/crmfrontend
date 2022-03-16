<template>
  <div class="analytcs">
    <div class="analytcs_filter">
      <div class="row">
        <div class="col-md-2">
          <a-select
            @change="handleDistributor()"
            placeholder="Distributor"
            show-search
            v-model:value="visitDashboard.filter.distributor"
            class="w-100"
          >
            <a-select-option disabled value="">Pilih Distributor</a-select-option>
            <a-select-option
              data-toggle="tooltip"
              data-placement="top"
              v-for="(item, index) in visitDashboard.listDistributor"
              :key="`index_${index}`"
              :title="item.namaDistributor"
              :value="item.namaDistributor"
              >{{ item.kdDistributor }} - {{ item.namaDistributor }}</a-select-option
            >
          </a-select>
        </div>
        <div class="col-md-2">
          <a-select
            placeholder="Salesman"
            show-search
            @change="handleSalesman()"
            v-model:value="visitDashboard.filter.sales"
            class="w-100"
          >
            <a-select-option disabled value="">Pilih Salesman</a-select-option>
            <a-select-option disabled v-if="visitDashboard.listSalesman.length == 0"
              >Sales Tidak Tersedia</a-select-option
            >

            <a-select-option
              v-else
              data-toggle="tooltip"
              data-placement="top"
              v-for="(item, index) in visitDashboard.listSalesman"
              :key="`index_${index}`"
              :title="item.nama_sales"
              :value="item.nama_sales"
              >{{ item.id_sales }} - {{ item.nama_sales }}</a-select-option
            >
          </a-select>
        </div>
        <div class="col-md-2">
          <a-select placeholder="Tahun" v-model:value="visitDashboard.filter.tahun" class="w-100">
            <a-select-option disabled value="">Pilih Tahun</a-select-option>
            <a-select-option v-for="(tahun, index) in years" :value="tahun" :key="index">
              {{ tahun }}
            </a-select-option>
          </a-select>
        </div>
        <div class="col-md-2">
          <a-select
            v-model:value="visitDashboard.filter.bulan"
            class="col-lg-12 col-md-12 pr-2"
            style="width: 100% !important"
            placeholder=" -- Bulan -- "
          >
            <a-select-option disabled value="">Bulan</a-select-option>
            <a-select-option
              v-for="(bulan, index) in visitDashboard.data_bulan"
              :value="bulan.id"
              :key="index"
            >
              {{ bulan.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="col-md-2">
          <a-select
            placeholder="Distrik"
            show-search
            @change="handleDistrik()"
            v-model:value="visitDashboard.filter.distrik"
            class="w-100"
          >
            <a-select-option disabled value="">Pilih Distrik</a-select-option>
            <a-select-option disabled v-if="visitDashboard.listDistrik.length == 0"
              >Distrik Tidak Tersedia</a-select-option
            >

            <a-select-option
              v-else
              data-toggle="tooltip"
              data-placement="top"
              v-for="(item, index) in visitDashboard.listDistrik"
              :key="`index_${index}`"
              :title="item.namaDistrik"
              :value="item.namaDistrik"
              >{{ item.idDistrik }} - {{ item.namaDistrik }}</a-select-option
            >
          </a-select>
        </div>
        <div class="col-md-2">
          <a-button type="primary" @click="handleClick()" class="w-100">
            <i class="fa fa-filter mr-2"></i> Tampilkan</a-button
          >
        </div>
      </div>
    </div>

    <div class="analytcs_chart mt-4">
      <div class="row">
        <div class="col-md-12">
          <fieldset class="border border-dark shadow px-3 pb-3">
            <legend class="w-auto px-2">
              <small class="font-weight-light">Customer</small>
            </legend>
            <div class="row">
              <div class="col-md-4">
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
              <div class="col-md-4">
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
                <div class="col-md-4">
                  <div>
                    <apexchart
                      type="pie"
                      :options="dataPieMapping.chartOptions"
                      :series="dataPieMapping.series"
                    ></apexchart>
                  </div>
                </div>
                <div class="col-md-4">
                  <div>
                    <apexchart
                      type="pie"
                      :options="dataPieJadwal.chartOptions"
                      :series="dataPieJadwal.series"
                    ></apexchart>
                  </div>
                </div>
                <div class="col-md-4">
                  <div>
                    <apexchart
                      type="pie"
                      :options="dataPieKunjungan.chartOptions"
                      :series="dataPieKunjungan.series"
                    ></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-12">
          <fieldset class="border border-dark shadow px-3 pb-3">
            <legend class="w-auto px-2">
              <small class="font-weight-light">Visit</small>
            </legend>
            <div class="row">
              <div class="col-md-3">
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
              <div class="col-md-3">
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
              <div class="col-md-3">
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
              <div class="col-md-3">
                <div class="box p-3">
                  <div class="customer-visit">
                    <div class="text-center">
                      <div class="">
                        <label>Un - Planned</label>
                        <br />
                        <span>4000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="box mt-4">
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
        <div class="col-md-6">
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
                        <br />
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
        <div class="col-md-6">
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
                        <br />
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
      </div>
      <div class="row mt-4">
        <div class="col-md-6">
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
                        <br />
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
        <div class="col-md-6">
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
                        <br />
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
import { notification } from 'ant-design-vue'

export default {
  name: 'VisitDashboard',
  components: {
    apexchart: VueApexCharts,
  },

  data() {
    return {
      dataPieMapping: {
        series: [50, 50],
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

    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2019 }, (value, index) => 2020 + index)
    },
  },
  async mounted() {
    await this.getDataDistributor()
  },
  methods: {
    ...mapActions('visitDashboard', [
      'getDataDistributor',
      'getDataSalesman',
      'getDataDistrikBySales',
      'postChartVisit',
    ]),

    async handleDistributor() {
      let dataSource = [...this.visitDashboard.listDistributor]

      let filtered = dataSource.filter(
        x => x.namaDistributor == this.visitDashboard.filter.distributor,
      )

      this.visitDashboard.filter.id_distributor = filtered[0].kdDistributor
      this.visitDashboard.listDistrik = []
      this.visitDashboard.filter.sales = ''
      this.visitDashboard.filter.id_sales = null

      await this.getDataSalesman({
        id_distributor: this.visitDashboard.filter.id_distributor,
      })
    },

    async handleSalesman() {
      let dataSource = [...this.visitDashboard.listSalesman]
      let filtered = dataSource.filter(x => x.nama_sales == this.visitDashboard.filter.sales)
      this.visitDashboard.filter.id_sales = filtered[0].id_sales

      this.visitDashboard.listDistrik = []
      this.visitDashboard.filter.distrik = ''
      this.visitDashboard.filter.id_distrik = null

      await this.getDataDistrikBySales({
        id_sales: this.visitDashboard.filter.id_sales,
        id_distributor: this.visitDashboard.filter.id_distributor,
      })
    },

    async handleDistrik() {
      let dataSource = [...this.visitDashboard.listDistrik]
      let filtered = dataSource.filter(x => x.namaDistrik == this.visitDashboard.filter.distrik)
      this.visitDashboard.filter.id_distrik = filtered[0].idDistrik
    },

    handlePaginationSize(size) {
      this.visitDashboard.pagination.pageSize = size
    },

    async handleClick() {
      if (
        this.visitDashboard.filter.tahun != '' &&
        this.visitDashboard.filter.bulan != null &&
        this.visitDashboard.filter.id_distrik != null &&
        this.visitDashboard.filter.id_sales != null &&
        this.visitDashboard.filter.id_distributor != null
      ) {
        await this.postChartVisit()
      } else {
        notification.error({
          message: 'Error',
          description: 'Maaf, semua filter harap diisi',
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/Dashboard/Visit/index.scss';
</style>
