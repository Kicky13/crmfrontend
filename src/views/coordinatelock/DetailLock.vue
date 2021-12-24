<template>
  <div>
    <div class="row">
      <div class="col-md-8 col-xs-8">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Detail Customer</strong>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <img
                  lazy="loading"
                  v-once
                  :src="require('@/assets/images/shop.png')"
                  alt="shop"
                  style="width: 80%"
                />
              </div>
              <div class="col-md-6" style="margin-top: 5%">
                <div class="text-dark font-weight-bold font-size-32">
                  {{
                    koordinatLock.detail_customer.nm_customer
                      ? koordinatLock.detail_customer.nm_customer
                      : 'loading..'
                  }}
                </div>
                <div class="font-size-16">
                  KODE/ID : {{ $route.params.id_toko ? $route.params.id_toko : 'loading..' }}
                </div>
              </div>
            </div>
            <a-tabs default-active-key="1" @change="callback">
              <a-tab-pane key="1" tab="Informasi Profil">
                <div class="row border-bottom font-size-16" style="margin-bottom: 12px">
                  <div class="col-md-1">
                    <i class="fa fa-user"></i>
                  </div>
                  <div class="col-md-4 font-weight-bold">
                    <span>Nama Pemilik</span>
                  </div>
                  <div class="col-md-4">
                    <span>: {{ koordinatLock.detail_customer.nama_pemilik ?? 'loading..' }}</span>
                  </div>
                </div>
                <div class="row border-bottom font-size-16" style="margin-bottom: 12px">
                  <div class="col-md-1">
                    <i class="fa fa-phone"></i>
                  </div>
                  <div class="col-md-4 font-weight-bold">
                    <span>Telepon</span>
                  </div>
                  <div class="col-md-4">
                    <span
                      >: {{ koordinatLock.detail_customer.no_telp_toko ?? 'Tidak Tersedia' }}</span
                    >
                  </div>
                </div>
                <div class="row border-bottom font-size-16" style="margin-bottom: 12px">
                  <div class="col-md-1">
                    <i class="fa fa-map-marker"></i>
                  </div>
                  <div class="col-md-4 font-weight-bold">
                    <span>Alamat</span>
                  </div>
                  <div class="col-md-6">
                    <span>: {{ koordinatLock.detail_customer.alamat ?? '-' }}</span>
                  </div>
                </div>
                <div class="row border-bottom font-size-16" style="margin-bottom: 12px">
                  <div class="col-md-1">
                    <i class="fa fa-archive"></i>
                  </div>
                  <div class="col-md-4 font-weight-bold">
                    <span>Kapasitas Toko</span>
                  </div>
                  <div class="col-md-4">
                    <span>: {{ koordinatLock.detail_customer.kapasitas_toko ?? 0 }}</span>
                  </div>
                </div>
              </a-tab-pane>
              <a-tab-pane key="2" tab="Mapping Customer" force-render>
                <a-collapse
                  accordion
                  :bordered="false"
                  :active-key="activeKey"
                  @change="changeActiveKey"
                >
                  <a-collapse-panel key="1" header="Distributor">
                    <a-table
                      :columns="koordinatLock.column_distributor"
                      :data-source="koordinatLock.detail_customer.distributor"
                      :row-key="data => koordinatLock.detail_customer.distributor.id_distributor"
                      :pagination="koordinatLock.pagination"
                      :loading="koordinatLock.isLoading"
                    >
                      <template #no="{ index }">
                        <div>
                          {{ index + 1 }}
                        </div>
                      </template>
                      <template #id_distributor="{ text }">
                        <div>
                          {{ text.id_distributor }}
                        </div>
                      </template>
                      <template #nama="{ text }">
                        <div>
                          {{ text.nama_distributor }}
                        </div>
                      </template>
                    </a-table>
                  </a-collapse-panel>
                  <a-collapse-panel key="2" header="Sales">
                    <a-table
                      :columns="koordinatLock.column_sales"
                      :data-source="koordinatLock.detail_customer.sales"
                      :row-key="data => koordinatLock.detail_customer.sales.id_sales"
                      :pagination="koordinatLock.pagination"
                      :loading="koordinatLock.isLoading"
                    >
                      <template #no="{ index }">
                        <div>
                          {{ index + 1 }}
                        </div>
                      </template>
                      <template #id_sales="{ text }">
                        <div>
                          {{ text.id_sales }}
                        </div>
                      </template>
                      <template #nama="{ text }">
                        <div>
                          {{ text.nama_sales }}
                        </div>
                      </template>
                    </a-table>
                  </a-collapse-panel>
                </a-collapse>
                <!-- <div class="row border-bottom font-size-16" style="margin-bottom: 12px">
                  <div class="col-md-1">
                    <i class="fa fa-balance-scale"></i>
                  </div>
                  <div class="col-md-4 font-weight-bold">
                    <span>Distributor</span>
                  </div>
                  <div class="col-md-6">
                    <span>: </span>
                    <span v-if="totalDistributor > 0">
                      {{
                        detailCustomer.distributor[0].id_distributor +
                        ' - ' +
                        detailCustomer.distributor[0].nama_distributor
                      }}</span
                    >
                    <span class="font-weight-bold" v-else>-</span>
                  </div>
                </div>
                <div class="row border-bottom font-size-16" style="margin-bottom: 12px">
                  <div class="col-md-1">
                    <i class="fa fa-user"></i>
                  </div>
                  <div class="col-md-4 font-weight-bold">
                    <span>Sales</span>
                  </div>
                  <div class="col-md-6">
                    <span>: </span>
                    <span v-if="totalSales > 0">
                      {{
                        detailCustomer.sales[0].id_sales +
                        ' - ' +
                        detailCustomer.sales[0].nama_sales
                      }}</span
                    >
                    <span class="font-weight-bold" v-else>-</span>
                  </div>
                </div> -->
              </a-tab-pane>
              <a-tab-pane key="3" tab="History Visit">
                <div class="d-flex justify-content-between mb-3">
                  <div class="d-flex">
                    <div class="align-self-center">
                      <span>Show :</span>
                    </div>
                    <a-select
                      :default-value="itemsPerPage[1]"
                      class="mx-2"
                      @change="handlePaginationSize"
                    >
                      <a-select-option v-for="itemPerPage in itemsPerPage" :key="itemPerPage">
                        {{ itemPerPage }}
                      </a-select-option>
                    </a-select>
                    <div class="align-self-center">
                      <span>entries</span>
                    </div>
                  </div>
                  <a-input-search placeholder="input search text" style="width: 200px" />
                </div>
                <div class="table-responsive text-nowrap">
                  <a-table
                    :columns="columns"
                    :data-source="koordinatLock.dataVisit"
                    :row-key="historyVisit => historyVisit.id_kunjungan"
                    :pagination="pagination"
                    :loading="isLoading"
                  >
                    <template #dikunjungi="text">
                      <span>{{ text.text }}</span>
                    </template>
                    <template #action="text">
                      <div>
                        <button
                          type="button"
                          @click="gotoDetailSurvey(text)"
                          class="btn btn-primary"
                        >
                          <i class="fa fa-eye"></i>
                        </button>
                      </div>
                    </template>
                  </a-table>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-xs-4">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Koordinat Lokasi</strong>
          </div>
          <div class="card-header">
            <div class="d-flex flex-wrap flex-column align-items-center">
              <div class="mb-3">
                <img
                  lazy="loading"
                  v-once
                  :src="require('@/assets/images/maps.png')"
                  class="img-fluid"
                  alt="Mary Stanform"
                />
              </div>
              <div class="text-center">
                <div class="text-dark font-weight-bold font-size-20"></div>
                <div class="font-size-16">
                  Lng: {{ detailCustomer.longitude ?? '-' }} | Ltd:
                  {{ detailCustomer.latitude ?? '-' }}
                </div>
              </div>
            </div>
          </div>
          <div class="card-header align-self-center">
            <a-button :loading="isLoading" type="primary" @click="fetchLockCoordinate">
              <i class="fa fa-lock mr-2" />
              {{ detailCustomer.status_lock ? 'Unlock Customer' : 'Lock Customer' }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRaw } from 'vue'
