<template>
  <div>
    <a-card class="card card-top card-top-primary">
      <div class="card-header pl-0 pr-3">
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
                {{ item.idUser }} - {{ item.nama }}
              </a-select-option>
            </a-select>
          </div>
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
                :value="item.namaWilayah"
                :key="`distrik_${index}`"
                data-toggle="tooltip"
                data-placement="top"
                :title="item.namaWilayah"
              >
                {{ item.idReferenceWilayah }} - {{ item.namaWilayah }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-3">
            <a-select
              placeholder="Pilih Distributor"
              class="w-100"
              show-search
              @change="handleDistributor()"
              v-model:value="reportingCustomerMapping.filter.distributor_name"
            >
              <a-select-option disabled value="">Pilih Salah Satu Distributor</a-select-option>
              <a-select-option
                v-for="(item, index) in reportingCustomerMapping.list_distributor"
                :value="item.nm_distributor"
                :key="`distributor_${index}`"
                data-toggle="tooltip"
                data-placement="top"
                :title="item.nm_distributor"
              >
                {{ item.id_distributor }} - {{ item.nm_distributor }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-3">
            <a-button
              :disabled="reportingCustomerMapping.list_customer.length > 0 ? false : true"
              type="primary"
              class="mb-3 float-right"
              @click="downloadCustomerMapping()"
            >
              <i class="fa fa-download mr-2" />
              Export
            </a-button>
            <a-button
              type="primary"
              :disabled="
                reportingCustomerMapping.filter.id_distrik != null &&
                reportingCustomerMapping.filter.id_distributor != null &&
                reportingCustomerMapping.filter.id_tso != null
                  ? false
                  : true
              "
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
          >
            <template #id_distrik="{ text }">
              <span>{{ text.ID_DISTRIK != null ? text.ID_DISTRIK : '-' }}</span>
            </template>
            <template #nama_distrik="{ text }">
              <span>{{ text.DISTRIK != null ? text.DISTRIK : '-' }}</span>
            </template>
            <template #id_toko="{ text }">
              <span>{{ text.ID_TOKO != null ? text.ID_TOKO : '-' }}</span>
            </template>
            <template #nama_toko="{ text }">
              <span>{{ text.NAMA_TOKO != null ? text.NAMA_TOKO : '-' }}</span>
            </template>
            <template #id_distributor="{ text }">
              <span>{{ text.ID_DISTRIBUTOR != null ? text.ID_DISTRIBUTOR : '-' }}</span>
            </template>
            <template #nama_distributor="{ text }">
              <span>{{ text.NAMA_DISTRIBUTOR != null ? text.NAMA_DISTRIBUTOR : '-' }}</span>
            </template>
            <template #posisi="{ text }">
              <span>{{ text.POSISI != null ? text.POSISI : '-' }}</span>
            </template>
            <template #username="{ text }">
              <span>{{ text.USERNAME != null ? text.USERNAME : '-' }}</span>
            </template>
            <template #sales="{ text }">
              <span>{{ text.SALES != null ? text.SALES : '-' }}</span>
            </template>
            <template #min="{ text }">
              <span>{{ text.MIN != null ? text.MIN : '-' }}</span>
            </template>
            <template #sen="{ text }">
              <span>{{ text.SEN != null ? text.SEN : '-' }}</span>
            </template>
            <template #sel="{ text }">
              <span>{{ text.SEL != null ? text.SEL : '-' }}</span>
            </template>
            <template #rab="{ text }">
              <span>{{ text.RAB != null ? text.RAB : '-' }}</span>
            </template>
            <template #kam="{ text }">
              <span>{{ text.KAM != null ? text.KAM : '-' }}</span>
            </template>
            <template #jum="{ text }">
              <span>{{ text.JUM != null ? text.JUM : '-' }}</span>
            </template>
            <template #sab="{ text }">
              <span>{{ text.SAB != null ? text.SAB : '-' }}</span>
            </template>
            <template #w1="{ text }">
              <span>{{ text.W1 != null ? text.W1 : '-' }}</span>
            </template>
            <template #w2="{ text }">
              <span>{{ text.W2 != null ? text.W2 : '-' }}</span>
            </template>
            <template #w3="{ text }">
              <span>{{ text.W3 != null ? text.W3 : '-' }}</span>
            </template>
            <template #w4="{ text }">
              <span>{{ text.W4 != null ? text.W4 : '-' }}</span>
            </template>
            <template #w5="{ text }">
              <span>{{ text.W5 != null ? text.W5 : '-' }}</span>
            </template>
          </a-table>
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
    this.reportingCustomerMapping.filter.id_tso = null
    this.reportingCustomerMapping.filter.tso_name = ''

    await this.getListTSO()
    // await this.getListDistrik({
    //   id_tso: this.$store.state.user.userid,
    // })
    // await this.getListCustomerMapping({
    //   id_tso: this.$store.state.user.userid,
    // })
  },
  methods: {
    ...mapActions('reportingCustomerMapping', [
      'getListDistrik',
      'getListCustomerMapping',
      'getListDistributor',
      'getListTSO',
    ]),
    async handleView() {
      if (
        this.reportingCustomerMapping.filter.distrik_name.length > 0 ||
        this.reportingCustomerMapping.filter.distributor_name.length > 0
      ) {
        await this.getListCustomerMapping({
          id_distrik: this.reportingCustomerMapping.filter.id_distrik,
          id_distributor: this.reportingCustomerMapping.filter.id_distributor,
        })
        // this.reportingCustomerMapping.filter.distrik_name = ''
        // this.reportingCustomerMapping.filter.distributor_name = ''
        // this.reportingCustomerMapping.filter.id_distrik = null
        // this.reportingCustomerMapping.filter.id_distributor = null
      } else {
        await this.getListCustomerMapping({
          id_distrik: null,
          id_distributor: null,
          id_tso: this.$store.state.user.userid,
        })
        // this.reportingCustomerMapping.filter.distrik_name = ''
        // this.reportingCustomerMapping.filter.distributor_name = ''
        // this.reportingCustomerMapping.filter.id_distrik = null
        // this.reportingCustomerMapping.filter.id_distributor = null
      }
    },
    handleDistrik() {
      let dataSource = [...this.reportingCustomerMapping.list_distrik]
      let filtered = dataSource.filter(
        x => x.namaWilayah == this.reportingCustomerMapping.filter.distrik_name,
      )
      this.reportingCustomerMapping.filter.id_distrik = filtered[0].idReferenceWilayah

      this.getListDistributor({
        id_distrik: this.reportingCustomerMapping.filter.id_distrik,
      })
      // this.reportingCustomerMapping.filter.distrik_name = ''
      // this.reportingCustomerMapping.filter.id_distrik = null
      this.reportingCustomerMapping.filter.distributor_name = ''
      this.reportingCustomerMapping.filter.id_distributor = null
    },
    handleDistributor() {
      let dataSource = [...this.reportingCustomerMapping.list_distributor]
      let filtered = dataSource.filter(
        x => x.nm_distributor == this.reportingCustomerMapping.filter.distributor_name,
      )
      this.reportingCustomerMapping.filter.id_distributor = filtered[0].id_distributor
    },

    async handleTSO() {
      let dataSource = [...this.reportingCustomerMapping.list_tso]
      let filtered = dataSource.filter(x => x.nama == this.reportingCustomerMapping.filter.tso_name)
      this.reportingCustomerMapping.filter.id_tso = filtered[0].idUser

      this.reportingCustomerMapping.filter.distrik_name = ''
      this.reportingCustomerMapping.filter.id_distrik = null
      this.reportingCustomerMapping.filter.distributor_name = ''
      this.reportingCustomerMapping.filter.id_distributor = null
      this.reportingCustomerMapping.list_customer = []
      await this.getListDistrik({
        id_tso: this.reportingCustomerMapping.filter.id_tso,
      })
    },
    async downloadCustomerMapping() {
      if (this.reportingCustomerMapping.status_download === `sukses`) {
        const header = [
          'ID_DISTRIK',
          'DISTRIK',
          'ID_TOKO',
          'NAMA_TOKO',
          'ID_DISTRIBUTOR',
          'NAMA_DISTRIBUTOR',
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
          'NAMA_DISTRIBUTOR',
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
