<template>
  <div>
    <a-form :model="SOW.formData" label-align="left" layout="vertical">
      <div class="row">
        <div class="col-xs-2 col-md-2">

          <a-form-item>

            <a-select class="col-lg-12 col-md-12 pr-2" style="width: 100% !important" placeholder="Provinsi"
              v-model:value="SOW.formData.selectedProvinsi" show-search @change="handleArea">
              <a-select-option v-for="(provinsi,index)  in SOW.dataProvinsi" :key="index" :value="provinsi.id_provinsi">{{
              provinsi.nama_provinsi
            }}</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-form-item >

            <a-select class="col-lg-12 col-md-12 pr-2" style="width: 100% !important" placeholder="Area" v-model:value="SOW.formData.selectedArea" show-search @change="handleDistrik">
              <a-select-option v-for="(area, index)  in SOW.dataArea" :key="index" :value="area.id_area">
                {{ area.nama_area }}</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-form-item>

            <a-select class="col-lg-12 col-md-12 pr-2" style="width: 100% !important" placeholder="Distrik" v-model:value="SOW.formData.selectedDistrik" show-search @change="handleDistributor">
              <a-select-option v-for="(distrik, index)  in SOW.dataDistrik" :key="index" :value="distrik.id_distrik">
                {{ distrik.nama_distrik }}</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-form-item>

            <a-select class="col-lg-12 col-md-12 pr-2" style="width: 100% !important" placeholder="Distributor" v-model:value="SOW.formData.selectedDistributor" show-search @change="handleBrand">
              <a-select-option v-for="(distributor, index)  in SOW.dataDistributor" :key="index"
                :value="distributor.id_distributor">{{ distributor.nama_distributor }}</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-form-item>

            <a-select class="col-lg-12 col-md-12 pr-2" style="width: 100% !important" placeholder="Brand" v-model:value="SOW.formData.selectedBrand" show-search>
              <a-select-option v-for="(brand, index)  in SOW.dataBrand" :key="index" :value="brand.id_brand">
                {{ brand.nama_brand }}</a-select-option>
            </a-select>
          </a-form-item>
        </div>

      </div>
      <div class="row">
        <div class="col-xs-2 col-md-2">
          <a-form-item>

            <a-select class="col-lg-12 col-md-12 pr-2" style="width: 100% !important" placeholder="Tahun">
              <a-select-option value="2019">2019</a-select-option>
              <a-select-option value="2020">2020</a-select-option>
              <a-select-option value="2021">2021</a-select-option>
              <a-select-option value="2022">2022</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-form-item>

            <a-select class="col-lg-12 col-md-12 pr-2" style="width: 100% !important" placeholder="Bulan">
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
          </a-form-item>
        </div>
        <div class="col-xs-2 col-md-2">
          <a-button type="primary" class="mb-3" @click="handleOk()">
            <i class="fa fa-eye mr-2" />
            Tampilkan
          </a-button>
        </div>
      </div>
    </a-form>
    <div class="row">
      <div class="col-md-10 col-sm-10">
        <fieldset class="border shadow px-3 pb-3">
          <legend class="w-auto px-2">
            <small class="font-weight-light">
              Share Of Wallet & Product Position
            </small>
          </legend>
          <div class="row">
            <div class="col-md-6">
              <div class="bg-white p-3 style_donut">
                <apexchart width="430" type="pie" :options="chartOptions" :series="series"></apexchart>
              </div>
            </div>
            <div class="col-md-6">
              <div class="bg-white p-3 style_area">
                <apexchart type="area" width="450" :options="chartOptions_area" :series="series_area"></apexchart>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="col-md-2 col-sm-2">
        <div class="list_download d-flex border shadow px-3 pb-3">
          <div class="list_download_information">
            Total Customer <br>
            <h3 class="text-red">8.056</h3>

          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-user-o style_icon" aria-hidden="true"></i>
          </div>
        </div>

        <div class="list_download d-flex mt-3 border shadow px-3 pb-3">
          <div class="list_download_information">
            Produk (SKU) <br>
            <h3 class="text-red">156</h3>

          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-trash style_icon" aria-hidden="true"></i>
          </div>
        </div>

        <div class="list_download d-flex mt-3 border shadow px-3 pb-3">
          <div class="list_download_information">
            Brands <br>
            <h3 class="text-red">156</h3>

          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-trash style_icon" aria-hidden="true"></i>
          </div>
        </div>

        <div class="list_download d-flex mt-3 border shadow px-3 pb-3">
          <div class="list_download_information">
            Distributor <br>
            <h3 class="text-red">2000</h3>

          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-envelope style_icon" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-sm-12">
        <fieldset class="border shadow px-3 pb-3">
          <legend class="w-auto px-2">
            <small class="font-weight-light">
              Brand Leading
            </small>
          </legend>
          <div class="row">
            <div class="col-md-12">
              <div class="bg-white p-3">
                <!-- <PlaceSearch v-bind:ready="ready" placeholder="Enter a location" loading="Map is loading"
                  v-bind:fallbackProcedure="fallbackProcedure" v-bind:zoom="zoom" v-bind:geolocation="geolocation"
                  v-bind:gps_timeout="3000" v-bind:address="address" @changed="getMapData"> -->
                <img src="@/assets/images/maps.jpg" alt="Los Angeles" width="100%" height="300px">
                <!-- </PlaceSearch> -->
              </div>
            </div>
          </div>
        </fieldset>
      </div>

    </div>
    <div class="card card-top card-top-primary mt-3">
      <div class="card-body">

        <div class="row">
          <div class="col-md-12 col-sm-12">
            <div class="table-responsive text-nowrap">
              <a-table :columns="SOW.columns" :loading="SOW.isLoading" :pagination="SOW.pagination">

              </a-table>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ApexCharts from 'apexcharts';
  // import { getRegionList,getDataListArea,getDataListDistrik,getDataListBrand,getDataListDistributor } from '@/services/connection/dashboard/api'
 
  import {
    mapState,
    mapActions,
  } from 'vuex'
  import {
    _,
  } from 'vue-underscore'
  // const itemsPerPage = [5, 10, 15, 20]
  export default {
    setup() {
      return {
        // itemsPerPage,
      }
    },
    data: function () {
      return {
        //fungsi menampilkan google map
        ready: false,
        fallbackProcedure: "gps", //gps | geolocation | address | manually
        zoom: 17, //Default Zoom
        geolocation: {
          // If GPS and Find by address fails then, map will be positioned by a default geolocation
          lat: 31.73858,
          lng: -35.98628,
          zoom: 2,
        },
        address: {
          query: "Albania, Tirane", //If GPS fails, Find by address is triggered
          zoom: 10,
        },
        manually: {
          address_description: "21 Dhjetori, Tirana, Albania",
          city: "Tirana",
          country: "Albania",
          lat: 41.3267905,
          lng: 19.8060475,
          state: "Tirana County",
          zip_code: "",
          zoom: 17,
        },
        place: {},

        //fungsi menampilkan chart
        chartOptions: {
          chart: {
            width: '400',
            type: 'pie',
          },
          labels: ["Semen Gresik", "Semen Rembang", "Semen Tuban", "Semen Padang", "Semen Mortar"],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          }],
        },
        series: [25, 15, 44, 55, 41],

        series_area: [{
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        }, {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41],
        }],
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
          // xaxis: {
          //   type: 'date',
          //   categories: ["2018-09-19", "2018-09-19", "2018-09-19", "2018-09-19", "2018-09-19", "2018-09-19",
          //     "2018-09-19",
          //   ],
          // },
          // tooltip: {
          //   x: {
          //     format: 'dd/MM/yy',
          //   },
          // },
        },
      };
    },
    computed: {
      ...mapState({
        SOW: (state) => state.SOW.data,
      }),
    },
    mounted() {
      this.getProvinsi()
      
    },
    methods: {
      ...mapActions('SOW', [
        'getProvinsi',
        'getListTabel',
        'getArea',
        'getDistrik',
        'getDistributor',
        'getBrand',
      ]),
      getMapData(place) {
        this.place = place;
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
    },
  };

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
