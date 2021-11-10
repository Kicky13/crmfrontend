<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Log Sync Liferay</strong>
      </div>
      <div class="card-body">
        <div class="filter_data mb-4">
          <div class="row">
            <div class="col-md-6 col-xs-12 d-flex">
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
            <div class="col-md-6 col-xs-12 ">
              <a-input-search
                v-model="search"
                placeholder="input search text"
                style="width: 200px"
                class="float-right"
              />
            </div>
          </div>
        </div>

        <div class="data_table table-responsive text-nowrap">
          <a-table
            :columns="columns"
            :pagination="pagination"
            :data-source="dataSourceTable"
            :row-key="dataSourceTable => dataSourceTable.id"
            :loading="isLoading"
          >
            <template #no="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDataTableList } from '@/services/connection/log-async-customer/api'
const columns = [
  {
    title: 'Kode Distributor',
    dataIndex: 'kd_distributor',
    key: 'kd_distributor',
  },
  {
    title: 'Nama Distributor',
    dataIndex: 'nama_distributor',
    key: 'nama_distributor',
  },
  {
    title: 'Tgl Terakhir Di SYNC',
    dataIndex: 'tgl_terakhir',
    key: 'tgl_terakhir',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  },
]
export default {
  name: 'LogSynCustomer',
  setup() {
    return {
      columns,
    }
  },
  data() {
    return {
      itemsPerPage: [5, 10, 15, 20],
      dataSourceTable: [],
      pagination: {},
      search: '',
      isLoading: false,
    }
  },
  mounted() {
    this.getDataTable()
  },
  methods: {
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },

    getDataTable() {
      this.isLoading = true
      getDataTableList()
        .then(response => {
          let i = 1
          this.dataSourceTable = []
          if (response) {
            response.forEach(item => {
              item.no = i++
              this.dataSourceTable.push(item)
              this.isLoading = false
            })
          }
        })
        .catch(err => {
          console.error(err)
          this.isLoading = false
        })
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
