<template>
  <a-card class="card card-top card-top-primary">
    <div class="row">
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-4">
            <a-select
              v-model:value="priceMovement.params.region_name"
              placeholder="Region"
              show-search
              class="w-100"
              @change="handleChangeRegion"
            >
              <a-select-option disabled value="">Pilih Region</a-select-option>
              <a-select-option
                v-for="(region, index) in priceMovement.regionList"
                :value="region.nama_region"
                :key="index"
              >
                {{ region.id_region }} - {{ region.nama_region }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-4">
            <a-select
              v-model:value="priceMovement.params.province_name"
              placeholder="Provinsi"
              show-search
              class="w-100"
              @change="handleChangeProvince"
            >
              <a-select-option disabled value="">Pilih Provinsi</a-select-option>
              <a-select-option
                v-for="(provinsi, index) in priceMovement.provinceList"
                :value="provinsi.nama_provinsi"
                :key="index"
              >
                {{ provinsi.id_provinsi }} - {{ provinsi.nama_provinsi }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-4">
            <a-select
              v-model:value="priceMovement.params.id_distrik_ret"
              placeholder="Distrik RET"
              show-search
              class="w-100"
              @change="handleChangeDistrikRET"
            >
              <a-select-option disabled value="">Pilih Distrik RET</a-select-option>
              <a-select-option
                v-for="(distrik, index) in priceMovement.dataDistrikRET"
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
        <a-tooltip placement="topLeft">
          <template #title>
            <span>Refresh Filter</span>
          </template>
          <a-button @click="refreshFilter()" type="primary">
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </a-button>
        </a-tooltip>
      </div>
    </div>

    <div class="row mt-2 mb-4">
      <div class="col-md-3">
        <a-select
          v-model:value="priceMovement.params.nm_distrik"
          placeholder="Distrik"
          show-search
          class="w-100"
          @change="handleChangeDistrik"
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option
            v-for="(distrik, index) in priceMovement.dataDistrikRET"
            :value="distrik.nama_distrik"
            :key="index"
          >
            {{ distrik.id_distrik }} - {{ distrik.nama_distrik }}
          </a-select-option>
        </a-select>
      </div>
      <div class="col-md-3">
        <a-select
          v-model:value="priceMovement.params.tahun"
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
          v-model:value="priceMovement.params.bulan"
          placeholder="Bulan"
          show-search
          class="w-100"
          @change="handleChangeBulan"
        >
          <a-select-option disabled value="">Pilih Bulan</a-select-option>
          <a-select-option
            v-for="(bulan, index) in priceMovement.data_bulan"
            :value="bulan.id"
            :key="index"
          >
            {{ bulan.name }}
          </a-select-option>
        </a-select>
      </div>
      <div class="col-md-3">
        <a-select
          v-model:value="priceMovement.params.week"
          placeholder="Week"
          show-search
          class="w-100"
          @change="handleChangeWeek()"
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            v-for="(weekly, index) in priceMovement.dataWeekParams"
            :value="weekly.week"
            :key="index"
          >
            Week {{ weekly.week }}
          </a-select-option>
        </a-select>
      </div>
    </div>

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
      if (this.formData.tahun != '' && this.formData.bulan != '' && this.formData.week != '') {
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
      if (this.formData.tahun != '' && this.formData.bulan != '' && this.formData.week != '') {
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
