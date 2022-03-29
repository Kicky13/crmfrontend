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
                >
                  <a-select-option value="">Pilih Salah Satu</a-select-option>
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xs-3 col-md-3">
              <a-form-item>
                <a-select
                  class="col-lg-12 col-md-12 pr-2"
                  style="width: 100% !important"
                  placeholder="Tanggal"
                >
                  <a-select-option value="">Pilih Salah Satu</a-select-option>
                </a-select>
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
      <div class="col-md-6">
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
                  <!-- <PlaceSearch v-bind:ready="ready" placeholder="Enter a location" loading="Map is loading"
                    v-bind:fallbackProcedure="fallbackProcedure" v-bind:zoom="zoom" v-bind:geolocation="geolocation"
                    v-bind:gps_timeout="3000" v-bind:address="address" @changed="getMapData">
                  </PlaceSearch> -->
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
      </div>
      <div class="col-md-6 bg-white rounded p-3 mt-3">
        <div class="row">
          <div class="col-md-12">
            <a-carousel :after-change="onChange">
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
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
                <div class="table-responsive text-nowrap">
                  <!-- <a-table :columns="columns" :data-source="dataList" :row-key="dataSourceTable => dataSourceTable.id"
                    :pagination="pagination" :loading="isLoading"> -->
                  <a-table
                    :columns="salesRoute.columns"
                    :loading="salesRoute.isLoading"
                    :pagination="salesRoute.pagination"
                  >
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
                <div class="table-responsive text-nowrap">
                  <!-- <a-table :columns="columns" :data-source="dataList" :row-key="dataSourceTable => dataSourceTable.id"
                    :pagination="pagination" :loading="isLoading"> -->
                  <a-table
                    :columns="salesRoute.columns2"
                    :loading="salesRoute.isLoading2"
                    :pagination="salesRoute.pagination2"
                  >
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
  mounted() {
    this.getDistrik()
  },
  methods: {
    ...mapActions('salesRoute', ['getDistrik', 'getDistributor']),
    handleDistributor(value) {
      const id = value
      this.getDistributor(id)
    },
    getMapData(place) {
      this.place = place
    },
    onChange(a, b, c) {
      console.log(a, b, c)
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
