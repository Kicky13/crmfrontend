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
            <strong class="align-self-center">User yang menjabat</strong>
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
                <!-- <div class="font-size-16">
                  Username : {{ userManagement.detail_jabatan.namaUser }}
                </div> -->
                <div class="font-size-16">Email : {{ userManagement.detail_jabatan.email }}</div>
              </div>
            </div>
          </div>
          <div class="card-header align-self-center">
            <strong>Posisi Saat ini : {{ userManagement.detail_jabatan.levelJabatan }}</strong>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-xs-8">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">List SSM</strong>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 col-xs-12 mb-2"></div>
              <div class="col-md-4 col-xs-12 mb-2"></div>
              <div class="col-md-4 col-xs-12 mb-2">
                <a-button @click="modalTambahBawahan = true" type="primary" class="float-right">
                  <i class="fa fa-plus mr-2" />
                  Tambah SSM
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
              <!-- <a-input-search placeholder="input search text" style="width: 200px" /> -->
            </div>
            <div class="table-responsive text-nowrap">
              <a-table
                :columns="userManagement.columns_hirarki"
                :data-source="userManagement.list_hirarki_down"
                :row-key="(data) => data.iduser"
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
                    {{ text.titleJabatan }}
                  </div>
                </template>
                <template #id_user="{ text }">
                  <div>
                    {{ text.iduser ? text.iduser : `-` }}
                  </div>
                </template>
                <template #nama_sales="{ text }">
                  <div v-if="text.name">
                    <a href="javascript:void(0)" class="" @click="changeProfile(text)">
                      <i class="fa fa-user"></i> {{ text.name }}</a
                    >
                  </div>
                  <div v-else>-</div>
                </template>
                <template #action="{ text }">
                  <div>
                    <button
                      v-if="text.iduser"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Lihat Hirarki"
                      @click="changeProfile(text)"
                      class="btn btn-outline-success mr-1"
                    >
                      <i class="fa fa-sitemap"></i>
                    </button>
                    <button
                      v-if="text.iduser"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Kosongkan Jabatan"
                      @click="openModalDelete(text)"
                      class="btn btn-outline-danger mr-1"
                    >
                      <i class="fa fa-trash"></i>
                    </button>
                    <!-- <button
                      v-if="text.iduser != null"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Replace user"
                      @click="replaceUser(text)"
                      class="btn btn-outline-warning mr-1"
                    >
                      <i class="fa fa-user-plus"></i>
                    </button> -->
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
        <a-form-item label="User Sales" name="level">
          <a-select
            v-model:value="userManagement.form_tambah_bawahan.id_bawahan"
            placeholder="Pilih User Sales"
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
            :disabled-date="disabledBawahanStartDate"
            v-model:value="userManagement.form_tambah_bawahan.tgl_mulai"
            class="w-100"
          />
        </a-form-item>
        <!-- <a-form-item label="Tanggal Akhir Jabatan" name="level">
          <a-date-picker
            :disabled-date="disabledBawahanEndDate"
            v-model:value="userManagement.form_tambah_bawahan.tgl_akhir"
            class="w-100"
          />
        </a-form-item> -->
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
        <a-form-item label="User Sales" name="level">
          <a-select
            v-model:value="userManagement.form_replace_bawahan.user_replace_id"
            placeholder="Pilih User Sales Bawahan"
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
            :disabled-date="disabledReplaceStartDate"
            v-model:value="userManagement.form_replace_bawahan.tgl_mulai"
            class="w-100"
          />
        </a-form-item>
        <!-- <a-form-item label="Tanggal Akhir Jabatan" name="level">
          <a-date-picker
            :disabled-date="disabledReplaceEndDate"
            v-model:value="userManagement.form_replace_bawahan.tgl_akhir"
            class="w-100"
          />
        </a-form-item> -->
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
        <a-form-item label="User Sales" name="level">
          <a-select
            v-model:value="userManagement.form_assign_bawahan.id_user"
            placeholder="Pilih User Sales Bawahan"
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
          <a-date-picker
            :disabled-date="disabledAssignStartDate"
            v-model:value="userManagement.form_assign_bawahan.tgl_mulai"
            class="w-100"
          />
        </a-form-item>
        <!-- <a-form-item label="Tanggal Akhir Jabatan" name="level">
          <a-date-picker
            :disabled-date="disabledAssignEndDate"
            v-model:value="userManagement.form_assign_bawahan.tgl_akhir"
            class="w-100"
          />
        </a-form-item> -->
      </a-form>
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
            v-model="userManagement.form_kosongkan_jabatan.tgl_akhir"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="modalTambahBawahan"
      :title="`Tambah Jabatan`"
      :closable="false"
      :mask-closable="false"
    >
      <template #footer>
        <a-button key="back" @click="modalTambahBawahan = false">Batal</a-button>
        <a-button @click="submitTambahBawahan()" key="submit" type="primary">Tambahkan</a-button>
      </template>

      <a-form label-align="left" layout="vertical">
        <a-form-item label="Nama Jabatan" name="Nama Jabatan">
          <a-input v-model:value="newJabatan" placeholder="Nama jabatan" />
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
import VueDatepicker from 'vue3-datepicker'

