<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="4">
        <a-select
          placeholder="Provinsi"
          show-search
          class="w-100"
          v-model:value="formData.nm_provinsi"
          @change="provinsiHandler"
        >
          <a-select-option disabled value="">Pilih Provinsi</a-select-option>
          <a-select-option
            v-for="(item, index) in filter.listProvinsi"
            :value="item.nama_provinsi"
            :key="index"
            :title="item.nama_provinsi"
            data-toggle="tooltip"
            data-placement="top"
          >
            {{ item.id_provinsi }} - {{ item.nama_provinsi }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="4">
        <a-select
          placeholder="Distrik RET"
          show-search
          class="w-100"
          v-model:value="formData.nm_distrik_ret"
          @change="distrikRetHandler"
        >
          <a-select-option disabled value="">Pilih Distrik RET</a-select-option>
          <a-select-option
            v-for="(item, index) in gapHarga.distrikRetList"
            :value="item.nama_district_ret"
            :key="index"
            :title="item.nama_district_ret"
            data-toggle="tooltip"
            data-placement="top"
          >
            {{ item.id_district_ret }} - {{ item.nama_district_ret }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="4">
        <a-select
          placeholder="Distrik"
          show-search
          class="w-100"
          v-model:value="formData.nm_distrik"
          @change="distrikHandler"
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option
            v-for="(item, index) in gapHarga.distrikList"
            :value="item.nama_distrik"
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
        <a-select placeholder="Tahun" show-search class="w-100" v-model:value="formData.tahun">
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
        <a-select placeholder="Bulan" show-search class="w-100" v-model:value="formData.bulan">
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
        <a-select placeholder="Week" show-search class="w-100" v-model:value="formData.week">
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
          :disabled="
            formData.id_provinsi == null ||
            formData.id_distrik_ret == null ||
            formData.id_distrik == null ||
            formData.tahun == null ||
            formData.week == null ||
            formData.bulan == null ||
            columns.length == 0 ||
            row.length == 0
              ? true
              : false
          "
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
        <a-select mode="tags" placeholder="Pilih Kolom" class="w-100" @change="columnHandler">
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
        <a-select mode="tags" placeholder="Pilih Baris" class="w-100" @change="rowHandler">
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
    {{ gapHarga.row }}
    <a-table :columns="columns" :data-source="row">
      <template #gap_harga="{ text }">
        <span>{{ text.gap_harga }}</span>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { _ } from 'vue-underscore'

export default {
  data() {
    return {
      columns: [],
      row: [],
      formData: {
        id_provinsi: null,
        nm_provinsi: '',
        id_distrik_ret: null,
        nm_distrik_ret: '',
        id_distrik: null,
        nm_distrik: '',
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
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    await this.getAllProduct()
    await this.getAllProvinsi()
    this.columnHandler()
    this.rowHandler()
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
      await this.getGapHarga({
        id_provinsi: this.formData.id_provinsi,
        id_distrik_ret: this.formData.id_distrik_ret,
        id_distrik: this.formData.id_distrik,
        tahun: this.formData.tahun,
        bulan: this.formData.bulan,
        week: this.formData.week,
        row: this.row,
        column: this.columns,
      })

      if (this.row.length > 0) {
        // console.log(`this.gapHarga.row`, this.gapHarga.row)
        // let dataRows = this.row.forEach(val => {
        //   console.log(`val.key_brand`, val.key_brand.toString())
        //   _.find(this.gapHarga.row, function(item) {
        //     console.log(`---item`, item.key_brand)
        //     return item.key_brand == val.key_brand
        //   })
        // })

        console.log(
          `---data`,
          _.find(this.gapHarga.row, function(item) {
            return item.key_brand == `1`
          }),
        )

        // this.row.push(
        //   _.find(this.gapHarga.row, function(item) {
        //     return item.key_brand == `1`
        //   }),
        // )

        let dataRow = _.find(this.gapHarga.row, function(item) {
          return item.key_brand == `1`
        })

        this.row.push({
          
        })
      }
    },
    columnHandler(values) {
      let temp = []
      temp.push(this.gapHarga.columns[0])
      values.map(value => temp.push(this.gapHarga.columns.find(column => column.key == value)))
      this.columns = temp

      console.log(`----this.columns`, this.columns)
    },
    rowHandler(values) {
      let temp = []
      values.map(value => temp.push(this.gapHarga.row.find(row => row.key_brand == value)))
      this.row = temp

      console.log(`----this.row`, this.row)
    },
    provinsiHandler() {
      let dataSource = [...this.filter.listProvinsi]
      let filtered = dataSource.filter(x => x.nama_provinsi == this.formData.nm_provinsi)
      let idProvinsi = (this.formData.id_provinsi = filtered[0].id_provinsi)
      this.getDistrikRET({ id_provinsi: idProvinsi })
    },
    distrikRetHandler() {
      let dataSource = [...this.gapHarga.distrikRetList]
      let filtered = dataSource.filter(x => x.nama_district_ret == this.formData.nm_distrik_ret)
      let idDistrikRet = (this.formData.id_distrik_ret = filtered[0].id_district_ret)
      this.getDistrik({ id_distrik_ret: idDistrikRet })
    },

    distrikHandler() {
      let dataSource = [...this.gapHarga.distrikList]
      let filtered = dataSource.filter(x => x.nama_distrik == this.formData.nm_distrik)
      this.formData.id_distrik = filtered[0].id_distrik
    },
  },
}
</script>
