<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
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
      :columns="wpmPromotion.columns"
      :data-source="wpmPromotion.wpmPromotionList"
    />
  </a-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      wpmPromotion: state => state.wpmPromotion.data,
    }),
  },
  methods: {
    showReport() {},
  },
}
</script>
