<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header d-flex align-items-center justify-content-between">
        <div class="d-flex">
            <div class="align-self-center">
              <strong>Level User</strong>
              <button
                        data-toggle="tooltip" title="Help"
                        type="button"
                        class="btn btn-info btn-circle ml-3"
                        @click="helpQuestion()"
                      >
                        <i class="fa fa-question"></i>
                </button>
              </div>
          </div>
        <Can do="create" on="News">
          <div class="d-flex">
            <a-button type="primary" class="mb-3 float-right" @click="showModal">
            <i class="fa fa-plus mr-2" />
            Tambah Jenis User
          </a-button>
            <!-- <div class="align-self-center">
              <span>Tambah Jenis User :</span>
            </div>
            <a-input
              placeholder="Nama jenis user"
              class="mx-3"
              style="width: 200px"
              v-model:value="newUsername"
            />
            <a-button type="primary" @click="addNewUsername">
              <i class="fa fa-save mr-2" />
              Save
            </a-button> -->
          </div>
        </Can>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between mb-3">
          <div class="d-flex">
            <div class="align-self-center">
              <span>Show :</span>
            </div>
            <a-select :default-value="itemsPerPage[1]" class="mx-2" @change="handlePaginationSize">
              <a-select-option v-for="itemPerPage in itemsPerPage" :key="itemPerPage">
                {{ itemPerPage }}
              </a-select-option>
            </a-select>
            <div class="align-self-center">
              <span>entries</span>
            </div>
          </div>
          <a-input-search
            placeholder="input search text"
            style="width: 200px"
            @search="searchData"
          />
        </div>
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="columns"
            :data-source="dataList"
            :row-key="(dataSourceTable) => dataSourceTable.id"
            :pagination="pagination"
            :loading="isLoading"
          >
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #action="{ text }">
              <div>
                <button type="button" class="btn btn-success mr-1" @click="showModalEdit(text)">
                  <i class="fa fa-pencil-square-o mr-1" />
                  <span class="text-black">Ubah</span>
                </button>
                <!-- <button type="button" class="btn btn-danger" @click="deleteConfirm(text)">
                  <i class="fa fa-trash mr-1" />
                  <span>Hapus</span>
                </button> -->
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <!-- User Edit Modal Start -->
    <vb-user-edit-modal
      :modal-visible="modalVisible"
      :username="editItem.namaJenisUser2"
      :edit-username="editUsername"
      @handle-ok="handleOk"
      @handle-cancel="modalVisible = false"
    />
    <!-- User Edit Modal End -->
    <a-modal
          v-model:visible="modalHelp"
          :title="`Help Customer Level Users`"
          :closable="true"
          :mask-closable="false"
          
        >
          <template #footer>
            
            <a-pagination :total="20" :item-render="itemRender" />
          </template>
          
          <a-table
            :pagination="pagination"
           
          ></a-table>
        </a-modal>

        <a-modal
          v-model:visible="visible"
          title="Form Jenis User"
          @ok="statusModal ? handleUpdate() : handleInsert()"
        >
          <a-form :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="Nama Jenis User">
            <a-input
              
              class="mx-3 mb-2"
              style="width: 200px"
              v-model:value="formState.namaJenisUser"
            />
            </a-form-item>
            <a-form-item label="Tambah Sebagai Jabatan">
            <a-checkbox @change="checkJabatan" class="mx-3" :checked="checked">
              
            </a-checkbox>
            </a-form-item> 
            <a-form-item label="Pilih Jenis User">
              <a-select
                v-model:value="formState.hirarkiLevel"
                :disabled="isDisabled"
                placeholder=" -- Pilih Jenis User -- "
                required
              >
                <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                <a-select-option
                  v-for="(produk, index) in listProduk"
                  :value="produk.id_level_hirarki"
                  :key="index"
                >
                  {{ produk.nama_singkat }}
                </a-select-option>
              </a-select>
              
            </a-form-item>
            
            
          </a-form>
        </a-modal>
  </div>
