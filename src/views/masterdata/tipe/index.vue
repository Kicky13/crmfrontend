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
      :columns="tipe.columns"
      :data-source="tipe.tipeList"
      :loading="tipe.isLoading"
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
      <template #tanggal_dibuat="{ text }">
        <span>{{ changeFormatDate(text.TANGGAL_DIBUAT) }}</span>
      </template>
    </a-table>
  </a-card>
  
  <!-- Add Modal -->
  <a-modal
    v-model:visible="tipeModal"
    title="Form Tipe"
  >
    <template #footer>
      <a-button
        key="back"
        @click="tipeModal = false"
      >
        Batal
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="tipe.isLoading"
        @click="saveTipe"
      >
        {{ modalStatus ? 'Update' : 'Simpan' }}
      </a-button>
    </template>
    <a-input
      placeholder="Tipe"
      class="mb-3"
      v-model:value="formState.tipe_baru"
    />
    <a-textarea
      placeholder="Keterangan"
      :rows="5"
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
      tipeModal: false,
      formState: {
        id: null,
        id_user: null,
        tipe_baru: '',
      },
      modalStatus: false,
    }
  },
  computed: {
    ...mapState({
      tipe: state => state.tipe.data,
    }),
  },
  async mounted() {
    await this.getAllTipe()
    this.getUserId()
    this.changeFormatdate('2022-04-08 12:41:24')
  },
  methods: {
    ...mapActions('tipe', ['getAllTipe', 'addTipe', 'deleteTipe', 'editTipe']),
    getUserId() {
      this.formState.id_user = store.state.user.userid
    },
    showAddModal() {
      this.modalStatus = false
      this.tipeModal = true
      this.formState.tipe_baru = ''
    },
    async showEditModal(id) {
      this.modalStatus = true
      this.tipeModal = true
      this.formState.id = id
      this.formState.tipe_baru = this.tipe.tipeList.find(element => element.ID == id).NAMA_TIPE_SEMEN
    },
    showDeleteModal(id) {
      this.formState.id = id
      this.$confirm({
        title: 'Hapus Tipe',
        content: 'Apakah anda yakin?',
        okText: 'Hapus',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.deleteTipe({
            id_tipe: this.formState.id,
            id_user: this.formState.id_user,
          })
          await this.getAllTipe()
          this.formState.id = null
        },
        onCancel: () => {
          this.formState.id = null
        },
      })
    },
    async saveTipe() {
      const validation = this.formState.tipe_baru.toString().trim()
      if (validation.length < 1) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom tipe tidak boleh kosong',
        })
        this.formState.tipe_baru = ''
        this.tipeModal = true
      } else {
        if (this.modalStatus) {
          await this.editTipe({
            id_tipe: this.formState.id,
            id_user: this.formState.id_user,
            tipe_baru: this.formState.tipe_baru,
          })
        } else {
          await this.addTipe({
            id_user: this.formState.id_user,
            tipe_baru: this.formState.tipe_baru,
          })
        }
        this.modalStatus = false
        this.tipeModal = false
        await this.getAllTipe()
        this.formState.id = null
        this.formState.tipe_baru = ''
      }
    },
    changeFormatDate(dates) {
      const [dateFormat, timeFormat] = dates.split(' ')
      const [year, month, date] = dateFormat.split('-')
      return `${date}-${month}-${year} ${timeFormat}`
    },
  },
}
</script>
