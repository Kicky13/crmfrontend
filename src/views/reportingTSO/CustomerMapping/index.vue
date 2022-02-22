<template>
  <div>
    <a-card class="card card-top card-top-primary">
      <div class="card-header pl-0 pr-3">
        <div class="row">
          <div class="col-md-3">
            <a-select
              placeholder="Pilih Distrik"
              class="w-100"
              show-search
              @change="handleDistrik()"
              v-model:value="reportingCustomerMapping.filter.distrik_name"
            >
              <a-select-option disabled value="">Pilih Salah Satu Distrik</a-select-option>
              <a-select-option
                v-for="(item, index) in reportingCustomerMapping.list_distrik"
                :value="item.namaDistrik"
                :key="`distrik_${index}`"
                data-toggle="tooltip"
                data-placement="top"
                :title="item.namaDistrik"
              >
                {{ item.idDistrik }} - {{ item.namaDistrik }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-3">
            <a-select
              placeholder="Pilih Distributor"
              class="w-100"
              show-search
              @change="handleRegion()"
              v-model:value="reportingCustomerMapping.filter.distributor_name"
            >
              <a-select-option disabled value="">Pilih Salah Satu Distributor</a-select-option>
              <a-select-option
                v-for="(item, index) in profileAdminDistributor.list_distributor"
                :value="item.namaDistributor"
                :key="`distributor_${index}`"
                data-toggle="tooltip"
                data-placement="top"
                :title="item.namaDistributor"
              >
                {{ item.idDistributor }} - {{ item.namaDistributor }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-6">
            <a-button type="primary" class="mb-3 float-right" @click="downloadCustomerMapping()">
              <i class="fa fa-download mr-2" />
              Export
            </a-button>
            <a-button
              :disabled="
                reportingCustomerMapping.filter.distrik_name.length === 0 ||
                  reportingCustomerMapping.filter.distributor_name.length === 0
              "
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
              :default-value="reportingCustomerMapping.itemsPerPage[1]"
              class="mx-2"
              @change="handlePaginationSize"
            >
              <a-select-option
                v-for="itemPerPage in reportingCustomerMapping.itemsPerPage"
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
            :columns="reportingCustomerMapping.columns"
            :data-source="reportingCustomerMapping.list_customer"
            :pagination="reportingCustomerMapping.pagination"
            :loading="reportingCustomerMapping.isLoading"
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
  name: 'CusttomerMappingTSO',

  computed: {
    ...mapState({
      reportingCustomerMapping: state => state.reportingCustomerMapping.data,
      profileAdminDistributor: state => state.profileAdminDistributor.data,
    }),
  },
  async mounted() {
    await this.getListDistrik({
      id_tso: this.$store.state.user.userid,
    })
    await this.getListAllSalesDistributor()
  },
  methods: {
    ...mapActions('reportingCustomerMapping', ['getListDistrik', 'getListCustomerMapping']),
    ...mapActions('profileAdminDistributor', ['getListAllSalesDistributor']),
    async handleView() {
      if (
        reportingCustomerMapping.filter.distrik_name.length > 0 ||
        reportingCustomerMapping.filter.distributor_name.length > 0
      ) {
        await this.getListCustomerMapping()
      }
    },
    handleDistrik() {
      let dataSource = [...this.reportingCustomerMapping.list_distrik]
      let filtered = dataSource.filter(
        x => x.namaDistrik == this.reportingCustomerMapping.filter.distrik_name,
      )
      this.reportingCustomerMapping.filter.id_distrik = filtered[0].idDistrik
    },
    handleRegion() {
      let dataSource = [...this.profileAdminDistributor.list_distributor]
      let filtered = dataSource.filter(
        x => x.namaDistributor == this.reportingCustomerMapping.filter.distributor_name,
      )
      this.reportingCustomerMapping.filter.id_distributor = filtered[0].idDistributor
    },
    async downloadCustomerMapping() {
      if (this.reportingCustomerMapping.status_download === `sukses`) {
        const header = [
          'ID_DISTRIK',
          'DISTRIK',
          'ID_TOKO',
          'NAMA_TOKO',
          'ID_DISTRIBUTOR',
          'POSISI',
          'USERNAME',
          'SALES',
          'MIN',
          'SEN',
          'SEL',
          'RAB',
          'KAM',
          'JUM',
          'SAB',
          'W1',
          'W2',
          'W3',
          'W4',
          'W5',
        ]
        const filterVal = [
          'ID_DISTRIK',
          'DISTRIK',
          'ID_TOKO',
          'NAMA_TOKO',
          'ID_DISTRIBUTOR',
          'POSISI',
          'USERNAME',
          'SALES',
          'MIN',
          'SEN',
          'SEL',
          'RAB',
          'KAM',
          'JUM',
          'SAB',
          'W1',
          'W2',
          'W3',
          'W4',
          'W5',
        ]
        this.exportToExcel(
          header,
          filterVal,
          this.reportingCustomerMapping.list_customer,
          'report-customer-mapping',
        )
      }
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
