<template>
  <div>
    <a-card class="card card-top card-top-primary" :loading="isLoading">
      <div class="card-header d-flex scroll_menu">
        <a-tabs
          :default-active-key="0"
          @change="changeTabs"
          class="vb-tabs-bold justify-content-between mb-3"
        >
          <template v-if="listUsers.listUser.length > 0">
            <a-tab-pane
              v-for="menutab in listUsers.listUser"
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
        <a-radio-group v-model="value" :default-value="3" @change="onChange">
          <a-radio :value="1"> Posisi Kosong </a-radio>
          <a-radio :value="2"> Punya Posisi </a-radio>
          <a-radio :value="3" checked> Semua </a-radio>
        </a-radio-group>
        <!-- <strong>{{ 'Daftar User ' + selectedTitle + ' (' + selectedShorthand + ')' }}</strong> -->
        <!-- <a-button
          v-if="selectedShorthand === `GSM`"
          type="primary"
          class="mb-3 float-right"
          @click="openModal"
        >
          <i class="fa fa-plus mr-2" />
          {{ 'Tambahkan Jabatan' }}
        </a-button> -->
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
              :default-value="listUsers.itemsPerPage[1]"
              class="mx-2"
              @change="handlePaginationSize"
            >
              <a-select-option v-for="itemPerPage in listUsers.itemsPerPage" :key="itemPerPage">
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
            v-model:value="listUsers.bodyList.filter"
            @search="searchData"
          />
        </div>
        <div class="table-list table-responsive text-nowrap">
          <a-table
            class=""
            :columns="listUsers.columns"
            :data-source="listUsers.users"
            :row-key="(data) => data.idJabatan"
            :pagination="pagination"
            :loading="listUsers.isLoading"
            :row-class-name="tableRowClassName"
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
            <template #email="{ text }">
              <div>
                {{ text.startDateJabat != null ? text.startDateJabat : '-' }}
              </div>
            </template>
            <template #nohp="{ text }">
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
              <div class="d-flex align-items-center">
                <button
                  tooltip="Log History"
                  type="button"
                  class="btn btn-info mr-2"
                  @click="assignRow(text.userid, text.idJabatan)"
                >
                  <i class="fa fa-history"></i>
                </button>

                <!-- <router-link
                  :to="`/users/profile/TSO/${text.idJabatan}`"
                  v-if="selectedShorthand === `TSO`"
                  :class="text.statusJabat === `Nonaktif` ? 'disabled' : ''"
                  type="button"
                  class="btn btn-light mr-2"
                >
                  <i class="fa fa-file-text-o mr-1"></i>
                  <span class="text-black">Detail</span>
                </router-link> -->
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
          :title="'Riwayat Jabatan User'"
          :closable="false"
          :mask-closable="false"
          :cancel-button-props="{ style: { display: 'none' } }"
        >
          <template #footer>
            <a-button key="back" @click="closeModalAssignUser">Close</a-button>
            <!-- <a-button @click="handleSubmitAssignUser()" key="submit" type="primary"
              >Simpan</a-button
            > -->
          </template>

          <div class="row mb-2">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4">Nama</div>
                <div class="col-md-1">:</div>
                <div class="col-md-7">{{ listUsers.detail_jabatan.namaUser }}</div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4">Level Posisi</div>
                <div class="col-md-1">:</div>
                <div class="col-md-7">{{ listUsers.detail_jabatan.namaJabatan }}</div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4">Email</div>
                <div class="col-md-1">:</div>
                <div class="col-md-7">
                  {{
                    listUsers.detail_jabatan.email == null || listUsers.detail_jabatan.email == ''
                      ? '-'
                      : listUsers.detail_jabatan.email
                  }}
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-4">No.Telp</div>
                <div class="col-md-1">:</div>
                <div class="col-md-7">
                  {{
                    listUsers.detail_jabatan.nohp == null || listUsers.detail_jabatan.nohp == ''
                      ? '-'
                      : listUsers.detail_jabatan.nohp
                  }}
                </div>
              </div>
            </div>
          </div>
          <a-table
            :columns="listUsers.columns_history"
            :data-source="listUsers.history"
            :row-key="(data) => data.idJabatan"
          >
          </a-table>
        </a-modal>

        <a-modal
          v-model:visible="modalDeleteView"
          :title="`Kosongkan Jabatan`"
          :closable="false"
          :mask-closable="false"
        >
          <template #footer>
            <a-button key="back" @click="modalDeleteView = false">Batal</a-button>
            <a-button @click="deleteRow()" key="submit" type="primary">Hapus</a-button>
          </template>
          <a-form label-align="left" layout="vertical">
            <a-form-item label="Tanggal Akhir" name="Tanggal Akhir">
              <datepicker></datepicker>
              <vue-datepicker
                class="ant-calendar-picker ant-calendar-picker-input ant-input"
                placeholder="Tanggal Akhir"
                input-format="dd-MM-yyyy"
                v-model="listUsers.form_kosongkan_jabatan.tgl_akhir"
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
import VueDatepicker from 'vue3-datepicker'

