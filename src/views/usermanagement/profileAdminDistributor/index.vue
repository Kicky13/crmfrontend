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
                  Kode / ID User :
                  {{
                    userManagement.detail_jabatan.idUser
                      ? userManagement.detail_jabatan.idUser
                      : '-'
                  }}
                </div>
                <div class="font-size-16">
                  Kode / ID Jabatan : {{ userManagement.detail_jabatan.idJabatan }}
                </div>
                <!-- <div class="font-size-16">
                  Username : {{ userManagement.detail_jabatan.namaUser }}
                </div> -->
                <div class="font-size-16">Email : {{ userManagement.detail_jabatan.email }}</div>
              </div>
            </div>
          </div>
          <div class="card-header align-self-center">
            <strong>Level Jabatan : {{ userManagement.detail_jabatan.levelJabatan }}</strong>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-xs-8">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Daftar Distributor</strong>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 col-xs-12 mb-2"></div>
              <div class="col-md-4 col-xs-12 mb-2"></div>
              <div class="col-md-4 col-xs-12 mb-2">
                <a-button
                  v-if="profileAdminDistributor.list_data_table.length <= 0"
                  type="primary"
                  class="float-right"
                  @click="openModalAssign()"
                >
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
                  :default-value="profileAdminDistributor.itemsPerPage[1]"
                  class="mx-2"
                  @change="handlePaginationSize"
                >
                  <a-select-option
                    v-for="itemPerPage in profileAdminDistributor.itemsPerPage"
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
                :columns="profileAdminDistributor.columns"
                :data-source="profileAdminDistributor.list_data_table"
                :row-key="(data) => data.iduser"
                :pagination="profileAdminDistributor.pagination"
                :loading="profileAdminDistributor.isLoading"
              >
                <template #no="{ index }">
                  <div>
                    {{ index + 1 }}
                  </div>
                </template>
                <template #kode="{ text }">
                  <div>
                    {{ text.idDistributor ? text.idDistributor : '-' }}
                  </div>
                </template>
                <template #nama_distributor="{ text }">
                  <div>
                    {{ text.namaDistributor ? text.namaDistributor : `-` }}
                  </div>
                </template>
                <template #action="{ text }">
                  <div>
                    <button
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Hapus"
                      @click="openModalDelete(text)"
                      class="btn btn-outline-danger mr-1"
                    >
                      <i class="fa fa-trash"></i>
                    </button>
                  </div>
                </template>
              </a-table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL ASSIGN USER -->

    <a-modal
      v-model:visible="modalVisibleAssignUser"
      :title="'Assign User'"
      :closable="false"
      :mask-closable="false"
    >
      <template #footer>
        <a-button key="back" @click="modalVisibleAssignUser = false">Batal</a-button>
        <a-button @click="handleSubmitAssignUser()" key="submit" type="primary">Simpan</a-button>
      </template>
      <a-form label-align="left" layout="vertical">
        <a-form-item label="Data Distributor" name="level">
          <a-select
            v-model:value="profileAdminDistributor.formData.id_distributor"
            placeholder="Pilih Distributor"
            show-search
          >
            <a-select-option
              v-for="(item, index) in profileAdminDistributor.list_distributor"
              :key="`level_${index}`"
              :value="item.idDistributor + ' - ' + item.namaDistributor"
            >
              {{ item.idDistributor }} - {{ item.namaDistributor }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="Tanggal Mulai Jabatan" name="level">
          <a-date-picker
            :disabled-date="disabledAssignStartDate"
            v-model:value="userManagement.form_assign_bawahan.tgl_mulai"
            class="w-100"
          />
        </a-form-item> -->
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="modalDeleteView"
      :title="`Hapus`"
      :closable="false"
      :mask-closable="false"
    >
      <template #footer>
        <a-button key="back" @click="modalDeleteView = false">Batal</a-button>
        <a-button @click="deleteRow()" key="submit" type="primary">Hapus</a-button>
      </template>
      <a-form label-align="left" layout="vertical">
        <span>Apakah anda yakin akan menghapus data ini ?</span>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { toRaw } from 'vue'
import { notification, message } from 'ant-design-vue'
import { getUserList } from '@/services/connection/user-management/api'
import { mapState, mapActions } from 'vuex'
// import VueDatepicker from 'vue3-datepicker'

export default {
  name: 'VbAntDesign',
  components: {
    // VueDatepicker,
  },
  data() {
    return {
      modalVisibleAssignUser: false,
      modalDeleteView: false,
      id_distributor: null,
    }
  },
  computed: {
    ...mapState({
      profileSalesDistributor: (state) => state.profileSalesDistributor.data,
      profileAdminDistributor: (state) => state.profileAdminDistributor.data,
      userManagement: (state) => state.userManagement.data,
    }),
  },
  async mounted() {
    await this.getDetailProfile({
      id_jabatan: this.$route.params.id_jabatan,
    })
    await this.getListAdminDistributor({
      id_jabatan: this.$route.params.id_jabatan,
      id_user: this.userManagement.detail_jabatan.idUser,
    })
    await this.getListAllSalesDistributor()
  },
  methods: {
    ...mapActions('profileSalesDistributor', ['']),
    ...mapActions('profileAdminDistributor', [
      'getListAdminDistributor',
      'submitAssignAdminDistributor',
      'submitRemoveAdminDistributor',
      'getListAllSalesDistributor',
    ]),
    ...mapActions('userManagement', ['getDetailProfile']),

    openModalAssign() {
      this.modalVisibleAssignUser = true
      this.$store.commit('profileAdminDistributor/changeProfileAdminDistributor', {
        formData: {
          id_distributor: '',
        },
      })
    },

    openModalDelete(item) {
      this.modalDeleteView = true
      this.id_distributor = item.idDistributor
    },

    async deleteRow() {
      await this.submitRemoveAdminDistributor({
        id_jabatan: this.$route.params.id_jabatan,
        id_user: this.userManagement.detail_jabatan.idUser,
        id_distributor: this.id_distributor,
      })
      await this.getListAdminDistributor({
        id_jabatan: this.$route.params.id_jabatan,
        id_user: this.userManagement.detail_jabatan.idUser,
      })
      this.modalDeleteView = false
    },

    async handleSubmitAssignUser() {
      if (this.profileAdminDistributor.formData.id_distributor) {
        await this.submitAssignAdminDistributor({
          id_jabatan: this.$route.params.id_jabatan,
          id_user: this.userManagement.detail_jabatan.idUser,
        })
        await this.getListAdminDistributor({
          id_jabatan: this.$route.params.id_jabatan,
          id_user: this.userManagement.detail_jabatan.idUser,
        })
        this.modalVisibleAssignUser = false
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Data distributor tidak boleh kosong.',
        })
      }
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
