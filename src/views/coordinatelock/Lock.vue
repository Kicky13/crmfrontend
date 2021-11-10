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
            <a-select-option v-for="data in provinsiOption" :key="data.id" :value="data.id">{{
              data.provinsi
            }}</a-select-option>
          </a-select>
          <a-select v-model:value="selectedKabupaten" class="mx-3" style="width: 200px">
            <a-select-option disabled :value="null">Pilih salah satu</a-select-option>
            <a-select-option
              v-for="data in kabupatenOption"
              :key="data.id"
              :value="data.id"
              >{{ data.kabupaten }}</a-select-option
            >
          </a-select>
          <a-button v-if="selectedKabupaten == null" :disabled="true" type="primary" @click="handleView" :loading="isSubmit">
            <i class="fa fa-eye mr-2" />
            View
          </a-button>
          <a-button v-else type="primary" @click="handleView" :loading="isSubmit">
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
            :data-source="customers"
            :row-key="(customers) => customers.id_customer"
            :pagination="pagination"
            :scroll="{ x: 1500 }"
          >
            <template #action="text">
              <div>
                <button @click="gotoDetail(text)" type="button" class="btn btn-primary">
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
    dataIndex: 'id_customer',
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
    // this.fetchGetCustomers()
  },
  methods: {
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    handleRegionChange() {
      const dataSource = [...this.provinsiOption]
      this.kabupatenOption = null
      this.selectedKabupaten = null
      const filtered = dataSource.filter((a) => a.id == this.selectedProvinsi)
      this.kabupatenOption = filtered[0].kabupatens
      console.log(this.kabupatenOption)
    },
    gotoDetail(id) {
      let data = this.getDetail(id)
      this.$router.push({ name: 'koordinat-lock-detail', params: {customerInfo: JSON.stringify(data)} })
    },
    getDetail(id) {
      const dataSource = [...this.customers]
      const filtered = dataSource.filter((a) => a.id_customer == id.text)
      const detailData = filtered[0]

      return detailData
    },
    handleView() {
      this.isSubmit = true
      if (this.selectedKabupaten) {
        this.fetchGetCustomers()
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
          console.log(response)
          if (response.status) {
            this.provinsiOption = response.data
          }
          this.isLoading = false
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fetchGetCustomers() {
      this.isLoading = true
      let formData = {
        IDdistrik: this.selectedKabupaten,
        offset: 0,
        limit: 100,
      }
      getTokoList(formData)
        .then((response) => {
          if (response.status) {
            this.customers = response.data
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
