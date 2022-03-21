<template>
  <a-row :gutter="[32, 16]">
    <a-col :xs="24" :md="12">
      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :md="8">
          <a-select placeholder="Provinsi" class="w-100">
            <a-select-option disabled value="">Pilih Provinsi</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Provinsi</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Area" class="w-100">
            <a-select-option disabled value="">Pilih Area</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Area</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Distrik" class="w-100">
            <a-select-option disabled value="">Pilih Distrik</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Distrik</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Brand" class="w-100">
            <a-select-option disabled value="">Pilih Brand</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Brand</a-select-option>
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
          <a-select placeholder="Distributor" class="w-100">
            <a-select-option disabled value="">Pilih Distributor</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top"
              >Distributor</a-select-option
            >
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Kategori" class="w-100">
            <a-select-option disabled value="">Pilih Kategori</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Kategori</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-button type="primary" class="w-100">Tampilkan</a-button>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
  <a-row :gutter="[32, 24]" class="my-3">
    <a-col :sm="24" :md="12" :lg="8">
      <fieldset class="border shadow px-3 pb-3">
        <legend class="w-auto px-2"><small class="font-weight-light">Bonus Semen</small></legend>
        <div style="background: white">
          <vue-apex-charts type="pie" :options="chartOptions1" :series="series1" />
        </div>
      </fieldset>
    </a-col>
    <a-col :sm="24" :md="12" :lg="8">
      <fieldset class="border shadow px-3 pb-3">
        <legend class="w-auto px-2"><small class="font-weight-light">Bonus Wisata</small></legend>
        <div style="background: white">
          <vue-apex-charts type="pie" :options="chartOptions2" :series="series2" />
        </div>
      </fieldset>
    </a-col>
    <a-col :sm="24" :md="12" :lg="8">
      <fieldset class="border shadow px-3 pb-3">
        <legend class="w-auto px-2"><small class="font-weight-light">Bonus Voucher</small></legend>
        <div style="background: white">
          <vue-apex-charts type="pie" :options="chartOptions3" :series="series3" />
        </div>
      </fieldset>
    </a-col>
    <a-col :sm="24" :md="12" :lg="8">
      <fieldset class="border shadow px-3 pb-3">
        <legend class="w-auto px-2"><small class="font-weight-light">Potongan Harga</small></legend>
        <div style="background: white">
          <vue-apex-charts type="pie" :options="chartOptions3" :series="series3" />
        </div>
      </fieldset>
    </a-col>
    <a-col :sm="24" :md="12" :lg="8">
      <fieldset class="border shadow px-3 pb-3">
        <legend class="w-auto px-2"><small class="font-weight-light">Point Reward</small></legend>
        <div style="background: white">
          <vue-apex-charts type="pie" :options="chartOptions1" :series="series1" />
        </div>
      </fieldset>
    </a-col>
    <a-col :sm="24" :md="12" :lg="8">
      <fieldset class="border shadow px-3 pb-3">
        <legend class="w-auto px-2">
          <small class="font-weight-light">Promo Lain - Lain</small>
        </legend>
        <div style="background: white">
          <vue-apex-charts type="pie" :options="chartOptions2" :series="series2" />
        </div>
      </fieldset>
    </a-col>
    <a-col :sm="24" :md="12" :lg="8">
      <fieldset class="border shadow px-3 pb-3">
        <legend class="w-auto px-2">
          <small class="font-weight-light">Tidak Ada Promo</small>
        </legend>
        <div style="background: white">
          <vue-apex-charts type="pie" :options="chartOptions1" :series="series1" />
        </div>
      </fieldset>
    </a-col>
  </a-row>
  <vue-apex-charts type="bar" height="350" :options="chartOptions" :series="series" />
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  components: {
    VueApexCharts,
  },
  data() {
    return {
      series1: [55, 45],
      chartOptions1: {
        chart: {
          type: 'pie',
          toolbar: {
            show: true,
          },
        },
        legend: {
          show: false,
        },
        colors: ['#444248', '#66FF76'],
        labels: ['Team A', 'Team B'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
            },
          },
        ],
      },
      series2: [55, 45],
      chartOptions2: {
        chart: {
          type: 'pie',
          toolbar: {
            show: true,
          },
        },
        legend: {
          show: false,
        },
        colors: ['#FCA452', '#9065ED'],
        labels: ['Team A', 'Team B'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
            },
          },
        ],
      },
      series3: [90, 10],
      chartOptions3: {
        chart: {
          type: 'pie',
          toolbar: {
            show: true,
          },
        },
        legend: {
          show: false,
        },
        colors: ['#7EACEF', '#FE2E7E'],
        labels: ['Team A', 'Team B'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
            },
          },
        ],
      },
      series: [
        {
          name: 'Bonus Semen',
          data: [44, 55, 41, 67, 22, 43, 11],
        },
        {
          name: 'Bonus Wisata',
          data: [13, 23, 20, 8, 13, 27, 12],
        },
        {
          name: 'Bonus Voucher',
          data: [11, 17, 15, 15, 21, 14, 13],
        },
        {
          name: 'Potongan Harga',
          data: [21, 7, 25, 13, 22, 8, 14],
        },
        {
          name: 'Point Reward',
          data: [44, 55, 41, 67, 22, 43, 15],
        },
        {
          name: 'Produk Lain',
          data: [13, 23, 20, 8, 13, 27, 16],
        },
        {
          name: 'Tidak Ada Promo',
          data: [11, 17, 15, 15, 21, 14, 17],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        colors: ['#7EACEF', '#444248', '#66FF76', '#FCA452', '#9065ED', '#FE2E7E', '#DEE043'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
          },
        },
        xaxis: {
          type: 'text',
          categories: [
            'Bonus Semen',
            'Bonus Wisata',
            'Bonus Voucher',
            'Potongan Harga',
            'Point Reward',
            'Produk Lain',
            'Tidak Ada Promo',
          ],
        },
        legend: {
          position: 'bottom',
        },
        fill: {
          opacity: 1,
        },
      },
    }
  },
}
</script>
