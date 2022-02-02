<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>SYNC DATA TOKO FROM LIFERAY</strong>
      </div>
      <div class="card-body">
        <a-select
          v-model="selected"
          show-search
          class="col-lg-5 col-md-5 pr-2"
          @change="setSelectMethod"
          placeholder=" -- Pilih Distributor --"
        >
          <a-select-option disabled value="">Please Select</a-select-option>
          <a-select-option
            v-for="(distri, index) in synCustomer.listDistributor"
            :value="`${distri.ID_DISTRIBUTOR}-${distri.NM_DISTRIBUTOR}`"
            :key="index"
          >
            {{ distri.ID_DISTRIBUTOR }} - {{ distri.NM_DISTRIBUTOR }}
          </a-select-option>
        </a-select>
        <!-- <a-button class="mb-3 btn_search mr-2" @click="buttonGet()">
          <i class="fa fa-search mr-2" />
          Cari
        </a-button> -->
        <a-button class="mb-3 btn_search mr-2" @click="buttonGetData()">
          <i class="fa fa-search mr-2" />
          Get Data
        </a-button>
        <!-- <a-button
          type="primary"
          class="mb-3"
          :loading="synCustomer.isLoading"
          @click="buttonGetSync()"
        >
          <i class="fa fa-refresh mr-2" />
          SYNC
        </a-button> -->
        <Can do="update" on="SynCustomer">
          <a-button
            v-if="synCustomer.listCustomer.length > 0"
            type="primary"
            class="mb-3"
            :loading="synCustomer.isLoading"
            @click="buttonGetSyncNew()"
          >
            <i class="fa fa-refresh mr-2" />
            SYNC to Database
          </a-button>
        </Can>
        <div class="row">
          <div class="col-md-6 col-xs-12"></div>
          <div class="col-md-6 col-xs-12">
            <a-input-search
              :disabled="isDisabled"
              placeholder="Cari nama customer"
              style="width: 200px"
              class="float-right"
              @search="searchKeyword"
            />
            <!-- <a-input-search
              v-else
              disabled
              placeholder="Cari nama customer"
              style="width: 200px"
              class="float-right"
            /> -->
          </div>
        </div>
        <br />
        <br />

        <div class="table-responsive text-nowrap">
          <a-table
            :columns="columns"
            :data-source="synCustomer.listCustomer"
            :row-key="(data) => data.id"
            :loading="synCustomer.isLoading"
          >
            <template #status="{ text }"> {{ text.status }} </template>
          </a-table>
        </div>

        <!-- <a-button type="primary" class="mt-3 float-right">
          <i class="fa fa-upload mr-2" />
          Save to Database
        </a-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { select } from 'ant-design-vue'
import {
  getDataList,
  deleteData,
  getDataTokoDistributor,
} from '@/services/connection/customer-sync/api'
import { mapState, mapActions } from 'vuex'
import { _ } from 'vue-underscore'

