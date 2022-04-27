<template>
  <div>
    <a-form :model="salesRoute.formData" label-align="left" layout="vertical">
      <div class="row">
        <div class="col-md-10">
          <div class="row">
            <div class="col-xs-4 col-md-4">
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
                    :value="distrik.nama_distrik"
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
                    :value="distributor.nama_distributor"
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
            <div class="col-xs-2 col-md-2">
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
          <a-button
            :disabled="
              salesRoute.formData.selectedDistrik != `` &&
              salesRoute.formData.selectedDistributor != `` &&
              salesRoute.formData.selectedSalesman != `` &&
              salesRoute.formData.selectedDate != ``
                ? false
                : true
            "
            type="primary"
            class="mb-3 w-100"
            @click="handleOk()"
          >
            <i class="fa fa-eye mr-2" />
            Tampilkan
          </a-button>
        </div>
      </div>
    </a-form>
    <div class="row">
      <div class="col-md-12">
        <!-- <fieldset class="border border-dark shadow px-3 pb-3">
          <legend class="w-auto px-2">
            <small class="font-weight-light">
              Visit Route Map
            </small>
          </legend>
          <div class="row" style="height:100%">
            <div class="col-md-12" style="height:100%">
              <div class="bg-white p-3" style="height:340px">
                <img src="@/assets/images/maps.jpg" alt="Los Angeles" width="100%" height="100%" />
              </div>
            </div>
          </div>
        </fieldset> -->

        <div class="card card-top card-top-primary mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <vue-highcharts :highcharts="Highcharts" :options="mapIndonesia"></vue-highcharts>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <!-- <img src="@/assets/images/maps.jpg" class="img-fluid w-100" style="height:160px;" />
        <a-carousel :after-change="onChange" class="mt-3" style="height:auto">
          <div v-if="itemRadio == null">
            <img src="@/assets/images/noimage.svg" class="img-fluid w-100" style="height:180px;" />
          </div>
          <div v-else v-for="(item, index) in itemRadio.image" :key="`index_${index}`">
            <img :src="item.src" class="img-fluid w-100" style="height:180px;" />
          </div>
        </a-carousel> -->
        <div class="card card-top card-top-primary mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1651031578505!6m8!1m7!1skXzVP0fgY_1_5I7ThQic3w!2m2!1d-7.168866872251688!2d112.6453457234876!3f0!4f0!5f0.7820865974627469"
                  width="454"
                  height="294"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card card-top card-top-primary mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <a-carousel v-if="itemRadio == null" :after-change="onChange" arrows>
                  <template #prevArrow>
                    <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                      <left-circle-outlined />
                    </div>
                  </template>
                  <template #nextArrow>
                    <div class="custom-slick-arrow" style="right: 10px">
                      <right-circle-outlined />
                    </div>
                  </template>
                  <div>
                    <img
                      src="@/assets/images/noimage.svg"
                      class="img-fluid w-100"
                      style="height:280px;"
                    />
                  </div>
                  <div>
                    <img
                      src="@/assets/images/noimage.svg"
                      class="img-fluid w-100"
                      style="height:280px;"
                    />
                  </div>
                </a-carousel>
                <a-carousel v-else :after-change="onChange" arrows>
                  <template #prevArrow>
                    <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                      <left-circle-outlined />
                    </div>
                  </template>
                  <template #nextArrow>
                    <div class="custom-slick-arrow" style="right: 10px">
                      <right-circle-outlined />
                    </div>
                  </template>
                  <div v-for="(item, index) in itemRadio.image" :key="`index_${index}`">
                    <img :src="item.src" class="img-fluid w-100" style="height:180px;" />
                  </div>
                </a-carousel>
                <!-- <a-carousel :after-change="onChange" class="mt-3" style="height:auto">
                  <div v-if="itemRadio == null">
                    <div>
                      <img
                        src="@/assets/images/noimage.svg"
                        class="img-fluid w-100"
                        style="height:180px;"
                      />
                    </div>
                    <div>
                      <img
                        src="@/assets/images/noimage.svg"
                        class="img-fluid w-100"
                        style="height:180px;"
                      />
                    </div>
                  </div>
                  <div v-else v-for="(item, index) in itemRadio.image" :key="`index_${index}`">
                    <img :src="item.src" class="img-fluid w-100" style="height:180px;" />
                  </div>
                </a-carousel> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-7 col-sm-7">
        <div class="card card-top card-top-primary mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <label for="" class="font-weight-bold text-black">Toko Sudah Dikunjungi</label>
              </div>
            </div>
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
      <div class="col-md-5 col-sm-5">
        <div class="card card-top card-top-primary mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <label for="" class="font-weight-bold text-black">Toko Belum Dikunjungi</label>
              </div>
            </div>
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
                    <template #kode_toko="{ text }">
                      <div>
                        {{ text.id_toko_belum_dikunjungi }}
                      </div>
                    </template>
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
import VueHighcharts from 'vue3-highcharts'
import Highcharts from 'highcharts'
// import More from 'highcharts/highcharts-more'
import Maps from 'highcharts/modules/map'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'