</template>

<script>
import {
  levelUserList,
  deleteLevelUser,
  updateLevelUser,
  addLevelUser,
  getSelectUserList,
} from '@/services/connection/leveluser/api'

import VbUserEditModal from './modals/UserEditModal'
import { notification } from 'ant-design-vue'
import { toRaw } from 'vue'

const itemsPerPage = [5, 10, 15, 20]

export default {
  components: {
    VbUserEditModal,
  },
  setup() {
    return {
      itemsPerPage,
    }
  },
  data() {
    return {
      dataSourceTable: [],
      pagination: {},
      modalVisible: false,
      editUsername: '',
      editItem: {},
      listProduk: [],
      newUsername: '',
      isLoading: false,
      modalHelp:false,
      statusModal: false,
      visible: false,
      checkVisible:false,
       isDisabled: true,
       checked:false,
      formState: {
        idJenisUser: '',
        namaJenisUser:'',
        hirarkiLevel: '',
        
      },
      columns: [
        {
          title: 'No.',
          dataIndex: 'no',
          key: 'no',
        },
        {
          title: 'Nama Jenis User',
          dataIndex: 'namaJenisUser',
          key: 'namaJenisUser',
        },
        {
          title: 'Action',
          dataIndex: 'idJenisUser',
          key: 'idJenisUser',
          slots: { customRender: 'action' },
        },
      ],
      dataList: null,
    }
  },
  mounted() {
    this.fetchLevelUsers()
    this.removeAction()
    this.fetchGetDataProduk()
  },
  methods: {
    showModal() {
      this.visible = true
      this.statusModal = false
     
    },
    checkJabatan(e) {
      console.log(`checked = ${e.target.checked}`);
      if(e.target.checked === true){
        this.checked = true
        this.isDisabled = false
      }else{
        this.checked = false
        this.isDisabled = true
      }
    },
    fetchLevelUsers() {
      this.isLoading = true
      levelUserList()
        .then((response) => {
          let i = 1
          this.dataSourceTable = []
          if (response) {
            response.data.forEach((item) => {
              item.no = i++
              this.dataSourceTable.push(item)
            })
            this.dataList = this.dataSourceTable
            this.isLoading = false
          }
        })
        .catch((err) => {
          if (err) {
            this.isLoading = false
          }
        })
    },
    showModalEdit(value) {
      // alert('Masih dalam develop')
      const id = value
      this.visible = true
      this.statusModal = true
      // showpost(id)
      levelUserList()
        .then(response => {
          if (response) {
            const post = response.data.find(post => post.idJenisUser === id)
            console.log(post)
            this.formState.idJenisUser = post.id
            
            this.formState.hirarkiLevel = post.hirarkiLevel
            this.formState.namaJenisUser = post.namaJenisUser
            if (post.hirarkiLevel == '' || post.hirarkiLevel == null) {
              this.checked = false
              this.isDisabled = true
            }else{
              this.checked = true
              this.isDisabled = false
            }
          }
        })
        .catch(err => {
          if (err) {
          }
        })
    },
    handleInsert(){
       const formData = toRaw(this.formState)
        this.addNewLevelUser(formData)
          
    },
    handleUpdate(){
       const formData = toRaw(this.formState)
        this.updateLevelUserById(this.formState.idJenisUser,formData)
          
    },
    addNewLevelUser(data) {
      addLevelUser(data)
        .then((response) => {
          if (response) {
            this.fetchLevelUsers()
            notification.success({
            message: 'Tambah User',
            description: 'User berhasil ditambah',
          })
          }else{
              notification.warning({
                message: 'Tambah User',
                description: 'User sudah tersedia',
              })
          }
        })
        .catch((err) => {
          if (err) {
          }
        })
        this.visible = false
    },
   
    
    deleteLevelUserById(id) {
      deleteLevelUser(id)
        .then((response) => {
          if (response) {
            this.fetchLevelUsers()
          }
        })
        .catch((err) => {
          if (err) {
          }
        })
    },
    updateLevelUserById(id, data) {
      updateLevelUser(id, data)
        .then((response) => {
          if (response) {
            console.log(response)
            this.fetchLevelUsers()
            notification.success({
            message: 'Update User',
            description: 'User berhasil diupdate',
          })
          }else{
            notification.danger({
                message: 'Update User',
                description: 'Update Data Gagal',
              })
          }
        })
        .catch((err) => {
          if (err) {
          }
        })
        this.visible = false
    },
    deleteConfirm(id) {
      const deleteMethod = this.deleteLevelUserById
      this.$confirm({
        title: 'Hapus User',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk() {
          deleteMethod(id)
          notification.success({
            message: 'Hapus User',
            description: 'User berhasil dihapus',
          })
        },
      })
    },
    addNewUsername() {
      let check = this.newUsername.trim()
      if (check) {
        const dataForm = {}
        dataForm.namaJenisUser = this.newUsername
        const exist = this.dataSourceTable.find(
          (data) => data.namaJenisUser.toLowerCase() === dataForm.namaJenisUser.toLowerCase(),
        )
        if (!exist) {
          this.addNewLevelUser(dataForm)
          notification.success({
            message: 'Tambah User',
            description: 'User berhasil ditambah',
          })
          this.newUsername = ''
        } else {
          notification.warning({
            message: 'Tambah User',
            description: 'User sudah tersedia',
          })
        }
      } else {
        notification.error({
          message: 'Tambah User',
          description: 'Kolom tambah user masih kosong',
        })
        this.newUsername = ''
      }
    },
     fetchGetDataProduk() {
      getSelectUserList()
        .then(response => {
          if (response) {
            this.listProduk = response.data
          }
        })
        .catch(err => {
          if (err) {
          }
        })
    },
    setSelectMethod(value) {
      
      const id = value
      getSelectUserList()
        .then(response => {
          if (response) {
            const post = response.data.find(post => post.id_level_hirarki === id)
            this.formState.namaJenisUser = post.nama_singkat
          }
        })
        .catch(err => {
          if (err) {
          }
        })
    },
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    getUserEdit(id) {
      const row = this.dataSourceTable.find((data) => data.idJenisUser === id)
      this.editItem.idJenisUser = row.idJenisUser
      this.editItem.namaJenisUser = row.namaJenisUser
      this.editUsername = row.namaJenisUser
    },
    showUserEditModal(id) {
      this.getUserEdit(id)
      this.modalVisible = true
    },
    // handleOk(newEditUsername) {
    //   const dataForm = {}
    //   dataForm.idJenisUser = this.editItem.idJenisUser
    //   dataForm.namaJenisUser = newEditUsername
    //   this.updateLevelUserById(dataForm)
    //   notification.success({
    //     message: 'Update User',
    //     description: 'User berhasil diupdate',
    //   })
    //   this.resetAfterSubmit()
    //   this.modalVisible = false
    // },
    removeAction() {
      const abilityUser = this.$store.state.user.ability
      const check = abilityUser.filter(
        (ability) => ability.action === 'update' || ability.action === 'delete',
      )
      if (!check.length) {
        this.columns.pop()
      }
    },
    resetAfterSubmit() {
      this.editItem = {}
      this.editUsername = ''
      this.keyword = ''
    },
    searchData(keyword) {
      if (keyword) {
        this.dataList = this.dataSourceTable.filter((dataSource) =>
          dataSource.namaJenisUser.toLowerCase().includes(keyword.toLowerCase()),
        )
      } else {
        this.dataList = this.dataSourceTable
      }
    },
    async helpQuestion(){
      this.modalHelp = true
    },
  },
}
</script>
<style>
.btn-circle {
    width: 30px;
    height: 30px;
    padding: 6px 0px;
    border-radius: 15px;
    text-align: center;
    font-size: 12px;
    line-height: 1.42857;
}

</style>
