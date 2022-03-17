<template>
  <a-row :gutter="[32, 16]">
    <a-col :xs="24" :md="12">
      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :md="8">
          <a-select
            placeholder="Provinsi"
            class="w-100"
            show-search
            @change="handleProvinsi"
          >
            <a-select-option disabled value="">Pilih Provinsi</a-select-option>
            <a-select-option
              v-for="(item, index) in filter.listProvinsi"
              :value="`${item.id_provinsi} - ${item.nama_provinsi}`"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama_provinsi"
            >
              {{ item.id_provinsi }} - {{ item.nama_provinsi }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select
            placeholder="Distrik"
            class="w-100"
            show-search
            @change="handleDistrik"
          >
            <a-select-option disabled value="">Pilih Distrik</a-select-option>
            <a-select-option
              v-for="(item, index) in listDistrik"
              :value="`${item.id_distrik} - ${item.nama_distrik}`"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama_distrik"
            >
              {{ item.id_distrik }} - {{ item.nama_distrik }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Distributor" class="w-100">
            <a-select-option disabled value="">Pilih Distributor</a-select-option>
            <a-select-option
              v-for="(item, index) in filter.listDistributor"
              :value="`${item.id_distributor} - ${item.nama_distributor}`"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama_distributor"
            >
              {{ item.id_distributor }} - {{ item.nama_distributor }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Tahun" class="w-100">
            <a-select-option disabled value="">Pilih Tahun</a-select-option>
            <a-select-option
              v-for="(year, index) in years"
              :value="year"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="year"
            >
              {{ year }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Bulan" class="w-100">
            <a-select-option disabled value="">Pilih Bulan</a-select-option>
            <a-select-option
              v-for="(item, index) in filter.listBulan"
              :value="item.nama"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama"
            >
              {{ item.nama }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </a-col>
    <a-col :xs="24" :md="12">
      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :md="8">
          <a-select
            placeholder="Kategori"
            class="w-100"
            show-search
            @change="handleKategori"
          >
            <a-select-option disabled value="">Pilih Kategori</a-select-option>
            <a-select-option
              v-for="(item, index) in filter.listKategori"
              :value="`${item.id_kategori} - ${item.nama_kategori}`"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama_kategori"
            >
              {{ item.id_kategori }} - {{ item.nama_kategori }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Brand" class="w-100">
            <a-select-option disabled value="">Pilih Brand</a-select-option>
            <a-select-option
              v-for="(item, index) in filter.listBrand"
              :value="`${item.id_brand} - ${item.nama_brand}`"
              :key="index"
              data-toggle="tooltip"
              data-placement="top"
              :title="item.nama_brand"
            >
              {{ item.id_brand }} - {{ item.nama_brand }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-button type="primary" class="w-100">Tampilkan</a-button>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
  <a-row>
    <a-col :xs="12">
      <div class="card my-3">
        <div class="card-body d-flex justify-content-between">
          <div>
            <h5 class="text-secondary">Outlet Surveyed</h5>
            <h2 class="text-primary">8056</h2>
          </div>
          <div>
            <i class="fa fa-user text-primary" style="font-size: 5em" />
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
  <div class="card card-top card-top-primary">
    <div class="card-body">
      <div class="d-flex mb-3">
        <div class="align-self-center">
          <span>Show :</span>
        </div>
        <a-select
          :default-value="rbpMovement.itemsPerPage[1]"
          class="mx-2"
        >
          <a-select-option
            v-for="itemPerPage in rbpMovement.itemsPerPage"
            :key="itemPerPage"
          >
            {{ itemPerPage }}
          </a-select-option>
        </a-select>
        <div class="align-self-center">
          <span>entries</span>
        </div>
      </div>
      <a-table
        :columns="rbpMovement.columns"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      filter: state => state.filter.data,
      rbpMovement: state => state.rbpMovement.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  data() {
    return {
      listDistrik: [],
    }
  },
  async mounted() {
    await this.getAllProvinsi()
    await this.getAllDistrik()
    await this.getAllDistributor()
    await this.getAllKategori()
    await this.getAllBrand()
    this.listDistrik = this.filter.listDistrik
  },
  methods: {
    ...mapActions('filter', [
      'getAllProvinsi',
      'getAllArea',
      'getAllDistrik',
      'getAllDistributor',
      'getAllKategori',
      'getAllBrand',
    ]),
    async handleProvinsi(value) {
      this.listDistrik = []
      const idProvinsi = value.split('-')[0]
      await this.getAllArea({ id_provinsi: idProvinsi })
      const allArea = this.filter.listArea
      allArea.map(async item => {
        await this.getAllDistrik({ id_area: item.id_area })
        this.filter.listDistrik.map(distrik => this.listDistrik.push(distrik))
      })
    },
    async handleArea(value) {
      const idArea = value.split('-')[0]
      await this.getAllDistrik({ id_area: idArea })
    },
    async handleDistrik(value) {
      const idDistrik = value.split('-')[0]
      await this.getAllDistributor({ id_distrik: idDistrik })
    },
    async handleKategori(value) {
      const idKategori = value.split('-')[0]
      await this.getAllBrand({ id_kategori: idKategori })
    },
  },
}
</script>
