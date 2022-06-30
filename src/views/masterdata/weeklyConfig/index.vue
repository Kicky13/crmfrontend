<template>
  <a-card class="card card-top card-top-primary">
    <div class="d-flex justify-content-between mb-3">
      <a-button
        type="primary"
        href="https://storage.googleapis.com/crm-asset/Template/Template%20Weekly%20Config.xlsx"
        download
      >
        <i class="fa fa-download mr-2" />
        Download Template Weekly Config
      </a-button>
      <div>
        <a-button
          type="primary"
          class="mr-2"
          @click="showPreviewModal"
        >
          <i class="fa fa-download mr-2" />
          Import
        </a-button>
        <a-button
          type="primary"
          @click="showAddModal"
        >
          <i class="fa fa-plus mr-2" />
          Tambah
        </a-button>
      </div>
    </div>
    <a-table
      :columns="weeklyConfig.columns"
      :data-source="weeklyConfig.weeklyConfigList"
      :loading="weeklyConfig.isLoading"
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
      <template #tanggal_mulai="{ text }">
        <span>{{ changeFormatDate(text.TANGGAL_MULAI) }}</span>
      </template>
      <template #tanggal_selesai="{ text }">
        <span>{{ changeFormatDate(text.TANGGAL_SELESAI) }}</span>
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
      @change="weeklyNameFormatting"
    />
    <vue-datepicker
      placeholder="Tanggal Mulai"
      class="ant-calendar-picker ant-calendar-picker-input ant-input my-3"
      input-format="dd-MM-yyyy"
      v-model="formState.tanggal_mulai"
    />
    <vue-datepicker
      placeholder="Tanggal Selesai"
      class="ant-calendar-picker ant-calendar-picker-input ant-input"
      input-format="dd-MM-yyyy"
      v-model="formState.tanggal_selesai"
    />
  </a-modal>

  <!-- Preview Modal -->
  <a-modal
    v-model:visible="previewModal"
    title="Import Data"
    width=""
    :style="{ padding: '0 75px' }"
  >
    <template #footer>
      <a-button
        key="back"
        @click="previewModal = false"
      >
        Kembali
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="weeklyConfig.isLoading"
        :disabled="submitStatus"
        @click="handleSubmit"
      >
        Submit
      </a-button>
    </template>
    <div class="d-flex justify-content-between">
      <a-form-item label="Upload File">
        <input
          ref="file"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          @change="onFileChanged"
        />
      </a-form-item>
      <a-button type="primary" @click="handlePreview">
        <i class="fa fa-eye mr-2" />
        Preview
      </a-button>
    </div>
    <a-table
      table-layout="auto"
      :columns="weeklyConfig.importColumns"
      :data-source="previewData"
      :loading="weeklyConfig.isLoading"
      :scroll="{ x: 1000 }"
    >
      <template #icon="{ text }">
        <div
          v-if="text.msg_error == 0"
        >
          <a-tooltip :title="text.msg">
            <img lazy="loading" v-once src="@/assets/images/check.svg" alt="Benar" />
          </a-tooltip>
        </div>
        <div v-else>
          <a-tooltip :title="text.msg">
            <img lazy="loading" v-once src="@/assets/images/wrong.svg" alt="Salah" />
          </a-tooltip>
        </div>
      </template>
      <template #message="{ text }">
        <span>{{ text.msg }}</span>
      </template>
      <template #start_date="{ text }">
        <div v-if="text.start_date">
          <span>{{ changeFormatDate(text.start_date) }}</span>
        </div>
        <div v-else>
          <span>{{ text.start_date }}</span>
        </div>
      </template>
      <template #end_date="{ text }">
        <div v-if="text.end_date">
          <span>{{ changeFormatDate(text.end_date) }}</span>
        </div>
        <div v-else>
          <span>{{ text.end_date }}</span>
        </div>
      </template>
    </a-table>
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
      previewModal: false,
      formState: {
        id: null,
        id_user: null,
        weekly_config_baru: '',
        tanggal_mulai: '',
        tanggal_selesai: '',
      },
      bodyFile: null,
      modalStatus: false,
      previewData: [],
      submitStatus: true,
      elementEdit: null,
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
    ...mapActions('weeklyConfig', [
      'getAllWeeklyConfig',
      'addWeeklyConfig',
      'deleteWeeklyConfig',
      'editWeeklyConfig',
      'getDataFromExcel',
      'submitExcelData',
    ]),
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
      this.weeklyConfig.weeklyConfigList.map(row => {
        row.edited = row.ID == id ? true : false
      })
      const element = this.weeklyConfig.weeklyConfigList.find(element => element.ID == id)
      this.elementEdit = element
      this.formState.weekly_config_baru = element.WEEK_NAME
      this.formState.tanggal_mulai = this.setFormatDate(element.TANGGAL_MULAI)
      this.formState.tanggal_selesai = this.setFormatDate(element.TANGGAL_SELESAI)
    },
    async showDeleteModal(id) {
      this.formState.id = id
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
      const bulan = weekNameValidation.substring(4, 6)
      const week = weekNameValidation.substring(6, 8)
      const tanggalMulaiValidation = this.formState.tanggal_mulai.toString()
      const tanggalSelesaiValidation = this.formState.tanggal_selesai.toString()

      if (weekNameValidation.length < 1) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom nama week tidak boleh kosong',
        })
        this.formState.weekly_config_baru = ''
        this.weeklyConfigModal = true
        return
      }
      if (parseInt(bulan) > 12) {
        notification.error({
          message: 'Gagal',
          description: 'Format week name bulan maks 12',
        })
        this.weeklyConfigModal = true
        return
      }
      if (parseInt(week) > 6) {
        notification.error({
          message: 'Gagal',
          description: 'Format week name minggu maks 6',
        })
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
      if (this.newDateGetTime(this.formState.tanggal_mulai) > this.newDateGetTime(this.formState.tanggal_selesai)) {
        notification.error({
          message: 'Gagal',
          description: 'Tanggal mulai harus sebelum tanggal selesai',
        })
        this.weeklyConfigModal = true
        return
      }

      const startDate = this.splitDate(this.formState.tanggal_mulai)
      const endDate = this.splitDate(this.formState.tanggal_selesai)
      this.formState.tanggal_mulai = this.getFormatDate(startDate)
      this.formState.tanggal_selesai = this.getFormatDate(endDate)

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
    },
    getFormatDate(date) {
      let components = date.split('-')
      let newDate = components[2] + '-' + components[1] + '-' + components[0]
      return newDate
    },
    setFormatDate(date) {
      let components = date.split(' ')[0]
      return new Date(components)
    },
    changeFormatDate(dates) {
      const dateFormat = dates.split(' ')[0]
      const [year, month, date] = dateFormat.split('-')
      return `${date}-${month}-${year}`
    },
    splitDate(dates) {
      return new Date(dates).toLocaleDateString('en-GB').toString().replace('/', '-').replace('/', '-')
    },
    weeklyNameFormatting() {
      this.formState.weekly_config_baru = this.formState.weekly_config_baru.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1')
      var size = this.formState.weekly_config_baru.length
      if (size > 8) {
        this.formState.weekly_config_baru = this.formState.weekly_config_baru.slice(0, 8)
      }
    },
    showPreviewModal() {
      this.previewModal = true
    },
    onFileChanged() {
      this.bodyFile = this.$refs.file.files[0]
    },
    async handlePreview() {
      this.previewData = []
      await this.getDataFromExcel({
        file: this.bodyFile,
        user_id: this.formState.id_user,
      })
      console.log(this.weeklyConfig.listData)
      this.weeklyConfig.listData.map(row => {
        if (!(row.name_error == "1" && row.start_date_error == "1" && row.end_date_error == "1")) {
          this.previewData.push(row)
        }
      })
      let status = []
      this.previewData.map(data => {
        if (data.msg_error != 0) {
          status.push(1)
        }
      })
      // this.previewData.map(data => {
      //   if (data.name_error == '0' && data.start_date_error == '0' && data.end_date_error == '0' && data.inperiode == 0 && data.sameName == 0 && data.range == 0) {
      //     data.laporan = data.inperiode_msg
      //   } else {
      //     data.laporan = data.error_msg
      //     if (data.inperiode) {
      //       data.laporan = `${data.laporan}${data.error_msg ? ", " : ""}${data.inperiode_msg}`
      //     }
      //     if (data.sameName) {
      //       data.laporan = `${data.laporan}${data.laporan ? ", " : ""}${data.sameName_msg}`
      //     }
      //     if (data.range) {
      //       data.laporan = `${data.laporan}${data.laporan ? ", " : ""}${data.range_msg}`
      //     }
      //     status.push(true)
      //   }
      // })
      this.submitStatus = status.length > 0 ? true : false
    },
    async handleSubmit() {
      await this.submitExcelData({
        data: this.previewData,
        user_id: this.formState.id_user,
      })
      await this.getAllWeeklyConfig()
      this.previewModal = false
      this.$refs.file.value = ''
      this.bodyFile = null
      this.previewData = []
      this.submitStatus = true
    },
    newDateGetTime(time) {
      return new Date(time).getTime()
    },
    dateRangeCheck(savedDate, startDate, endDate) {
      if (savedDate.find(row => startDate >= row.start && endDate <= row.end)) {
        return true
      }
      if (savedDate.find(row => (startDate >= row.start && startDate <= row.end) || (row.start >= startDate && row.start <= endDate))) {
        return true
      }
      return false
    },
  },
}
</script>
