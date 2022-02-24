<template>
  <div>
    <a-card class="card card-top card-top-primary">
      <div class="card-header px-0">
        <div class="row">
          <div class="col-md-3">
            <a-select
              placeholder="Pilih TSO"
              class="w-100"
              show-search
              @change="handleTSO()"
              v-model:value="reportingCustomerMapping.filter.tso_name"
            >
              <a-select-option disabled value="">Pilih Salah Satu TSO</a-select-option>
              <a-select-option
                v-for="(item, index) in reportingCustomerMapping.list_tso"
                :value="item.nama"
                :key="`distrik_${index}`"
                data-toggle="tooltip"
                data-placement="top"
                :title="item.nama"
              >
                {{ item.idJabatan }} - {{ item.nama }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-3">
            <a-select
              placeholder="Pilih Distributor"
              class="w-100"
              show-search
              @change="handleDistributorTso"
              v-model:value="reportingSalesDistributor.filter.distributor_name"
            >
              <a-select-option disabled value="">Pilih Salah Satu Distributor</a-select-option>
              <a-select-option
                v-for="(item, index) in reportingSalesDistributor.list_distributor_tso"
                :value="`${item.id_distributor} - ${item.nm_distributor}`"
                :key="`distributor_${index}`"
                data-toggle="tooltip"
                data-placement="top"
                :title="item.nm_distributor"
              >
                {{ item.id_distributor }} - {{ item.nm_distributor }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-6">
            <a-button type="primary" class="mb-3 float-right" @click="downloadReport()">
              <i class="fa fa-download mr-2" />
              Export
            </a-button>
            <a-button
              :disabled="reportingSalesDistributor.filter.distributor_name.length === 0"
              type="primary"
              class="mb-3 float-right mr-2"
              @click="handleView()"
            >
              <i class="fa fa-eye mr-2" />
              View
            </a-button>
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="d-flex mt-4 justify-content-between mb-3">
          <div class="d-flex">
            <div class="align-self-center">
              <span>Show :</span>
            </div>
            <a-select
              :default-value="reportingSalesDistributor.itemsPerPage[1]"
              class="mx-2"
              @change="handlePaginationSize"
            >
              <a-select-option
                v-for="itemPerPage in reportingSalesDistributor.itemsPerPage"
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
            :columns="reportingSalesDistributor.columns"
            :data-source="reportingSalesDistributor.list_report"
            :pagination="reportingSalesDistributor.pagination"
            :loading="reportingSalesDistributor.isLoading"
            :row-key="data => data"
          ></a-table>
        </div>
      </div>
    </a-card>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CustomerMappingTSO',
  computed: {
    ...mapState({
      reportingSalesDistributor: state => state.reportingSalesDistributor.data,
      reportingCustomerMapping: state => state.reportingCustomerMapping.data,
    }),
  },
  async mounted() {
    await this.getListTSO()
  },
  methods: {
    ...mapActions('reportingSalesDistributor', [
      'getReportDistributorTSO',
      'getListTokoDistributorTSO',
    ]),
    ...mapActions('reportingCustomerMapping', ['getListTSO']),

    async handleView() {
      if (this.reportingSalesDistributor.filter.distributor_name.length > 0) {
        await this.getReportDistributorTSO({
          distributor: this.reportingSalesDistributor.filter.id_distributor,
        })
      }
    },
    async handleTSO() {
      let dataSource = [...this.reportingCustomerMapping.list_tso]
      let filtered = dataSource.filter(x => x.nama == this.reportingCustomerMapping.filter.tso_name)
      this.reportingCustomerMapping.filter.id_tso = filtered[0].idJabatan

      console.log(
        `--this.reportingCustomerMapping.filter.id_tso`,
        this.reportingCustomerMapping.filter.id_tso,
      )
      this.reportingSalesDistributor.filter.distributor_name = ''
      this.reportingSalesDistributor.filter.id_distributor = null
      this.reportingCustomerMapping.list_customer = []
      await this.getListTokoDistributorTSO({
        id_tso: this.reportingCustomerMapping.filter.id_tso,
      })
    },
    handleDistributorTso() {
      let keyword = this.reportingSalesDistributor.filter.distributor_name.split('-')[0]
      this.reportingSalesDistributor.filter.id_distributor = keyword
    },
    async downloadReport() {
      const header = [
        'ID_DISTRIBUTOR',
        'DISTRIBUTOR',
        'POSISI',
        'ID_SALES',
        'USERNAME',
        'SALES',
        'ID_DISTRIK',
        'DISTRIK',
        'ID_TSO',
        'USERNAME_TSO',
        'NAMA_TSO',
      ]
      const filterVal = [
        'id_distributor',
        'nama_distributor',
        'posisi_sales',
        'id_sales',
        'username',
        'nama',
        'id_kota',
        'nama_kota',
        'id_posisi_tso',
        'username_tso',
        'nama_tso',
      ]
      this.exportToExcel(
        header,
        filterVal,
        this.reportingSalesDistributor.list_report,
        'report-sales-distributor',
      )
    },
    exportToExcel(header, filterVal, list, filename) {
      import('@/vendor/Export2Excel').then(excel => {
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header,
          data,
          filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType,
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }),
      )
    },
  },
}
</script>
