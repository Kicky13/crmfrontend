<template>
  <div>
    <loading v-model:active="isLoading" :is-full-page="fullPage" />
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Setting Radius Lock Distrik</strong>
        <a-button type="primary" class="mb-3 float-right" @click="openModal">
          <i class="fa fa-plus mr-2" />
          Tambah Setting Radius
        </a-button>
      </div>
      <div class="card-body">
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="radiusDistrik.columns"
            :data-source="radiusDistrik.listRadiusDistrik"
            row-key="id"
          >
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
        <a-modal
          v-model:visible="visible"
          title="Form Setting Radius"
          :closable="false"
          :mask-closable="false"
        >
          <template #footer>
            <a-button key="back" @click="handleCancel" id="cancelForm" :loading="confirmLoading"
              >Batal</a-button
            >
            <a-button
              key="submit"
              type="primary"
              id="submitForm"
              :loading="confirmLoading"
              @click="handleSave"
              >Simpan</a-button
            >
            <!-- <a-button
              v-else-if="stateForm == isUpdate"
              key="update"
              type="primary"
              id="updateForm"
              :loading="confirmLoading"
              @click="handleUpdate"
              >Ubah</a-button
            > -->
          </template>
          <a-form
            :model="radiusDistrik.formData"
            label-align="left"
            layout="vertical"
            :rules="radiusDistrik.rules"
          >
            <a-input-number
              style="width:100% !important; display: none;"
              v-model:value="radiusDistrik.formData.id"
            />
            <a-form-item label="Pilih Distrik" name="distrikid">
              <a-select
                v-model:value="radiusDistrik.formData.distrikid"
                show-search
                placeholder=" -- Pilih Distrik -- "
                name="distrikval"
              >
                <!-- <a-select-option disabled value="">Pilih Salah Satu</a-select-option> -->
                <a-select-option
                  v-for="(distrik, index) in radiusDistrik.dataDistrik"
                  :value="distrik.ID_DISTRIK"
                  :key="index"
                >
                  {{ distrik.ID_DISTRIK }} - {{ distrik.NM_DISTRIK }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Jarak Target" name="radius">
              <a-input-number
                style="width:100% !important"
                v-model:value="radiusDistrik.formData.radius"
                class="input-style"
                :min="0"
                :max="1000000"
                name="radiusval"
              />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// import {
//   getDataList,
//   deleteData,
//   insertData,
//   updateData,
// } from '@/services/connection/radius-distrik/api'
import { getDistrikList } from '@/services/connection/master-data/api'
import { message } from 'ant-design-vue'
// import { Modal } from 'ant-design-vue'
import { defineComponent, reactive, toRaw } from 'vue'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
  name: 'VbAntDesign',
  components: {
    Loading,
  },
  setup() {
    const formState = reactive({
      id: null,
      rownum: null,
      distrikid: undefined,
      distrikname: '',
      radius: 0,
    })
    return {
      formState,
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
  computed: {
    ...mapState({
      radiusDistrik: state => state.radiusDistrik.data,
    }),
  },
  mounted() {
    // this.fetchGetDataSource()
    // this.fetchGetDataDistrik()
    this.getDataListDistrik()
    this.getDataDistrik()
  },
  methods: {
    ...mapActions('radiusDistrik', [
      'getDataListDistrik',
      'getDataDistrik',
      'postDataRadiusDistrik',
    ]),
    resetFormState() {
      this.formState.id = null
      this.formState.rownum = null
      this.formState.distrikid = undefined
      this.formState.distrikname = ''
      this.formState.radius = 0
      this.fetchGetDataSource()
      this.fetchGetDataDistrik()
    },
    openModal() {
      this.stateForm = 1
      // this.resetFormState()
      this.visible = true
    },
    showModal() {
      this.stateForm = 2
      this.visible = true
    },
    handleSave() {
      this.postDataRadiusDistrik()
      this.visible = false
      // this.isLoading = true;
      // this.confirmLoading = true;
      // if (this.radiusDistrik.formState.distrikid && this.radiusDistrik.formState.radius) {

      // } else {
      //   window.scrollTo({ top: 0, behavior: 'smooth' })
      //   // this.confirmLoading = false
      //   // this.isLoading = false
      // }
    },
    handleUpdate(e) {
      console.log(e)
      this.isLoading = true
      this.confirmLoading = true
      if (this.formState.id && this.formState.distrikid && this.formState.radius) {
        updateData(this.formState.id, toRaw(this.formState))
          .then(response => {
            if (response) {
              console.log(response)
              this.resetFormState()
              this.visible = false
              this.confirmLoading = false
              this.isLoading = false
              message.success('Lock Radius Distrik Berhasil Diubah')
            }
          })
          .catch(err => {
            console.error(err)
            this.confirmLoading = false
            this.isLoading = false
            message.error('Lock Radius Distrik Gagal Diubah')
          })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.confirmLoading = false
        this.isLoading = false
      }
    },
    handleCancel(e) {
      console.log(e)
      this.visible = false
    },
    deleteDataById(id) {
      this.isLoading = true
      console.log('Deleted ID: ' + id)
      deleteData(id)
        .then(response => {
          if (response) {
            console.log(response)
            const dataSource = [...this.dataSourceTable]
            this.dataSourceTable = dataSource.filter(item => item.id !== id)
            this.isLoading = false
            message.success('Lock Radius Distrik Berhasil Dihapus')
          }
        })
        .catch(err => {
          console.error(err)
          message.error('Lock Radius Distrik Gagal Dihapus')
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
      })
    },
    // setSelectMethod(value) {
    //   const dataSource = [...this.listDistrik]
    //   const currentData = dataSource.filter(x => x.id === value)
    //   this.formState.distrikid = currentData[0].id
    //   this.formState.distrikname = currentData[0].distrik
    //   console.log(this.formState.distrikid)
    //   console.log(this.formState.distrikname)
    // },
    fetchGetDataSource() {
      getDataList()
        .then(response => {
          if (response) {
            this.dataSourceTable = response
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    fetchGetDataDistrik() {
      getDistrikList()
        .then(response => {
          if (response) {
            this.listDistrik = response
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    fetchUpdateData(id) {
      const dataSource = [...this.dataSourceTable]
      const currentData = dataSource.filter(x => x.id === id)
      console.log(currentData[0])
      this.showModal()
      this.formState.distrikid = currentData[0].distrikid
      this.formState.distrikname = currentData[0].distrikname
      this.formState.id = currentData[0].id
      this.formState.radius = currentData[0].radius
    },
  },
})
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
