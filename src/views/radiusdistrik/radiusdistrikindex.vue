<template>
  <div>    
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Setting Radius Lock Distrik</strong>
        <a-button
          type="primary"
          class="mb-3 float-right"
          @click="showModal"
        >
          <i class="fa fa-plus mr-2" />
          Tambah Setting Radius
        </a-button>
      </div>
      <div class="card-body">
        <div class="table-responsive text-nowrap">
          <a-table :columns="columns" :data-source="dataSourceTable" row-key="id">
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #action="{ text }">
              <div>
                <button type="button" class="btn btn-warning" @click="showModal">
                  <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span>
                </button>
                <button @click="showConfirm(text)" type="button" class="btn btn-outline-danger">
                  <i class="fa fa-trash"></i><span> Hapus</span>
                </button>
              </div>
            </template>
          </a-table>
        </div>
        <a-modal v-model:visible="visible" title="Form Setting Radius" @ok="handleOk">
          <a-form :model="formState" label-align="left" layout="vertical">
            <a-input-number style="width:100% !important" v-model="radiusLock" :min="100" :max="1000000" />
            <a-form-item label="Pilih Distrik">
              <!-- <a-input type="file" placeholder="Pilih Distrik yang akan Dikunci"/> -->
              <a-select v-model="selectedDistrik" @change="setSelectMethod" placeholder=" -- Pilih Distrik -- ">
                <!-- <a-select-option value="1">Jawa Timur</a-select-option>
                <a-select-option value="2">Jawa Tengah</a-select-option>
                <a-select-option value="3">Jawa Barat</a-select-option> -->
                <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                <a-select-option v-for="(distrik,index) in listDistrik" :value="distrik.id" :key="index">
                  {{ distrik.id }} - {{ distrik.distrik }}
                </a-select-option>
              </a-select>
            </a-form-item> 
            <a-form-item label="Jarak Target">
              <!-- <a-input type="number" placeholder="Masukkan Jarak Maksimal (M)"/> -->
              <a-input-number style="width:100% !important" v-model="radiusLock" :min="0" :max="1000000" />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataList, deleteData } from '@/services/connection/radius-distrik/api'
import { getDistrikList } from '@/services/connection/master-data/api'
import { Modal } from 'ant-design-vue'

const columns = [
  {
    title: 'No.',
    dataIndex: 'rownum',
    key: 'rownum',
  },
  {
    title: 'Nama Distrik',
    dataIndex: 'distrikname',
    key: 'distrikname',
  },
  {
    title: 'Radius Lock (Meter)',
    dataIndex: 'radius',
    key: 'radius',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    width: 150,
    key: 'id',
    slots: { customRender: 'action' },
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
      file1: null,
      file2: null,      
      selectedDistrik: null,   
      idLock: null,
      radiusLock: 0,
      dataSourceTable: [],
      visible: false,
      loading: false,
      listDistrik: [],
    }
  },
  mounted() {
    this.fetchGetDataSource()
    this.fetchGetDataDistrik()
  },
  methods: {
    showModal() {
      console.log(this.visible)
      this.visible = true
      console.log(this.visible)
    },
    handleOk(e) {
      console.log(e)
      this.visible = false
    },
    handleCancel(e) {
      console.log(e)
      this.visible = false
    },
    deleteDataById(id) {      
      console.log("Deleted ID: " + id)
      deleteData(id)
      .then(response => {
        if (response) {
          console.log(response)
          const dataSource = [...this.dataSourceTable]
          this.dataSourceTable = dataSource.filter(item => item.id !== id)
        }
      })
      .catch(err => {
        console.error(err)
      })
    },
    showConfirm(id) {
      const deleteMethod = this.deleteDataById
      this.$confirm({
        title: 'Hapus Setting Radius',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk() {
          deleteMethod(id)
        },
      });
    }, 
    setSelectMethod(value) {
      this.selectValue = value
    },
    createRole() {
      this.$router.push({ name: 'permissions-create' })
    },
    deleteMarks() {
      console.log(this.rowSelection)
    },
    deleteAll() {},
    // deleteRow(id) {
    //   console.log("Deleted ID: " + id)
    //   deleteData(id)
    //   .then(response => {
    //     console.log(response)
    //     const dataSource = [...this.dataSourceTable]
    //     this.dataSourceTable = dataSource.filter(item => item.id !== id)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    // },
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
    fetchGetDataDistrik() {
      getDistrikList()
        .then((response) => {
          if (response) {
            this.listDistrik = response
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
