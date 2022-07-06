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
      :loading="distrikRET.isLoading"
    >
      <template #action="{ text }">
        <div>
          <button
            type="button"
            class="btn btn-info mr-1"
            data-toggle="tooltip"
            title="Tambah Distrik"
            @click="showTambahDistrikModal(text.ID)"
          >
            <i class="fa fa-map" />
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
      <template #tanggal_dibuat="{ text }">
        <span>{{ changeFormatDate(text.TANGGAL_DIBUAT) }}</span>
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
      @keyup.enter="saveDistrikRet"
    />
    <a-textarea
      placeholder="Keterangan"
      :rows="5"
      v-model:value="formState.keterangan"
      @keyup.enter="saveDistrikRet"
    />
  </a-modal>

  <!-- Add Distrik Modal -->
  <a-modal
    v-model:visible="tambahDistrikModal"
    title="Tambah Distrik"
  >
    <template #footer>
      <a-button
        danger
        key="back"
        @click="tambahDistrikModal = false"
      >
        Kembali
      </a-button>
    </template>
    <div class="d-flex mb-3">
      <a-select
        placeholder="Distrik"
        class="w-100 mr-2"
        show-search
        v-model:value="selected_distrik"
      >
        <a-select-option disabled value="">Pilih Distrik</a-select-option>
        <a-select-option
          v-for="(item, index) in distrikRET.distrikList.all"
          :value="`${item.id_distrik} - ${item.nama_distrik}`"
          :key="index"
          :title="item.nama_distrik"
          data-toggle="tooltip"
          data-placement="top"
          :disabled="item.disabled"
          :style="{color: item.isred ? 'red' : item.disabled ? '#c8c4db' : 'black'}"
        >
          {{ item.id_distrik }} - {{ item.nama_distrik }}
        </a-select-option>
      </a-select>
      <a-button danger @click="saveDistrik">
        <i class="fa fa-plus" />
      </a-button>
    </div>
    <a-list item-layout="horizontal" :data-source="distrikRET.distrikByDistrikRetList">
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a class="fa fa-window-close" @click="deleteDistrik(item.id_mm_distrik_ret)" />
        </template>
        <a-list-item-meta>
          <template #title>
            <span>{{ item.nama_distrik }}</span>
          </template>
          <template #avatar>
            <i class="fa fa-map-pin" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
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
        keterangan: '',
      },
      modalStatus: false,
      dataDistrik: {
        id_distrik_ret: null,
      },
      selected_distrik: null,
      id_provinsi_check: [],
    }
  },
  computed: {
    ...mapState({
      distrikRET: state => state.distrikRET.data,
    }),
  },
  async mounted() {
    await this.getAllDistrikRET()
    await this.getAllDistrik()
    this.getUserId()
  },
  methods: {
    ...mapActions(
      'distrikRET', 
      [
        'getAllDistrikRET',
        'addDistrikRET',
        'deleteDistrikRET',
        'editDistrikRET',
        'getAllDistrik',
        'getDistrikByDistrikRet',
        'addDistrikByDistrikRet',
        'deleteDistrikByDistrikRet',
      ],
    ),
    getUserId() {
      this.formState.id_user = store.state.user.userid
    },
    showAddModal() {
      this.distrikRetModal = true
      this.modalStatus = false
      this.formState.distrik_ret_baru = ''
      this.formState.keterangan = ''
    },
    showEditModal(id) {
      this.distrikRetModal = true
      this.modalStatus = true
      this.formState.id = id
      const distrikRet = this.distrikRET.distrikRetList.find(element => element.ID == id)
      this.formState.distrik_ret_baru = distrikRet.NAMA_DISTRIK_RET
      this.formState.keterangan = distrikRet.KETERANGAN
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
          this.disabledDistrik()
          this.redDistrik()
          this.formState.id = null
        },
        onCancel: () => {
          this.formState.id = null
        },
      })
    },
    async showTambahDistrikModal(id) {
      this.selected_distrik = null
      await this.getDistrikByDistrikRet({ id_distrik_ret: id })
      this.id_provinsi_check = this.distrikRET.distrikByDistrikRetList
      this.dataDistrik.id_distrik_ret = id
      await this.getAllDistrik()
      this.tambahDistrikModal = true
      this.disabledDistrik()
      this.redDistrik()
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
            keterangan: this.formState.keterangan,
          })
        } else {
          await this.addDistrikRET({
            id_user: this.formState.id_user,
            distrik_ret_baru: this.formState.distrik_ret_baru,
            keterangan: this.formState.keterangan,
          })
        }
        this.modalStatus = false
        this.distrikRetModal = false
        await this.getAllDistrikRET()
        this.formState.id = null
        this.formState.distrik_ret_baru = ''
        this.formState.keterangan = ''
      }
    },
    async saveDistrik(){
      const selectedIdProvinsi = this.selected_distrik ? this.distrikRET.distrikList.all.find(row => row.id_distrik == this.selected_distrik.split(' - ')[0]).id_provinsi : null

      if (this.selected_distrik == null) {
        notification.error({
          message: 'Gagal',
          description: 'Silahkan pilih salah satu distrik',
        })
        return
      }
      const lengthCheck = this.id_provinsi_check.length != 0 ? this.id_provinsi_check[0].id_provinsi : selectedIdProvinsi
      if (lengthCheck != selectedIdProvinsi) {
        notification.error({
          message: 'Gagal',
          description: 'Distrik berbeda provinsi',
        })
        return
      }
      await this.addDistrikByDistrikRet({
        id_distrik_ret: this.dataDistrik.id_distrik_ret,
        id_distrik: this.selected_distrik.split(' - ')[0],
        user_id: this.formState.id_user,
      })
      this.selected_distrik = null
      await this.getDistrikByDistrikRet({ id_distrik_ret: this.dataDistrik.id_distrik_ret })
      await this.getAllDistrik()
      this.disabledDistrik()
      this.id_provinsi_check = this.distrikRET.distrikByDistrikRetList
      this.redDistrik()
    },
    async deleteDistrik(id) {
      await this.deleteDistrikByDistrikRet({
        id_mm_distrik_ret: id,
        user_id: this.formState.id_user,
      })
      await this.getDistrikByDistrikRet({ id_distrik_ret: this.dataDistrik.id_distrik_ret })
      await this.getAllDistrik()
      this.disabledDistrik()
      this.id_provinsi_check = this.distrikRET.distrikByDistrikRetList
      this.redDistrik()
    },
    changeFormatDate(dates) {
      const [dateFormat, timeFormat] = dates.split(' ')
      const [year, month, date] = dateFormat.split('-')
      return `${date}-${month}-${year}`
    },
    disabledDistrik() {
      this.distrikRET.distrikList.all.map(obj => obj.disabled = false)
      this.distrikRET.distrikList.choosen.map(objChoosen => {
        if (this.distrikRET.distrikList.all.find(obj => obj.id_distrik == objChoosen.id_distrik)) {
          this.distrikRET.distrikList.all.find(obj => obj.id_distrik == objChoosen.id_distrik).disabled = true
        }
      })
    },
    redDistrik() {
      this.distrikRET.distrikList.all.map(obj => {
        if (this.id_provinsi_check.length == 0) {
          obj.isred = false
        } else if (obj.id_provinsi == this.id_provinsi_check[0].id_provinsi) {
          obj.isred = false
        } else {
          obj.isred = true
        }
      })
    },
  },
}
</script>
