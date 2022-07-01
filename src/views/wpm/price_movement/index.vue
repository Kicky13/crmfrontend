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
              <a-select-option disabled value="">priceMovement Distrik RET</a-select-option>
              <a-select-option
                v-if="priceMovement.dataDistrikRET && priceMovement.dataDistrikRET.length === 0"
                disabled
                value=""
                >Dikstrik RET tidak tersedia</a-select-option
              >
              <a-select-option
                v-for="(distrik, index) in priceMovement.dataDistrikRET"
                :value="distrik.id_distrik_ret"
                :key="index"
              >
                {{ distrik.id_distrik_ret }} - {{ distrik.nm_distrik_ret }}
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
          v-model:value="priceMovement.params.distrik_name"
          placeholder="Distrik"
          show-search
          class="w-100"
          @change="handleChangeDistrik"
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option
            v-for="(distrik, index) in priceMovement.distrikList"
            :value="distrik.nm_distrik"
            :key="index"
          >
            {{ distrik.id_distrik }} - {{ distrik.nm_distrik }}
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
            v-for="(bulan, index) in priceMovement.dataBulan"
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

    <div class="d-flex justify-content-between mb-3">
      <div class="d-flex">
        <div class="align-self-center">
          <span>Show :</span>
        </div>
        <a-select
          :default-value="priceMovement.itemsPerPage[1]"
          class="mx-2"
          @change="handlePaginationSize"
        >
          <a-select-option v-for="itemPerPage in priceMovement.itemsPerPage" :key="itemPerPage">
            {{ itemPerPage }}
          </a-select-option>
        </a-select>
        <div class="align-self-center">
          <span>entries</span>
        </div>
      </div>
    </div>
    <div class="table-responsive text-nowrap">
      <a-table
        :loading="priceMovement.isLoading"
        :columns="priceMovement.columns"
        :data-source="priceMovement.priceMovementList"
        :pagination="priceMovement.pagination"
      />
    </div>
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
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    await this.getRegion()
    await this.getProvinsi()
    await this.getDistrikRET()
    await this.getDistrik()
  },
  methods: {
    ...mapActions('priceMovement', [
      'getRegion',
      'getProvinsi',
      'getDistrik',
      'getAllDistrik',
      'getDistrikRET',
      'getPriceMovementList',
      'getDataWeekParams',
    ]),
    async handleChangeDistrikRET() {
      await this.getDistrik()
    },
    async handleChangeRegion() {
      let dataSource = [...this.priceMovement.regionList]
      let filtered = dataSource.filter(x => x.nama_region == this.priceMovement.params.region_name)

      this.priceMovement.params.id_region = filtered[0].id_region

      await this.getProvinsi()

      // if (this.report.params.tahun != '' && this.report.params.bulan != ``) {
      //   await this.getDataTable()
      // }
    },
    async handleChangeProvince() {
      let dataSource = [...this.priceMovement.provinceList]
      let filtered = dataSource.filter(
        x => x.nama_provinsi == this.priceMovement.params.province_name,
      )

      this.priceMovement.params.id_provinsi = filtered[0].id_provinsi
      this.$store.commit('priceMovement/changePriceMovement', {
        dataDistrikRET: [],
      })
      await this.getDistrikRET()
    },
    async handleChangeDistrik() {
      let dataSource = [...this.priceMovement.distrikList]
      let filtered = dataSource.filter(x => x.nm_distrik == this.priceMovement.params.distrik_name)
      this.priceMovement.params.id_distrik = filtered[0].id_distrik
      this.$store.commit('priceMovement/changePriceMovement', {
        priceMovementList: [],
      })
      if (
        this.priceMovement.params.tahun != '' &&
        this.priceMovement.params.bulan != '' &&
        this.priceMovement.params.week != ``
      ) {
        await this.getDataTable()
      } else {
      }
    },

    async handleChangeTahun() {
      this.$store.commit('priceMovement/changePriceMovement', {
        priceMovementList: [],
      })
      if (
        this.priceMovement.params.tahun != '' &&
        this.priceMovement.params.bulan != '' &&
        this.priceMovement.params.week != ''
      ) {
        await this.getPriceMovementList()
      } else if (
        this.priceMovement.params.tahun != '' &&
        this.priceMovement.params.bulan != '' &&
        this.priceMovement.params.week == ''
      ) {
        await this.getDataWeekParams()
      }
    },
    async handleChangeBulan() {
      this.$store.commit('priceMovement/changePriceMovement', {
        priceMovementList: [],
      })
      if (
        this.priceMovement.params.tahun != '' &&
        this.priceMovement.params.bulan != '' &&
        this.priceMovement.params.week != ''
      ) {
        await this.getPriceMovementList()
      } else if (
        this.priceMovement.params.tahun != '' &&
        this.priceMovement.params.bulan != '' &&
        this.priceMovement.params.week == ''
      ) {
        await this.getDataWeekParams()
      }
    },

    async handleChangeWeek() {
      this.$store.commit('priceMovement/changePriceMovement', {
        priceMovementList: [],
      })
      if (
        this.priceMovement.params.tahun != '' &&
        this.priceMovement.params.bulan != '' &&
        this.priceMovement.params.week != ''
      ) {
        await this.getPriceMovementList()
      } else if (
        this.priceMovement.params.tahun != '' &&
        this.priceMovement.params.bulan != '' &&
        this.priceMovement.params.week == ''
      ) {
        await this.getDataWeekParams()
      }
    },
    handlePaginationSize(size) {
      this.priceMovement.pagination.pageSize = size
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
