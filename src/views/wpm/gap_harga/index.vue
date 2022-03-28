<template>
  <a-card class="card card-top card-top-primary">
    <div class="mb-3">
      <a-select
        placeholder="Provinsi"
        show-search
        class="mr-2"
      >
        <a-select-option disabled value="">Pilih Provinsi</a-select-option>
        <a-select-option
          data-toggle="tooltip"
          data-placement="top"
        >
          Provinsi
        </a-select-option>
      </a-select>
      <a-select
        placeholder="Distrik RET"
        show-search
        class="mr-2"
      >
        <a-select-option disabled value="">Pilih Distrik RET</a-select-option>
        <a-select-option
          data-toggle="tooltip"
          data-placement="top"
        >
          Distrik RET
        </a-select-option>
      </a-select>
      <a-select
        placeholder="Distrik"
        show-search
        class="mr-2"
      >
        <a-select-option disabled value="">Pilih Distrik</a-select-option>
        <a-select-option
          data-toggle="tooltip"
          data-placement="top"
        >
          Distrik
        </a-select-option>
      </a-select>
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
      <a-select
        placeholder="Week"
        show-search
        class="mr-2"
      >
        <a-select-option disabled value="">Pilih Week</a-select-option>
        <a-select-option
          data-toggle="tooltip"
          data-placement="top"
        >
          Week
        </a-select-option>
      </a-select>
      <a-button
        type="primary"
        @click="showGapHarga"
      >
        <i class="fa fa-eye mr-2" />
        Tampilkan
      </a-button>
    </div>
    <a-row class="mb-3">
      <a-col :span="2">
        <span>Kolom :</span>
      </a-col>
      <a-col :span="22">
        <a-select
          mode="tags"
          placeholder="Pilih Kolom"
          :default-value="['Semen Tonasa', 'Semen Gresik']"
          class="w-100"
        >
          <a-select-option v-for="item in gapHarga.produk" :key="item.id">
            {{ item.nama_produk }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row class="mb-3">
      <a-col :span="2">
        <span>Baris :</span>
      </a-col>
      <a-col :span="22">
        <a-select
          mode="tags"
          placeholder="Pilih Baris"
          :default-value="['Tiga Roda', 'Semen Dynamix']"
          class="w-100"
        >
          <a-select-option v-for="item in gapHarga.produk" :key="item.id">
            {{ item.nama_produk }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-table
      :columns="gapHarga.columns"
      :data-source="gapHarga.gapHargaList"
    />
  </a-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      gapHarga: state => state.gapHarga.data,
    }),
  },
  methods: {
    showGapHarga() {},
  },
}
</script>
