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
      :columns="kategoriPromo.columns"
      :data-source="kategoriPromo.kategoriList"
      :loading="kategoriPromo.isLoading"
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
    v-model:visible="kategoriModal"
    title="Form Kategori"
  >
    <template #footer>
      <a-button
        key="back"
        @click="kategoriModal = false"
      >
        Batal
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="kategoriPromo.isLoading"
        @click="saveKategori"
      >
        {{ modalStatus ? 'Update' : 'Simpan' }}
      </a-button>
    </template>
    <a-input
      placeholder="Kategori"
      class="mb-3"
      v-model:value="formState.kategori_baru"
      @keyup.enter="saveKategori"
    />
    <a-textarea
      placeholder="Keterangan"
      :rows="5"
      v-model:value="formState.keterangan"
      @keyup.enter="saveKategori"
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
      kategoriModal: false,
      formState: {
        id: null,
        id_user: null,
        kategori_baru: '',
        keterangan: '',
      },
      modalStatus: false,
    }
  },
  async mounted() {
    await this.getAllKategori()
    this.getUserId()
  },
  computed: {
    ...mapState({
      kategoriPromo: state => state.kategoriPromo.data,
    }),
  },
  methods: {
    ...mapActions('kategoriPromo', ['getAllKategori', 'addKategori', 'deleteKategori', 'editKategori']),
    getUserId() {
      this.formState.id_user = store.state.user.userid
    },
    showAddModal() {
      this.modalStatus = false
      this.kategoriModal = true
      this.formState.kategori_baru = ''
      this.formState.keterangan = ''
    },
    showEditModal(id) {
      this.modalStatus = true
      this.kategoriModal = true
      this.formState.id = id
      const kategoriPromo = this.kategoriPromo.kategoriList.find(element => element.ID == id)
      this.formState.kategori_baru = kategoriPromo.NAMA_KATEGORI_PROMO
      this.formState.keterangan = kategoriPromo.KETERANGAN
    },
    showDeleteModal(id) {
      this.formState.id = id
      this.$confirm({
        title: 'Hapus Kategori',
        content: 'Apakah anda yakin?',
        okText: 'Hapus',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.deleteKategori({
            id_kategori: this.formState.id,
            id_user: this.formState.id_user,
          })
          await this.getAllKategori()
          this.formState.id = null
        },
        onCancel: () => {
          this.formState.id = null
        },
      })
    },
    async saveKategori() {
      const validation = this.formState.kategori_baru.toString().trim()
      if (validation.length < 1) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom kategori tidak boleh kosong',
        })
        this.formState.kategori_baru = ''
        this.kategoriModal = true
      } else {
        if (this.modalStatus) {
          await this.editKategori({
            id_kategori: this.formState.id,
            id_user: this.formState.id_user,
            kategori_baru: this.formState.kategori_baru,
            keterangan: this.formState.keterangan,
          })
        } else {
          await this.addKategori({
            id_user: this.formState.id_user,
            kategori_baru: this.formState.kategori_baru,
            keterangan: this.formState.keterangan,
          })
        }
        this.modalStatus = false
        this.kategoriModal = false
        await this.getAllKategori()
        this.formState.id = null
        this.formState.kategori_baru = ''
        this.formState.keterangan = ''
      }
    },
  },
}
</script>
