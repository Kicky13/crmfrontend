<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="3">
        <a-select
          placeholder="Provinsi"
          show-search
          class="w-100"
          v-model:value="formData.id_provinsi"
          @change="provinsiHandler"
        >
          <a-select-option disabled value="">Pilih Provinsi</a-select-option>
          <a-select-option
            v-for="(item, index) in filter.listProvinsi"
            :value="item.id_provinsi"
            :key="index"
            :title="item.nama_provinsi"
            data-toggle="tooltip"
            data-placement="top"
          >
            {{ item.id_provinsi }} - {{ item.nama_provinsi }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-select
          placeholder="Distrik RET"
          show-search
          class="w-100"
          v-model:value="formData.id_distrik_ret"
          @change="distrikRetHandler"
        >
          <a-select-option disabled value="">Pilih Distrik RET</a-select-option>
          <a-select-option
            v-for="(item, index) in gapHarga.distrikRetList"
            :value="item.id_distrik_ret"
            :key="index"
            :title="item.nama_dsitrik_ret"
            data-toggle="tooltip"
            data-placement="top"
          >
            {{ item.id_distrik_ret }} - {{ item.nama_distrik_ret }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-select
          placeholder="Distrik"
          show-search
          class="w-100"
          v-model:value="formData.id_distrik"
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option
            v-for="(item, index) in gapHarga.distrikList"
            :value="item.id_distrik"
            :key="index"
            :title="item.nama_dsitrik"
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
          show-search
          class="w-100"
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
          v-model:value="formData.bulan"
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
          placeholder="Week"
          show-search
          class="w-100"
          v-model:value="formData.week"
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            v-for="(item, index) in gapHarga.week"
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
          :default-value="[1, 3]"
          class="w-100"
          @change="columnHandler"
        >
          <template v-for="item in gapHarga.columns" :key="item.dataIndex">
            <a-select-option v-if="item.nama_produk" :value="item.key">
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
          :default-value="[5, 6]"
          class="w-100"
          @change="rowHandler"
        >
          <template v-for="item in gapHarga.columns" :key="item.dataIndex">
            <a-select-option v-if="item.nama_produk" :value="item.key">
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
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      columns: [],
      row: [],
      formData: {
        id_provinsi: null,
        id_distrik_ret: null,
        id_distrik: null,
        tahun: null,
        bulan: null,
        week: null,
        row: [],
        column: [],
      },
    }
  },
  computed: {
    ...mapState({
      gapHarga: state => state.gapHarga.data,
      filter: state => state.filter.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2019 }, (value, index) => 2020 + index)
    },
  },
  async mounted() {
    await this.getAllProduct()
    await this.getAllProvinsi()
    this.columnHandler([1, 3])
    this.rowHandler([5, 6])
  },
  methods: {
    ...mapActions('filter', ['getAllProvinsi']),
    ...mapActions('gapHarga', ['getDistrikRET', 'getDistrik', 'getAllProduct', 'getGapHarga']),
    async showGapHarga() {
      // const formData = {
      //   id_provinsi: this.formData.id_provinsi,
      //   id_distrik_ret: this.formData.id_distrik_ret,
      //   id_distrik: this.formData.id_distrik,
      //   tahun: this.formData.tahun,
      //   bulan: this.formData.bulan,
      //   week: this.formData.week,
      // }
      // await this.getGapHarga(formData)
      await this.getGapHarga()
      const rows = []
      this.row.map(element => rows.push(element.key_brand))
      this.rowHandler(rows)
    },
    columnHandler(values) {
      let temp = []
      temp.push(this.gapHarga.columns[0])
      values.map(value => temp.push(this.gapHarga.columns.find(column => column.key == value)))
      this.columns = temp
    },
    rowHandler(values) {
      let temp = []
      values.map(value => temp.push(this.gapHarga.row.find(row => row.key_brand == value)))
      this.row = temp
    },
    provinsiHandler() {
      this.getDistrikRET({ id_provinsi: `${this.formData.id_provinsi}` })
    },
    distrikRetHandler() {
      this.getDistrik({ id_distrik_ret: `${this.formData.id_distrik_ret}`})
    },
  },
}
</script>