const columns = [
  {
    title: 'ID Toko',
    dataIndex: 'bisnisKokohId',
    key: 'bisnisKokohId',
  },
  {
    title: 'Nama Toko',
    dataIndex: 'storeName',
    key: 'storeName',
  },
  {
    title: 'Kota',
    dataIndex: 'cityName',
    key: 'cityName',
  },
  {
    title: 'Provinsi',
    dataIndex: 'provinceName',
    key: 'provinceName',
  },
  {
    title: 'Area',
    dataIndex: 'areaName',
    key: 'areaName',
  },
  {
    title: 'Region',
    dataIndex: 'regionalName',
    key: 'regionalName',
  },
  {
    title: 'Segment',
    dataIndex: 'segment',
    key: 'segment',
  },
  {
    title: 'Status',
    dataIndex: 'storeStatus',
    key: 'storeStatus',
  },
]
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
    const fileList = []
    return {
      columns,
      rowSelection,
      fileList,
      headers: {
        authorization: 'authorization-text',
      },
    }
  },
  data() {
    return {
      selectValue: null,
      file1: null,
      file2: null,
      selected: null,
      selected2: null,
      dataSourceTable: [],
      listDistributor: [],
      listTokoDistributor: [],
      dataTemp: null,
      isDisabled: true,
    }
  },
  computed: {
    ...mapState({
      synCustomer: (state) => state.synCustomer.data,
    }),
  },
  mounted() {
    this.getListDistributor()
  },
  methods: {
    ...mapActions('synCustomer', [
      'getListDistributor',
      'getDataListCustomer',
      'getAsyncDataNew',
      'getDataCustomerMDXL',
    ]),
    searchData: _.debounce(function () {
      this.$store.commit('synCustomer/changeSynCustomer', {
        bodyList: {
          filter: this.synCustomer.bodyList.filter,
          limit: 10,
          offset: 1,
        },
      })

      this.getDataListCustomer({
        id_distrib: this.selectValue,
      })
    }, 3000),
    onSuccess(response) {
      this.error = false
      this.loading = false
      this.post = response.body
    },
    onError(response) {
      if (response) {
        this.loading = false
        this.error = true
      }
    },
    setSelectMethod(value) {
      const inputValue = value.split('-')[0]
      this.selectValue = inputValue
    },
    createRole() {
      this.$router.push({ name: 'permissions-create' })
    },
    buttonGetSync() {
      if (this.selectValue == '' || this.selectValue == null) {
        this.$message.error('Pilih Distributor Terlebih Dahulu!')
      } else {
        this.getAsyncData({
          kode_customer: this.selectValue,
        })
        this.isDisabled = false
      }
    },
    buttonGetSyncNew() {
      if (this.selectValue == '' || this.selectValue == null) {
        this.$message.error('Pilih Distributor Terlebih Dahulu!')
      } else {
        this.getAsyncDataNew({
          kode_customer: this.selectValue,
        })
        this.isDisabled = false
      }
    },
    buttonGet() {
      if (this.selectValue == '' || this.selectValue == null) {
        this.$message.error('Pilih Distributor Terlebih Dahulu!')
      } else {
        this.fetchDataListCustomer()
        this.isDisabled = false
      }
    },

    buttonGetData() {
      if (this.selectValue == '' || this.selectValue == null) {
        this.$message.error('Pilih Distributor Terlebih Dahulu!')
      } else {
        this.fetchDataCustomerMDXL()
        this.isDisabled = false
      }
    },

    async fetchDataListCustomer() {
      await this.getDataListCustomer({
        id_distrib: this.selectValue,
      })
      this.dataTemp = this.synCustomer.listCustomer
    },

    async fetchDataCustomerMDXL() {
      await this.getDataCustomerMDXL({
        id_distrib: this.selectValue,
      })
      this.dataTemp = this.synCustomer.listCustomer
    },

    /* UNTUK GET DATA DISTRIBUTOR BY API*/
    fetchGetDataTokoDistributorLis() {
      getDataList()
        .then((response) => {
          const hide = this.$message.loading('Action in progress..', 0)
          if (response) {
            this.dataSourceTable = response
          }
        })
        .catch((err) => {
          if (err) {
          }
        })
        .finally(() => (this.loading = false))
    },

    searchKeyword(keyword) {
      if (keyword) {
        const key = keyword.toLowerCase()
        const props = [
          'bisnisKokohId',
          'storeName',
          'cityName',
          'provinceName',
          'areaName',
          'regionalName',
          'segment',
          'storeStatus',
        ]
        props.forEach((prop) => {
          if (this.getDataFilter(prop, key).length) {
            this.synCustomer.listCustomer = this.getDataFilter(prop, key)
            return true
          }
        })
      } else {
        this.synCustomer.listCustomer = this.dataTemp
      }
    },

    getDataFilter(prop, keyword) {
      const notNullData = this.dataTemp.filter((item) => item[prop] !== null)
      return notNullData.filter((item) => item[prop].toLowerCase().includes(keyword))
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style2.module.scss';
</style>
