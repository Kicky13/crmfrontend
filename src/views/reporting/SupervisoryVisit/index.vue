<template>
  <div>
    <a-card class="card card-top card-top-primary">
      <div class="card-header px-0">
        <a-row :gutter="[16, 16]" class="mb-3">
          <a-col :xs="24" :md="4">
            <a-select
              v-model:value="reportingSupervisory.params.selectedTSO"
              placeholder="Filter TSO"
              show-search
              class="w-100"
              @change="handleChangeTSO()"
            >
              <a-select-option disabled value="">Pilih TSO</a-select-option>
              <a-select-option
                v-for="(item, index) in reportingSupervisory.listTSO"
                :value="item.nama"
                :key="`tso_${index}`"
                data-toggle="tooltip"
                data-placement="top"
                :title="item.nama"
              >
                {{ item.idUser }} - {{ item.nama }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :xs="24" :md="4">
            <a-select
              v-model:value="reportingSupervisory.params.selectedDistributor"
              placeholder="Filter Distributor"
              show-search
              class="w-100"
              @change="handleChangeDistributor()"
            >
              <a-select-option disabled value="">Pilih Distributor</a-select-option>
              <a-select-option
                v-for="(item, index) in reportingSupervisory.listDistributor"
                :value="`${item.nm_distributor}`"
                :key="`distributor_${index}`"
                data-toggle="tooltip"
                data-placement="top"
                :title="item.nm_distributor"
              >
                {{ item.id_distributor }} - {{ item.nm_distributor }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :xs="24" :md="4">
            <a-select
              @change="handleChangeSales()"
              placeholder="Filter Sales"
              show-search
              class="w-100"
              v-model:value="reportingSupervisory.params.selectedSales"
            >
              <a-select-option disabled value="">Pilih</a-select-option>
              <a-select-option
                v-for="(item, index) in reportingSupervisory.listSales"
                :value="`${item.nama}`"
                :key="`sales_${index}`"
                data-toggle="tooltip"
                data-placement="top"
                :title="item.id_sales - item.nama - item.posisi_sales"
              >
                {{ item.id_sales }} - {{ item.nama }} - {{ item.posisi_sales }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :xs="24" :md="4">
            <a-select
              placeholder="Filter Tahun"
              show-search
              class="w-100"
              v-model:value="reportingSupervisory.params.tahun"
            >
              <a-select-option disabled value="">Pilih Tahun</a-select-option>
              <a-select-option v-for="(tahun, index) in years" :value="tahun" :key="index">
                {{ tahun }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :xs="24" :md="2">
            <a-tooltip placement="topLeft">
              <template #title>
                <span>Refresh Filter</span>
              </template>
              <a-button @click="handleRefreshFilter()" type="primary">
                <i class="fa fa-refresh" aria-hidden="true"></i>
              </a-button>
            </a-tooltip>
          </a-col>
          <a-col :xs="24" :md="3">
            <a-button
              :disabled="
                reportingSupervisory.params.id_tso != `` &&
                reportingSupervisory.params.id_sales != `` &&
                reportingSupervisory.params.id_distributor != `` &&
                reportingSupervisory.params.tahun != ``
                  ? false
                  : true
              "
              @click="handleSubmitData()"
              type="primary"
              class="w-100"
            >
              <i class="fa fa-eye mr-1" />
              Tampilkan
            </a-button>
          </a-col>
          <a-col :xs="24" :md="3">
            <a-button
              :disabled="reportingSupervisory.listReport.length > 0 ? false : true"
              type="primary"
              class="w-100"
              @click="handleSubmitExport()"
            >
              <i class="fa fa-download mr-2" />
              Export
            </a-button>
          </a-col>
        </a-row>
      </div>

      <div class="card-body p-0">
        <div class="d-flex mt-4 justify-content-between mb-3">
          <div class="d-flex">
            <div class="align-self-center">
              <span>Show :</span>
            </div>
            <a-select
              :default-value="reportingSupervisory.itemsPerPage[1]"
              class="mx-2"
              @change="handlePaginationSize"
            >
              <a-select-option
                v-for="itemPerPage in reportingSupervisory.itemsPerPage"
                :key="itemPerPage"
              >
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
            ref="table"
            :columns="reportingSupervisory.columns"
            :data-source="reportingSupervisory.dataTable"
            :loading="reportingSupervisory.isLoading"
            :row-key="data => data"
            :scroll="{ x: 2000 }"
          >
            <template #no_survei="{ text }">
              <span>{{ text.id_visit }}</span>
            </template>
            <template #tanggal="{ text }">
              <span>{{ text.tgl_visit }}</span>
            </template>
            <template #sales="{ text }">
              <span>{{ text.sales }}</span>
            </template>
            <template #so="{ text }">
              <span>{{ text.so }}</span>
            </template>
            <template #distributor="{ text }">
              <span>{{ text.distributor }}</span>
            </template>
            <template #customer="{ text }">
              <span>{{ text.customer }}</span>
            </template>
            <template #nilai="{ text }">
              <span>{{ text.nilai }}</span>
            </template>
            <template #alamat="{ text }">
              <span>{{ text.alamat }}</span>
            </template>
            <template #action="{ text }">
              <router-link
                :to="`/reporting/supervisory-visit/${text.id_visit}`"
                class="btn btn-success mr-1"
                data-toggle="tooltip"
                title="Data Detail"
              >
                <i class="fa fa-eye" />
              </router-link>
            </template>
          </a-table>
        </div>
      </div>
    </a-card>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  nama: 'reportingSupervisory',
  computed: {
    ...mapState({
      reportingSupervisory: state => state.reportingSupervisory.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    await this.getValidasiRole()
    this.collapseClose()
  },
  methods: {
    ...mapActions('reportingSupervisory', [
      'getRefreshSupervisoryVisit',
      'getListTSO',
      'getDistributorByTSO',
      'getSalesByDistributor',
      'getDataTable',
    ]),
    async getValidasiRole() {
      let role = this.$store.state.user.role
      // validasi ketika role admin
      // maka yang akan dijalankan API get TSO
      if (role == `Admin`) {
        await this.getListTSO()
      }
      // validasi ketika role TSO
      // maka yang akan dijalakan API get Distributor
      // berdasarkan TSOnya
      if (role == 'Tso') {
        let idLevelHirarki = this.$store.state.user.idLevelHirarki
        await this.getDistributorByTSO({
          id_tso: idLevelHirarki,
        })
      }
    },
    async handleChangeTSO() {
      let dataSourceTSO = [...this.reportingSupervisory.listTSO]
      let filtered = dataSourceTSO.filter(
        tso => tso.nama == this.reportingSupervisory.params.selectedTSO,
      )

      this.reportingSupervisory.params.id_tso = filtered[0].idUser
      await this.getDistributorByTSO({
        id_tso: this.reportingSupervisory.params.id_tso,
      })
    },
    async handleChangeDistributor() {
      let dataSourceDistributor = [...this.reportingSupervisory.listDistributor]
      let filtered = dataSourceDistributor.filter(
        distributor =>
          distributor.nm_distributor == this.reportingSupervisory.params.selectedDistributor,
      )

      this.reportingSupervisory.params.id_distributor = filtered[0].id_distributor
      await this.getSalesByDistributor({
        distributor: this.reportingSupervisory.params.id_distributor,
      })
    },
    async handleChangeSales() {
      let dataSourceSales = [...this.reportingSupervisory.listSales]
      let filtered = dataSourceSales.filter(
        sales => sales.nama == this.reportingSupervisory.params.selectedSales,
      )

      this.reportingSupervisory.params.id_sales = filtered[0].id_sales
    },
    async handleSubmitData() {
      let idTSO = this.reportingSupervisory.params.id_tso
      let idSales = this.reportingSupervisory.params.id_sales
      let idDistributor = this.reportingSupervisory.params.id_distributor
      let dataTahun = this.reportingSupervisory.params.tahun
      if (idTSO != `` && idSales != `` && idDistributor != `` && dataTahun != ``) {
        await this.getDataTable({
          id_tso: idTSO,
          id_sales: idSales,
          id_distributor: idDistributor,
        })
      }
    },
    async handleRefreshFilter() {
      await this.getRefreshSupervisoryVisit()
    },
    collapseClose() {
      this.$store.getters.settings.isMenuCollapsed = false
    },
  },
}
</script>
