<template>
  <a-row :gutter="[32, 16]">
    <a-col :xs="24" :md="12">
      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :md="8">
          <a-select
            placeholder="Provinsi"
            class="w-100"
            show-search
            @change="handleProvinsi"
          >
            <a-select-option disabled value="">Pilih Provinsi</a-select-option>
            <a-select-option
              v-for="(item, index) in filter.listProvinsi"
              :value="`${item.id_provinsi} - ${item.nama_provinsi}`"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama_provinsi"
            >
              {{ item.id_provinsi }} - {{ item.nama_provinsi }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select
            placeholder="Area"
            class="w-100"
            show-search
            @change="handleArea"
          >
            <a-select-option disabled value="">Pilih Area</a-select-option>
            <a-select-option
              v-for="(item, index) in filter.listArea"
              :value="`${item.id_area} - ${item.nama_area}`"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama_area"
            >
              {{ item.id_area }} - {{ item.nama_area }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select
            placeholder="Distrik"
            class="w-100"
            show-search
            @change="handleDistrik"
          >
            <a-select-option disabled value="">Pilih Distrik</a-select-option>
            <a-select-option
              v-for="(item, index) in filter.listDistrik"
              :value="`${item.id_distrik} - ${item.nama_distrik}`"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama_distrik"
            >
              {{ item.id_distrik }} - {{ item.nama_distrik }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Brand" class="w-100">
            <a-select-option disabled value="">Pilih Brand</a-select-option>
            <a-select-option
              v-for="(item, index) in filter.listBrand"
              :value="`${item.id_brand} - ${item.nama_brand}`"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama_brand"
            >
              {{ item.id_brand }} - {{ item.nama_brand }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select
            placeholder="Tahun"
            class="w-100"
            show-search
            @change="handleTahun"
          >
            <a-select-option disabled value="">Pilih Tahun</a-select-option>
            <a-select-option
              v-for="(year, index) in years"
              :value="year"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="year"
            >
              {{ year }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select
            placeholder="Bulan"
            class="w-100"
            show-search
            @change="handleBulan"
          >
            <a-select-option disabled value="">Pilih Bulan</a-select-option>
            <a-select-option
              v-for="(item, index) in filter.listBulan"
              :value="item.id"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama"
            >
              {{ item.nama }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </a-col>
    <a-col :xs="24" :md="12">
      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :md="8">
          <a-select
            placeholder="Distributor"
            class="w-100"
            show-search
            @change="handleDistributor"
          >
            <a-select-option disabled value="">Pilih Distributor</a-select-option>
            <a-select-option
              v-for="(item, index) in filter.listDistributor"
              :value="`${item.id_distributor} - ${item.nama_distributor}`"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama_distributor"
            >
              {{ item.id_distributor }} - {{ item.nama_distributor }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select
            placeholder="Kategori"
            class="w-100"
            show-search
            @change="handleKategori"
          >
            <a-select-option disabled value="">Pilih Kategori</a-select-option>
            <a-select-option
              v-for="(item, index) in filter.listKategori"
              :value="`${item.id_kategori} - ${item.nama_kategori}`"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama_kategori"
            >
              {{ item.id_kategori }} - {{ item.nama_kategori }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-button
            :disabled="promotion.buttonPrevent"
            type="primary"
            class="w-100"
            @click="handleTampilkan"
          >
            Tampilkan
          </a-button>
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
          <small class="font-weight-light">Promo Lain</small>
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
  <vue-apex-charts ref="mychart" type="bar" height="350" :options="chartOptions" :series="series" />
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    VueApexCharts,
  },
  data() {
    return {
      formData: {
        id_provinsi: null,
        id_area: null,
        id_kota: null,
        id_distributor: null,
        id_kategori_produk: null,
        bulan: null,
        tahun: null,
      },
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
      series: [],
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
          categories: [],
        },
        legend: {
          position: 'bottom',
        },
        fill: {
          opacity: 1,
        },
        noData: {
          text: 'Loading...',
        },
      },
    }
  },
  computed: {
    ...mapState({
      filter: state => state.filter.data,
      promotion: state => state.promotion.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    await this.getAllProvinsi()
    await this.getAllArea()
    await this.getAllDistrik()
    await this.getAllDistributor()
    await this.getAllKategori()
    await this.getAllBrand()
    await this.setSeriesAndCategories()
  },
  methods: {
    ...mapActions('filter', [
      'getAllProvinsi',
      'getAllArea',
      'getAllDistrik',
      'getAllDistributor',
      'getAllKategori',
      'getAllBrand',
    ]),
    ...mapActions('promotion', [
      'getAllPromotion',
    ]),
    async handleProvinsi(value) {
      const idProvinsi = (value.split('-')[0]).trim()
      await this.getAllArea({ id_provinsi: idProvinsi })
      this.formData.id_provinsi = idProvinsi
    },
    async handleArea(value) {
      const idArea = (value.split('-')[0]).trim()
      await this.getAllDistrik({ id_area: idArea })
      this.formData.id_area = idArea
    },
    async handleDistrik(value) {
      const idDistrik = (value.split('-')[0]).trim()
      await this.getAllDistributor({ id_distrik: idDistrik })
      this.formData.id_kota = idDistrik
    },
    handleDistributor(value) {
      const idDistributor = (value.split('-')[0]).trim()
      this.formData.id_distributor = idDistributor
    },
    async handleKategori(value) {
      const idKategori = (value.split('-')[0]).trim()
      await this.getAllBrand({ id_kategori: idKategori })
      this.formData.id_kategori_produk = idKategori
    },
    handleTahun(value) {
      this.formData.tahun = value
    },
    handleBulan(value) {
      this.formData.bulan = value
    },
    async handleTampilkan() {
      this.series = []
      await this.setSeriesAndCategories(this.formData)
    },
    async setSeriesAndCategories() {
      let colors = []
      await this.getAllPromotion()
      this.promotion.listSeries.map(serie => this.series.push(serie))
      this.series.map(serie => colors.push(this.randomColor()))
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            type: 'text',
            categories: this.promotion.listCategories,
          },
        },
      }
    },
    randomColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    },
  },
}
</script>