const itemsPerPage = [5, 10, 15, 20]

export default {
  name: 'VbAntDesign',
  components: {
    VueDatepicker,
  },
  data() {
    return {
      modalDeleteView: false,
      id_jabatan: null,
      modalTambahBawahan: false,
      newJabatan: '',
    }
  },
  computed: {
    ...mapState({
      userManagement: (state) => state.userManagement.data,
    }),
  },
  async mounted() {
    await this.getDetailProfile({
      id_jabatan: this.$route.params.id_jabatan,
    })
    await this.getListDownHirarki({
      id_user: this.userManagement.detail_jabatan.idUser,
    })
    await this.getSalesNonBawahan({
      id_jabatan: this.$route.params.id_jabatan,
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

    disabledAssignStartDate(startValue) {
      const endValue = this.userManagement.form_assign_bawahan.tgl_akhir
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledAssignEndDate(endValue) {
      const startValue = this.userManagement.form_assign_bawahan.tgl_mulai
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },

    disabledReplaceStartDate(startValue) {
      const endValue = this.userManagement.form_replace_bawahan.tgl_akhir
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledReplaceEndDate(endValue) {
      const startValue = this.userManagement.form_replace_bawahan.tgl_mulai
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },

    disabledBawahanStartDate(startValue) {
      const endValue = this.userManagement.form_tambah_bawahan.tgl_akhir
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledBawahanEndDate(endValue) {
      const startValue = this.userManagement.form_tambah_bawahan.tgl_mulai
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    changeProfile(item) {
      this.$router.push(`/users/profile/jabatan/${item.idJabatan}`)
    },
    handlePaginationSize(size) {
      this.userManagement.pagination.pageSize = size
    },
    closeModal() {
      this.userManagement.modalVisibleHirarkiDown = false
    },
    async submitTambahBawahan() {
      if (this.newJabatan) {
        await this.postJabatanBawahan({
          id_jabatan_atasan: this.userManagement.detail_jabatan.idJabatan,
          id_level_hirarki: this.userManagement.detail_jabatan.levelJabatanBawahan,
          nama_jabatan: this.newJabatan,
        })

        await this.getListDownHirarki({
          id_user: this.userManagement.detail_jabatan.idUser,
        })
        this.modalTambahBawahan = false
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Nama jabatan tidak boleh kosong.',
        })
      }
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
        await this.getListDownHirarki({
          id_user: this.userManagement.detail_jabatan.idUser,
        })
        this.closeModal()
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
      }
    },
    async handleSubmitReplaceUser() {
      if (
        this.userManagement.form_replace_bawahan.user_replace_id &&
        this.userManagement.form_replace_bawahan.tgl_mulai
        // &&
        // this.userManagement.form_replace_bawahan.tgl_akhir
      ) {
        await this.submitReplaceSalesHirarki()
        await this.getListDownHirarki({
          id_user: this.userManagement.detail_jabatan.idUser,
        })
        this.closeModalReplaceUser()
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
      }
    },
    async handleSubmitAssignUser() {
      if (
        this.userManagement.form_assign_bawahan.id_user &&
        this.userManagement.form_assign_bawahan.tgl_mulai
        // &&
        // this.userManagement.form_assign_bawahan.tgl_akhir
      ) {
        await this.submitAssignSalesHirarki()
        await this.getListDownHirarki({
          id_user: this.userManagement.detail_jabatan.idUser,
        })
        this.closeModalAssignUser()
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
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
    assignUser(text) {
      console.log(text.idJabatan)
      this.userManagement.modalVisibleAssignUser = true
      this.$store.commit('userManagement/changeUserManagement', {
        form_assign_bawahan: {
          id_jabatan: text.idJabatan,
          id_user: null,
          tgl_mulai: '',
          tgl_akhir: '',
        },
      })
    },
    openModalDelete(id) {
      this.modalDeleteView = true
      this.id_jabatan = parseInt(id.idJabatan)
    },
    async deleteRow() {
      await this.deleteRowHirarkiDown({
        id_jabatan: this.id_jabatan,
      })
      await this.getDetailProfile({
        id_jabatan: this.$route.params.id_jabatan,
      })
      await this.getListDownHirarki({
        id_user: this.userManagement.detail_jabatan.idUser,
      })
      this.modalDeleteView = false
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
