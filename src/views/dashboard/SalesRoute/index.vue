<template>
  <div>
    <a-form :model="salesRoute.formData" label-align="left" layout="vertical">
      <div class="row">
        <div class="col-md-10">
          <div class="row">
            <div class="col-xs-3 col-md-3">
              <a-form-item>
                <a-select
                  class="col-lg-12 col-md-12 pr-2"
                  style="width: 100% !important"
                  placeholder="Distrik"
                  v-model:value="salesRoute.formData.selectedDistrik"
                  show-search
                  @change="handleDistributor"
                >
                  <a-select-option disabled value="">Pilih Distrik</a-select-option>

                  <a-select-option
                    v-for="(distrik, index) in salesRoute.dataDistrik"
                    :key="index"
                    :value="distrik.id_distrik"
                  >
                    {{ distrik.nama_distrik }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xs-3 col-md-3">
              <a-form-item>
                <a-select
                  class="col-lg-12 col-md-12 pr-2"
                  style="width: 100% !important"
                  placeholder="Distributor"
                  v-model:value="salesRoute.formData.selectedDistributor"
                  show-search
                  @change="handleSales"
                >
                  <a-select-option disabled value="">Pilih Distributor</a-select-option>

                  <a-select-option
                    v-for="(distributor, index) in salesRoute.dataDistributor"
                    :key="index"
                    :value="distributor.id_distributor"
                    >{{ distributor.nama_distributor }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xs-3 col-md-3">
              <a-form-item>
                <a-select
                  class="col-lg-12 col-md-12 pr-2"
                  style="width: 100% !important"
                  placeholder="Sales"
                  v-model:value="salesRoute.formData.selectedSalesman"
                  show-search
                >
                  <a-select-option disabled value="">Pilih Salesman</a-select-option>
                  <a-select-option disabled v-if="salesRoute.dataSalesman.length == 0"
                    >Sales Tidak Tersedia</a-select-option
                  >

                  <a-select-option
                    v-else
                    data-toggle="tooltip"
                    data-placement="top"
                    v-for="(item, index) in salesRoute.dataSalesman"
                    :key="`index_${index}`"
                    :title="item.nama_sales"
                    :value="item.id_sales"
                    >{{ item.id_sales }} - {{ item.nama_sales }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xs-3 col-md-3">
              <a-form-item>
                <a-date-picker
                  format="YYYY-MM-DD"
                  v-model:value="salesRoute.formData.selectedDate"
                  class="w-100"
                />
              </a-form-item>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <a-button type="primary" class="mb-3 w-100" @click="handleOk()">
            <i class="fa fa-eye mr-2" />
            Tampilkan
          </a-button>
        </div>
      </div>
    </a-form>
    <div class="row">
      <!-- <div class="col-md-6">
        <div class="col-md-12 col-sm-12">
          <fieldset class="border border-dark shadow px-3 pb-3">
            <legend class="w-auto px-2">
              <small class="font-weight-light">
                Visit Route Map
              </small>
            </legend>
            <div class="row" style="height:100%">
              <div class="col-md-12" style="height:100%">
                <div class="bg-white p-3" style="height:340px">
                  <img
                    src="@/assets/images/maps.jpg"
                    alt="Los Angeles"
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div> -->
      <div class="col-md-12 bg-white rounded p-3 mt-3">
        <div class="row">
          <div class="col-md-12">
            <a-carousel :after-change="onChange">
              <div v-for="(item, index) in itemRadio.image" :key="`index_${index}`">
                <img :src="item.src" />
              </div>
            </a-carousel>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <img src="@/assets/images/maps2.jpg" alt="Los Angeles" height="150px" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 col-sm-8">
        <div class="card card-top card-top-primary mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <div class="d-flex justify-content-between mb-3">
                  <div class="d-flex mb-2">
                    <div class="align-self-center">
                      <span>Show :</span>
                    </div>
                    <a-select
                      :default-value="salesRoute.itemsPerPage[0]"
                      class="mx-2"
                      @change="handlePagination"
                    >
                      <a-select-option
                        v-for="itemPerPage in salesRoute.itemsPerPage"
                        :key="itemPerPage"
                      >
                        {{ itemPerPage }}
                      </a-select-option>
                    </a-select>
                    <div class="align-self-center">
                      <span>entries</span>
                    </div>
                  </div>
                </div>
                <div class="table-responsive text-nowrap">
                  <a-table
                    :data-source="salesRoute.detailVisit"
                    :row-key="data => data.id_toko"
                    :columns="salesRoute.columns"
                    :loading="salesRoute.isLoading"
                    :pagination="salesRoute.pagination"
                  >
                    <template #radio="{ text }">
                      <a-radio-group v-model:value="itemRadio" @change="onChange">
                        <a-radio :style="radioStyle" :value="text"> </a-radio>
                      </a-radio-group>
                    </template>
                    <template #distrik="{ text }">
                      <div>
                        {{ text.distrik_name }}
                      </div>
                    </template>
                    <template #id_toko="{ text }">
                      <div>
                        {{ text.id_toko }}
                      </div>
                    </template>
                    <template #toko="{ text }">
                      <div>
                        {{ text.nama_toko }}
                      </div>
                    </template>
                    <template #sales="{ text }">
                      <div>
                        {{ text.sales_name }}
                      </div>
                    </template>
                    <template #tanggal="{ text }">
                      <div>
                        {{ text.tanggal }}
                      </div>
                    </template>
                    <template #check_in="{ text }">
                      <div>
                        {{ text.check_in }}
                      </div>
                    </template>
                    <template #check_out="{ text }">
                      <div>
                        {{ text.check_out }}
                      </div>
                    </template>
                    <template #durasi_visit="{ text }">
                      <div>
                        {{ text.durasi_visit }}
                      </div>
                    </template>
                    <template #jarak_check="{ text }">
                      <div>
                        {{ text.jarak_check }}
                      </div>
                    </template>
                    <template #perjalanan="{ text }">
                      <div>
                        {{ text.perjalanan }}
                      </div>
                    </template>
                    <template #plan="{ text }">
                      <div>
                        {{ text.plan }}
                      </div>
                    </template>
                  </a-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-4">
        <div class="card card-top card-top-primary mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <div class="d-flex justify-content-between mb-3">
                  <div class="d-flex mb-2">
                    <div class="align-self-center">
                      <span>Show :</span>
                    </div>
                    <a-select
                      :default-value="salesRoute.itemsPerPage[0]"
                      class="mx-2"
                      @change="handlePaginationToko"
                    >
                      <a-select-option
                        v-for="itemPerPage in salesRoute.itemsPerPage"
                        :key="itemPerPage"
                      >
                        {{ itemPerPage }}
                      </a-select-option>
                    </a-select>
                    <div class="align-self-center">
                      <span>entries</span>
                    </div>
                  </div>
                </div>
                <div class="table-responsive text-nowrap">
                  <a-table
                    :data-source="salesRoute.detailMerchant"
                    :row-class-name="tableRowClassName"
                    :row-key="data => data.id_toko"
                    :columns="salesRoute.columns2"
                    :loading="salesRoute.isLoading2"
                    :pagination="salesRoute.paginationToko"
                  >
                    <template #toko="{ text }">
                      <div>
                        {{ text.toko_belum_dikunjungi }}
                      </div>
                    </template>
                  </a-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
import { mapState, mapActions } from 'vuex'
import { _ } from 'vue-underscore'
export default {
  data: function() {
    return {
      itemRadio: {},
      selectedRowKeys: [],
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

      series_area: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chartOptions_area: {
        chart: {
          type: 'area',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'date',
          categories: [
            '2018-09-19',
            '2018-09-19',
            '2018-09-19',
            '2018-09-19',
            '2018-09-19',
            '2018-09-19',
            '2018-09-19',
          ],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy',
          },
        },
      },
    }
  },
  computed: {
    ...mapState({
      salesRoute: state => state.salesRoute.data,
    }),
  },
  async mounted() {
    await this.getDistrik()
    this.handlePagination(5)
    this.handlePaginationToko(5)
  },
  methods: {
    ...mapActions('salesRoute', [
      'getMerchantSurvey',
      'getDetailVisit',
      'getSalesman',
      'getDistrik',
      'getDistributor',
      'getMap',
    ]),
    myRowClickHandler(record, index) {
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      log(record) // This will be the item data for the row
    },
    handleDistributor(value) {
      const id = value
      this.getDistributor(id)
    },
    getMapData(place) {
      this.place = place
    },

    handlePagination(size) {
      this.salesRoute.pagination.pageSize = size
    },
    handlePaginationToko(size) {
      this.salesRoute.paginationToko.pageSize = size
    },
    async handleOk() {
      if (
        this.salesRoute.formData.selectedDistrik == '' &&
        this.salesRoute.formData.selectedDate == ''
      ) {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Distrik dan Tanggal tidak boleh kosong.',
        })
      } else {
        await this.getDetailVisit()
        await this.getMerchantSurvey()
        await this.getMap()
      }
    },
    async handleSales() {
      await this.getSalesman({
        id_distributor: this.salesRoute.formData.selectedDistributor,
      })
    },
  },
}
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
