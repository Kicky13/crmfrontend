<template>
  <div>
    <a-card class="card card-top card-top-primary" :loading="isLoading">
      <div class="card-header d-flex align-items-center justify-content-between">
        <div></div>

        <Can do="create" on="UserManagement">
          <div class="d-flex">
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
            placeholder="Cari nama"
            style="width: 200px"
            v-model:value="userManagementCRM.table.q"
            @search="searchData"
          />
        </div>
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="userManagementCRM.columns"
            :data-source="userManagementCRM.dataSourceTable"
            :row-key="data => data.uuid"
            :loading="userManagementCRM.isLoading"
            :pagination="userManagementCRM.pagination"
            @change="handleTableChange"
          >
            <template #no="{ index }">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #action="{ text }">
              <div>
                <Can do="read" on="UserManagement">
                  <button
                    type="button"
                    class="btn btn-info mr-1"
                    @click="showModalPassword(text)"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Lihat Password"
                  >
                    <i class="fa fa-eye mr-1" />
                    <!-- <span class="text-black">View Password</span> -->
                  </button>
                </Can>
                <Can do="update" on="UserManagement">
                  <button
                    type="button"
                    class="btn btn-success mr-1"
                    data-toggle="tooltip"
                    title="Sunting Data"
                    @click="showUserEditModal(text)"
                  >
                    <i class="fa fa-pencil-square-o mr-1" />
                  </button>
                </Can>
                <Can do="delete" on="UserManagement">
                  <button
                    type="button"
                    class="btn btn-danger mr-1"
                    data-toggle="tooltip"
                    title="Hapus Data"
                    @click="deleteConfirm(text)"
                  >
                    <i class="fa fa-trash mr-1" />
                  </button>
                </Can>
                <Can do="update" on="UserManagement">
                  <button
                    @click="resetRow(text)"
                    type="button"
                    data-toggle="tooltip"
                    title="Reset Password"
                    class="btn btn-warning"
                  >
                    <i class="fa fa-refresh"></i>
                  </button>
                </Can>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </a-card>
    <!-- User Edit Modal Start -->
    <a-modal
      v-model:visible="userManagementCRM.modalVisible"
      :title="userManagementCRM.formState.id ? 'Edit User' : 'Tambah User'"
      :closable="false"
      :mask-closable="false"
    >
      <template #footer>
        <a-button key="back" @click="closeModal">Batal</a-button>
        <a-button
          @click="handleSubmit()"
          :loading="userManagementCRM.isLoading"
          key="submit"
          type="primary"
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
        <a-form-item label="Jenis" name="jenis">
          <a-select
            v-model:value="userManagementCRM.formState.id_jenis_user"
            placeholder="Pilih Jenis"
          >
            <a-select-option
              v-for="(item, index) in userManagementCRM.listUser"
              :key="`jenis_${index}`"
              :value="item.id"
            >
              {{ item.namaJenisUser }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Email" name="email">
          <a-input
            style="width: 100% !important"
            v-model:value="userManagementCRM.formState.email"
            placeholder="Ketik email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
        </a-form-item>
        <a-form-item label="No HP" name="nohp">
          <a-input
            style="width: 100% !important"
            type="number"
            v-model:value="userManagementCRM.formState.nohp"
            placeholder="Ketik no hp"
            pattern="^\d{12}$"
            :max-length="12"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="userManagementCRM.modalPreviewPassword"
      :title="`Lihat Password`"
      :closable="false"
      :mask-closable="false"
    >
      <template #footer>
        <a-button key="back" @click="userManagementCRM.modalPreviewPassword = false"
          >Batal</a-button
        >
        <a-button
          @click="handleSubmitPassword(itemPassword)"
          :loading="isSubmit"
          key="submit"
          type="primary"
          >Kirim</a-button
        >
      </template>
      <a-form label-align="left" layout="vertical">
        <a-form-item label="Autentikasi" name="password">
          <a-input-password
            style="width: 100% !important"
            v-model:value="userManagementCRM.formViewPassword.password"
            placeholder="Ketikan password untuk melihat"
          />
        </a-form-item>
      </a-form>
    </a-modal>
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
import { _ } from 'vue-underscore'

export default {
  components: {
    // VbUserEditModal,
  },

  data() {
    return {
      itemPassword: '',
    }
  },
  computed: {
    ...mapState({
      userManagementCRM: state => state.userManagementCRM.data,
      userManagement: state => state.userManagement.data,
    }),
  },
  mounted() {
    this.getListUserCRM()
    this.getListJenisUser()
  },
  methods: {
    ...mapActions('userManagementCRM', [
      `getListUserCRM`,
      'postSubmitData',
      'deleteDataUser',
      'getViewPassword',
      'getListJenisUser',
    ]),

    ...mapActions('userManagement', ['resetDataRow']),
    // async handleTableChange(pagination, filters, sorter) {
    //   if (pagination.pageSize === 5) {
    //     await this.$store.commit('userManagementCRM/changeUserManagementCRM', {
    //       table: {
    //         limit: 2000,
    //         offset: 0,
    //       },
    //     }),
    //       await this.getListUserCRM()
    //   }
    //   if (pagination.pageSize === 10) {
    //     await this.$store.commit('userManagementCRM/changeUserManagementCRM', {
    //       table: {
    //         limit: 2000,
    //         offset: 0,
    //       },
    //     }),
    //       await this.getListUserCRM()
    //   }
    //   if (pagination.pageSize === 15) {
    //     await this.$store.commit('userManagementCRM/changeUserManagementCRM', {
    //       table: {
    //         limit: 2000,
    //         offset: 0,
    //       },
    //     }),
    //       await this.getListUserCRM()
    //   }
    //   if (pagination.pageSize === 20) {
    //     await this.$store.commit('userManagementCRM/changeUserManagementCRM', {
    //       table: {
    //         limit: 2000,
    //         offset: 0,
    //       },
    //     }),
    //       await this.getListUserCRM()
    //   }
    // },
    showModalPassword(text) {
      this.userManagementCRM.modalPreviewPassword = true
      this.itemPassword = text
      this.$store.commit('userManagementCRM/changeUserManagementCRM', {
        formViewPassword: {
          password: '',
        },
      })
    },

    async handleSubmitPassword(item) {
      if (this.userManagementCRM.formViewPassword.password.length > 0) {
        await this.getViewPassword({
          user_id: item.userid,
          logged_user_id: this.$store.state.user.id,
        })
        this.countDown()
      } else {
        notification.error({
          message: 'Perhatian!',
          description: 'Password tidak boleh kosong',
        })
      }
    },
    countDown() {
      let secondsToGo = 30

      if (this.userManagementCRM.status === false) {
        const modal = this.$error({
          title: 'Opps, Mohon maaf !',
          content: this.userManagementCRM.messagePassword,
        })

        const interval = setInterval(() => {
          secondsToGo -= 1
          modal.update({
            content: this.userManagementCRM.messagePassword + ` (` + secondsToGo + `) `,
          })
        }, 1000)

        setTimeout(() => {
          clearInterval(interval)
          modal.destroy()
        }, secondsToGo * 1000)
      } else {
        const modal = this.$success({
          title: 'Lihat Password !',
          content: this.userManagementCRM.messagePassword,
        })

        const interval = setInterval(() => {
          secondsToGo -= 1
          modal.update({
            content: this.userManagementCRM.messagePassword + ` (` + secondsToGo + `) `,
          })
        }, 1000)

        setTimeout(() => {
          clearInterval(interval)
          modal.destroy()
        }, secondsToGo * 1000)
      }
    },
    searchData: _.debounce(function() {
      this.$store.commit('userManagementCRM/changeUserManagementCRM', {
        body: {
          offset: 1,
        },
      })

      this.getListUserCRM()
    }, 100),
    async openModal() {
      this.userManagementCRM.modalVisible = true
      await this.$store.commit('userManagementCRM/changeUserManagementCRM', {
        formState: {
          id: '',
          name: '',
          username: '',
          password: '',
          email: '',
          nohp: '',
          userid: '',
          id_level_hirarki: null,
          id_jenis_user: null,
          mobileAccess: null,
        },
      })
      this.getListJenisUser()
    },

    async closeModal() {
      this.userManagementCRM.modalVisible = false
    },
    resetRow(id) {
      this.$confirm({
        title: 'Apakah anda yakin akan reset password?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          this.resetDataRow({
            uuid: id.uuid,
          })
          this.getListUserCRM()
        },
        onCancel() {},
      })
    },
    async deleteConfirm(id) {
      this.$confirm({
        title: 'Hapus User',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.deleteDataUser({
            data_id: id.uuid,
          })
          await this.getListUserCRM()
        },
        onCancel() {},
      })
    },
    handlePaginationSize(size) {
      this.userManagementCRM.pagination.pageSize = size
    },
    formValidation() {
      if (this.userManagementCRM.formState.name && this.userManagementCRM.formState.username) {
        return true
      } else {
        if (!this.emailValidation(this.userManagementCRM.formState.email)) {
          notification.error({
            message: 'Gagal Menyimpan',
            description: 'Format email yang dimasukkan salah',
          })
        } else if (!this.phoneValidation(this.userManagement.formState.nohp)) {
          notification.error({
            message: 'Gagal Menyimpan',
            description: 'Format nomor maksimal 12 karakter',
          })
        } else {
          notification.error({
            message: 'Gagal Menyimpan',
            description: 'Semua kolom wajib diisi',
          })
        }
      }
    },
    emailValidation(email) {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    },
    phoneValidation(phone) {
      if (phone) {
        return phone.length <= 12 && phone.length >= 6 ? true : false
      } else {
        return false
      }
    },
    async handleSubmit() {
      if (this.formValidation()) {
        await this.postSubmitData()
        await this.getListUserCRM()
        this.closeModal()
      } else {
      }
    },

    async showUserEditModal(id) {
      const row = this.userManagementCRM.dataSourceTable.find(data => data.uuid === id.uuid)
      await this.$store.commit('userManagementCRM/changeUserManagementCRM', {
        formState: {
          id: row.uuid,
          name: row.name,
          username: row.username,
          password: row.password,
          email: row.email,
          nohp: row.nohp,
          userid: row.userid,
          id_level_hirarki: row.idLevelJabatan,
          id_jenis_user: row.idJenisUser,
          mobileAccess: row.idJenisUser == 5 || row.idJenisUser == 8 ? 1 : 0,
        },
      })
      this.userManagementCRM.modalVisible = true
    },
    resetAfterSubmit() {
      this.editItem = {}
      this.editUsername = ''
      this.keyword = ''
    },
  },
}
</script>
