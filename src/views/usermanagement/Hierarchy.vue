<template>
  <div>
    <a-card class="card card-top card-top-primary" :loading="isLoading">
      <div class="card-header d-flex">
        <a-tabs
          :default-active-key="0"
          @change="changeTabs"
          class="vb-tabs-bold justify-content-between mb-3"
        >
          <template v-if="userManagement.listUser.length > 0">
            <a-tab-pane
              v-for="menutab in userManagement.listUser"
              :key="menutab.id_level_hirarki"
              :tab="menutab.nama_panjang"
            />
          </template>
          <template v-else>
            <a-tab-pane key="1" tab="Data Jabatan Belum Tersedia"> </a-tab-pane>
          </template>
        </a-tabs>
      </div>
      <div class="card-header">
        <strong>{{ 'Daftar User ' + selectedTitle + ' (' + selectedShorthand + ')' }}</strong>
        <a-button
          v-if="selectedShorthand === `GSM`"
          type="primary"
          class="mb-3 float-right"
          @click="openModal"
        >
          <i class="fa fa-plus mr-2" />
          {{ 'Tambahkan Jabatan' }}
        </a-button>
        <!-- <a-button
          class="btn btn-success mb-3 float-right"
          style="margin-right: 5px; margin-left: 5px"
          @click="goExport"
        >
          <i class="fa fa-upload mr-2" />
          Export Users
        </a-button> -->
        <!-- <a-button @click="goImport" class="btn btn-light mb-3 float-right">
          <i class="fa fa-download mr-2" />
          Import Users
        </a-button> -->
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between mb-3">
          <div class="d-flex">
            <div class="align-self-center">
              <span>Show :</span>
            </div>
            <a-select
              :default-value="userManagement.itemsPerPage[1]"
              class="mx-2"
              @change="handlePaginationSize"
            >
              <a-select-option
                v-for="itemPerPage in userManagement.itemsPerPage"
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
            placeholder="Cari"
            style="width: 200px"
            v-model:value="userManagement.bodyList.filter"
            @input="searchData"
          />
        </div>
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="userManagement.columns"
            :data-source="userManagement.users"
            :row-key="(data) => data.idJabatan"
            :pagination="pagination"
            :loading="userManagement.isLoading"
          >
            <template #no="{ index }">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template #nama="{ text }">
              <div>
                {{ text.nama != null ? text.nama : '-' }}
              </div>
            </template>
            <template #start_date="{ text }">
              <div>
                {{ text.startDateJabat != null ? text.startDateJabat : '-' }}
              </div>
            </template>
            <template #end_date="{ text }">
              <div>
                {{ text.endDataJabat != null ? text.endDataJabat : '-' }}
              </div>
            </template>
            <template #username="{ text }">
              <div>
                {{ text.username != null ? text.username : '-' }}
              </div>
            </template>
            <template #action="{ text }">
              <div>
                <router-link
                  :to="`/users/profile/${text.idUser}/TSO/${text.idJabatan}`"
                  v-if="selectedShorthand === `TSO`"
                  :class="text.statusJabat === `Nonaktif` ? 'disabled' : ''"
                  type="button"
                  class="btn btn-light mr-2"
                >
                  <i class="fa fa-file-text-o mr-1"></i>
                  <span class="text-black">Detail</span>
                </router-link>
                <router-link
                  v-else-if="selectedShorthand != 'SALES DIS'"
                  :to="`/users/profile/${text.idUser}/jabatan/${text.idJabatan}`"
                  :class="text.statusJabat === `Nonaktif` ? 'disabled' : ''"
                  type="button"
                  class="btn btn-light mr-2"
                >
                  <i class="fa fa-file-text-o mr-1"></i>
                  <span class="text-black">Detail</span>
                </router-link>
                <button
                  v-if="text.statusJabat === `Nonaktif`"
                  type="button"
                  class="btn btn-warning mr-2"
                  @click="assignRow(text)"
                >
                  <i class="fa fa-pencil-square-o"></i>
                  <span class="text-black">Assign User</span></button
                ><button
                  v-if="text.statusJabat != `Nonaktif`"
                  @click="deleteRow(text.idJabatan)"
                  type="button"
                  class="btn btn-outline-danger mr-2"
                >
                  <i class="fa fa-trash"></i><span> Kosongkan Jabatan</span>
                </button>
              </div>
            </template>
          </a-table>
        </div>
        <!-- <a-modal
          v-model:visible="modalVisible"
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
                v-model:value="userManagement.formState.name"
                placeholder="Ketik nama"
              />
            </a-form-item>
            <a-form-item label="Username" name="username">
              <a-input
                style="width: 100% !important"
                v-model:value="userManagement.formState.username"
                placeholder="Ketik username"
              />
            </a-form-item>
            
            <a-form-item label="Email" name="email">
              <a-input
                style="width: 100% !important"
                v-model:value="userManagement.formState.email"
                placeholder="Ketik email"
              />
            </a-form-item>
            <a-form-item label="No HP" name="nohp">
              <a-input
                style="width: 100% !important"
                v-model:value="userManagement.formState.nohp"
                placeholder="Ketik no hp"
              />
            </a-form-item>
          </a-form>
        </a-modal> -->

        <a-modal
          v-model:visible="modalVisible"
          :title="'Assign User'"
          :closable="false"
          :mask-closable="false"
          :cancel-button-props="{ style: { display: 'none' } }"
        >
          <template #footer>
            <a-button key="back" @click="closeModalAssignUser">Batal</a-button>
            <a-button @click="handleSubmitAssignUser()" key="submit" type="primary"
              >Simpan</a-button
            >
          </template>
          <a-form label-align="left" layout="vertical">
            <a-form-item label="User" name="level">
              <a-select
                v-model:value="userManagement.form_assign_bawahan.id_user"
                placeholder="Pilih User"
                show-search
              >
                <a-select-option
                  v-for="(item, index) in userManagementCRM.dataSourceTable"
                  :key="`level_${index}`"
                  :value="item.userid"
                >
                  {{ item.userid }} - {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Tanggal Mulai Jabatan" name="level">
              <a-date-picker
                v-model:value="userManagement.form_assign_bawahan.tgl_mulai"
                :disabled-date="disabledStartDate"
                class="w-100"
              />
            </a-form-item>
            <a-form-item label="Tanggal Akhir Jabatan" name="level">
              <a-date-picker
                v-model:value="userManagement.form_assign_bawahan.tgl_akhir"
                :disabled-date="disabledEndDate"
                class="w-100"
              />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getUserList, insertUser } from '@/services/connection/user-management/api'
