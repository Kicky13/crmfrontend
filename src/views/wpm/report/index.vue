<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="4">
        <a-select
          v-model:value="report.params.id_distrik_ret"
          placeholder="Distrik"
          show-search
          class="w-100"
          @change="handleChangeDistrik"
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option
            v-for="(distrik, index) in report.dataDistrikRET"
            :value="distrik.ID"
            :key="index"
          >
            {{ distrik.ID }} - {{ distrik.NAMA_DISTRIK_RET }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="4">
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
      <a-col :xs="24" :md="7">
        <div class="d-flex justify-content-end">
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
        </div>
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
      this.report.dataTable = []
    },

    async showReport() {
      await this.getDataTable()
    },
  },
}
</script>
