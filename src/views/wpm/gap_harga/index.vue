<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="3">
        <a-select
          placeholder="Provinsi"
          show-search
          class="w-100"
        >
          <a-select-option disabled value="">Pilih Provinsi</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Provinsi
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-select
          placeholder="Distrik RET"
          show-search
          class="w-100"
        >
          <a-select-option disabled value="">Pilih Distrik RET</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Distrik RET
          </a-select-option>
        </a-select>
      </a-col>
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
          @click="showGapHarga"
        >
          <i class="fa fa-eye mr-2" />
          Tampilkan
        </a-button>
      </a-col>
    </a-row>
    <a-row class="mb-3">
      <a-col :span="2">
        <span>Kolom :</span>
      </a-col>
      <a-col :span="22">
        <a-select
          mode="tags"
          placeholder="Pilih Kolom"
          :default-value="['st', 'sg']"
          class="w-100"
          @change="columnHandler"
        >
          <template v-for="item in gapHarga.columns" :key="item.dataIndex">
            <a-select-option v-if="item.nama_produk" :value="item.dataIndex">
              {{ item.nama_produk }}
            </a-select-option>
            <a-select-option v-else disabled>
              Pilih kolom
            </a-select-option>
          </template>
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
          :default-value="['tr', 'sd']"
          class="w-100"
          @change="rowHandler"
        >
          <template v-for="item in gapHarga.columns" :key="item.dataIndex">
            <a-select-option v-if="item.nama_produk" :value="item.dataIndex">
              {{ item.nama_produk }}
            </a-select-option>
            <a-select-option v-else disabled>
              Pilih baris
            </a-select-option>
          </template>
        </a-select>
      </a-col>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="row"
    />
  </a-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      columns: [],
      row: [],
    }
  },
  computed: {
    ...mapState({
      gapHarga: state => state.gapHarga.data,
    }),
  },
  mounted() {
    this.columnHandler(['st', 'sg'])
    this.rowHandler(['tr', 'sd'])
  },
  methods: {
    showGapHarga() {},
    columnHandler(values) {
      let temp = []
      temp.push(this.gapHarga.columns[0])
      values.map(value => temp.push(this.gapHarga.columns.find(column => column.dataIndex == value)))
      this.columns = temp
    },
    rowHandler(values) {
      let temp = []
      values.map(value => temp.push(this.gapHarga.row.find(row => row.gap_harga == value.toUpperCase())))
      this.row = temp
    },
  },
}
</script>
