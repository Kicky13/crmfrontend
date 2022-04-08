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
    v-model:visible="weeklyConfigModal"
    title="Form Weekly Config"
  >
  <template #footer>
    <a-button
      key="back"
      @click="weeklyConfigModal = false"
    >
      Batal
    </a-button>
    <a-button
      key="submit"
      type="primary"
      :loading="weeklyConfig.isLoading"
      @click="saveWeeklyConfig"
    >
      {{ modalStatus ? 'Update' : 'Simpan' }}
    </a-button>
  </template>
    <a-input
      placeholder="Week Name"
      v-model:value="formState.weekly_config_baru"
    />
    <vue-datepicker
      placeholder="Tanggal Mulai"
      class="ant-calendar-picker ant-calendar-picker-input ant-input my-3"
      input-format="yyyy-MM-dd"
      v-model="formState.tanggal_mulai"
    />
    <vue-datepicker
      placeholder="Tanggal Selesai"
      class="ant-calendar-picker ant-calendar-picker-input ant-input"
      input-format="yyyy-MM-dd"
      v-model="formState.tanggal_selesai"
    />
  </a-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { notification } from 'ant-design-vue'
import store from '@/store'
import VueDatepicker from 'vue3-datepicker'

export default {
  components: {
    VueDatepicker,
  },
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
      const element = this.weeklyConfig.weeklyConfigList.find(element => element.ID == id)
      this.formState.weekly_config_baru = element.WEEK_NAME
      this.formState.tanggal_mulai = this.getFormatDate(element.TANGGAL_MULAI)
      this.formState.tanggal_selesai = this.getFormatDate(element.TANGGAL_SELESAI)
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
      if (tanggalMulaiValidation.length < 1) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom tanggal mulai tidak boleh kosong',
        })
        this.weeklyConfigModal = true
        return
      }
      if (tanggalSelesaiValidation.length < 1) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom tanggal selesai tidak boleh kosong',
        })
        this.weeklyConfigModal = true
        return
      }

      const startDate = new Date(this.formState.tanggal_mulai).toLocaleDateString('en-GB').toString()
      const endDate = new Date(this.formState.tanggal_selesai).toLocaleDateString('en-GB').toString()
      this.formState.tanggal_mulai = this.changeFormatDate('/', startDate)
      this.formState.tanggal_selesai = this.changeFormatDate('/', endDate)

      if (this.modalStatus) {
        await this.editWeeklyConfig({
          id_weekly_config: this.formState.id,
          id_user: this.formState.id_user,
          weekly_config_baru: this.formState.weekly_config_baru,
          start_date: this.formState.tanggal_mulai,
          end_date: this.formState.tanggal_selesai,
        })
      } else {
        await this.addWeeklyConfig({
          id_user: this.formState.id_user,
          weekly_config_baru: this.formState.weekly_config_baru,
          start_date: this.formState.tanggal_mulai,
          end_date: this.formState.tanggal_selesai,
        })
      }
      this.modalStatus = false
      this.weeklyConfigModal = false
      await this.getAllWeeklyConfig()
      this.formState.id = null
      this.formState.weekly_config_baru = ''
      this.formState.tanggal_mulai = ''
      this.formState.tanggal_selesai = ''
    },
    getFormatDate(date) {
      let components = date.split('-')
      let newDate = components[1] + '-' + components[2] + '-' + components[0]
      return new Date(newDate)
    },
  },
}
</script>
