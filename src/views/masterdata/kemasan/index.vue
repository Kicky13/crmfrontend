<template>
  <a-card class="card card-top card-top-primary">
    <div class="d-flex justify-content-end mb-3">
      <a-button type="primary" @click="showAddModal">
        <i class="fa fa-plus mr-2" />
        Tambah
      </a-button>
    </div>
    <a-table
      :columns="kemasan.columns"
      :data-source="kemasan.kemasanList"
      :loading="kemasan.isLoading"
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
  <a-modal v-model:visible="kemasanModal" title="Form Kemasan">
    <template #footer>
      <a-button key="back" @click="kemasanModal = false">
        Batal
      </a-button>
      <a-button key="submit" type="primary" :loading="kemasan.isLoading" @click="saveKemasan">
        {{ modalStatus ? 'Update' : 'Simpan' }}
      </a-button>
    </template>
    <a-input
      placeholder="Kemasan"
      v-model:value="formState.kemasan_baru"
      @keyup.enter="saveKemasan"
      :maxlength="50"
    />
    <div class="text-right">
      <span class="text-muted">{{ formState.kemasan_baru.length }} / 50</span>
    </div>
    <a-select
      placeholder="Satuan"
      show-search
      class="w-100 my-3"
      v-model:value="formState.id_satuan"
      @keyup.enter="saveKemasan"
    >
      <a-select-option disabled value="">Pilih Satuan</a-select-option>
      <a-select-option
        v-for="(item, index) in kemasan.kemasanGroup"
        :value="item.ID"
        :key="index"
        :title="item.NAMA_COMPANY"
        data-toggle="tooltip"
        data-placement="top"
      >
        {{ item.ID }} - {{ item.NAMA_GROUP_SATUAN }}
      </a-select-option>
    </a-select>
    <a-input
      placeholder="Nilai"
      v-model:value="formState.nilai"
      class="mb-3"
      @keyup.enter="saveKemasan"
    />
    <a-textarea
      placeholder="Keterangan"
      :rows="5"
      v-model:value="formState.keterangan"
      @keyup.enter="saveKemasan"
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
      kemasanModal: false,
      formState: {
        id: null,
        id_user: null,
        id_satuan: null,
        kemasan_baru: '',
        nilai: null,
        keterangan: '',
      },
      modalStatus: false,
    }
  },
  computed: {
    ...mapState({
      kemasan: state => state.kemasan.data,
    }),
  },
  async mounted() {
    await this.getAllGroupKemasan()
    await this.getAllKemasan()
    this.getUserId()
  },
  methods: {
    ...mapActions('kemasan', [
      'getAllGroupKemasan',
      'getAllKemasan',
      'addKemasan',
      'deleteKemasan',
      'editKemasan',
    ]),
    getUserId() {
      this.formState.id_user = store.state.user.userid
    },
    showAddModal() {
      this.modalStatus = false
      this.kemasanModal = true
      this.formState.kemasan_baru = ''
      this.formState.id_satuan = null
      this.formState.nilai = null
      this.formState.keterangan = ''
    },
    showEditModal(id) {
      this.modalStatus = true
      this.kemasanModal = true
      this.formState.id = id
      const kemasanById = this.kemasan.kemasanList.find(element => element.ID == id)
      this.formState.kemasan_baru = kemasanById.NAMA_KEMASAN
      this.formState.id_satuan = kemasanById.ID_GROUP_SATUAN
      this.formState.nilai = kemasanById.NILAI
      this.formState.keterangan = kemasanById.KETERANGAN
    },
    showDeleteModal(id) {
      this.formState.id = id
      this.$confirm({
        title: 'Hapus Kemasan',
        content: 'Apakah anda yakin?',
        okText: 'Hapus',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.deleteKemasan({
            id_kemasan: this.formState.id,
            id_user: this.formState.id_user,
          })
          await this.getAllKemasan()
          this.formState.id = null
        },
        onCancel: () => {
          this.formState.id = null
        },
      })
    },
    async saveKemasan() {
      const namaKemasanValidation = this.formState.kemasan_baru.toString().trim()
      const satuanValidation = this.formState.id_satuan
      const nilaiValidation = this.formState.nilai

      if (namaKemasanValidation.length < 1) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom kemasan tidak boleh kosong',
        })
        this.formState.kemasan_baru = ''
        this.kemasanModal = true
        return
      }
      if (satuanValidation == null) {
        if (!this.modalStatus) {
          notification.error({
            message: 'Gagal',
            description: 'Kolom satuan tidak boleh kosong',
          })
          this.kemasanModal = true
          return
        }
      }
      if (nilaiValidation < 1) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom nilai tidak boleh kosong',
        })
        this.formState.nilai = ''
        this.kemasanModal = true
        return
      }

      if (this.modalStatus) {
        await this.editKemasan({
          id_kemasan: this.formState.id,
          id_user: this.formState.id_user,
          id_group_satuan: this.formState.id_satuan,
          kemasan_baru: this.formState.kemasan_baru,
          nilai: this.formState.nilai,
          keterangan: this.formState.keterangan,
        })
      } else {
        await this.addKemasan({
          id_user: this.formState.id_user,
          id_group_satuan: this.formState.id_satuan,
          kemasan_baru: this.formState.kemasan_baru,
          nilai: this.formState.nilai,
          keterangan: this.formState.keterangan,
        })
      }
      this.modalStatus = false
      this.kemasanModal = false
      await this.getAllKemasan()
      this.formState.id = null
      this.formState.kemasan_baru = ''
      this.formState.id_satuan = null
      this.formState.nilai = null
      this.formState.keterangan = ''
    },
    satuanHandler(satuan) {
      this.formState.id_satuan = satuan.split('-')[0].trim()
    },
    changeFormatDate(dates) {
      const [dateFormat, timeFormat] = dates.split(' ')
      const [year, month, date] = dateFormat.split('-')
      return `${date}-${month}-${year}`
    },
  },
}
</script>
