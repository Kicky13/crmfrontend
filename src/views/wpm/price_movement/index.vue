<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="4">
        <a-select
          placeholder="Distrik"
          class="w-100 mr-2"
          show-search
          v-model:value="formData.distrik"
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option
            v-for="(item, index) in priceMovement.distrikList"
            :value="`${item.id_distrik} - ${item.nama_distrik}`"
            :key="index"
            :title="item.nama_distrik"
            data-toggle="tooltip"
            data-placement="top"
          >
            {{ item.id_distrik }} - {{ item.nama_distrik }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-select
          v-model:value="formData.tahun"
          placeholder="Tahun"
          class="w-100"
          show-search
          @change="tahunHandle"
        >
          <a-select-option disabled value="">Pilih Tahun</a-select-option>
          <a-select-option
            v-for="(item, index) in years"
            :value="item"
            :key="index"
            :title="item"
            data-toggle="tooltip"
            data-placement="top"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-select
          v-model:value="formData.bulan"
          placeholder="Bulan"
          show-search
          class="w-100"
          @change="bulanHandle"
        >
          <a-select-option disabled value="">Pilih Bulan</a-select-option>
          <a-select-option
            v-for="(item, index) in gapHarga.bulan"
            :value="item.id"
            :key="index"
            :title="item.name"
            data-toggle="tooltip"
            data-placement="top"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-select
          v-model:value="formData.week"
          placeholder="Week"
          show-search
          class="w-100"
          :disabled="formData.bulan != `` && formData.tahun != `` ? false : true"
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            v-for="(weekly, index) in priceMovement.dataWeekParams"
            :value="weekly.week"
            :key="index"
            :title="weekly.name"
            data-toggle="tooltip"
            data-placement="top"
          >
            Week {{ weekly.week }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="4" :md="1">
        <a-tooltip placement="topLeft">
          <template #title>
            <span>Refresh Filter</span>
          </template>
          <a-button type="primary" @click="refreshFilter">
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </a-button>
        </a-tooltip>
      </a-col>
      <a-col :xs="20" :md="4">
        <a-button
          type="primary"
          @click="showPriceMovement"
        >
          <i class="fa fa-eye mr-2" />
          Tampilkan
        </a-button>
      </a-col>
    </a-row>
    <a-table
      :loading="priceMovement.isLoading"
      :columns="priceMovement.columns"
      :data-source="priceMovement.priceMovementList"
    />
  </a-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { notification } from 'ant-design-vue'

export default {
  data() {
    return {
      formData: {
        distrik: '',
        tahun: '',
        bulan: '',
        week: '',
      },
    }
  },
  computed: {
    ...mapState({
      priceMovement: state => state.priceMovement.data,
      gapHarga: state => state.gapHarga.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2019 }, (value, index) => 2020 + index)
    },
  },
  async mounted() {
    await this.getAllDistrik()
  },
  methods: {
    ...mapActions('priceMovement', ['getAllDistrik', 'getPriceMovementList', 'getDataWeekParams']),
    async tahunHandle() {
      if (
        this.formData.tahun != '' &&
        this.formData.bulan != '' &&
        this.formData.week != ''
      ) {
        this.formData.week = ''
        await this.getDataWeekParams({
          bulan: this.formData.bulan,
          tahun: this.formData.tahun,
        })
      } else if (
        this.formData.tahun != '' &&
        this.formData.bulan != '' &&
        this.formData.week == ''
      ) {
        await this.getDataWeekParams({
          bulan: this.formData.bulan,
          tahun: this.formData.tahun,
        })
      }
    },
    async bulanHandle() {
      if (
        this.formData.tahun != '' &&
        this.formData.bulan != '' &&
        this.formData.week != ''
      ) {
        this.formData.week = ''
        await this.getDataWeekParams({
          bulan: this.formData.bulan,
          tahun: this.formData.tahun,
        })
      } else if (
        this.formData.tahun != '' &&
        this.formData.bulan != '' &&
        this.formData.week == ''
      ) {
        await this.getDataWeekParams({
          bulan: this.formData.bulan,
          tahun: this.formData.tahun,
        })
      }
    },
    async showPriceMovement() {
      if (!this.formData.distrik) {
        notification.error({
          message: 'Error',
          description: 'Pilih distrik terlebih dahulu',
        })
        return
      }
      if (!this.formData.tahun) {
        notification.error({
          message: 'Error',
          description: 'Pilih tahun terlebih dahulu',
        })
        return
      }
      if (!this.formData.bulan) {
        notification.error({
          message: 'Error',
          description: 'Pilih bulan terlebih dahulu',
        })
        return
      }
      if (!this.formData.week) {
        notification.error({
          message: 'Error',
          description: 'Pilih week terlebih dahulu',
        })
        return
      }
      await this.getPriceMovementList({
        distrik: this.distrikHandler(this.formData.distrik),
        tahun: this.formData.tahun,
        bulan: this.formData.bulan,
        week: parseInt(this.formData.week),
      })
    },
    distrikHandler(distrik) {
      return distrik.split('-')[0].trim()
    },
    
    refreshFilter() {
      this.formData = {
        distrik: '',
        tahun: '',
        bulan: '',
        week: '',
      }
    },
  },
}
</script>
