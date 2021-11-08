<template>
  <div>
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
                      <span>{{ detailCustomer.nama_supervisor ?? '-' }}</span>
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
                      <span>{{ detailCustomer.tgl_rencana_kunjungan ?? '01/01/2021' }}</span>
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
                      <span>{{ detailCustomer.durasi ?? 0 }} Menit</span>
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
                      <span>{{ detailCustomer.nama_toko ?? '-' }}</span>
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
                      <span>{{ detailCustomer.nama_pemilik ?? '-' }}</span>
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
                      <span>{{ detailCustomer.alamat_toko ?? '-' }}</span>
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
                    :data-source="surveyProduct"
                    :row-key="(surveyProduct) => surveyProduct.idProduk"
                    :pagination="pagination"
                    :loading="isLoading"
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
            <div class="d-flex flex-wrap flex-column align-items-center">
              <div class="mb-3">
                <img
                  lazy="loading"
                  v-once
                  :src="require('@/assets/images/noimage.svg')"
                  class="img-fluid"
                  alt="Mary Stanform"
                />
              </div>
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

const itemsPerPage = [5, 10, 15, 20]
const columns = [
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
]

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
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
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
      surveyProduct: [],
      keluhanDetail: [],
      promosiDetail: [],
      keluhanVisible: false,
      promosiVisible: false,
    }
  },
  async mounted() {
    console.log(this.surveyDetail)
    this.pageValidation()
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    pageValidation() {
      this.detailCustomer = JSON.parse(this.surveyDetail)

      if (!this.surveyDetail) {
        console.log(this.detailCustomer)
        this.$router.back()
      } else {
        this.fetchGetHistoryDetail()
      }
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
    async fetchGetHistoryDetail() {
      if (this.surveyDetail) {
        this.isLoading = true
        let formData = {
          idHistoryVisit: this.detailCustomer.id_kunjungan,
        }
        await getHistoryDetail(formData)
          .then((response) => {
            if (response.status) {
              this.surveyProduct = response.data
            }
            this.isLoading = false
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
