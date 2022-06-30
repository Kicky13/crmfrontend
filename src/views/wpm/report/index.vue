<template>
  <a-card class="card card-top card-top-primary">
    <div class="row">
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-4">
            <a-select
              v-model:value="report.params.region_name"
              placeholder="Region"
              show-search
              class="w-100"
              @change="handleChangeRegion"
            >
              <a-select-option disabled value="">Pilih Region</a-select-option>
              <a-select-option
                v-for="(region, index) in report.regionList"
                :value="region.nama_region"
                :key="index"
              >
                {{ region.id_region }} - {{ region.nama_region }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-4">
            <a-select
              v-model:value="report.params.province_name"
              placeholder="Provinsi"
              show-search
              class="w-100"
              @change="handleChangeProvince"
            >
              <a-select-option disabled value="">Pilih Provinsi</a-select-option>
              <a-select-option
                v-for="(provinsi, index) in report.provinceList"
                :value="provinsi.nama_provinsi"
                :key="index"
              >
                {{ provinsi.id_provinsi }} - {{ provinsi.nama_provinsi }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-4">
            <a-select
              v-model:value="report.params.id_distrik_ret"
              placeholder="Distrik RET"
              show-search
              class="w-100"
              @change="handleChangeDistrikRET"
            >
              <a-select-option disabled value="">Pilih Distrik RET</a-select-option>
              <a-select-option
                v-for="(distrik, index) in report.dataDistrikRET"
                :value="distrik.id_district_ret"
                :key="index"
              >
                {{ distrik.id_district_ret }} - {{ distrik.nama_district_ret }}
              </a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-4">
            <a-tooltip placement="topLeft">
              <template #title>
                <span>Refresh Filter</span>
              </template>
              <a-button @click="refreshFilter()" type="primary">
                <i class="fa fa-refresh" aria-hidden="true"></i>
              </a-button>
            </a-tooltip>
          </div>
          <div class="col-md-8">
            <a-button
              :disabled="report.dataTable.length == 0 ? true : false"
              type="primary"
              class="mb-3 float-right w-100"
              @click="downloadReport()"
            >
              <i class="fa fa-download mr-2" />
              Export
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-3">
        <a-select
          v-model:value="report.params.nm_distrik"
          placeholder="Distrik"
          show-search
          class="w-100"
          @change="handleChangeDistrik"
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option
            v-for="(distrik, index) in report.dataDistrikRET"
            :value="distrik.nama_distrik"
            :key="index"
          >
            {{ distrik.id_distrik }} - {{ distrik.nama_distrik }}
          </a-select-option>
        </a-select>
      </div>
      <div class="col-md-3">
        <a-select
          v-model:value="report.params.tahun"
          placeholder="Tahun"
          show-search
          class="w-100"
          @change="handleChangeTahun"
        >
          <a-select-option disabled value="">Pilih Tahun</a-select-option>
          <a-select-option v-for="(tahun, index) in years" :value="tahun" :key="index">
            {{ tahun }}
          </a-select-option>
        </a-select>
      </div>
      <div class="col-md-3">
        <a-select
          v-model:value="report.params.bulan"
          placeholder="Bulan"
          show-search
          class="w-100"
          @change="handleChangeBulan"
        >
          <a-select-option disabled value="">Pilih Bulan</a-select-option>
          <a-select-option
            v-for="(bulan, index) in report.data_bulan"
            :value="bulan.id"
            :key="index"
          >
            {{ bulan.name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="col-md-3">
        <a-select
          v-model:value="report.params.week"
          placeholder="Week"
          show-search
          class="w-100"
          @change="handleChangeWeek()"
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            v-for="(weekly, index) in report.dataWeekParams"
            :value="weekly.week"
            :key="index"
          >
            Week {{ weekly.week }}
          </a-select-option>
        </a-select>
      </div>
    </div>

    <a-table
      ref="table"
      :columns="report.columns"
      :data-source="report.dataTable"
      :loading="report.isLoading"
      :row-key="data => data"
      :scroll="{ x: 2000 }"
    />
  </a-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import numeral from 'numeral'

export default {
  computed: {
    ...mapState({
      report: state => state.report.data,
      report: state => state.report.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    await this.getDistrikRET()
  },
  methods: {
    ...mapActions('report', ['getDistrikRET', 'getDataTable', 'getDataWeekParams']),
    refreshFilter() {
      this.report.params.id_distrik_ret = null
      this.report.params.tahun = ''
      this.report.params.bulan = ''
      this.report.params.week = ''
      this.report.params.nm_distrik = ''
      this.report.dataTable = []
    },

    async showReport() {
      await this.getDataTable()
    },

    handleChangeDistrik() {
      let dataSource = [...this.report.dataDistrikRET]
      let filtered = dataSource.filter(x => x.nama_distrik == this.report.params.nm_distrik)
      this.report.params.id_distrik_ret = filtered[0].id_distrik
    },

    async downloadReport() {
      const header = [
        'DISTRIK',
        'TAHUN',
        'BULAN',
        'WEEK',
        'STATUS',
        'PRODUK',
        'BRAND',
        'TYPE',
        'KEMASAN',
        'RBP GROSS',
        'PROMO',
        'RBP NET',
        'RSP',
        'NOTES',
      ]
      const filterVal = [
        'distrik',
        'tahun',
        'bulan',
        'week',
        'status',
        'produk',
        'brand',
        'type',
        'kemasan',
        'rbpgross',
        'promo',
        'rbpnett',
        'rsp',
        'notes',
      ]
      this.exportToExcel(
        header,
        filterVal,
        this.report.dataTable,
        'Data Report ' +
          this.report.params.nm_distrik +
          ` - ` +
          this.report.params.tahun +
          `/` +
          `0` +
          this.report.params.bulan +
          `/` +
          `Week` +
          this.report.params.week,
      )
    },

    // formatNumberDecimal(value) {
    //   let formatted = numeral(value).format('0,0.[00]')
    //   return formatted
    // },
    exportToExcel(header, filterVal, list, filename) {
      import('@/vendor/Export2Excel').then(excel => {
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header,
          data,
          filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType,
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }),
      )
    },
    async handleChangeTahun() {
      if (
        this.report.params.tahun != '' &&
        this.report.params.bulan != '' &&
        this.report.params.week != ''
      ) {
        await this.getDataTable()
      } else if (
        this.report.params.tahun != '' &&
        this.report.params.bulan != '' &&
        this.report.params.week == ''
      ) {
        await this.getDataWeekParams()
      }
    },
    async handleChangeBulan() {
      if (
        this.report.params.tahun != '' &&
        this.report.params.bulan != '' &&
        this.report.params.week != ''
      ) {
        await this.getDataTable()
      } else if (
        this.report.params.tahun != '' &&
        this.report.params.bulan != '' &&
        this.report.params.week == ''
      ) {
        await this.getDataWeekParams()
      }
    },

    async handleChangeWeek() {
      if (
        this.report.params.tahun != '' &&
        this.report.params.bulan != '' &&
        this.report.params.week != ''
      ) {
        await this.getDataTable()
      } else if (
        this.report.params.tahun != '' &&
        this.report.params.bulan != '' &&
        this.report.params.week == ''
      ) {
        await this.getDataWeekParams()
      }
    },
  },
}
</script>
