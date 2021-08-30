<template>
  <div>    
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Import Mapping Toko Sales Distributor</strong>
      </div>
      <div class="card-body">
        <a-button
          type="primary"
          class="mb-3"
        >
          <i class="fa fa-download mr-2" />
          Download Template Mapping Customer
        </a-button>
        
        <a-button
          type="primary"
          class="mb-3 float-right"
        >
          <i class="fa fa-eye mr-2" />
          Preview
        </a-button>
        <a-form-item label="Upload File" class="mb-3 float-right" style="margin-right: 10px;">
          <a-input type="file" placeholder="Pilih File yang Akan diupload"/>
        </a-form-item>
        <div class="table-responsive text-nowrap">
          <a-table :columns="columns" :data-source="dataSourceTable">
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #status="{ text }">
              <div v-if="text==sukses">
                <a-tag color="green">{{ text }}</a-tag>
              </div>              
              <div v-else-if="text==gagal">
                <a-tag color="red">{{ text }}</a-tag>
              </div>              
              <div v-else-if="text==nonwpm">
                <a-tag color="yellow">{{ text }}</a-tag>
              </div>
            </template>
            <template #action="{ text }">
              <div>
                <button type="button" class="btn btn-light">
                  <i class="fa fa-file-text-o"></i> <span class="text-black">Detail</span></button
                ><button type="button" class="btn btn-warning">
                  <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span></button
                ><button @click="deleteRow(text)" type="button" class="btn btn-outline-danger">
                  <i class="fa fa-trash"></i><span> Hapus</span>
                </button>
              </div>
            </template>
          </a-table>
        </div>        
        <a-button
          type="primary"
          class="mb-3 float-right"
        >
          <i class="fa fa-upload mr-2" />
          Commit to Database
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataList, deleteData } from '@/services/connection/mapping-customer/api'
// import { UploadOutlined } from '@ant-design/icons-vue';
// import { message } from 'ant-design-vue';

const columns = [
  {
    title: 'Id Sales',
    dataIndex: 'id',
    key: 'id',
    // fixed: 'left',
    slots: { customRender: 'name' },
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    // fixed: 'left',
    // slots: { customRender: 'name' },
  },
  {
    title: 'Id Customer',
    dataIndex: 'customerid',
    key: 'customerid',
    // slots: { customRender: 'name' },
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
    title: 'Nama Distributor',
    dataIndex: 'distributorname',
    key: 'distributorname',
  },
  {
    title: 'Status',
    // fixed: 'right',
    dataIndex: 'status',
    key: 'status',
    slots: { customRender: 'status' },
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
      sukses: "success",
      gagal: "failed",
      nonwpm: "Non WPM",
      file1: null,
      file2: null,
      dataSourceTable: [],
    }
  },
  mounted() {
    this.fetchGetDataSource()
  },
  methods: {
    createRole() {
      this.$router.push({ name: 'permissions-create' })
    },
    deleteMarks() {
      console.log(this.rowSelection)
    },
    deleteAll() {},
    deleteRow(id) {
      console.log("Deleted ID: " + id)
      deleteData(id)
      .then(response => {
        console.log(response)
        const dataSource = [...this.dataSourceTable]
        this.dataSourceTable = dataSource.filter(item => item.id !== id)
      })
      .catch(err => {
        console.error(err)
      })
    },
    fetchGetDataSource() {
      getDataList()
        .then((response) => {
          if (response) {
            this.dataSourceTable = response
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
@import './style.module.scss';
</style>
