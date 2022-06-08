<template>
  <div>
    <div class="row mb-2">
      <div class="col-md-4 col-xs-4">
        <a @click="$router.go(-1)" class="font-weight-bold text-primary">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
          Kembali ke Koordinat Lock
        </a>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12 col-xs-12">
        <a-card :loading="koordinatLock.isLoading" class="card card-top card-top-primary">
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
                    koordinatLock.dataDetailCustomer.nm_customer
                      ? koordinatLock.dataDetailCustomer.nm_customer
                      : 'loading..'
                  }}
                </div>
                <div class="font-size-16">
                  ID Toko : {{ $route.params.id_toko ? $route.params.id_toko : 'loading..' }}
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
                    <span
                      >: {{ koordinatLock.dataDetailCustomer.nama_pemilik ?? 'loading..' }}</span
                    >
                  </div>
                </div>
                <div class="row border-bottom font-size-16" style="margin-bottom: 12px">
                  <div class="col-md-1">
                    <i class="fa fa-phone"></i>
                  </div>
                  <div class="col-md-4 font-weight-bold">
                    <span>Kontak</span>
                  </div>
                  <div class="col-md-4">
                    <span
                      >: 0{{
                        koordinatLock.dataDetailCustomer.no_telp_toko ?? 'Tidak Tersedia'
                      }}</span
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
                    <span>: {{ koordinatLock.dataDetailCustomer.alamat ?? '-' }}</span>
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
                    <span>: {{ koordinatLock.dataDetailCustomer.kapasitas_toko ?? 0 }}</span>
                  </div>
                </div>
              </a-tab-pane>
              <a-tab-pane key="2" tab="Mapping Customer" force-render>
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
                    class="mt-2"
                    :columns="koordinatLock.column_distributor"
                    :data-source="koordinatLock.dataDetailCustomer.distributor"
                    :row-key="(data) => data.id_distributor"
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
                    <template #id_sales="{ text }">
                      <div>
                        {{ text.id_sales }}
                      </div>
                    </template>
                    <template #sales="{ text }">
                      <div>
                        {{ text.nama_sales }}
                      </div>
                    </template>
                    <template #id_jabatan="{ text }">
                      <div>
                        {{ text.id_m_hierarchy }}
                      </div>
                    </template>
                    <template #hirarki="{ text }">
                      <div>
                        {{ text.nm_m_hierarchy }}
                      </div>
                    </template>
                  </a-table>
                </div>
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
                    :row-key="(historyVisit) => historyVisit.id_kunjungan"
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
        </a-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-xs-6">
        <a-card :loading="koordinatLock.isLoading" class="card card-top card-top-primary p-0">
          <div class="card-header d-flex">
            <strong class="align-self-center">Koordinat Lokasi</strong>
          </div>
          <div class="card-body p-0">
            <div class="d-flex flex-wrap flex-column align-items-center">
              <div class="mb-3 mt-1">
                <!-- <img
                  lazy="loading"
                  v-once
                  :src="require('@/assets/images/logo/underconstruct.jpg')"
                  class="img-fluid"
                  alt="Mary Stanform"
                /> -->
                <div class="mapouter">
                  <div class="gmap_canvas">
                    <iframe
                      width="250"
                      height="300"
                      id="gmap_canvas"
                      :src="link"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                    >
                    </iframe>
                    <a href="https://fmovies-online.net" />
                    <a href="https://www.embedgooglemap.net"></a>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <div class="text-dark font-weight-bold font-size-20"></div>
                <div class="font-size-16">
                  Lng: {{ koordinatLock.dataDetailCustomer.longitude ?? '-' }} | Ltd:
                  {{ koordinatLock.dataDetailCustomer.latitude ?? '-' }}
                </div>
              </div>
            </div>
          </div>
          <div class="card-header text-center align-self-center">
            <Can do="update" on="CoordLock">
              <a-button :loading="koordinatLock.isLoading" type="primary" @click="getLockData()">
                <i class="fa fa-lock mr-2" />
                {{
                  koordinatLock.dataDetailCustomer.status_lock != 0
                    ? 'Unlock Customer'
                    : 'Lock Customer'
                }}
              </a-button>
            </Can>
          </div>
        </a-card>
      </div>
      <div class="col-md-6 col-xs-6">
        <a-card :loading="koordinatLock.isLoading" class="card card-top card-top-primary">
          <div class="card-header d-flex mb-1">
            <strong class="align-self-center">Street View</strong>
          </div>
          <div class="card-body p-0">
            <div class="row">
              <div class="col-md-12">
                <iframe
                  :src="linkStreetView"
                  class="w-100"
                  height="294"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </a-card>
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
      getCheckboxProps: (record) => ({
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
      link: '',
      linkStreetView: '',
      latStreetView: -7.1688477,
      lngStreetView: 112.6451559,
    }
  },
  computed: {
    ...mapState({
      koordinatLock: (state) => state.koordinatLock.data,
    }),
  },
  async mounted() {
    await this.getHistoryVisitToko({
      idToko: this.$route.params.id_toko,
    })
    // await this.getDataCustomer({
      //   id_distrik: parseInt(this.$route.params.id_distrik),
    //   search: '',
    // })

    await this.getDataDetailCustomerList({
      id_toko: this.$route.params.id_toko,
    })

    // this.dataDetailCustomer()

    this.urlStreetView()
    this.urlMap()
    // await this.fetchGetHistoryVisit()
  },
  methods: {
    ...mapActions('koordinatLock', [
      'getLockCustomer',
      'getHistoryVisitToko',
      'getDataCustomer',
      'getDataDetailCustomerList',
    ]),

    urlStreetView() {
      let lat = this.koordinatLock.dataDetailCustomer.latitude ?? 0
      let long = this.koordinatLock.dataDetailCustomer.longitude ?? 0
      let keyApi = `AIzaSyB3r3BF6YjrInuaPa_JORxErCoV_db0oiY`
      this.linkStreetView =
        `https://www.google.com/maps/embed/v1/streetview?location=` +
        lat+
        `,` +
        long +
        `&fov=80&heading=70&pitch=0&key=` +
        keyApi
    },

    changeActiveKey(key) {
      this.activeKey = key
    },
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },

    // dataDetailCustomer() {
    //   const dataSource = [...this.koordinatLock.dataCustomer]
    //   const filteredDetailCustomer = dataSource.filter(
    //     a => a.id_customer == this.$route.params.id_toko,
    //   )
    //   this.koordinatLock.detail_customer = filteredDetailCustomer[0]
    //   this.totalDistributor = this.koordinatLock.detail_customer.distributor.length
    // },

    async getLockData() {
      await this.getLockCustomer({
        id_toko: this.$route.params.id_toko,
      })
      await this.getDataCustomer({
        id_distrik: parseInt(this.$route.params.id_distrik),
        search: '',
      })
      this.dataDetailCustomer()
    },
    gotoDetailSurvey(id) {
      this.$router.push(`/koordinatlock/${this.$route.params.id_toko}/survey-detail/${id.text}`)
    },

    urlMap() {
      let lat = this.koordinatLock.dataDetailCustomer.latitude ?? 0
      let long = this.koordinatLock.dataDetailCustomer.longitude ?? 0
      let keyApi = `AIzaSyB3r3BF6YjrInuaPa_JORxErCoV_db0oiY`
      this.link =
        `https://www.google.com/maps/embed/v1/view?key=` +
        keyApi +
        `&center=` +
        lat +
        `,` +
        long +
        `&zoom=18&maptype=satellite`
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
.mapouter {
  position: relative;
  text-align: right;
  height: 500px;
  width: 600px;
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 500px;
  width: 600px;
}
</style>
