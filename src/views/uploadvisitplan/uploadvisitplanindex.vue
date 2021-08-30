<template>
  <div>    
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Import Visit Plan Sales Distributor</strong>
      </div>
      <div class="card-body">
        <div class="col-xs-12 col-md-12" style="margin-bottom: 10px;">
          <strong>Lihat Data</strong> : Sales Distributor dan Mapping Toko
          <a-button
            type="primary"
            class="mb-3"
          >
            Disini
          </a-button>
        </div>
        <a-button
          type="primary"
          class="mb-3"
        >
          <i class="fa fa-download mr-2" />
          Download Template Visit Plan
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
          <a-table :columns="columns" :data-source="permissions" :scroll="{ x: 1500 }">
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #days="{ text }">
              <div v-if="text==istrue">
                <a-checkbox checked="true"/>
              </div>              
              <div v-else-if="text==isfalse">
                <a-checkbox checked="true" disabled />
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
import { getPermissionList, deletePermission } from '@/services/connection/upload-visit/api'

const columns = [
  {
    title: 'Id Sales',
    dataIndex: 'idsales',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'Id Toko',
    dataIndex: 'customerid',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Nama Toko',
    dataIndex: 'customername',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'Distributor',
    dataIndex: 'distributor',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'Min',
    dataIndex: 'day1',
    slots: { customRender: 'days' },
  },
  {
    title: 'Sen',
    dataIndex: 'day2',
    slots: { customRender: 'days' },
  },
  {
    title: 'Sel',
    dataIndex: 'day3',
    slots: { customRender: 'days' },
  },
  {
    title: 'Rab',
    dataIndex: 'day4',
    slots: { customRender: 'days' },
  },
  {
    title: 'Kam',
    dataIndex: 'day5',
    slots: { customRender: 'days' },
  },
  {
    title: 'Jum',
    dataIndex: 'day6',
    slots: { customRender: 'days' },
  },
  {
    title: 'Sab',
    dataIndex: 'day7',
    slots: { customRender: 'days' },
  },
  {
    title: 'W1',
    dataIndex: 'week1',
    slots: { customRender: 'days' },
  },
  {
    title: 'W2',
    dataIndex: 'week2',
    slots: { customRender: 'days' },
  },
  {
    title: 'W3',
    dataIndex: 'week3',
    slots: { customRender: 'days' },
  },
  {
    title: 'W4',
    dataIndex: 'week4',
    slots: { customRender: 'days' },
  },
  {
    title: 'W5',
    dataIndex: 'week5',
    slots: { customRender: 'days' },
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
      isfalse: 0,
      istrue: 1,
      file1: null,
      file2: null,
      permissions: [],
    }
  },
  mounted() {
    this.fetchGetPermissions()
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
      deletePermission(id)
      .then(response => {
        console.log(response)
        const dataSource = [...this.permissions]
        this.permissions = dataSource.filter(item => item.id !== id)
      })
      .catch(err => {
        console.error(err)
      })
    },
    fetchGetPermissions() {
      getPermissionList()
        .then((response) => {
          if (response) {
            this.permissions = response
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
