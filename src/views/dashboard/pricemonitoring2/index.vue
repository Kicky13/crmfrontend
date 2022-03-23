<template>
  <a-row :gutter="[32, 16]">
    <a-col :xs="24" :md="12">
      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :md="8">
          <a-select placeholder="Distrik" class="w-100">
            <a-select-option disabled value="">Pilih Distrik</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Distrik</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Provinsi" class="w-100">
            <a-select-option disabled value="">Pilih Provinsi</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Provinsi</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Distributor" class="w-100">
            <a-select-option disabled value="">Pilih Distributor</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top"
              >Distributor</a-select-option
            >
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Tahun" class="w-100">
            <a-select-option disabled value="">Pilih Tahun</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Tahun</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Bulan" class="w-100">
            <a-select-option disabled value="">Pilih Bulan</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Bulan</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </a-col>
    <a-col :xs="24" :md="12">
      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :md="8">
          <a-select placeholder="Kategori" class="w-100">
            <a-select-option disabled value="">Pilih Kategori</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Kategori</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Brand" class="w-100">
            <a-select-option disabled value="">Pilih Brand</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Brand</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-button type="primary" class="w-100">Tampilkan</a-button>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
  <a-row>
    <a-col :xs="12">
      <div class="card my-3">
        <div class="card-body d-flex justify-content-between">
          <div>
            <h5 class="text-secondary">Outlet Surveyed</h5>
            <h2 class="text-primary">8056</h2>
          </div>
          <div>
            <i class="fa fa-user text-primary" style="font-size: 5em" />
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="32" class="mb-4">
    <a-col :sm="24" :md="12">
      <fieldset class="border shadow px-3 pb-3">
        <legend class="w-auto px-2"><small class="font-weight-light">Harga Beli</small></legend>
        <div style="background: white">
          <vue-apex-charts type="area" height="350" :options="chartOptions" :series="series" />
        </div>
      </fieldset>
    </a-col>
    <a-col :sm="24" :md="12">
      <fieldset class="border shadow px-3 pb-3">
        <legend class="w-auto px-2"><small class="font-weight-light">Harga Jual</small></legend>
        <div style="background: white">
          <vue-apex-charts type="area" height="350" :options="chartOptions" :series="series" />
        </div>
      </fieldset>
    </a-col>
  </a-row>
  <div class="card card-top card-top-primary">
    <div class="card-body">
      <div class="d-flex mb-3">
        <div class="align-self-center">
          <span>Show :</span>
        </div>
        <a-select
          :default-value="priceMonitoring.itemsPerPage[1]"
          class="mx-2"
        >
          <a-select-option
            v-for="itemPerPage in priceMonitoring.itemsPerPage"
            :key="itemPerPage"
          >
            {{ itemPerPage }}
          </a-select-option>
        </a-select>
        <div class="align-self-center">
          <span>entries</span>
        </div>
      </div>
      <a-table :columns="priceMonitoring.columns" />
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    VueApexCharts,
  },
  computed: {
    ...mapState({
      priceMonitoring: state => state.priceMonitoring.data,
    }),
  },
  data() {
    return {
      series: [
        {
          name: 'Max',
          data: [2, -2, -3, 2, 1],
        },
        {
          name: 'Median',
          data: [3, 4, 4, -2, 5],
        },
        {
          name: 'Min',
          data: [5, 3, 4, 7, 2],
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
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          // type: 'datetime',
          // categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z"],
          labels: {
            show: false,
          },
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      },
    }
  },
}
</script>
