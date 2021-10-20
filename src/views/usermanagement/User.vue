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
            placeholder="Cari"
            style="width: 200px"
            v-model:value="userManagementCRM.table.q"
            @input="searchData"
          />
        </div>
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="userManagementCRM.columns"
            :data-source="userManagementCRM.dataSourceTable"
            :row-key="data => data.uuid"
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
      :title="userManagementCRM.formState.id ? 'Edit User' : 'Tambah User'"
      :closable="false"
      :mask-closable="false"
    >
      <template #footer>
        <a-button key="back" @click="closeModal">Batal</a-button>
        <a-button @click="handleSubmit()" :loading="isSubmit" key="submit" type="primary"
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
import { _ } from 'vue-underscore'

export default {
  components: {
    // VbUserEditModal,
  },

  data() {
    return {}
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
    ...mapActions('userManagementCRM', [`getListUserCRM`, 'postSubmitData', 'deleteDataUser']),
    ...mapActions('userManagement', ['getListJenisUser']),
    searchData: _.debounce(function() {
      this.$store.commit('userManagementCRM/changeUserManagementCRM', {
        body: {
          offset: 1,
        },
      })

      this.getListUserCRM()
    }, 1000),
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
        },
      })
      this.getListJenisUser()
    },

    closeModal() {
      this.userManagementCRM.modalVisible = false
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
            data_id: id,
          })
          this.getListUserCRM()
        },
        onCancel() {},
      })
    },
    handlePaginationSize(size) {
      this.userManagementCRM.pagination.pageSize = size
    },
    formValidation() {
      if (
        this.userManagementCRM.formState.name &&
        this.userManagementCRM.formState.username &&
        this.userManagementCRM.formState.email &&
        this.userManagementCRM.formState.nohp
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
        this.getListUserCRM()
        this.closeModal()
      }
    },

    async showUserEditModal(id) {
      console.log(`----id`, id)
      const row = this.userManagementCRM.dataSourceTable.find(data => data.uuid === id)
      await this.$store.commit('userManagementCRM/changeUserManagementCRM', {
        formState: {
          id: row.uuid,
          name: row.name,
          username: row.username,
          password: row.password,
          email: row.email,
          nohp: row.nohp,
          userid: row.userid,
          id_level_hirarki: row.idLevelHirarki,
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
