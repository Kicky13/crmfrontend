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
      :columns="distrikRET.columns"
      :data-source="distrikRET.distrikRetList"
    >
      <template #action="{ text }">
        <div>
          <button
            type="button"
            class="btn btn-info mr-1"
            data-toggle="tooltip"
            title="Tambah Distrik"
            @click="showTambahDistrikModal(text)"
          >
            <i class="fa fa-map-marker mx-1" />
          </button>
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
    v-model:visible="distrikRetModal"
    title="Form Distrik RET"
  >
    <template #footer>
      <a-button
        key="back"
        @click="distrikRetModal = false"
      >
        Batal
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="distrikRET.isLoading"
        @click="saveDistrikRet"
      >
        {{ modalStatus ? 'Update' : 'Simpan' }}
      </a-button>
    </template>
    <a-input
      placeholder="Distrik RET"
      class="mb-3"
      v-model:value="formState.distrik_ret_baru"
    />
    <a-textarea
      placeholder="Keterangan"
      :rows="5"
    />
  </a-modal>

  <!-- Add Distrik Modal -->
  <a-modal
    v-model:visible="tambahDistrikModal"
    title="Tambah Distrik"
    ok-text="Simpan"
    cancel-text="Batal"
    :on-ok="saveTambahDistrik"
  >
    <a-select
      placeholder="Distrik"
      class="w-100 mb-3"
      show-search
    >
      <a-select-option disabled value="">Pilih Distrik</a-select-option>
      <a-select-option value="distrik1">Distrik 1</a-select-option>
    </a-select>
  </a-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { notification } from 'ant-design-vue'
import store from '@/store'

export default {
  data() {
    return {
      distrikRetModal: false,
      tambahDistrikModal: false,
      formState: {
        id: null,
        id_user: null,
        distrik_ret_baru: '',
      },
      modalStatus: false,
    }
  },
  computed: {
    ...mapState({
      distrikRET: state => state.distrikRET.data,
    }),
  },
  async mounted() {
    await this.getAllDistrikRET()
    this.getUserId()
  },
  methods: {
    ...mapActions('distrikRET', ['getAllDistrikRET', 'addDistrikRET', 'deleteDistrikRET', 'editDistrikRET']),
    getUserId() {
      this.formState.id_user = store.state.user.userid
    },
    showAddModal() {
      this.distrikRetModal = true
      this.modalStatus = false
      this.formState.distrik_ret_baru = ''
    },
    showEditModal(id) {
      this.distrikRetModal = true
      this.modalStatus = true
      this.formState.id = id
      this.formState.distrik_ret_baru = this.distrikRET.distrikRetList.find(element => element.ID == id).NAMA_DISTRIK_RET
    },
    showDeleteModal(id) {
      this.formState.id = id
      this.$confirm({
        title: 'Hapus Distrik RET',
        content: 'Apakah anda yakin?',
        okText: 'Hapus',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.deleteDistrikRET({
            id_distrik_ret: this.formState.id,
            id_user: this.formState.id_user,
          })
          await this.getAllDistrikRET()
          this.formState.id = null
        },
        onCancel: () => {
          this.formState.id = null
        },
      })
    },
    showTambahDistrikModal() {
      this.tambahDistrikModal = true
    },
    async saveDistrikRet() {
      const validation = this.formState.distrik_ret_baru.toString().trim()
      if (validation.length < 1) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom distrik ret tidak boleh kosong',
        })
        this.formState.distrik_ret_baru = ''
        this.distrikRetModal = true
      } else {
        if (this.modalStatus) {
          await this.editDistrikRET({
            id_distrik_ret: this.formState.id,
            id_user: this.formState.id_user,
            distrik_ret_baru: this.formState.distrik_ret_baru,
          })
        } else {
          await this.addDistrikRET({
            id_user: this.formState.id_user,
            distrik_ret_baru: this.formState.distrik_ret_baru,
          })
        }
        this.modalStatus = false
        this.distrikRetModal = false
        await this.getAllDistrikRET()
        this.formState.id = null
        this.formState.distrik_ret_baru = ''
      }
    },
    saveTambahDistrik(){
      this.tambahDistrikModal = false
    },
  },
}
</script>
