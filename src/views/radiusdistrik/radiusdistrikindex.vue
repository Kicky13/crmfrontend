<template>
  <div>
    <loading v-model:active="isLoading" :is-full-page="fullPage" />
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Setting Radius Lock Wilayah</strong>
        <a-button type="primary" class="mb-3 float-right" @click="openModal">
          <i class="fa fa-plus mr-2" />
          Tambah Setting Radius
        </a-button>
      </div>

      <div class="card-body">
        <div class="filter_data mb-4">
          <div class="row">
            <div class="col-md-6 col-xs-12 d-flex">
              <div class="align-self-center">
                <span>Show :</span>
              </div>
              <a-select
                :default-value="radiusDistrik.itemsPerPage[1]"
                class="mx-2"
                @change="handlePaginationSize"
              >
                <a-select-option
                  v-for="itemPerPage in radiusDistrik.itemsPerPage"
                  :key="itemPerPage"
                >
                  {{ itemPerPage }}
                </a-select-option>
              </a-select>
              <div class="align-self-center">
                <span>entries</span>
              </div>
            </div>
            <div class="col-md-6 col-xs-12 ">
              
              <a-input-search
                placeholder="Cari nama distrik"
                style="width: 200px"
                v-model:value="radiusDistrik.bodyList.filter"
                class="float-right"
                @input="searchData"
                allow-clear
              />
              
            </div>
          </div>
        </div>

        <div class="table-responsive text-nowrap">
          <a-table
            :columns="radiusDistrik.columns"
            :data-source="radiusDistrik.listRadiusDistrik"
            :row-key="data => data.uuid"
            :loading="radiusDistrik.isLoading"
            :pagination="radiusDistrik.pagination"
          >
            <template #action="{ text }">
              <div>
                <button @click="fetchUpdateData(text)" type="button" class="btn btn-warning mr-2">
                  <i class="fa fa-pencil-square-o"></i>
                  <span class="text-black">Ubah</span>
                </button>
                <button @click="deleteSelected(text)" type="button" class="btn btn-outline-danger">
                  <i class="fa fa-trash"></i><span> Hapus </span>
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
              @click="stateForm == 1 ? handleSave() : handleUpdate()"
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
            <a-form-item label="Pilih Level Wilayah" name="wilayahid">
              <a-select
                v-model:value="radiusDistrik.formData.wilayahid"
                show-search
                placeholder=" -- Pilih Level Wilayah -- "
                @change="setSelectMethod"
                name="wilayahval"
                :disabled="isDisabled"
              >
                <!-- <a-select-option disabled value="">Pilih Salah Satu</a-select-option> -->
                <a-select-option
                  v-for="(wilayah, index) in radiusDistrik.dataWilayah"
                  :value="wilayah.ID_REFERENCE_LEVEL_WILAYAH"
                  :key="index"
                >
                  {{ wilayah.ID_REFERENCE_LEVEL_WILAYAH }} - {{ wilayah.NM_WILAYAH }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Pilih Distrik" name="distrikid">
              <a-select
                v-model:value="radiusDistrik.formData.distrikid"
                show-search
                placeholder=" -- Pilih Distrik -- "
                name="distrikval"
                :disabled="isDisabled"
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
                type="number"
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
import { getDataListRefWilayah, getDataList } from '@/services/connection/radius-distrik/api'
import { getDistrikList } from '@/services/connection/master-data/api'
import { message } from 'ant-design-vue'
// import { Modal } from 'ant-design-vue'
import { defineComponent, reactive, toRaw } from 'vue'
import { mapState, mapActions } from 'vuex'
import { _ } from 'vue-underscore'

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
      isDisabled: false,
      keyword: '',
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
    this.getDataWilayah()
    // this.getDataDistrik()
  },
  methods: {
    ...mapActions('radiusDistrik', [
      'getDataWilayah',
      'getDataListDistrik',
      'getDataDistrik',
      'postDataRadiusDistrik',
      'updateDataRadiusDistrik',
      'deleteDataRadiusDistrik',
    ]),
    searchData: _.debounce(function() {
      this.$store.commit('radiusDistrik/changeRadiusDistrik', {
        bodyList: {
          filter: this.radiusDistrik.bodyList.filter,
        },
      })

      this.getDataListDistrik()
    }, 3000),
    handlePaginationSize(size) {
      this.radiusDistrik.pagination.pageSize = size
    },
    resetFormState() {
      // this.radiusDistrik.formData.id = null
      this.radiusDistrik.formData.rownum = null
      this.radiusDistrik.formData.distrikid = null
      this.radiusDistrik.formData.wilayahid = null
      this.radiusDistrik.formData.distrikname = ''
      this.radiusDistrik.formData.radius = 0
    },
    disableFormState() {
      // this.radiusDistrik.formData.id = null
      this.radiusDistrik.formData.rownum = null
      this.radiusDistrik.formData.distrikid = disable
      this.radiusDistrik.formData.wilayahid = disable
      this.radiusDistrik.formData.distrikname = ''
      this.radiusDistrik.formData.radius = 0
    },
    openModal() {
      this.stateForm = 1
      this.resetFormState()
      this.visible = true
      this.isDisabled = false
    },
    showModal() {
      this.stateForm = 2
      this.isDisabled = true
      this.visible = true
    },
    async handleSave() {
      await this.postDataRadiusDistrik()
      await this.getDataListDistrik()
      this.visible = false
    },
    async handleUpdate(e) {
      await this.updateDataRadiusDistrik(this.radiusDistrik.formData.id)
      await this.getDataListDistrik()
      this.visible = false
    },
    handleCancel(e) {
      this.visible = false
    },

    deleteSelected(id) {
      this.$confirm({
        title: 'Hapus Setting Radius',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.deleteDataRadiusDistrik({
            id_distrik: id,
          })
          this.getDataListDistrik()
        },
        onCancel() {},
      })
    },
    setSelectMethod(value) {
      const id = value
      getDataListRefWilayah()
        .then(response => {
          if (response) {
            this.radiusDistrik.formData.distrikid = null
            this.getDataDistrik(id)
            // this.formState.namaproduk = post.namaproduk
          }
        })
        .catch(err => {
          if (err) {
          }
        })
    },
    fetchGetDataSource() {
      getDataList()
        .then(response => {
          if (response) {
            this.dataSourceTable = response
          }
        })
        .catch(err => {
          if (err) {
          }
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
          if (err) {
          }
        })
    },
    fetchUpdateData(value) {
      const id = value
      getDataList().then(response => {
        if (response) {
          const post = response.data.find(post => post.uuid === id)
          this.showModal()
          this.radiusDistrik.formData.wilayahid = post.idRefLevelWilayah
          this.radiusDistrik.formData.distrikid = post.id_distrik
          this.radiusDistrik.formData.distrikname = post.distrik_name
          this.radiusDistrik.formData.id = post.uuid
          this.radiusDistrik.formData.radius = post.radius_lock
        }
      })
      // const dataSource = [...this.dataSourceTable]
      // const currentData = dataSource.filter(x => x.id === id)
      // console.log(currentData[0])
      // this.showModal()
      // this.formState.distrikid = currentData[0].distrikid
      // this.formState.distrikname = currentData[0].distrikname
      // this.formState.id = currentData[0].id
      // this.formState.radius = currentData[0].radius
    },
  },
})
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