import { toRaw } from 'vue'
import { notification, message } from 'ant-design-vue'
import { mapState, mapActions } from 'vuex'
import { _ } from 'vue-underscore'

export default {
  name: 'VbAntDesign',
  data() {
    return {
      actiiveTabs: {},
      users: [],
      selectedTabId: 1,
      formState: {
        name: '',
        username: '',
        password: '',
        email: '',
        nohp: '',
        userid: '',
      },
      selectedTitle: '',
      selectedShorthand: '',
      pagination: {},
      modalVisible: false,
      isLoading: false,
      isSubmit: false,
    }
  },
  computed: {
    ...mapState({
      userManagement: (state) => state.userManagement.data,
      userManagementCRM: (state) => state.userManagementCRM.data,
    }),
  },
  async mounted() {
    await this.dataListUser()
  },
  methods: {
    ...mapActions('userManagement', [
      'getListJenisUser',
      'getDataTable',
      'postSubmitData',
      'deleteDataRow',
      'postJabatanGSM',
      'getSalesNonBawahan',
      'submitAssignSalesHirarki',
    ]),
    ...mapActions('userManagementCRM', ['getListUserCRM']),
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    disabledStartDate(startValue) {
      const endValue = this.userManagement.form_assign_bawahan.tgl_akhir
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.userManagement.form_assign_bawahan.tgl_mulai
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    searchData: _.debounce(function () {
      this.$store.commit('userManagement/changeUserManagement', {
        bodyList: {
          offset: 1,
        },
      })

      this.getDataTable({
        id_level_hirarki: this.actiiveTabs.id_level_hirarki,
      })
    }, 1000),
    async assignRow(item) {
      // const row = this.userManagement.users.find(data => data.uuid === id)
      // await this.$store.commit('userManagement/changeUserManagement', {
      //   formState: {
      //     id: row.uuid,
      //     name: row.name,
      //     username: row.username,
      //     password: row.password,
      //     email: row.email,
      //     nohp: row.nohp,
      //     userid: row.userid,
      //     idLevelHirarki: row.idLevelHirarki,
      //   },
      // })
      this.$store.commit('userManagement/changeUserManagement', {
        form_assign_bawahan: {
          id_jabatan: item.idJabatan,
        },
      })
      await this.getListUserCRM()
      this.modalVisible = true
    },
    closeModalAssignUser() {
      this.modalVisible = false
    },
    async handleSubmitAssignUser() {
      if (
        this.userManagement.form_assign_bawahan.id_user &&
        this.userManagement.form_assign_bawahan.tgl_mulai &&
        this.userManagement.form_assign_bawahan.tgl_akhir
      ) {
        await this.submitAssignSalesHirarki()
        this.closeModalAssignUser()
        await this.dataListUser()
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
        this.closeModalAssignUser()
      }
    },
    async dataListUser() {
      await this.getListJenisUser().then(() => {
        this.selectedTitle = this.userManagement.selectedTitle
        this.selectedShorthand = this.userManagement.selectedShorthand
        this.changeTabs(this.userManagement.actiiveTabs)
      })
      // await this.getDataTable({
      //   idLevelHirarki: this.userManagement.idLevelHirarki,
      // })
    },
    changeTabs(key) {
      const dataRes = [...this.userManagement.listUser]
      const filtered = dataRes.filter((x) => x.id_level_hirarki == key)
      this.actiiveTabs = filtered[0]
      this.selectedTitle = this.actiiveTabs.nama_panjang
      this.selectedShorthand = this.actiiveTabs.nama_singkat
      this.selectedTabId = key
      this.getDataTable({
        id_level_hirarki: this.actiiveTabs.id_level_hirarki,
      })
    },

    async openModal() {
      // this.modalVisible = true
      // await this.$store.commit('userManagement/changeUserManagement', {
      //   formState: {
      //     id: '',
      //     name: '',
      //     username: '',
      //     password: '',
      //     email: '',
      //     nohp: '',
      //     userid: '',
      //     idLevelHirarki: null,
      //   },
      // })

      this.$confirm({
        title: 'Apakah anda akan menambahkan jabatan baru ?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          await this.postJabatanGSM({
            id_level_hirarki: this.actiiveTabs.id_level_hirarki,
          })
          await this.dataListUser()
        },
        onCancel() {},
      })
    },
    closeModal() {
      this.modalVisible = false
    },
    handleSubmit() {
      if (this.formValidation()) {
        this.postSubmitData()
        this.closeModal()
        this.getDataTable()
      } else {
        this.closeModal()
        this.getDataTable()
      }
    },
    fetchSubmitForm() {
      this.isSubmit = true
      this.formState.userid = Math.floor(Math.random() * 10000)
      const formData = toRaw(this.formState)

      insertUser(formData)
        .then((response) => {
          if (response) {
            message.success('User berhasil Ditambahkan')
            this.getDataTable()
          }
          this.isSubmit = false
          this.closeModal()
        })
        .catch((err) => {
          message.error('Oops, sepertinya ada masalah')
          this.isSubmit = false
          this.closeModal()
        })
    },
    createRole() {
      this.$router.push({ name: 'permissions-create' })
    },
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    deleteMarks() {},
    formValidation() {
      if (
        this.userManagement.formState.name &&
        this.userManagement.formState.username &&
        this.userManagement.formState.email &&
        this.userManagement.formState.nohp
      ) {
        return true
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
      }
    },
    deleteAll() {},

    deleteRow(id) {
      this.$confirm({
        title: 'Apakah anda yakin akan menghapus data ini?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          await this.deleteDataRow({
            id_jabatan: id,
          })
          await this.dataListUser()
        },
        onCancel() {},
      })
    },
    fetchGetUsers() {
      this.isLoading = true
      getUserList()
        .then((response) => {
          if (response) {
            this.users = response
          }
          this.isLoading = false
        })
        .catch((err) => {
          if (err) {
            this.isLoading = false
          }
        })
    },
    goImport() {
      this.$router.push({ name: 'user-management-export' })
    },
    goExport() {
      this.$router.push({ name: 'user-management-export' })
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
