<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="4">
        <a-select
          placeholder="Distrik"
          class="w-100 mr-2"
          show-search
          @change="distrikHandle"
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
          placeholder="Tahun"
          class="w-100"
          show-search
          v-model:value="formData.tahun"
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
          placeholder="Bulan"
          show-search
          class="w-100"
          @change="bulanHandle"
        >
          <a-select-option disabled value="">Pilih Bulan</a-select-option>
          <a-select-option
            v-for="(item, index) in gapHarga.bulan"
            :value="item.name"
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
          placeholder="Week"
          show-search
          class="w-100"
          @change="weekHandle"
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            v-for="(item, index) in gapHarga.week"
            :value="item.name"
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
      :columns="priceMovement.columns"
      :data-source="priceMovement.priceMovementList"
    />
  </a-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      formData: {
        distrik: null,
        tahun: null,
        bulan: null,
        week: null,
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
    ...mapActions('priceMovement', ['getAllDistrik', 'getPriceMovementList']),
    distrikHandle(value) {
      this.formData.distrik = parseInt(value.split('-')[0].trim())
    },
    bulanHandle(value) {
      this.formData.bulan = this.gapHarga.bulan.find(row => row.name == value).id
    },
    weekHandle(value) {
      this.formData.week = this.gapHarga.week.find(row => row.name == value).id
    },
    async showPriceMovement() {
      await this.getPriceMovementList({
        distrik: this.formData.distrik,
        tahun: this.formData.tahun,
        bulan: this.formData.bulan,
        week: this.formData.week,
      })
    },
  },
}
</script>
