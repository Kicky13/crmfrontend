<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>SYNC DATA TOKO FROM LIFERAY</strong>
      </div>
      <div class="card-body">
        <a-select v-model="selected" class="col-lg-5 col-md-5 pr-2" @change="setSelectMethod"
                  placeholder=" -- Pilih Distributor --">
          <a-select-option disabled value="">Please Select</a-select-option>
          <a-select-option v-for="(distri,index) in listDistributor" :value="distri.id" :key="index">
            {{ distri.id }} - {{ distri.distributorname }}
          </a-select-option>
        </a-select>
        <a-button type="primary" class="mb-3" @click="buttonGet">
          <i class="fa fa-search mr-2"/>
          Get Customer
        </a-button>
        <br>
        <span>Selected: {{ selectValue }}</span><br>


        <div class="table-responsive text-nowrap">
          <a-table :columns="columns" :data-source="dataSourceTable">
            <template #action="{ text }">
              <div>
                <button type="button" class="btn btn-light">
                  <i class="fa fa-file-text-o"></i> <span class="text-black">Detail</span></button>
                <button type="button" class="btn btn-warning">
                  <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span></button>
                <button @click="deleteRow(text)" type="button" class="btn btn-outline-danger">
                  <i class="fa fa-trash"></i><span> Hapus</span>
                </button>
              </div>
            </template>
          </a-table>
        </div>


        <a-button type="primary" class="mt-3 float-right">
          <i class="fa fa-upload mr-2"/>
          Save to Database
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {select} from 'ant-design-vue';
import {
  getDistributorList,
  getDataList,
  deleteData,
  getDataTokoDistributor,
} from '@/services/connection/customer-sync/api'
// import { UploadOutlined } from '@ant-design/icons-vue';

const columns = [
  {
    title: 'No',
    dataIndex: 'id',
    key: 'id',
    // fixed: 'left',
    slots: {customRender: 'name'},
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
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      getCheckboxProps: (record) => ({
        props: {
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        },
      }),
    }
    const fileList = [];
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
  mounted() {
    this.fetchGetDataSource()

  },
  methods: {
    onSuccess(response) {
      this.error = false;
      this.loading = false;
      this.post = response.body;
    },
    onError(response) {
      console.error(response);
      this.loading = false;
      this.error = true;
    },
    setSelectMethod(value) {
      this.selectValue = value
    },
    createRole() {
      this.$router.push({name: 'permissions-create'})
    },
    buttonGet: function (event) {
      if (this.selectValue == '' || this.selectValue == null) {
        this.$message.error('Pilih Distributor Terlebih Dahulu!');
      } else {
        this.fetchGetDataTokoDistributorLis(this.selectValue)
      }
    },

    /* UNTUK GET DATA DISTRIBUTOR BY API*/
    fetchGetDataTokoDistributorLis() {
      getDataList()
        .then((response) => {
          const hide = this.$message.loading('Action in progress..', 0);
          if (response) {
            this.dataSourceTable = response
          }
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => (this.loading = false))

    },

    fetchGetDataSource() {
      getDistributorList()
        .then((response) => {
          if (response) {
            this.listDistributor = response
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
<style lang="scss" module>
@import './style2.module.scss';
</style>
