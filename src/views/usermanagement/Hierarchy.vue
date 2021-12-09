<template>
  <div>
    <a-card class="card card-top card-top-primary" :loading="isLoading">
      <div class="card-header d-flex scroll_menu">
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
        <strong>{{
          'Daftar Posisi Jabatan ' + selectedTitle + ' (' + selectedShorthand + ')'
        }}</strong>
        <a-button
          v-if="
            selectedShorthand === `GSM` ||
              selectedShorthand === `ADMIN DIS` ||
              selectedShorthand === `SALES DIS`
          "
          type="primary"
          class="mb-3 float-right"
          @click="openModal"
        >
          <i class="fa fa-plus mr-2" />
          {{ 'Posisi' + ' ' + selectedShorthand }}
        </a-button>
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
            placeholder="Cari nama"
            style="width: 200px"
            v-model:value="userManagement.bodyList.filter"
            @search="searchData"
          />
        </div>
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="userManagement.columns"
            :data-source="userManagement.dataTable"
            :row-key="data => data.idJabatan"
            :pagination="pagination"
            :loading="userManagement.isLoading"
            @change="handleTableChange"
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
              <div v-if="text.endDataJabat != null && text.endDataJabat.includes('9999')">-</div>
              <div v-else>
                {{ text.endDataJabat }}
              </div>
            </template>
            <template #username="{ text }">
              <div>
                {{ text.username != null ? text.username : '-' }}
              </div>
            </template>
            <template #action="{ text }">
              <div class="d-flex align-items-center">
                <router-link
                  :to="`/users/profile/SPC/${text.idJabatan}`"
                  v-if="selectedShorthand === `SPC`"
                  :class="
                    text.idUser == `Kosong` || text.idUser == null || text.idUser == ''
                      ? 'disabled btn btn-light'
                      : 'btn btn-success'
                  "
                  type="button"
                  class="mr-2"
                >
                  <i class="fa fa-sitemap mr-1"></i>
                  <span class="text-black">Hirarki</span>
                </router-link>
                <router-link
                  :to="`/users/profile/TSO/${text.idJabatan}`"
                  v-else-if="selectedShorthand === `TSO`"
                  type="button"
                  class="btn btn-success mr-2"
                >
                  <i class="fa fa-sitemap mr-1"></i>
                  <span class="text-black">Hirarki</span>
                </router-link>
                <router-link
                  v-else-if="selectedShorthand === `SALES DIS`"
                  :to="`/users/profile/sales-distributor/${text.idJabatan}`"
                  :class="
                    text.idUser == `Kosong` || text.idUser == null || text.idUser == ''
                      ? 'disabled btn btn-light'
                      : 'btn btn-success'
                  "
                  type="button"
                  class="mr-2"
                >
                  <i class="fa fa-sitemap mr-1"></i>
                  <span class="text-black">Hirarki</span>
                </router-link>
                <router-link
                  v-else-if="selectedShorthand === `ADMIN DIS`"
                  :to="`/users/profile/admin-distributor/${text.idJabatan}`"
                  :class="
                    text.idUser == `Kosong` || text.idUser == null || text.idUser == ''
                      ? 'disabled btn btn-light'
                      : 'btn btn-success'
                  "
                  type="button"
                  class="mr-2"
                >
                  <i class="fa fa-sitemap mr-1"></i>
                  <span class="text-black">Hirarki</span>
                </router-link>
                <router-link
                  v-else
                  :to="`/users/profile/jabatan/${text.idJabatan}`"
                  type="button"
                  class="mr-2 btn btn-success"
                >
                  <i class="fa fa-sitemap mr-1"></i>
                  <span class="text-black">Hirarki</span>
                </router-link>
                <div>
                  <button
                    type="button"
                    class="btn btn-warning mr-2"
                    @click="fetchHistoryJabatan(text)"
                  >
                    <i class="fa fa-history" />
                    History
                  </button>
                  <button
                    v-if="text.idUser === `Kosong` || text.idUser === null || text.idUser === ''"
                    type="button"
                    class="btn btn-info mr-2"
                    @click="assignRow(text)"
                  >
                    <i class="fa fa-user-plus"></i>
                    <span class="text-black"> Assign User</span></button
                  ><button
                    v-else
                    @click="openModalDelete(text.idJabatan)"
                    type="button"
                    class="btn btn-outline-danger mr-2"
                  >
                    <i class="fa fa-user-times"></i><span> Kosongkan Jabatan</span>
                  </button>
                </div>
              </div>
            </template>
          </a-table>
        </div>

        <!-- Assing User -->
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
              <!-- <a-auto-complete
                :data-source="userManagement.salesBawahan"
                placeholder="Cari sales"
                @select="onSelect"
                @search="onSearch"
              >
              </a-auto-complete> -->
              <a-select
                v-model:value="userManagement.form_assign_bawahan.id_user"
                placeholder="Pilih User"
                show-search
              >
                <a-select-option
                  v-for="(item, index) in userManagement.sales_non_bawahan"
                  :key="`level_${index}`"
                  :value="item.namasales"
                >
                  {{ item.iduser }} - {{ item.namasales }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Tanggal Mulai Jabatan" name="level">
              <datepicker></datepicker>
              <vue-datepicker
                class="ant-calendar-picker ant-calendar-picker-input ant-input"
                placeholder="Tanggal Mulai"
                input-format="dd-MM-yyyy"
                v-model="userManagement.form_assign_bawahan.tgl_mulai"
                :upper-limit="dateLowerLimit"
              />
            </a-form-item>
          </a-form>
        </a-modal>

        <!-- Kosongkan jabatan -->
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
                v-model="userManagement.form_kosongkan_jabatan.tgl_akhir"
                :upper-limit="dateLowerLimit"
              />
            </a-form-item>
          </a-form>
        </a-modal>

        <!-- Tambah Jabatan -->
        <a-modal
          v-model:visible="modalTambahJabatan"
          :title="`Tambah Jabatan`"
          :closable="false"
          :mask-closable="false"
        >
          <template #footer>
            <a-button key="back" @click="modalTambahJabatan = false">Batal</a-button>
            <a-button @click="tambahJabatan()" key="submit" type="primary">Tambahkan</a-button>
          </template>
          <a-form label-align="left" layout="vertical">
            <a-form-item label="Nama Jabatan" name="Nama Jabatan">
              <a-input
                :prefix="selectedShorthand"
                v-model:value="userManagement.formState.nama_jabatan"
                placeholder="Nama jabatan"
              />
            </a-form-item>
          </a-form>
        </a-modal>

        <!-- History Jabatan Modal -->
        <a-modal v-model:visible="historyJabatanModal" title="History Jabatan User">
          <a-row>
            <a-col :span="8">Nama</a-col>
            <a-col :span="16">: {{ historyJabatanItems.nama }}</a-col>
          </a-row>
          <a-row>
            <a-col :span="8">Level Posisi</a-col>
            <a-col :span="16">: {{ historyJabatanItems.level_posisi }}</a-col>
          </a-row>
          <a-table
            class="mt-3"
            :columns="userManagement.columns_history"
            :data-source="userManagement.history"
            :row-key="data => data.idJabatan"
          />
          <template #footer>
            <a-button @click="closeHistoryJabatanModal">Kembali</a-button>
          </template>
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
      modalTambahJabatan: false,
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
      pagination: {},
      modalVisible: false,
      isLoading: false,
      isSubmit: false,
      id_jabatan: null,
      dataList: [],
      dateLowerLimit: null,
      historyJabatanModal: false,
      historyJabatanItems: {
        posisi_jabatan: '',
        jabatan: '',
      },
    }
  },
  computed: {
    ...mapState({
      userManagement: state => state.userManagement.data,
      userManagementCRM: state => state.userManagementCRM.data,
    }),
  },
  async mounted() {
    this.dateLowerLimit = Date.now()
    await this.dataListUser()
    this.getDataTable({
      id_level_hirarki: this.userManagement.id_level_hirarki,
    })
    this.changeTabs(this.userManagement.id_level_hirarki)
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
      'searchSalesNonBawahan',
      'logHistory',
    ]),
    ...mapActions('userManagementCRM', ['getListUserCRM']),
    async onSearch(searchText) {
      await this.searchSalesNonBawahan(
        {
          id_jabatan: this.actiiveTabs.id_level_hirarki,
          search: searchText,
        },
        500,
      )
    },
    onSelect(value) {
      this.userManagement.form_assign_bawahan.id_user = value
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
    searchData(keyword) {
      if (keyword) {
        this.userManagement.isLoading = true
        let dataList = _.reject(this.userManagement.dataTable, function(item) {
          return item.nama === null
        })
        this.userManagement.dataTable = dataList.filter(data =>
          data.nama.toLowerCase().includes(keyword.toLowerCase()),
        )
        this.userManagement.isLoading = false
      } else {
        this.userManagement.dataTable = this.userManagement.users
      }
    },
    async assignRow(item) {
      this.userManagement.form_assign_bawahan.id_jabatan = item.idJabatan

      await this.getSalesNonBawahan({
        id_jabatan: this.actiiveTabs.id_level_hirarki,
        id_user: 0,
      })

      this.userManagement.form_assign_bawahan.id_user = null

      await this.getListUserCRM()
      this.modalVisible = true
    },
    closeModalAssignUser() {
      this.modalVisible = false
    },
    async handleSubmitAssignUser() {
      console.log(
        ` this.userManagement.form_assign_bawahan.id_user `,
        this.userManagement.form_assign_bawahan.id_user,
      )
      if (
        this.userManagement.form_assign_bawahan.id_user &&
        this.userManagement.form_assign_bawahan.tgl_mulai
      ) {
        await this.submitAssignSalesHirarki()
        await this.getDataTable({
          id_level_hirarki: this.actiiveTabs.id_level_hirarki,
        })
        this.closeModalAssignUser()
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
      }
    },
    async dataListUser() {
      await this.getListJenisUser().then(() => {
        this.selectedTitle = this.userManagement.selectedTitle
        this.selectedShorthand = this.userManagement.selectedShorthand
      })
    },
    changeTabs(key) {
      const dataRes = [...this.userManagement.listUser]
      const filtered = dataRes.filter(x => x.id_level_hirarki == key)
      this.actiiveTabs = filtered[0]
      this.flagBawahan = filtered[0].flag_bawahan

      this.selectedTitle = this.actiiveTabs.nama_panjang
      this.selectedShorthand = this.actiiveTabs.nama_singkat
      this.selectedTabId = key
      this.$store.commit('userManagement/changeUserManagement', {
        bodyList: {
          limit: 500,
          offset: 0,
        },
      }),
        this.getDataTable({
          id_level_hirarki: this.actiiveTabs.id_level_hirarki,
        })
    },
    async handleTableChange(pagination, key) {
      console.log(`----key`, key)
      if (pagination.pageSize === 5) {
        if (pagination.current === 1) {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: this.userManagement.totalAll,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
            })
        } else {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 2000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
            })
        }
      }
      if (pagination.pageSize === 10) {
        if (pagination.current === 1) {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 2000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
            })
        } else {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 2000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
            })
        }
      }
      if (pagination.pageSize === 15) {
        if (pagination.current === 1) {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 2000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
            })
        } else {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 2000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
            })
        }
      }
      if (pagination.pageSize === 20) {
        if (pagination.current === 1) {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 2000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
            })
        } else {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 2000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
            })
        }
      }
    },
    async openModal() {
      this.modalTambahJabatan = true
      this.$store.commit('userManagement/changeUserManagement', {
        selectedShorthand: this.selectedShorthand,
      })
      this.userManagement.formState.nama_jabatan = ''
    },
    async tambahJabatan() {
      if (this.userManagement.formState.nama_jabatan) {
        await this.postJabatanGSM({
          id_level_hirarki: this.actiiveTabs.id_level_hirarki,
        })
        await this.getDataTable({
          id_level_hirarki: this.actiiveTabs.id_level_hirarki,
        })
        this.modalTambahJabatan = false
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Nama jabatan tidak boleh kosong',
        })
      }
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
        .then(response => {
          if (response) {
            message.success('User berhasil Ditambahkan')
            this.getDataTable()
          }
          this.isSubmit = false
          this.closeModal()
        })
        .catch(err => {
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
    openModalDelete(id) {
      this.modalDeleteView = true
      this.id_jabatan = id
    },
    async deleteRow() {
      await this.deleteDataRow({
        id_jabatan: this.id_jabatan,
      })
      await this.dataListUser()
      await this.getDataTable({
        id_level_hirarki: this.actiiveTabs.id_level_hirarki,
      })
      this.modalDeleteView = false
    },
    fetchGetUsers() {
      this.isLoading = true
      getUserList()
        .then(response => {
          if (response) {
            this.users = response
          }
          this.isLoading = false
        })
        .catch(err => {
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
    fetchHistoryJabatan(item) {
      this.historyJabatanModal = true
      this.historyJabatanItems.posisi_jabatan = item.titleJabatan
      this.historyJabatanItems.jabatan = item.jabatan
      this.logHistory({
        idJabatan: item.idJabatan,
      })
    },
    closeHistoryJabatanModal() {
      this.historyJabatanModal = false
      this.userManagement.history = []
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
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
