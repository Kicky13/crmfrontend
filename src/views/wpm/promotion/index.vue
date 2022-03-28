<template>
  <a-card class="card card-top card-top-primary">
    <div class="mb-3">
      <a-select
        placeholder="Tahun"
        show-search
        class="mr-2"
      >
        <a-select-option disabled value="">Pilih Tahun</a-select-option>
        <a-select-option
          data-toggle="tooltip"
          data-placement="top"
        >
          Tahun
        </a-select-option>
      </a-select>
      <a-select
        placeholder="Bulan"
        show-search
        class="mr-2"
      >
        <a-select-option disabled value="">Pilih Bulan</a-select-option>
        <a-select-option
          data-toggle="tooltip"
          data-placement="top"
        >
          Bulan
        </a-select-option>
      </a-select>
      <a-button
        type="primary"
        @click="showReport"
      >
        <i class="fa fa-eye mr-2" />
        Tampilkan
      </a-button>
    </div>
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
