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
        <Can do="create" on="UserHirarki">
          <a-button
            v-if="
              selectedShorthand === `GSM` ||
                selectedShorthand === `ADMIN DIS` ||
                selectedShorthand === `SALES DIS` ||
                selectedShorthand === `SPC` ||
                selectedShorthand === `MI`
            "
            type="primary"
            class="mb-3 ml-2 float-right"
            @click="openModal"
          >
            <i class="fa fa-plus mr-2" />
            {{ 'Posisi' + ' ' + selectedShorthand }}
          </a-button>
        </Can>
        <Can do="create" on="UserHirarki">
          <a-button type="primary" class="mb-3 float-right" @click="openModalImport">
            <i class="fa fa-file mr-2" />
            Import Excel
          </a-button>
        </Can>
      </div>
      <div class="card-body">
        <div v-if="selectedShorthand === `TSO`" class="d-flex justify-content-between mb-3">
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
          <div class="d-flex">
            <div class="align-self-center">Search by :</div>
            <a-select
              v-model:value="searchTSOBy"
              class="mx-2"
              style="width: 150px"
              @change="searchTSOChoose()"
              :default-value="{ key: 'General' }"
            >
              <a-select-option value="General">General</a-select-option>
              <a-select-option value="Distrik">Distrik</a-select-option>
            </a-select>
            <a-input-search
              placeholder="Cari nama"
              style="width: 200px"
              v-model:value="userManagement.bodyList.filter"
              @search="searchDataTSO"
            />
          </div>
        </div>

        <div v-else class="d-flex justify-content-between mb-3">
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
          <div class="d-flex">
            <div>
              <a-input-search
                placeholder="Cari nama"
                style="width: 200px"
                v-model:value="userManagement.bodyList.filter"
                @search="searchData1"
              />
            </div>
          </div>
        </div>

        <div class="table-responsive text-nowrap">
          <a-table
            :columns="userManagement.columns"
            :data-source="userManagement.dataTable"
            :row-key="data => data.idJabatan"
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
                <button
                  v-if="flagHierarki === 1"
                  type="button"
                  class="mr-2 btn btn-success"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Hirarki"
                  @click="handleHirarki(columnRef, text.idJabatan)"
                >
                  <i class="fa fa-sitemap mr-1"></i>
                </button>
                <div>
                  <Can do="read" on="UserHirarki">
                    <button
                      type="button"
                      class="btn btn-warning mr-2"
                      @click="fetchHistoryJabatan(text)"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="History"
                    >
                      <i class="fa fa-history" />
                    </button>
                  </Can>
                  <Can do="create" on="UserHirarki">
                    <button
                      v-if="text.idUser === `Kosong` || text.idUser === null || text.idUser === ''"
                      type="button"
                      class="btn btn-info mr-2"
                      @click="assignRow(text)"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Assign User"
                    >
                      <i class="fa fa-user-plus"></i>
                    </button>
                    <button
                      v-else
                      @click="openModalDelete(text.idJabatan)"
                      type="button"
                      class="btn btn-outline-danger mr-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Kosongkan Jabatan"
                    >
                      <i class="fa fa-user-times"></i>
                    </button>
                  </Can>
                  <button
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit Jabatan"
                    @click="openModalEditJabatan(text)"
                    class="btn btn-outline-warning mr-1"
                  >
                    <i class="fa fa-edit"></i>
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
                :lower-limit="dateBeforeLimit"
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

        <!-- Import Exel -->
        <a-modal
          v-model:visible="modalImportExcel"
          :title="`Import Excel`"
          :closable="false"
          :mask-closable="false"
          :width="700"
        >
          <template #footer>
            <a-button key="back" @click="modalImportExcel = false">Batal</a-button>
            <a-button key="submit" @click="submitPreviewExcel()" type="primary">Preview</a-button>
          </template>
          <a-form label-align="left" layout="vertical">
            <div class="importexcel_hirarki">
              <div class="row">
                <div class="col-lg-8 col-xs-12 mb-2">
                  <p class="body-14 col-black-2 mr-3">
                    Download template excel untuk mengisi data tersebut, input data sesuai format,
                    jika selesai unggah file di bawah ini
                  </p>
                </div>
                <div class="col-lg-4 col-xs-12 mb-2">
                  <a
                    href="https://storage.googleapis.com/crm-asset/Template/TEMPLATE_UPLOAD_USER_HIRARKI.xlsx"
                    download
                    class="btn-block btn-download-file"
                  >
                    <i class="fa fa-file"></i> Download
                  </a>
                </div>
              </div>

              <div
                v-if="importExelHirarki.body.filename.length === 0"
                class="
                  d-flex
                  align-items-center
                  w-100
                  border-4
                  h-100
                  justify-content-center
                  importexcel_hirarki_upload
                "
                @click="$refs.file.click()"
              >
                <div class="text-center pt-5 pb-5 w-50">
                  <input
                    type="file"
                    id="file"
                    ref="file"
                    style="display: none"
                    @change="onFileChanged"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                  <img :src="require('@/assets/images/logo/upload_xls.svg')" alt="" />
                  <div class="upload mt-2"></div>
                  <h5 class="subheading-14 col-blue-1 mt-3" v-if="filename === ''">
                    Unggah file excel
                  </h5>
                </div>
              </div>
              <div
                class="
                  d-flex
                  align-items-center
                  w-100
                  border-4
                  h-100
                  justify-content-left
                  importexcel_hirarki_upload_prepare
                "
                v-else
              >
                <img :src="require('@/assets/images/logo/upload_xls.svg')" alt="" />
                <span>{{ importExelHirarki.body.filename }}</span>
                <span class="ml-auto" @click="deleteImportExcel()">
                  <img :src="require('@/assets/images/logo/delete_square.svg')" alt="" />
                </span>
              </div>
            </div>
          </a-form>
        </a-modal>

        <!-- History Jabatan Modal -->
        <a-modal v-model:visible="historyJabatanModal" title="History Jabatan User">
          <a-row>
            <a-col :span="8">Title Posisi</a-col>
            <a-col :span="16">: {{ historyJabatanItems.posisi_jabatan }}</a-col>
          </a-row>
          <a-row>
            <a-col :span="8">Level Posisi</a-col>
            <a-col :span="16">: {{ historyJabatanItems.jabatan }}</a-col>
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

        <!-- Modal Edit Nama Jabatan -->
        <a-modal
          v-model:visible="modalEditJabatan"
          :title="'Edit Jabatan'"
          :closable="false"
          :mask-closable="false"
        >
          <template #footer>
            <a-button key="back" @click="modalEditJabatan = false">Batal</a-button>
            <a-button @click="submitEditJabatan()" key="submit" type="primary">Ubah</a-button>
          </template>

          <a-form label-align="left" layout="vertical">
            <a-form-item label="Nama Jabatan" name="Nama Jabatan">
              <a-input
                :prefix="selectedShorthand"
                v-model:value="newJabatan"
                placeholder="Nama jabatan"
              />
            </a-form-item>
          </a-form>
        </a-modal>

        <!-- Modal Detail Distrik TSO-->
        <a-modal
          v-model:visible="modalEditJabatan"
          :title="'Edit Jabatan'"
          :closable="false"
          :mask-closable="false"
        >
          <template #footer>
            <a-button key="back" @click="modalEditJabatan = false">Batal</a-button>
            <a-button @click="submitEditJabatan()" key="submit" type="primary">Ubah</a-button>
          </template>

          <a-form label-align="left" layout="vertical">
            <a-form-item label="Nama Jabatan" name="Nama Jabatan">
              <a-input
                :prefix="selectedShorthand"
                v-model:value="newJabatan"
                placeholder="Nama jabatan"
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
import Swal from 'sweetalert2'

