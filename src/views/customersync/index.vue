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
            :value="distri.ID_DISTRIBUTOR"
            :key="index"
          >
            {{ distri.ID_DISTRIBUTOR }} - {{ distri.NM_DISTRIBUTOR }}
          </a-select-option>
        </a-select>
        <a-button class="mb-3 btn_search mr-2" @click="buttonGet()">
          <i class="fa fa-search mr-2" />
          Cari
        </a-button>
        <a-button
          type="primary"
          class="mb-3"
          :loading="synCustomer.isLoading"
          @click="buttonGetSync()"
        >
          <i class="fa fa-refresh mr-2" />
          SYNC
        </a-button>

        <div class="row">
          <div class="col-md-6 col-xs-12"></div>
          <div class="col-md-6 col-xs-12">
            <a-input-search
              v-if="synCustomer.listCustomer.length > 0"
              placeholder="Cari nama customer"
              style="width: 200px"
              class="float-right"
              v-model:value="synCustomer.bodyList.filter"
              @input="searchData"
            />
            <a-input-search
              v-else
              disabled
              placeholder="Cari nama customer"
              style="width: 200px"
              class="float-right"
            />
          </div>
        </div>
        <br />
        <!-- <span>Selected: {{ selectValue }}</span
        > -->
        <br />

        <div class="table-responsive text-nowrap">
          <a-table
            :columns="columns"
            :data-source="synCustomer.listCustomer"
            :row-key="data => data.id"
            :loading="synCustomer.isLoading"
          >
            <template #status="{text}"> {{ text.status }} 1111 </template>
            <template #action="{ text }">
              <div>
                <button type="button" class="btn btn-light">
                  <i class="fa fa-file-text-o"></i> <span class="text-black">Detail</span>
                </button>
                <button type="button" class="btn btn-warning">
                  <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span>
                </button>
                <button @click="deleteRow(text)" type="button" class="btn btn-outline-danger">
                  <i class="fa fa-trash"></i><span> Hapus</span>
                </button>
              </div>
            </template>
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
  // getDistributorList,
  getDataList,
  deleteData,
  getDataTokoDistributor,
} from '@/services/connection/customer-sync/api'
// import { getDistributorList } from '@/services/connection/master-data/api'
// import { UploadOutlined } from '@ant-design/icons-vue';
import { mapState, mapActions } from 'vuex'
import { _ } from 'vue-underscore'

const columns = [
  {
    title: 'No',
    dataIndex: 'id',
    key: 'id',
    // fixed: 'left',
    slots: { customRender: 'name' },
  },
  {
    title: 'ID Toko',
    dataIndex: 'customerid',
    key: 'customerid',
    // fixed: 'left',
    // slots: { customRender: 'name' },
  },
  {
    title: 'Nama Toko',
    dataIndex: 'customername',
    key: 'customername',
    // slots: { customRender: 'name' },
  },
  {
    title: 'Nama Distributor',
    dataIndex: 'distributorname',
    key: 'distributorname',
  },
  {
    title: 'Nama Customer',
    dataIndex: 'customername',
    key: 'customername',
  },
  {
    title: 'Id Distributor',
    dataIndex: 'distributorid',
    key: 'distributorid',
  },
  {
    title: 'Status',
    // fixed: 'right',
    dataIndex: 'status',
    key: 'status',
  },
]
export default {
  name: 'VbAntDesign',
  // components: {
  //   UploadOutlined,
  // },

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
    }
  },
  computed: {
    ...mapState({
      synCustomer: state => state.synCustomer.data,
    }),
  },
  mounted() {
    // this.fetchGetDataSource()
    this.getListDistributor()
  },
  methods: {
    ...mapActions('synCustomer', ['getListDistributor', 'getDataListCustomer', 'getAsyncData']),
    searchData: _.debounce(function() {
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
      this.selectValue = value
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
      }
    },
    buttonGet() {
      if (this.selectValue == '' || this.selectValue == null) {
        this.$message.error('Pilih Distributor Terlebih Dahulu!')
      } else {
        this.getDataListCustomer({
          id_distrib: this.selectValue,
        })
      }
    },

    /* UNTUK GET DATA DISTRIBUTOR BY API*/
    fetchGetDataTokoDistributorLis() {
      getDataList()
        .then(response => {
          const hide = this.$message.loading('Action in progress..', 0)
          if (response) {
            this.dataSourceTable = response
          }
        })
        .catch(err => {
          if (err) {
          }
        })
        .finally(() => (this.loading = false))
    },

    // fetchGetDataSource() {
    //   getDistributorList()
    //     .then(response => {
    //       if (response) {
    //         this.listDistributor = response
    //       }
    //     })
    //     .catch(err => {
    //       console.error(err)
    //     })
    // },
  },
}
</script>
<style lang="scss" module scoped>
@import './style2.module.scss';
</style>