Maps(Highcharts)
// More(Highcharts)
export default {
  components: {
    VueHighcharts,
    LeftCircleOutlined,
    RightCircleOutlined,
  },

  data: function() {
    const topology = fetch(
      'https://code.highcharts.com/mapdata/countries/id/id-all.topo.json',
    ).then(response => response.json())
    const data = [
      ['id-3700', 10],
      ['id-ac', 11],
      ['id-jt', 12],
      ['id-be', 13],
      ['id-bt', 14],
      ['id-kb', 15],
      ['id-bb', 16],
      ['id-ba', 17],
      ['id-ji', 18],
      ['id-ks', 19],
      ['id-nt', 20],
      ['id-se', 21],
      ['id-kr', 22],
      ['id-ib', 23],
      ['id-su', 24],
      ['id-ri', 25],
      ['id-sw', 26],
      ['id-ku', 27],
      ['id-la', 28],
      ['id-sb', 29],
      ['id-ma', 30],
      ['id-nb', 31],
      ['id-sg', 32],
      ['id-st', 33],
      ['id-pa', 34],
      ['id-jr', 35],
      ['id-ki', 36],
      ['id-1024', 37],
      ['id-jk', 38],
      ['id-go', 39],
      ['id-yo', 40],
      ['id-sl', 41],
      ['id-sr', 42],
      ['id-ja', 43],
      ['id-kt', 44],
    ]
    return {
      itemRadio: null,
      selectedRowKeys: [],
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
      mapIndonesia: {
        chart: {
          map: topology,
        },

        title: {
          text: '',
        },

        subtitle: {
          text:
            'Source map: <a href="http://code.highcharts.com/mapdata/countries/id/id-all.topo.json">Indonesia</a>',
        },

        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom',
          },
        },

        colorAxis: {
          min: 0,
        },

        series: [
          {
            data: data,
            name: 'Random data',
            states: {
              hover: {
                color: '#BADA55',
              },
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
          },
        ],
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
    async handleDistributor() {
      let dataSource = [...this.salesRoute.dataDistrik]
      let filtered = dataSource.filter(
        x => x.nama_distrik == this.salesRoute.formData.selectedDistrik,
      )

      this.salesRoute.formData.id_distrik = filtered[0].id_distrik

      await this.getDistributor()
    },
    async handleSales() {
      let dataSource = [...this.salesRoute.dataDistributor]
      let filtered = dataSource.filter(
        x => x.nama_distributor == this.salesRoute.formData.selectedDistributor,
      )

      this.salesRoute.formData.id_distributor = filtered[0].id_distributor
      await this.getSalesman({
        id_distributor: this.salesRoute.formData.id_distributor,
      })
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
  },
}
</script>

<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 300px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