import { notification, message } from 'ant-design-vue'
import { getHistoryVisit, getLockCustomer } from '@/services/connection/koordinat-lock/api'
import { mapState, mapActions } from 'vuex'

const itemsPerPage = [5, 10, 15, 20]
const columns = [
  {
    title: 'No.',
    dataIndex: 'id_kunjungan',
  },
  {
    title: 'Rencana Kunjungan',
    dataIndex: 'tgl_rencana_kunjungan',
  },
  {
    title: 'Supervisor',
    dataIndex: 'nama_supervisor',
  },
  {
    title: 'Dikunjungi',
    dataIndex: 'checkin_date',
    slots: { customRender: 'dikunjungi' },
  },
  {
    title: 'Penugasan',
    dataIndex: 'jenis_penugasan',
  },
  {
    title: 'Detail',
    dataIndex: 'id_kunjungan',
    slots: { customRender: 'action' },
    width: 100,
    fixed: 'right',
  },
]

export default {
  name: 'VbAntDesign',
  props: {
    customerInfo: {
      type: String,
      required: true,
    },
  },

  setup() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      getCheckboxProps: record => ({
        props: {
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        },
      }),
    }
    return {
      columns,
      rowSelection,
      itemsPerPage,
    }
  },
  data() {
    return {
      pagination: {},
      isLoading: false,
      detailCustomer: {},
      totalDistributor: 0,
      totalSales: 0,
      historyVisit: [],
      activeKey: '',
    }
  },
  computed: {
    ...mapState({
      koordinatLock: state => state.koordinatLock.data,
    }),
  },
  async mounted() {
    await this.getHistoryVisitToko({
      idToko: this.$route.params.id_toko,
    })
    await this.getDataCustomer({
      id_distrik: parseInt(this.$route.params.id_distrik),
      search: '',
    })
    this.dataDetailCustomer()
    // await this.fetchGetHistoryVisit()
  },
  methods: {
    ...mapActions('koordinatLock', ['getHistoryVisitToko', 'getDataCustomer']),

    changeActiveKey(key) {
      this.activeKey = key
    },
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },

    dataDetailCustomer() {
      const dataSource = [...this.koordinatLock.dataCustomer]
      const filteredDetailCustomer = dataSource.filter(
        a => a.id_customer == this.$route.params.id_toko,
      )
      this.koordinatLock.detail_customer = filteredDetailCustomer[0]
      this.totalDistributor = this.koordinatLock.detail_customer.distributor.length
      this.totalSales = this.koordinatLock.detail_customer.sales.length
    },
    // async fetchGetHistoryVisit() {
    //   this.isLoading = true
    //   let formData = {
    //     idToko: this.detailCustomer.id_customer,
    //   }

    //   await getHistoryVisit(formData)
    //     .then(response => {
    //       if (response.status) {
    //         this.historyVisit = response.data
    //       }
    //       this.isLoading = false
    //     })
    //     .catch(err => {
    //       if (err) {
    //       }
    //     })
    // },
    // async fetchLockCoordinate() {
    //   let formData = {
    //     idToko: this.detailCustomer.id_customer,
    //   }
    //   this.isLoading = true
    //   getLockCustomer(formData)
    //     .then(response => {
    //       if (response.status) {
    //         message.success(response.message)
    //         this.detailCustomer.status_lock = !this.detailCustomer.status_lock
    //       } else {
    //         message.error(response.message)
    //       }
    //       this.isLoading = false
    //     })
    //     .catch(err => {
    //       console.error(err)
    //     })
    // },
    gotoDetailSurvey(id) {
      let detailSurvey = this.getDetailSurvey(id)
      this.$router.push({
        name: 'koordinat-lock-survey',
        params: { surveyDetail: JSON.stringify(detailSurvey) },
      })
    },
    getDetailSurvey(id) {
      const dataSource = [...this.historyVisit]
      let filtered = dataSource.filter(x => x.id_kunjungan == id.text)
      let detailSurvey = filtered[0]

      return detailSurvey
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
