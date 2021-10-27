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
                  height="150"
                  width="150"
                />
              </div>
                <strong>UTAMA JAYA</strong>
                <strong>KODE/ID : 1000988</strong>
            </div>
            <a-tabs default-active-key="1" @change="callback">
              <a-tab-pane key="1" tab="Informasi Profil"> Content of Tab Pane 1 </a-tab-pane>
              <a-tab-pane key="2" tab="Mapping Customer" force-render>
                Content of Tab Pane 2
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
                    :data-source="list_hirarki_down"
                    :row-key="(data) => data.iduser"
                    :pagination="pagination"
                    :loading="isLoading"
                  >
                    <template #no="{ index }">
                      <div>
                        {{ index + 1 }}
                      </div>
                    </template>
                    <template #id_jabatan="{ text }">
                      <div>
                        {{ text.idJabatan }}
                      </div>
                    </template>
                    <template #id_user="{ text }">
                      <div>
                        {{ text.iduser }}
                      </div>
                    </template>
                    <template #nama_sales="{ text }">
                      <div>
                        {{ text.name }}
                      </div>
                    </template>
                    <template #action="{ text }">
                      <div>
                        <button
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Kosongkan Jabatan"
                          @click="deleteRow(text)"
                          class="btn btn-outline-danger mr-1"
                        >
                          <i class="fa fa-trash"></i>
                        </button>

                        <button
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Replace user"
                          @click="replaceUser(text)"
                          class="btn btn-outline-warning mr-1"
                        >
                          <i class="fa fa-user-plus"></i>
                        </button>

                        <button
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Assign User"
                          @click="assignUser(text)"
                          class="btn btn-outline-info"
                        >
                          <i class="fa fa-users"></i>
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
                <div class="font-size-16">Lng: 0.387198311 | Ltd: -9.13989171</div>
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

const itemsPerPage = [5, 10, 15, 20]
const columns = [
  {
    title: 'ID Customer',
    dataIndex: 'id_customer',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Nama Toko',
    dataIndex: 'nm_customer',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'Alamat',
    dataIndex: 'alamat',
  },
  {
    title: 'Provinsi',
    dataIndex: 'provinsi',
  },
  {
    title: 'Kabupaten',
    dataIndex: 'kabupaten',
  },
  {
    title: 'Koordinat',
    dataIndex: 'koordinat',
  },
  {
    title: 'Status Lock',
    dataIndex: 'status_lock',
  },
  {
    title: 'Detail',
    dataIndex: 'id',
    slots: { customRender: 'action' },
    width: 100,
    fixed: 'right',
  },
]

export default {
  name: 'VbAntDesign',
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
    }
  },
  async mounted() {},
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
