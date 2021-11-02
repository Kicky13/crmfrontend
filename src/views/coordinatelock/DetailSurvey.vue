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
                    <div class="text"><span>132381203.213</span></div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div class="box-part text-center">
                    <i class="fa fa-calendar fa-3x" aria-hidden="true"></i>
                    <div class="title">
                      <h4>Tanggal</h4>
                    </div>
                    <div class="text"><span>02/02/2021</span></div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div class="box-part text-center">
                    <i class="fa fa-times fa-3x" aria-hidden="true"></i>
                    <div class="title">
                      <h4>Durasi</h4>
                    </div>
                    <div class="text"><span>90 Menit</span></div>
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
                    <div class="text"><span>Utama Jaya</span></div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div class="box-part text-center">
                    <i class="fa fa-user fa-3x" aria-hidden="true"></i>
                    <div class="title">
                      <h3>Pemilik</h3>
                    </div>
                    <div class="text"><span>Kikik</span></div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div class="box-part text-center">
                    <i class="fa fa-map-marker fa-3x" aria-hidden="true"></i>
                    <div class="title">
                      <h3>Alamat</h3>
                    </div>
                    <div class="text"><span>Jl. Lumba Lumba</span></div>
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
                    :data-source="historyVisit"
                    :row-key="(historyVisit) => historyVisit.id_kunjungan"
                    :pagination="pagination"
                    :loading="isLoading"
                  >
                    <template #dikunjungi="text">
                      <span>{{ text.text }}</span>
                    </template>
                    <template #action>
                      <div>
                        <button type="button" class="btn btn-primary">
                          <i class="fa fa-eye"></i>
                        </button>
                      </div>
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
              <div class="vb__utils__avatar vb__utils__avatar--size64 mb-3">
                <img
                  lazy="loading"
                  v-once
                  :src="require('@/assets/images/maps.png')"
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
            <a-button type="primary">
              <i class="fa fa-lock mr-2" />
              Lock Koordinat
            </a-button>
          </div>
        </div>
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Foto Survey</strong>
          </div>
          <div class="card-header">
            <div class="d-flex flex-wrap flex-column align-items-center">
              <div class="vb__utils__avatar vb__utils__avatar--size64 mb-3">
                <img
                  lazy="loading"
                  v-once
                  :src="require('@/assets/images/maps.png')"
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
            <a-button type="primary">
              <i class="fa fa-lock mr-2" />
              Lock Koordinat
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
import { getHistoryVisit } from '@/services/connection/koordinat-lock/api'

const itemsPerPage = [5, 10, 15, 20]
const columns = [
  {
    title: 'No.',
    dataIndex: 'idProduk',
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
        key: 'top',
      },
    ],
  },
  {
    title: 'Stok/Zak',
    dataIndex: 'stokHariIni',
  },
  {
    title: 'Volume/Zak',
    children: [
      {
        title: 'Penjualan',
        dataIndex: 'stokPenjualan',
        key: 'stokPenjualan',
      },
      {
        title: 'Pembelian',
        dataIndex: 'stokPembelian',
        key: 'stokPembelian',
      },
    ],
  },
  {
    title: 'Keluhan',
    dataIndex: 'keluhan',
  },
  {
    title: 'Promosi',
    dataIndex: 'promosi',
  },
]

export default {
  name: 'VbAntDesign',
  props: {
    surveyDetail: {
      type: String,
      required: true,
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
      historyVisit: [],
    }
  },
  async mounted() {
    console.log(this.surveyDetail)
  },
  methods: {
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
