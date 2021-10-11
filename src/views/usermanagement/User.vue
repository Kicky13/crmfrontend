<template>
  <div>
    <a-card class="card card-top card-top-primary" :loading="isLoading">
      <div class="card-header d-flex align-items-center justify-content-between">
        <div>
          <strong> Filter By </strong>
          <a-select placeholder="Pilih Jabatan">
            <a-select-option
              v-for="(item, index) in userManagement.listUser"
              :key="`level_${index}`"
              :value="item.id_level_hirarki"
            >
              {{ item.nama_panjang }}
            </a-select-option>
          </a-select>
        </div>

        <Can do="create" on="News">
          <div class="d-flex">
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
            <a-button type="primary" class="float-right" @click="openModal()">
              <i class="fa fa-plus mr-2" />
              Tambah User
            </a-button>
          </div>
        </Can>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between mb-3">
          <div class="d-flex">
            <div class="align-self-center">
              <span>Show :</span>
            </div>
            <a-select
              :default-value="userManagementCRM.itemsPerPage[1]"
              class="mx-2"
              @change="handlePaginationSize"
            >
              <a-select-option
                v-for="itemPerPage in userManagementCRM.itemsPerPage"
                :key="itemPerPage"
              >
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
            v-model:value="keyword"
          />
        </div>
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="userManagementCRM.columns"
            :data-source="userManagementCRM.dataSourceTable"
            :row-key="data => data.id"
            :pagination="userManagementCRM.pagination"
          >
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #action="{ text }">
              <div>
                <button type="button" class="btn btn-warning mr-1" @click="showUserEditModal(text)">
                  <i class="fa fa-pencil-square-o mr-1" />
                  <span class="text-black">Ubah</span>
                </button>
                <button type="button" class="btn btn-outline-danger" @click="deleteConfirm(text)">
                  <i class="fa fa-trash mr-1" />
                  <span>Hapus</span>
                </button>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </a-card>
    <!-- User Edit Modal Start -->
    <a-modal
      v-model:visible="userManagementCRM.modalVisible"
      :title="'Tambah User'"
      :closable="false"
      :mask-closable="false"
    >
      <template #footer>
        <a-button key="back" @click="closeModal">Batal</a-button>
        <a-button @click="handleSubmit" :loading="isSubmit" key="submit" type="primary"
          >Simpan</a-button
        >
      </template>
      <a-form label-align="left" layout="vertical">
        <a-form-item label="Nama User" name="name">
          <a-input
            style="width: 100% !important"
            v-model:value="userManagementCRM.formState.name"
            placeholder="Ketik nama"
          />
        </a-form-item>
        <a-form-item label="Username" name="username">
          <a-input
            style="width: 100% !important"
            v-model:value="userManagementCRM.formState.username"
            placeholder="Ketik username"
          />
        </a-form-item>
        <!-- <a-form-item label="Password" name="password">
          <a-input
            style="width: 100% !important"
            v-model:value="userManagementCRM.formState.password"
            placeholder="Ketik password"
          />
        </a-form-item> -->
        <a-form-item label="Level" name="level">
          <a-select
            v-model:value="userManagementCRM.formState.id_level_hirarki"
            placeholder="Pilih Level"
          >
            <a-select-option
              v-for="(item, index) in userManagement.listUser"
              :key="`level_${index}`"
              :value="item.id_level_hirarki"
            >
              {{ item.nama_panjang }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Email" name="email">
          <a-input
            style="width: 100% !important"
            v-model:value="userManagementCRM.formState.email"
            placeholder="Ketik email"
          />
        </a-form-item>
        <a-form-item label="No HP" name="nohp">
          <a-input
            style="width: 100% !important"
            v-model:value="userManagementCRM.formState.nohp"
            placeholder="Ketik no hp"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- <vb-user-edit-modal
      :modal-visible="modalVisible"
      :username="editItem.namaJenisUser"
      :edit-username="editUsername"
      @handle-ok="handleOk"
      @handle-cancel="modalVisible = false"
    /> -->
    <!-- User Edit Modal End -->
  </div>
</template>

<script>
import {
  getLevelUser,
  deleteLevelUser,
  updateLevelUser,
  addLevelUser,
} from '@/services/connection/leveluser/api'
// import VbUserEditModal from './modal/UserEditModal'
import { notification } from 'ant-design-vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    // VbUserEditModal,
  },

  data() {
    return {
      // dataSourceTable: [],
      // pagination: {},
      // modalVisible: false,
      // editUsername: '',
      // editItem: {},
      // newUsername: '',
      // keyword: '',
      // isLoading: false,
      // columns: [
      //   {
      //     title: 'No.',
      //     dataIndex: 'no',
      //     key: 'no',
      //   },
      //   {
      //     title: 'ID Jenis User',
      //     dataIndex: 'idJenisUser',
      //     key: 'idJenisUser',
      //   },
      //   {
      //     title: 'Nama Jenis User',
      //     dataIndex: 'namaJenisUser',
      //     key: 'namaJenisUser',
      //   },
      //   {
      //     title: 'Action',
      //     dataIndex: 'id',
      //     key: 'id',
      //     slots: { customRender: 'action' },
      //   },
      // ],
    }
  },
  computed: {
    // dataTable() {
    //   return this.dataSourceTable.filter(dataSource =>
    //     dataSource.namaJenisUser.toLowerCase().includes(this.keyword.toLowerCase()),
    //   )
    // },
    ...mapState({
      userManagementCRM: state => state.userManagementCRM.data,
      userManagement: state => state.userManagement.data,
    }),
  },
  mounted() {
    // this.fetchLevelUsers()
    // this.removeAction()
    this.getListUserCRM()
    this.getListJenisUser()
  },
  methods: {
    ...mapActions('userManagementCRM', [`getListUserCRM`, 'postSubmitData', 'deleteDataUser']),
    ...mapActions('userManagement', ['getListJenisUser']),
    openModal() {
      this.userManagementCRM.modalVisible = true
      this.getListJenisUser()
    },

    closeModal() {
      this.userManagementCRM.modalVisible = false
    },
    // fetchLevelUsers() {
    //   this.isLoading = true
    //   getLevelUser()
    //     .then(response => {
    //       let i = 1
    //       this.dataSourceTable = []
    //       if (response) {
    //         response.forEach(item => {
    //           item.no = i++
    //           this.dataSourceTable.push(item)
    //           setTimeout(() => {
    //             this.isLoading = false
    //           }, 800)
    //         })
    //       }
    //     })
    //     .catch(err => {
    //       console.error(err)
    //       setTimeout(() => {
    //         this.isLoading = false
    //       }, 800)
    //     })
    // },
    // addNewLevelUser(data) {
    //   addLevelUser(data)
    //     .then(response => {
    //       console.log(response)
    //       this.fetchLevelUsers()
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
    // deleteLevelUserById(id) {
    //   deleteLevelUser(id)
    //     .then(response => {
    //       console.log(response)
    //       this.fetchLevelUsers()
    //     })
    //     .catch(err => {
    //       console.error(err)
    //     })
    // },
    // updateLevelUserById(id, data) {
    //   updateLevelUser(id, data)
    //     .then(response => {
    //       console.log(response)
    //       this.fetchLevelUsers()
    //     })
    //     .catch(err => {
    //       console.error(err)
    //     })
    // },
    async deleteConfirm(id) {
      this.$confirm({
        title: 'Hapus User',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.deleteDataUser({
            data_id: id,
          })
          this.getListUserCRM()
        },
        onCancel() {
          this.getListUserCRM()
        },
      })
    },
    // makeIdUser() {
    //   let id = ''
    //   for (let i = 0; i < 4; i++) {
    //     const random = Math.floor(Math.random() * 9) + 1
    //     id += random
    //   }

    //   return id
    // },
    // addNewUsername() {
    //   let check = this.newUsername.trim()
    //   if (check) {
    //     const dataForm = {
    //       idJenisUser: this.makeIdUser(),
    //       namaJenisUser: this.newUsername,
    //     }
    //     const exist = this.dataSourceTable.find(
    //       data => data.namaJenisUser.toLowerCase() === dataForm.namaJenisUser.toLowerCase(),
    //     )
    //     if (!exist) {
    //       this.addNewLevelUser(dataForm)
    //       notification.success({
    //         message: 'Tambah User',
    //         description: 'User berhasil ditambah',
    //       })
    //       this.newUsername = ''
    //     } else {
    //       notification.warning({
    //         message: 'Tambah User',
    //         description: 'User sudah tersedia',
    //       })
    //     }
    //   } else {
    //     notification.error({
    //       message: 'Tambah User',
    //       description: 'Kolom tambah user masih kosong',
    //     })
    //   }
    // },
    handlePaginationSize(size) {
      this.userManagementCRM.pagination.pageSize = size
    },
    formValidation() {
      if (
        this.userManagementCRM.formState.name &&
        this.userManagementCRM.formState.username &&
        this.userManagementCRM.formState.email &&
        this.userManagementCRM.formState.nohp &&
        this.userManagementCRM.formState.id_level_hirarki
      ) {
        return true
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
      }
    },
    handleSubmit() {
      if (this.formValidation()) {
        this.postSubmitData()
        this.getListUserCRM()
        this.closeModal()
      } else {
        this.closeModal()
        this.getListUserCRM()
      }
    },
    // getUserEdit(id) {
    //   const row = this.dataSourceTable.find(data => data.id === id)
    //   this.editItem.id = row.id
    //   this.editItem.idJenisUser = row.idJenisUser
    //   this.editItem.namaJenisUser = row.namaJenisUser
    //   this.editUsername = row.namaJenisUser
    // },
    async showUserEditModal(data) {
      const row = this.userManagementCRM.dataSourceTable.find(data => data === id)
      console.log(`---showUserEditModal`, row)
      this.userManagementCRM.modalVisible = true
    },
    // handleOk(newEditUsername) {
    //   this.editItem.namaJenisUser = newEditUsername
    //   this.updateLevelUserById(this.editItem.id, this.editItem)
    //   notification.success({
    //     message: 'Update User',
    //     description: 'User berhasil diupdate',
    //   })
    //   this.resetAfterSubmit()
    //   this.modalVisible = false
    // },
    // removeAction() {
    //   const abilityUser = this.$store.state.user.ability
    //   const check = abilityUser.filter(
    //     ability => ability.action === 'update' || ability.action === 'delete',
    //   )
    //   if (!check.length) {
    //     this.columns.pop()
    //   }
    // },
    resetAfterSubmit() {
      this.editItem = {}
      this.editUsername = ''
      this.keyword = ''
    },
  },
}
</script>
