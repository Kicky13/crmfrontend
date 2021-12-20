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
            <a-select-option v-for="data in kabupatenOption" :key="data.id" :value="data.id">{{
              data.kabupaten
            }}</a-select-option>
          </a-select>
          <a-button
            v-if="selectedKabupaten == null"
            :disabled="true"
            type="primary"
            :loading="koordinatLock.isLoading"
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
            placeholder="input search text"
            style="width: 200px"
          />
        </div>
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="koordinatLock.columnKoordLock"
            :data-source="koordinatLock.dataCustomer"
            :row-key="(data) => data.id_customer"
            :pagination="pagination"
            :scroll="{ x: 1500 }"
            :loading="koordinatLock.isLoading"
          >
            <template #action="text">
              <div>
                <button @click="gotoDetail(text)" type="button" class="btn btn-primary">
                  <router-link :to="`/koordinatlock/${text.id_customer}`">
                    <i class="fa fa-eye"></i>
                  </router-link>
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
import { mapState, mapActions } from 'vuex'
import { getRegionList, getTokoList } from '@/services/connection/koordinat-lock/api'
import { _ } from 'vue-underscore'

const itemsPerPage = [5, 10, 15, 20]
export default {
  name: 'VbAntDesign',
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
      koordinatLock: (state) => state.koordinatLock.data,
    }),
  },
  mounted() {
    this.fetchGetRegion()
    // this.fetchGetCustomers()
  },
  methods: {
    ...mapActions('koordinatLock', ['getDataCustomer']),
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    handleRegionChange() {
      const dataSource = [...this.provinsiOption]
      this.kabupatenOption = null
      this.selectedKabupaten = null
      const filtered = dataSource.filter((a) => a.id == this.selectedProvinsi)
      this.kabupatenOption = filtered[0].kabupatens
    },
    gotoDetail(id) {
      let data = this.getDetail(id)
      this.$router.push({
        name: 'koordinat-lock-detail',
        params: { customerInfo: JSON.stringify(data) },
      })
    },
    searchData: _.debounce(function () {
      this.fetchGetCustomers()
    }, 3000),
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
      this.tableLoading = true
      getRegionList()
        .then((response) => {
          if (response.status) {
            this.provinsiOption = response.data
          }
          this.tableLoading = false
        })
        .catch((err) => {
          if (err) {
          }
        })
    },
    async fetchGetCustomers() {
      await this.getDataCustomer({
        selectedKabupaten: this.selectedKabupaten,
        search: this.searchText,
      })
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