export default {
  name: 'VbAntDesign',
  components: {
    VueDatepicker,
  },
  data() {
    return {
      actiiveTabs: {},
      users: [],
      selectedTabId: 1,
      checked: true,
      value: 3,
      modalDeleteView: false,
      flagBawahan: null,
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
      nama_history: '',
      pagination: {},
      modalVisible: false,
      isLoading: false,
      isSubmit: false,
      id_jabatan: null,
    }
  },
  computed: {
    ...mapState({
      listUsers: (state) => state.listUsers.data,
      userManagementCRM: (state) => state.userManagementCRM.data,
    }),
  },
  async mounted() {
    await this.dataListUser()
  },
  methods: {
    onChange(e) {
      this.value = e.target.value
      this.getDataTable({
        id_level_hirarki: this.actiiveTabs.id_level_hirarki,
        activeRadio: e.target.value,
      })
    },

    ...mapActions('listUsers', [
      'getListJenisUser',
      'getDataTable',
      'postSubmitData',
      'deleteDataRow',
      'postJabatanGSM',
      'getSalesNonBawahan',
      'submitAssignSalesHirarki',
      'logHistory',
      'getDetailProfile',
    ]),
    tableRowClassName(text) {
      if (text.idJabatan === '' || text.idJabatan == null) {
        return 'non-active'
      } else {
        return ''
      }
    },
    ...mapActions('userManagementCRM', ['getListUserCRM']),
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    disabledStartDate(startValue) {
      const endValue = this.listUsers.form_assign_bawahan.tgl_akhir
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.listUsers.form_assign_bawahan.tgl_mulai
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },

    searchData: _.debounce(function () {
      this.$store.commit('listUsers/changeUserManagement', {
        bodyList: {
          offset: 1,
          filter: this.listUsers.bodyList.filter,
        },
      })

      this.getDataTable({
        id_level_hirarki: this.actiiveTabs.id_level_hirarki,
      })
    }, 100),
    async assignRow(item, idJabatan) {
      console.log(item)
      this.id_jabatan = idJabatan
      await this.getDetailProfile({
        id_jabatan: this.id_jabatan,
      })
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
      this.$store.commit('listUsers/changeUserManagement', {
        form_assign_bawahan: {
          id_jabatan: item.idJabatan,
        },
      })
      this.logHistory({
        userid: item,
      })
      //   await this.logHistory()
      this.modalVisible = true
    },
    closeModalAssignUser() {
      this.modalVisible = false
    },
    async handleSubmitAssignUser() {
      if (
        this.listUsers.form_assign_bawahan.id_user &&
        this.listUsers.form_assign_bawahan.tgl_mulai
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
        this.selectedTitle = this.listUsers.selectedTitle
        this.selectedShorthand = this.listUsers.selectedShorthand
        this.changeTabs(this.listUsers.actiiveTabs)
      })
      // await this.getDataTable({
      //   idLevelHirarki: this.userManagement.idLevelHirarki,
      // })
    },
    changeTabs(key) {
      const dataRes = [...this.listUsers.listUser]
      const filtered = dataRes.filter((x) => x.id_level_hirarki == key)
      this.actiiveTabs = filtered[0]
      console.log(this.actiiveTabs)
      this.flagBawahan = filtered[0].flag_bawahan

      this.selectedTitle = this.actiiveTabs.nama_panjang
      this.selectedShorthand = this.actiiveTabs.nama_singkat
      this.selectedTabId = key
      this.getDataTable({
        id_level_hirarki: this.actiiveTabs.id_level_hirarki,
        activeRadio: this.value,
      })
    },
    async handleTableChange(pagination, key) {
      console.log(`----key`, key)
      if (pagination.pageSize === 5) {
        if (pagination.current === 1) {
          await this.$store.commit('listUsers/changeUserManagement', {
            bodyList: {
              limit: 2000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
              activeRadio: this.value,
            })
        } else {
          await this.$store.commit('listUsers/changeUserManagement', {
            bodyList: {
              limit: 2000,
              offset: 0 + 5 * pagination.current,
              // offset:0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
              activeRadio: this.value,
            })
        }
      }
      if (pagination.pageSize === 10) {
        if (pagination.current === 1) {
          await this.$store.commit('listUsers/changeUserManagement', {
            bodyList: {
              limit: 2000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
              activeRadio: this.value,
            })
        } else {
          await this.$store.commit('listUsers/changeUserManagement', {
            bodyList: {
              limit: 2000,
              // offset: 1 + 10 * pagination.current,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
              activeRadio: this.value,
            })
        }
      }
      if (pagination.pageSize === 15) {
        if (pagination.current === 1) {
          await this.$store.commit('listUsers/changeUserManagement', {
            bodyList: {
              limit: 2000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
              activeRadio: this.value,
            })
        } else {
          await this.$store.commit('listUsers/changeUserManagement', {
            bodyList: {
              limit: 2000,
              // offset: 1 + 15 * pagination.current,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
              activeRadio: this.value,
            })
        }
      }
      if (pagination.pageSize === 20) {
        if (pagination.current === 1) {
          await this.$store.commit('listUsers/changeUserManagement', {
            bodyList: {
              limit: 2000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
              activeRadio: this.value,
            })
        } else {
          await this.$store.commit('listUsers/changeUserManagement', {
            bodyList: {
              limit: 2000,
              // offset: 1 + 20 * pagination.current,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
              activeRadio: this.value,
            })
        }
      }
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
            activeRadio: this.value,
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
          console.error(err)
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
        this.listUsers.formState.name &&
        this.listUsers.formState.username &&
        this.listUsers.formState.email &&
        this.listUsers.formState.nohp
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
    openModalDelete(id) {
      this.modalDeleteView = true
      this.id_jabatan = id
    },
    async deleteRow() {
      await this.deleteDataRow({
        id_jabatan: this.id_jabatan,
      })
      await this.dataListUser()
      this.modalDeleteView = false
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
<style>
.table-list .ant-table-tbody .non-active td {
  background: #b20838 !important;
  color: white;
}
</style>
<style lang="scss" scoped>
.scroll_menu {
  overflow: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    border: 1px solid #d5d5d5;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0;
    background: #d5d5d5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0;
    background: #b20838;
  }
}
</style>