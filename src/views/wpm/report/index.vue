<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="6">
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
      </a-col>
      <a-col :xs="24" :md="3">
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
      </a-col>
      <a-col :xs="24" :md="4">
        <a-select
          v-model:value="report.params.bulan"
          placeholder="Bulan"
          show-search
          class="w-100"
          @change="handleChangeBulan"
        >
          <a-select-option disabled value="">Pilih Bulan</a-select-option>
          <a-select-option
            v-for="(bulan, index) in weeklyInput.data_bulan"
            :value="bulan.id"
            :key="index"
          >
            {{ bulan.name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-select v-model:value="report.params.week" placeholder="Week" show-search class="w-100">
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option v-for="(week, index) in report.dataWeekly" :value="week.id" :key="index">
            {{ week.name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="2">
        <a-tooltip placement="topLeft">
          <template #title>
            <span>Refresh Filter</span>
          </template>
          <a-button @click="refreshFilter()" type="primary">
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </a-button>
        </a-tooltip>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-button
          :disabled="
            report.params.id_distrik_ret == null ||
            report.params.tahun == `` ||
            report.params.bulan == `` ||
            report.params.week == ``
              ? true
              : false
          "
          type="primary"
          @click="showReport"
        >
          <i class="fa fa-eye mr-2" />
          Tampilkan
        </a-button>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-button
          :disabled="report.dataTable.length == 0 ? true : false"
          type="primary"
          class="mb-3 float-right"
          @click="downloadReport()"
        >
          <i class="fa fa-download mr-2" />
          Export
        </a-button>
      </a-col>
    </a-row>
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

export default {
  computed: {
    ...mapState({
      report: state => state.report.data,
      weeklyInput: state => state.weeklyInput.data,
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
    ...mapActions('report', ['getDistrikRET', 'getDataTable']),
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
      this.exportToExcel(header, filterVal, this.report.dataTable, 'data-report')
    },
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
  },
}
</script>
