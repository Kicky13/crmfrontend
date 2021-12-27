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
            show-search
            placeholder="Pilih provinsi"
          >
            <a-select-option v-for="data in provinsiOption" :key="data.id" :value="data.provinsi">{{
              data.provinsi
            }}</a-select-option>
          </a-select>
          <a-select
            show-search
            placeholder="Pilih kab/kota"
            v-model:value="selectedKabupaten"
            class="mx-3"
            style="width: 200px"
          >
            <a-select-option
              v-for="data in kabupatenOption"
              :key="data.id"
              :value="data.kabupaten"
              >{{ data.kabupaten }}</a-select-option
            >
          </a-select>
          <a-button
            v-if="selectedKabupaten == null"
            :disabled="true"
            type="primary"
            @click="handleView"
            :loading="isSubmit"
          >
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
          <a-input-search
            v-model:value="searchText"
            @input="searchData"
            placeholder="Cari toko"
            style="width: 200px"
          />
        </div>
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="columns"
            :data-source="customers"
            :row-key="customers => customers.id_customer"
            :pagination="pagination"
            :scroll="{ x: 1500 }"
            :loading="tableLoading"
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
import { _ } from 'vue-underscore'
import { mapState, mapActions } from 'vuex'

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
    width: 200,
    fixed: 'left',
  },
  {
    title: 'Alamat',
    dataIndex: 'alamat',
    ellipsis: true,
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
    dataIndex: 'kordinat',
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
      customers: [],
      displays: [],
      provinsiOption: [],
      kabupatenOption: [],
      pagination: {},
      selectedProvinsi: null,
      selectedKabupaten: null,
      searchText: '',
      isLoading: false,
      isSubmit: false,
      tableLoading: false,
    }
  },
  computed: {
    ...mapState({
      koordinatLock: state => state.koordinatLock.data,
    }),
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
      let filterProvince = dataSource.filter(item => item.provinsi == this.selectedProvinsi)
      this.kabupatenOption = null
      this.selectedKabupaten = null
      const filtered = dataSource.filter(a => a.provinsi == filterProvince[0].provinsi)
      this.kabupatenOption = filtered[0].kabupatens
    },
    gotoDetail(id) {
      let data = this.getDetail(id)
      let dataSource = [...this.kabupatenOption]
      let filterIdKabupaten = dataSource.filter(item => item.kabupaten == this.selectedKabupaten)
      let id_customer = JSON.stringify(data.id_customer)
      let id_distrik = filterIdKabupaten[0].id
      this.$router.push(`/koordinatlock/detail/${id_customer}/wilayah/${id_distrik}`)
    },
    searchData: _.debounce(function() {
      this.fetchGetCustomers()
    }, 3000),
    getDetail(id) {
      const dataSource = [...this.customers]
      const filtered = dataSource.filter(a => a.id_customer == id.text)
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
      this.tableLoading = true
      getRegionList()
        .then(response => {
          if (response.status) {
            this.provinsiOption = response.data
          }
          this.tableLoading = false
        })
        .catch(err => {
          if (err) {
          }
        })
    },
    async fetchGetCustomers() {
      this.tableLoading = true
      let dataSource = [...this.kabupatenOption]
      let filterIdKabupaten = dataSource.filter(item => item.kabupaten == this.selectedKabupaten)
      let formData = {
        IDdistrik: filterIdKabupaten[0].id,
        offset: 0,
        limit: 100,
        q: this.searchText,
      }
      getTokoList(formData)
        .then(response => {
          if (response.status) {
            this.customers = response.data
          }
          this.tableLoading = false
        })
        .catch(err => {
          if (err) {
          }
        })
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
