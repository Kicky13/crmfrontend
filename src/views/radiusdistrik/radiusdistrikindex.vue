<template>
  <div> 
    <loading v-model:active="isLoading" :is-full-page="fullPage"/>   
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Setting Radius Lock Distrik</strong>
        <a-button
          type="primary"
          class="mb-3 float-right"
          @click="openModal"
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
                <button @click="fetchUpdateData(text)" type="button" class="btn btn-warning">
                  <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span>
                </button>
                <button @click="deleteSelected(text)" type="button" class="btn btn-outline-danger">
                  <i class="fa fa-trash"></i><span> Hapus</span>
                </button>
              </div>
            </template>
          </a-table>
        </div>
        <!-- <a-modal v-model:visible="visible" title="Form Setting Radius" :closable="false" :maskClosable="false" :confirm-loading="confirmLoading" @ok="handleOk"> -->          
        <a-modal v-model:visible="visible" title="Form Setting Radius" :closable="false" :mask-closable="false">
          <template #footer>
            <a-button key="back" @click="handleCancel" id="cancelForm" :loading="confirmLoading">Batal</a-button>
            <a-button v-if="stateForm==isSave" key="submit" type="primary" id="submitForm" :loading="confirmLoading" @click="handleSave">Simpan</a-button>
            <a-button v-else-if="stateForm==isUpdate" key="update" type="primary" id="updateForm" :loading="confirmLoading" @click="handleUpdate">Ubah</a-button>
          </template>
          <a-form label-align="left" layout="vertical" :rules="rules">
            <a-input-number style="width:100% !important; display: none;" v-model:value="idLock" />
            <a-form-item label="Pilih Distrik">
              <a-select v-model:value="selectedDistrik" @change="setSelectMethod" placeholder=" -- Pilih Distrik -- " name="distrik">
                <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                <a-select-option v-for="(distrik,index) in listDistrik" :value="distrik.id" :key="index">
                  {{ distrik.id }} - {{ distrik.distrik }}
                </a-select-option>
              </a-select>
            </a-form-item> 
            <a-form-item label="Jarak Target">
              <a-input-number style="width:100% !important" v-model:value="radiusLock" class="input-style" :min="0" :max="1000000" name="radius"/>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { getDataList, deleteData, insertData, updateData } from '@/services/connection/radius-distrik/api'
import { getDistrikList } from '@/services/connection/master-data/api'
import { Modal } from 'ant-design-vue'
import { toRaw } from 'vue'

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
  components: {
      Loading,
  },
  setup() {    
    const rules = {
      distrik: [
        {
          required: true,
          message: 'Pilih Salah Satu Distrik',
          type: 'string',
        },
      ],
      radius: [
        {
          required: true,
          message: 'Masukkan Nilai Radius',
          type: 'string',
        },
      ],
    }
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
      rules,
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
      radiusLock: null,
      dataSourceTable: [],
      visible: false,
      loading: false,
      confirmLoading: false,
      isSave: 1,
      isUpdate: 2,
      stateForm: 1,
      listDistrik: [],      
      isLoading: false,
      fullPage: true,
    }
  },
  mounted() {
    this.fetchGetDataSource()
    this.fetchGetDataDistrik()
  },
  methods: {
    openModal() {
      this.stateForm = 1
      this.selectedDistrik = null 
      this.idLock = null
      this.radiusLock = null
      this.visible = true
    },
    showModal() {
      this.stateForm = 2
      this.visible = true
    },
    handleSave(e) {
      console.log(e)
      this.confirmLoading = true;
      const params = { id: '', distrikid: this.selectedDistrik, radius: this.radiusLock }
      insertData(toRaw(params))
        .then((response) => {
          if (response) {
            console.log(response)
            this.visible = false
            this.confirmLoading = false
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handleUpdate(e) {
      console.log(e)
      this.confirmLoading = true;
      const params = { id: this.idLock, distrikid: this.selectedDistrik, radius: this.radiusLock }
      updateData(this.idLock, toRaw(params))
        .then((response) => {
          if (response) {
            console.log(response)
            this.visible = false
            this.confirmLoading = false
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handleCancel(e) {
      console.log(e)
      this.visible = false
    },
    deleteDataById(id) {           
      this.isLoading = true;
      // setTimeout(() => {
      // }, 2000);
      console.log("Deleted ID: " + id)
      deleteData(id)
      .then(response => {
        if (response) {
          console.log(response)
          const dataSource = [...this.dataSourceTable]
          this.dataSourceTable = dataSource.filter(item => item.id !== id)
          this.isLoading = false
        }
      })
      .catch(err => {
        console.error(err)
      })
    },
    deleteSelected(id) {
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
    fetchUpdateData(id) {
      const dataSource = [...this.dataSourceTable]
      const currentData = dataSource.filter(x => x.id === id)
      this.showModal()
      this.selectedDistrik = currentData[0].distrikid 
      this.idLock = currentData[0].id
      this.radiusLock = currentData[0].radius
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
