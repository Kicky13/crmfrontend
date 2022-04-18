<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="3">
        <a-select
          placeholder="Distrik"
          show-search
          class="w-100"
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Distrik
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-select
          placeholder="Tahun"
          show-search
          class="w-100"
        >
          <a-select-option disabled value="">Pilih Tahun</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Tahun
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-select
          placeholder="Bulan"
          show-search
          class="w-100"
        >
          <a-select-option disabled value="">Pilih Bulan</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Bulan
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-select
          placeholder="Week"
          show-search
          class="w-100"
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Week
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-button
          type="primary"
          @click="showReport"
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
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      priceMovement: state => state.priceMovement.data,
    }),
  },
  methods: {
    showReport() {},
  },
}
</script>
