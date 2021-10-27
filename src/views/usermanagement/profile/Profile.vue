<template>
  <div>
    <div class="row mb-2">
      <div class="col-md-4 col-xs-4">
        <router-link :to="`/users/hierarchy`" class="font-weight-bold text-primary">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
          Kembali ke User Hirarki</router-link
        >
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 col-xs-4">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Mapping User</strong>
          </div>
          <div class="card-header">
            <div class="d-flex flex-wrap flex-column align-items-center">
              <div class="vb__utils__avatar vb__utils__avatar--size64 mb-3">
                <img
                  lazy="loading"
                  v-once
                  :src="require('@/assets/images/users.png')"
                  alt="Mary Stanform"
                />
              </div>
              <div class="text-center">
                <div class="text-dark font-weight-bold font-size-20">
                  {{ userManagement.detail_jabatan.namaUser }}
                </div>
                <div class="font-size-16">
                  Kode / ID : {{ userManagement.detail_jabatan.idUser }}
                </div>
                <div class="font-size-16">
                  Username : {{ userManagement.detail_jabatan.namaUser }}
                </div>
                <div class="font-size-16">Email : {{ userManagement.detail_jabatan.email }}</div>
              </div>
            </div>
          </div>
          <div class="card-header align-self-center">
            <strong>Jenis User : {{ userManagement.detail_jabatan.namaJabatan }}</strong>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-xs-8">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Hierarki Down / Bawahan Langsung</strong>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 col-xs-12 mb-2"></div>
              <div class="col-md-4 col-xs-12 mb-2"></div>
              <div class="col-md-4 col-xs-12 mb-2">
                <a-button @click="modalTambahBawahan()" type="primary" class="float-right">
                  <i class="fa fa-plus mr-2" />
                  Tambahkan
                </a-button>
              </div>
            </div>
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
              <a-input-search placeholder="input search text" style="width: 200px" />
            </div>
            <div class="table-responsive text-nowrap">
              <a-table
                :columns="userManagement.columns_hirarki"
                :data-source="userManagement.list_hirarki_down"
                :row-key="data => data.iduser"
                :pagination="userManagement.pagination"
                :loading="userManagement.isLoading"
              >
                <template #no="{ index }">
                  <div>
                    {{ index + 1 }}
                  </div>
                </template>
                <template #id_jabatan="{ text }">
                  <div>
                    {{ text.idJabatan }}
                  </div>
                </template>
                <template #id_user="{ text }">
                  <div>
                    {{ text.iduser }}
                  </div>
                </template>
                <template #nama_sales="{ text }">
                  <div>
                    {{ text.name }}
                  </div>
                </template>
                <template #action="{ text }">
                  <div>
                    <button
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Kosongkan Jabatan"
                      @click="deleteRow(text)"
                      class="btn btn-outline-danger mr-1"
                    >
                      <i class="fa fa-trash"></i>
                    </button>

                    <button
                      v-if="text.iduser != null"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Replace user"
                      @click="replaceUser(text)"
                      class="btn btn-outline-warning mr-1"
                    >
                      <i class="fa fa-user-plus"></i>
                    </button>
                    <button
                      v-if="text.iduser === null"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Assign User"
                      @click="assignUser(text)"
                      class="btn btn-outline-info"
                    >
                      <i class="fa fa-users"></i>
                    </button>
                  </div>
                </template>
              </a-table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL TAMBAH BAWAHAN -->

    <a-modal
      v-model:visible="userManagement.modalVisibleHirarkiDown"
      :title="'Tambah Bawahan'"
      :closable="false"
      :mask-closable="false"
    >
      <template #footer>
        <a-button key="back" @click="closeModal">Batal</a-button>
        <a-button @click="handleSubmitAddHirarkiDown()" key="submit" type="primary"
          >Simpan</a-button
        >
      </template>
      <a-form label-align="left" layout="vertical">
        <a-form-item label="Sales Non Bawahan" name="level">
          <a-select
            v-model:value="userManagement.form_tambah_bawahan.id_bawahan"
            placeholder="Pilih Sales Non Bawahan"
          >
            <a-select-option
              v-for="(item, index) in userManagement.sales_non_bawahan"
              :key="`level_${index}`"
              :value="item.iduser"
            >
              {{ item.namasales }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Tanggal Mulai Jabatan" name="level">
          <a-date-picker
            v-model:value="userManagement.form_tambah_bawahan.tgl_mulai"
            class="w-100"
          />
        </a-form-item>
        <a-form-item label="Tanggal Akhir Jabatan" name="level">
          <a-date-picker
            v-model:value="userManagement.form_tambah_bawahan.tgl_akhir"
            class="w-100"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- MODAL REPLACE USER -->

    <a-modal
      v-model:visible="userManagement.modalVisibleReplaceUser"
      :title="'Replace User'"
      :closable="false"
      :mask-closable="false"
    >
      <template #footer>
        <a-button key="back" @click="closeModalReplaceUser()">Batal</a-button>
        <a-button @click="handleSubmitReplaceUser()" key="submit" type="primary">Simpan</a-button>
      </template>
      <a-form label-align="left" layout="vertical">
        <a-form-item label="Sales Non Bawahan" name="level">
          <a-select
            v-model:value="userManagement.form_replace_bawahan.user_replace_id"
            placeholder="Pilih Sales Non Bawahan"
          >
            <a-select-option
              v-for="(item, index) in userManagement.sales_non_bawahan"
              :key="`level_${index}`"
              :value="item.iduser"
            >
              {{ item.namasales }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Tanggal Mulai Jabatan" name="level">
          <a-date-picker
            v-model:value="userManagement.form_replace_bawahan.tgl_mulai"
            class="w-100"
          />
        </a-form-item>
        <a-form-item label="Tanggal Akhir Jabatan" name="level">
          <a-date-picker
            v-model:value="userManagement.form_replace_bawahan.tgl_akhir"
            class="w-100"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- MODAL ASSIGN USER -->

    <a-modal
      v-model:visible="userManagement.modalVisibleAssignUser"
      :title="'Assign User'"
      :closable="false"
      :mask-closable="false"
    >
      <template #footer>
        <a-button key="back" @click="closeModalAssignUser">Batal</a-button>
        <a-button @click="handleSubmitAssignUser()" key="submit" type="primary">Simpan</a-button>
      </template>
      <a-form label-align="left" layout="vertical">
        <a-form-item label="Sales Non Bawahan" name="level">
          <a-select
            v-model:value="userManagement.form_assign_bawahan.id_user"
            placeholder="Pilih Sales Non Bawahan"
          >
            <a-select-option
              v-for="(item, index) in userManagement.sales_non_bawahan"
              :key="`level_${index}`"
              :value="item.iduser"
            >
              {{ item.namasales }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Tanggal Mulai Jabatan" name="level">
          <a-date-picker
            v-model:value="userManagement.form_assign_bawahan.tgl_mulai"
            class="w-100"
          />
        </a-form-item>
        <a-form-item label="Tanggal Akhir Jabatan" name="level">
          <a-date-picker
            v-model:value="userManagement.form_assign_bawahan.tgl_akhir"
            class="w-100"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { toRaw } from 'vue'
import { notification, message } from 'ant-design-vue'
import { getUserList } from '@/services/connection/user-management/api'
import { mapState, mapActions } from 'vuex'

const itemsPerPage = [5, 10, 15, 20]

export default {
  name: 'VbAntDesign',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      userManagement: state => state.userManagement.data,
    }),
  },
  async mounted() {
    await this.getDetailProfile({
      id_jabatan: this.$route.params.uuid,
    })
    await this.getListDownHirarki({
      id_user: this.$route.params.uuid,
    })
    await this.getSalesNonBawahan({
      id_jabatan: this.$route.params.uuid,
      id_user: this.userManagement.detail_jabatan.idUser,
    })
  },
  methods: {
    ...mapActions('userManagement', [
      'deleteRowHirarkiDown',
      'getDetailProfile',
      'getListDownHirarki',
      'getSalesNonBawahan',
      'submitAddSalesHirarki',
      'submitReplaceSalesHirarki',
      'submitAssignSalesHirarki',
      'postJabatanBawahan',
    ]),
    handlePaginationSize(size) {
      this.userManagement.pagination.pageSize = size
    },
    closeModal() {
      this.userManagement.modalVisibleHirarkiDown = false
    },
    modalTambahBawahan() {
      this.$confirm({
        title: 'Apakah anda akan menambahkan jabatan baru ?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          await this.postJabatanBawahan({
            id_jabatan_atasan: this.userManagement.detail_jabatan.idUser,
            id_level_hirarki: this.userManagement.detail_jabatan.idUser,
          })
        },
        onCancel() {},
      })
    },
    async handleSubmitAddHirarkiDown() {
      if (
        this.userManagement.form_tambah_bawahan.id_bawahan &&
        this.userManagement.form_tambah_bawahan.tgl_mulai &&
        this.userManagement.form_tambah_bawahan.tgl_akhir
      ) {
        await this.submitAddSalesHirarki({
          id_user: this.userManagement.detail_jabatan.idUser,
        })
        this.closeModal()
        await this.getListDownHirarki({
          id_user: this.$route.params.uuid,
        })
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
        this.closeModal()
      }
    },
    async handleSubmitReplaceUser() {
      if (
        this.userManagement.form_replace_bawahan.user_replace_id &&
        this.userManagement.form_replace_bawahan.tgl_mulai &&
        this.userManagement.form_replace_bawahan.tgl_akhir
      ) {
        await this.submitReplaceSalesHirarki()
        this.closeModalReplaceUser()
        await this.getListDownHirarki({
          id_user: this.$route.params.uuid,
        })
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
        this.closeModalReplaceUser()
      }
    },
    async handleSubmitAssignUser() {
      if (
        this.userManagement.form_assign_bawahan.id_user &&
        this.userManagement.form_assign_bawahan.tgl_mulai &&
        this.userManagement.form_assign_bawahan.tgl_akhir
      ) {
        await this.submitAssignSalesHirarki()
        this.closeModalAssignUser()
        await this.getListDownHirarki({
          id_user: this.$route.params.uuid,
        })
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
        this.closeModalAssignUser()
      }
    },
    closeModalReplaceUser() {
      this.userManagement.modalVisibleReplaceUser = false
    },
    replaceUser(text) {
      this.userManagement.modalVisibleReplaceUser = true
      this.$store.commit('userManagement/changeUserManagement', {
        form_replace_bawahan: {
          id_jabatan: text.idJabatan,
        },
      })
    },
    closeModalAssignUser() {
      this.userManagement.modalVisibleAssignUser = false
    },
    assignUser() {
      this.userManagement.modalVisibleAssignUser = true
    },
    deleteRow(id) {
      this.$confirm({
        title: 'Apakah anda yakin akan menghapus data ini?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          return new Promise((resolve, reject) => {
            this.deleteRowHirarkiDown({
              id_jabatan: parseInt(id.idJabatan),
            })
            this.getDetailProfile({
              id_jabatan: this.$route.params.uuid,
            })
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {},
      })
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
