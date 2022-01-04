<template>
  <div>
    <div class="row mb-2">
      <div class="col-md-4 col-xs-4">
        <a @click="$router.go(-1)" class="font-weight-bold text-primary">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
          Kembali ke Detail Lock
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 col-xs-8">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Detail Customer</strong>
          </div>
          <div class="card-body">
            <div class="container container-fluid my-3">
              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div class="box-part text-center">
                    <i class="fa fa-user fa-3x" aria-hidden="true"></i>
                    <div class="title">
                      <h3>Supervisor</h3>
                    </div>
                    <div class="text">
                      <span>{{ detail_visit.nama_supervisor ?? 'loading...' }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div class="box-part text-center">
                    <i class="fa fa-calendar fa-3x" aria-hidden="true"></i>
                    <div class="title">
                      <h4>Tanggal</h4>
                    </div>
                    <div class="text">
                      <span>{{ detail_visit.tgl_rencana_kunjungan ?? '-' }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div class="box-part text-center">
                    <i class="fa fa-times fa-3x" aria-hidden="true"></i>
                    <div class="title">
                      <h4>Durasi</h4>
                    </div>
                    <div class="text">
                      <span>{{ detail_visit.durasi ?? 0 }} Menit</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div class="box-part text-center">
                    <i class="fa fa-home fa-3x" aria-hidden="true"></i>
                    <div class="title">
                      <h3>Customer</h3>
                    </div>
                    <div class="text">
                      <span>{{ detail_visit.nama_toko ?? '-' }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div class="box-part text-center">
                    <i class="fa fa-user fa-3x" aria-hidden="true"></i>
                    <div class="title">
                      <h3>Pemilik</h3>
                    </div>
                    <div class="text">
                      <span>{{ detail_visit.nama_pemilik ?? '-' }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div class="box-part text-center">
                    <i class="fa fa-map-marker fa-3x" aria-hidden="true"></i>
                    <div class="title">
                      <h3>Alamat</h3>
                    </div>
                    <div class="text">
                      <span>{{ detail_visit.alamat_toko ?? '-' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card card-top card-top-primary">
              <div class="card-header d-flex">
                <strong class="align-self-center">Detail Survey</strong>
              </div>
              <div class="card-body">
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
                    :data-source="koordinatLock.dataProduct"
                    :row-key="surveyProduct => surveyProduct.idProduk"
                    :pagination="koordinatLock.pagination"
                    :loading="koordinatLock.isLoading"
                  >
                    <template #no="data">
                      <span>{{ data.index + 1 }}</span>
                    </template>
                    <template #keluhan="data">
                      <button
                        v-if="data.record.keluhan.length"
                        type="button"
                        @click="openKeluhan(data.record.keluhan)"
                        class="btn btn-primary"
                      >
                        <span>{{ data.record.jumlahKeluhan }}</span>
                      </button>
                      <span v-else>{{ data.record.jumlahKeluhan }}</span>
                    </template>
                    <template #promosi="data">
                      <button
                        v-if="data.record.promosi.length"
                        type="button"
                        @click="openPromosi(data.record.promosi)"
                        class="btn btn-primary"
                      >
                        <span>{{ data.record.jumlahPromosi }}</span>
                      </button>
                      <span v-else>{{ data.record.jumlahPromosi ?? 0 }}</span>
                    </template>
                  </a-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-xs-4">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Lokasi</strong>
          </div>
          <div class="card-header">
            <div class="d-flex flex-wrap flex-column align-items-center">
              <div class="mb-3">
                <img
                  lazy="loading"
                  v-once
                  :src="require('@/assets/images/maps1.png')"
                  class="img-fluid"
                  alt="Mary Stanform"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Foto Survey</strong>
          </div>
          <div class="card-header">
            <div v-if="detail_visit.url_foto === null">
              <img
                lazy="loading"
                v-once
                :src="require('@/assets/images/noimage.svg')"
                class="img-fluid"
                alt="Mary Stanform"
              />
            </div>
            <div v-else>
              <a-carousel class="border" autoplay>
                <div v-for="(item, index) in detail_visit.url_foto" :key="`index_${index}`">
                  <img lazy="loading" v-once :src="item" class="img-fluid" alt="Mary Stanform" />
                </div>
              </a-carousel>
            </div>
          </div>
        </div>
      </div>
      <a-modal
        v-model:visible="keluhanVisible"
        :title="'Keluhan'"
        :closable="false"
        :mask-closable="false"
      >
        <template #footer>
          <a-button @click="closeModal()" key="submit" type="primary">OK</a-button>
        </template>
        <div
          v-for="detail in keluhanDetail"
          :key="detail.ID_KELUHAN"
          class="row border-bottom font-size-16"
          style="margin-bottom: 12px"
        >
          <div class="col-md-1">
            <i class="fa fa-circle"></i>
          </div>
          <div class="col-md-10 font-weight-bold">
            <span>{{ detail.KELUHAN }}</span>
          </div>
        </div>
      </a-modal>
      <a-modal
        v-model:visible="promosiVisible"
        :title="'Promosi'"
        :closable="false"
        :mask-closable="false"
      >
        <template #footer>
          <a-button @click="closeModal()" key="submit" type="primary">OK</a-button>
        </template>
        <div
          v-for="detail in promosiDetail"
          :key="detail.ID_PROMOSI"
          class="row border-bottom font-size-16"
          style="margin-bottom: 12px"
        >
          <div class="col-md-1">
            <i class="fa fa-circle"></i>
          </div>
          <div class="col-md-10 font-weight-bold">
            <span>{{ detail.NAMA_PROMOSI }}</span>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { toRaw } from 'vue'
import { notification, message } from 'ant-design-vue'
import { getHistoryDetail } from '@/services/connection/koordinat-lock/api'
import { filter } from 'lodash'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

const itemsPerPage = [5, 10, 15, 20]

export default {
  name: 'VbAntDesign',
  props: {
    surveyDetail: {
      type: String,
      required: true,
      default: null,
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
      rowSelection,
      itemsPerPage,
    }
  },

  data() {
    return {
      pagination: {},
      isLoading: false,
      detailCustomer: {},
      surveyProduct: [],
      keluhanDetail: [],
      promosiDetail: [],
      keluhanVisible: false,
      promosiVisible: false,
      columns: [
        {
          title: 'No.',
          align: 'center',
          slots: { customRender: 'no' },
        },
        {
          title: 'Nama',
          dataIndex: 'namaProduk',
        },
        {
          title: 'Harga',
          children: [
            {
              title: 'Jual',
              dataIndex: 'hargaJual',
              key: 'hargaJual',
            },
            {
              title: 'Beli',
              dataIndex: 'hargaBeli',
              key: 'hargaBeli',
            },
            {
              title: 'TOP/hari',
              dataIndex: 'top',
              align: 'center',
              key: 'top',
            },
          ],
        },
        {
          title: 'Stok/Zak',
          align: 'center',
          dataIndex: 'stokHariini',
        },
        {
          title: 'Volume/Zak',
          children: [
            {
              title: 'Penjualan',
              dataIndex: 'stokPenjualan',
              align: 'center',
              key: 'stokPenjualan',
            },
            {
              title: 'Pembelian',
              dataIndex: 'stokPembelian',
              align: 'center',
              key: 'stokPembelian',
            },
          ],
        },
        {
          title: 'Keluhan',
          align: 'center',
          dataIndex: 'idProduk',
          slots: { customRender: 'keluhan' },
        },
        {
          title: 'Promosi',
          align: 'center',
          dataIndex: 'idProduk',
          slots: { customRender: 'promosi' },
        },
      ],
      detail_visit: {},
    }
  },
  computed: {
    ...mapState({
      koordinatLock: state => state.koordinatLock.data,
    }),
  },
  // beforeMount() {
  //   this.fetchKeluhan()
  //   this.fetchPromosi()
  // },
  async mounted() {
    // this.pageValidation()
    await this.getHistoryVisitToko({
      idToko: this.$route.params.id_toko,
    })
    await this.getProductSurvey({
      idHistoryVisit: this.$route.params.id_kunjungan,
    })

    this.getDetailSurvey()
  },
  methods: {
    ...mapActions('koordinatLock', ['getProductSurvey', 'getHistoryVisitToko']),

    getDetailSurvey() {
      const dataSource = [...this.koordinatLock.dataVisit]
      let filtered = dataSource.filter(x => x.id_kunjungan == this.$route.params.id_kunjungan)
      let detailSurvey = filtered[0]
      this.detail_visit = detailSurvey
    },
    fetchKeluhan() {
      axios.get(`http://localhost:3004/keluhan`).then(response => {
        this.columns.map(column => {
          if (column.title === 'Keluhan') {
            column.children = response.data
          }
        })
      })
    },
    fetchPromosi() {
      axios.get(`http://localhost:3004/promosi`).then(response => {
        this.columns.map(column => {
          if (column.title === 'Promosi') {
            column.children = response.data
          }
        })
      })
    },
    onSlideStart(slide) {
      this.sliding = true
    },

    openKeluhan(keluhan) {
      this.keluhanDetail = keluhan
      this.keluhanVisible = true
    },
    openPromosi(promosi) {
      this.promosiDetail = promosi
      this.promosiVisible = true
    },
    closeModal() {
      this.keluhanVisible = false
      this.promosiVisible = false
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
<style scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: auto;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