export default {
  name: 'VbAntDesign',
  components: {
    VueDatepicker,
  },
  setup() {
    const FileList = []
    return {
      FileList,
      headers: {
        authorization: 'authorization-text',
      },
    }
  },
  data() {
    return {
      searchTSOBy: 'General',
      searchTSOByField: 'General',
      actiiveTabs: {},
      users: [],
      selectedTabId: 1,
      newJabatan: '',
      modalEditJabatan: false,
      modalTambahJabatan: false,
      modalImportExcel: false,
      modalDeleteView: false,
      modalDetailDistrik: false,
      flagBawahan: null,
      flagHierarki: null,
      columnRef: '',
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
      dateBeforeLimit: null,
      historyJabatanModal: false,
      historyJabatanItems: {
        posisi_jabatan: '',
        jabatan: '',
      },
      namaJabatan: '',
      idJabatan: null,
      userEdit: null,
    }
  },
  computed: {
    ...mapState({
      userManagement: state => state.userManagement.data,
      userManagementCRM: state => state.userManagementCRM.data,
      importExelHirarki: state => state.importExelHirarki.data,
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
      'editJabatanBawahan',
    ]),
    ...mapActions('importExelHirarki', ['getDataFromExcel']),
    ...mapActions('userManagementCRM', ['getListUserCRM']),

    handleHirarki(column, id) {
      this.$router.push(`/users/profile/${column}/${id}`)
    },

    searchTSOChoose() {
      if (this.searchTSOBy == 'General') {
        this.searchTSOByField = 'General'
      } else {
        this.searchTSOByField = 'Distrik'
      }
    },
    openModalEditJabatan(item) {
      this.modalEditJabatan = true
      this.namaJabatan = item.titleJabatan
      this.newJabatan = item.titleJabatan
      this.idJabatan = item.idJabatan
      this.userEdit = item
    },
    async submitEditJabatan() {
      if (this.namaJabatan === this.selectedShorthand + ' - ' + this.newJabatan) {
        Swal.fire({
          icon: 'warning',
          title: 'Opps...',
          text: 'Nama jabatan tidak boleh sama seperti sebelumnya.',
          showConfirmButton: false,
          timer: 2000,
        })
      } else {
        await this.editJabatanBawahan({
          id_jabatan: this.idJabatan,
          nama_jabatan: this.selectedShorthand + ' - ' + this.newJabatan,
        })

        await this.getDataTable({
          id_level_hirarki: this.actiiveTabs.id_level_hirarki,
        })
        this.modalEditJabatan = false
      }
    },
    async onSearch(searchText) {
      await this.searchSalesNonBawahan(
        {
          id_jabatan: this.actiiveTabs.id_level_hirarki,
          search: searchText,
        },
        500,
      )
    },

    async submitPreviewExcel() {
      await this.getDataFromExcel()
      let dataStatus = _.where(this.importExelHirarki.listData, { status: false })
      this.isDisabled = dataStatus.length > 0 ? true : false
      this.$router.push(`/users/hierarchy/preview`)
    },
    openModalImport() {
      this.modalImportExcel = true
      this.importExelHirarki.body.file = null
      this.importExelHirarki.body.filename = ''
    },
    deleteImportExcel() {
      this.importExelHirarki.body.file = null
      this.importExelHirarki.body.filename = ''
    },
    onSelect(value) {
      this.userManagement.form_assign_bawahan.id_user = value
    },
    onFileChanged(event) {
      console.log(`-----DATA`, this.$refs.file.files[0])
      this.importExelHirarki.body.file = this.$refs.file.files[0]
      this.importExelHirarki.body.filename = event.target.files[0].name
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
    getData(data, keyword) {
      const nullFilter = _.reject(this.userManagement.users, function(item) {
        return item[data] === null
      })
      let dataTable = nullFilter.filter(item => {
        return item[data].toLowerCase().includes(keyword.toLowerCase())
      })

      return dataTable
    },
    searchData1: _.debounce(function() {
      this.$store.commit('userManagement/changeUserManagement', {
        body: {
          offset: 1,
        },
      })

      this.getDataTable({
        id_level_hirarki: this.actiiveTabs.id_level_hirarki,
      })
    }, 100),
    async searchDataTSO(keyword) {
      this.userManagement.isLoading = true
      // await this.getDataTable({
      //   id_level_hirarki: this.actiiveTabs.id_level_hirarki,
      // })
      if (keyword) {
        if (this.searchTSOByField == `General`) {
          // let data = this.userManagement.dataTable.filter(dataSource =>
          //   dataSource.titleJabatan.toLowerCase().includes(keyword.toLowerCase()),
          // )

          // let dataNama = this.userManagement.dataTable.filter(dataSource => dataSource.nama != null)

          let filter = this.userManagement.dataTableTemp.filter(
            dataSource =>
              dataSource.nama?.toLowerCase().includes(keyword.toLowerCase()) ||
              dataSource.titleJabatan?.toLowerCase().includes(keyword.toLowerCase()),
          )

          // if (dataNama.length > 0) {
          setTimeout(() => {
            this.userManagement.dataTable = filter
            this.userManagement.isLoading = false
          }, 500)
          return false
          // }
        } else {
          let data = this.userManagement.dataTableTemp.filter(dataSource =>
            dataSource.distrik.toLowerCase().includes(keyword.toLowerCase()),
          )

          // console.log(data)

          // if (data.length > 0) {
          setTimeout(() => {
            this.userManagement.dataTable = data
            this.userManagement.isLoading = false
          }, 500)
          return false
          // }
        }
        // setTimeout(() => {
        //   this.userManagement.dataTable = this.userManagement.users
        //   this.userManagement.isLoading = false
        // }, 500)
        // return false
      } else {
        setTimeout(() => {
          this.userManagement.dataTable = this.userManagement.users
          this.userManagement.isLoading = false
        }, 500)
        return false
      }
    },
    searchData(keyword) {
      this.userManagement.isLoading = true
      if (keyword) {
        const dataTitleJabatan = this.getData('titleJabatan', keyword)
        if (dataTitleJabatan.length) {
          setTimeout(() => {
            this.userManagement.dataTable = dataTitleJabatan
            this.userManagement.isLoading = false
          }, 500)
          return false
        }

        const dataNama = this.getData('nama', keyword)
        if (dataNama.length) {
          setTimeout(() => {
            this.userManagement.dataTable = dataNama
            this.userManagement.isLoading = false
          }, 500)
          return false
        }

        setTimeout(() => {
          this.userManagement.dataTable = []
          this.userManagement.isLoading = false
        }, 500)

        /* let dataList = _.reject(this.userManagement.dataTable, function (item) {
          return item.nama === null
        })
        this.userManagement.dataTable = dataList.filter((data) =>
          data.nama.toLowerCase().includes(keyword.toLowerCase()),
        ) */
      } else {
        setTimeout(() => {
          this.userManagement.dataTable = this.userManagement.users
          this.userManagement.isLoading = false
        }, 500)
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

      this.historyJabatanItems.posisi_jabatan = item.titleJabatan
      this.historyJabatanItems.jabatan = item.jabatan
      await this.logHistory({
        idJabatan: item.idJabatan,
      })
      if (this.userManagement.history.length) {
        const dateData = this.userManagement.history[0].endDate.split('-')
        let temp = []
        dateData.map(data => temp.unshift(data))
        this.dateBeforeLimit = new Date(temp.join('-'))
      }
      this.modalVisible = true
    },
    closeModalAssignUser() {
      this.modalVisible = false
      this.dateBeforeLimit = null
    },
    async handleSubmitAssignUser() {
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
      this.flagHierarki = filtered[0].flag_hierarki
      this.columnRef = filtered[0].column_reference

      this.selectedTitle = this.actiiveTabs.nama_panjang
      this.selectedShorthand = this.actiiveTabs.nama_singkat
      this.selectedTabId = key
      this.$store.commit('userManagement/changeUserManagement', {
        bodyList: {
          limit: 5000,
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
          })
        } else {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 5000,
              offset: 0,
            },
          })
        }
      }
      if (pagination.pageSize === 10) {
        if (pagination.current === 1) {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 5000,
              offset: 0,
            },
          })
        } else {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 5000,
              offset: 0,
            },
          })
        }
      }
      if (pagination.pageSize === 15) {
        if (pagination.current === 1) {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 5000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
            })
        } else {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 5000,
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
              limit: 5000,
              offset: 0,
            },
          }),
            await this.getDataTable({
              id_level_hirarki: this.actiiveTabs.id_level_hirarki,
            })
        } else {
          await this.$store.commit('userManagement/changeUserManagement', {
            bodyList: {
              limit: 5000,
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
<style lang="scss" scoped>
@import '@/assets/scss/Hirarki/index.scss';
</style>
