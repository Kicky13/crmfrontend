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
        <!-- <a-upload
          class="float-right"
          v-model:file-list="fileList"
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :headers="headers"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
        <b-form-file
          v-model="file1"
          :state="Boolean(file1)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        />         -->
        <a-form-item label="Upload File" class="mb-3 float-right" style="margin-right: 10px;">
          <a-input type="file" placeholder="Pilih File yang Akan diupload"/>
        </a-form-item>
        <div class="table-responsive text-nowrap">
          <a-table :columns="columns" :data-source="permissions" :scroll="{ x: 1500 }">
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
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
      </div>
    </div>
  </div>
</template>

<script>
import { getPermissionList, deletePermission } from '@/services/connection/roles-permissions/api'
// import { UploadOutlined } from '@ant-design/icons-vue';
// import { message } from 'ant-design-vue';

const columns = [
  {
    title: 'IdSales',
    dataIndex: 'actor',
    width: 100,
    fixed: 'left',
    slots: { customRender: 'name' },
  },
  {
    title: 'Nama Sales',
    dataIndex: 'actor',
    width: 150,
    fixed: 'left',
    slots: { customRender: 'name' },
  },
  {
    title: 'Distributor',
    dataIndex: 'actor',
    slots: { customRender: 'name' },
  },
  {
    title: 'Distrik',
    dataIndex: 'pagename',
  },
  {
    title: 'TSO',
    dataIndex: 'subject',
  },
  {
    title: 'Tahun',
    dataIndex: 'permission',
  },
  {
    title: 'Bulan',
    dataIndex: 'permission',
  },
  {
    title: 'N Jadwal',
    dataIndex: 'permission',
  },
  {
    title: 'Status',
    fixed: 'right',
    width: 150,
    dataIndex: 'permission',
  },
  // {
  //   title: 'Action',
  //   dataIndex: 'id',
  //   slots: { customRender: 'action' },
  // },
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
