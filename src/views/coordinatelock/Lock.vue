<template>
  <div>
    <a-card class="card card-top card-top-primary" :loading="isLoading">
      <div class="card-header d-flex">
        <strong>Customer Koordinat Lock</strong>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content" style="margin-bottom: 10px">
          <div class="align-self-center">
            <strong>Filter By: </strong>
          </div>
          <a-select
            v-model:value="selectedProvinsi"
            @change="handleRegionChange"
            class="mx-3"
            style="width: 200px"
          >
            <a-select-option disabled :value="null">Pilih salah satu</a-select-option>
            <a-select-option v-for="data in provinsiOption" :key="data.id" :value="data.provinsi">{{
              data.provinsi
            }}</a-select-option>
          </a-select>
          <a-select v-model:value="selectedKabupaten" class="mx-3" style="width: 200px">
            <a-select-option disabled :value="null">Pilih salah satu</a-select-option>
            <a-select-option
              v-for="data in kabupatenOption"
              :key="data.id"
              :value="data.kabupaten"
              >{{ data.kabupaten }}</a-select-option
            >
          </a-select>
          <a-button type="primary" @click="handleView" :loading="isSubmit">
            <i class="fa fa-eye mr-2" />
            View
          </a-button>
          <a-button
            :hidden="id == null ? true : false"
            type="button"
            style="margin-left: 5px"
            class="btn btn-outline-danger"
            @click="clearForm"
          >
            <i class="fa fa-times" />
            Cancel
          </a-button>
        </div>
        <div class="d-flex justify-content-between mb-3">
          <div class="d-flex">
            <div class="align-self-center">
              <span>Show :</span>
            </div>
            <a-select :default-value="itemsPerPage[1]" class="mx-2" @change="handlePaginationSize">
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
            :data-source="displays"
            :row-key="(displays) => displays.id"
            :pagination="pagination"
            :scroll="{ x: 1500 }"
          >
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
    </a-card>
  </div>
</template>

<script>
import { toRaw } from 'vue'
import { message } from 'ant-design-vue'
import { getRegionList, getTokoList } from '@/services/connection/koordinat-lock/api'

const itemsPerPage = [5, 10, 15, 20]
const columns = [
  {
    title: 'ID Customer',
    dataIndex: 'customerid',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Nama Toko',
    dataIndex: 'name',
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
    title: 'Distrik',
    dataIndex: 'kabupaten',
  },
  {
    title: 'Area',
    dataIndex: 'area',
  },
  {
    title: 'Kecamatan',
    dataIndex: 'kecamatan',
  },
  {
    title: 'Koordinat',
    dataIndex: 'koordinat',
  },
  {
    title: 'Status Lock',
    dataIndex: 'statuslock',
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
      customers: [],
      displays: [],
      provinsiOption: [],
      kabupatenOption: [],
      pagination: {},
      selectedProvinsi: null,
      selectedKabupaten: null,
      isLoading: false,
      isSubmit: false,
    }
  },
  mounted() {
    this.fetchGetRegion()
    this.fetchGetCustomers()
  },
  methods: {
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    handleRegionChange() {
      const dataSource = [...this.provinsiOption]
      this.kabupatenOption = null
      const filtered = dataSource.filter((a) => a.provinsi == this.selectedProvinsi)
      this.kabupatenOption = filtered[0].kabupatens
      console.log(this.kabupatenOption)
    },
    handleView() {
      this.isSubmit = true
      if (this.selectedProvinsi && this.selectedProvinsi) {
        const dataSource = [...this.customers]
        this.displays = dataSource.filter(
          (x) => x.provinsi == this.selectedProvinsi && x.kabupaten == this.selectedKabupaten,
        )
        this.isSubmit = false
      } else {
        message.error('Provinsi & Kabupaten wajib diisi')
        this.isSubmit = false
      }
    },
    fetchGetRegion() {
      this.isLoading = true
      getRegionList()
        .then((response) => {
          if (response) {
            this.provinsiOption = response
          }
          this.isLoading = false
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fetchGetCustomers() {
      this.isLoading = true
      getTokoList()
        .then((response) => {
          if (response) {
            this.customers = response
          }
          this.isLoading = false
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
