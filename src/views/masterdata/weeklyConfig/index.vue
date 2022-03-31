<template>
  <a-card class="card card-top card-top-primary">
    <div class="d-flex justify-content-end mb-3">
      <a-button
        type="primary"
        @click="showAddModal"
      >
        <i class="fa fa-plus mr-2" />
        Tambah
      </a-button>
    </div>
    <a-table
      :columns="weeklyConfig.columns"
      :data-source="weeklyConfig.weeklyConfigList"
    >
      <template #action="{ text }">
        <div>
          <button
            type="button"
            class="btn btn-success mr-1"
            data-toggle="tooltip"
            title="Sunting"
            @click="showEditModal(text.ID)"
          >
            <i class="fa fa-pencil-square-o" />
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-toggle="tooltip"
            title="Hapus"
            @click="showDeleteModal(text.ID)"
          >
            <i class="fa fa-trash" />
          </button>
        </div>
      </template>
    </a-table>
  </a-card>
  
  <!-- Add Modal -->
  <a-modal
    v-model:visible="addModal"
    title="Form Weekly Config"
    :ok-text="modalStatus ? 'Update' : 'Simpan'"
    cancel-text="Batal"
    :on-ok="saveWeeklyConfig"
  >
    <a-input
      placeholder="Week Name"
      class="mb-3"
      v-model:value="formState.weekly_config_baru"
    />
    <a-input
      placeholder="Tanggal Mulai"
      class="mb-3"
    />
    <a-input
      placeholder="Tanggal Selesai"
    />
  </a-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { notification } from 'ant-design-vue'
import store from '@/store'

export default {
  data() {
    return {
      weeklyConfigModal: false,
      formState: {
        id: null,
        id_user: null,
        weekly_config_baru: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
      },
      modalStatus: false,
    }
  },
  async mounted() {
    await this.getAllWeeklyConfig()
    this.getUserId()
  },
  computed: {
    ...mapState({
      weeklyConfig: state => state.weeklyConfig.data,
    }),
  },
  methods: {
    ...mapActions('weeklyConfig', ['getAllWeeklyConfig', 'addWeeklyConfig', 'deleteWeeklyConfig', 'editWeeklyConfig']),
    getUserId() {
      this.formState.id_user = store.state.user.userid
    },
    showAddModal() {
      this.modalStatus = false
      this.weeklyConfigModal= true
      this.formState.weekly_config_baru = ''
      this.formState.tanggal_mulai = ''
      this.formState.tanggal_selesai = ''
    },
    showEditModal(id) {
      this.modalStatus = true
      this.weeklyConfigModal = true
      this.formState.id = id
      this.formState.weekly_config_baru = this.weeklyConfig.weeklyConfigList.find(element => element.ID == id).WEEK_NAME
    },
    async showDeleteModal(id) {this.formState.id = id
      this.$confirm({
        title: 'Hapus Weekly Config',
        content: 'Apakah anda yakin?',
        okText: 'Hapus',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.deleteWeeklyConfig({
            id_weekly_config: this.formState.id,
            id_user: this.formState.id_user,
          })
          await this.getAllWeeklyConfig()
          this.formState.id = null
        },
        onCancel: () => {
          this.formState.id = null
        },
      })},
    async saveWeeklyConfig() {
      const weekNameValidation = this.formState.weekly_config_baru.toString().trim()
      const tanggalMulaiValidation = this.formState.tanggal_mulai.toString()
      const tanggalSelesaiValidation = this.formState.tanggal_selesai.toString()

      if (weekNameValidation.length < 1) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom week name tidak boleh kosong',
        })
        this.formState.weekly_config_baru = ''
        this.weeklyConfigModal = true
        return
      }
      if (tanggalMulaiValidation) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom tanggal mulai tidak boleh kosong',
        })
        this.weeklyConfigModal = true
        return
      }
      if (tanggalSelesaiValidation) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom tanggal selesai tidak boleh kosong',
        })
        this.weeklyConfigModal = true
        return
      }

      if (this.modalStatus) {
        await this.editWeeklyConfig({
          id_weekly_config: this.formState.id,
          id_user: this.formState.id_user,
          weekly_config_baru: this.formState.weekly_config_baru,
        })
      } else {
        await this.addWeeklyConfig({
          id_user: this.formState.id_user,
          weekly_config_baru: this.formState.weekly_config_baru,
        })
      }
      this.modalStatus = false
      this.weeklyConfigModal = false
      await this.getAllWeeklyConfig()
      this.formState.id = null
      this.formState.weekly_config_baru = ''
    },
  },
}
</script>
