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
      :columns="brand.columns"
      :data-source="brand.brandList"
      :loading="brand.isLoading"
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
    v-model:visible="brandModal"
    title="Form Brand"
  >
    <template #footer>
      <a-button
        key="back"
        @click="brandModal = false"
      >
        Batal
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="brand.isLoading"
        @click="saveBrand"
      >
        {{ modalStatus ? 'Update' : 'Simpan' }}
      </a-button>
    </template>
    <a-input
      placeholder="Brand"
      v-model:value="formState.brand_baru"
    />
    <a-select
      v-if="modalStatus == false"
      placeholder="Company"
      show-search
      class="w-100 my-3"
      v-model:value="formState.id_company"
    >
      <a-select-option disabled value="">Pilih Company</a-select-option>
      <a-select-option
        v-for="(item, index) in brand.companyList"
        :value="item.ID"
        :key="index"
        :title="item.DESKRIPSI"
        data-toggle="tooltip"
        data-placement="top"
      >
        {{ item.ID }} - {{ item.DESKRIPSI }}
      </a-select-option>
    </a-select>
    <div v-else class="mb-3"></div>
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
      brandModal: false,
      formState: {
        id: null,
        id_user: null,
        id_company: null,
        brand_baru: '',
      },
      modalStatus: false,
    }
  },
  computed: {
    ...mapState({
      brand: state => state.brand.data,
    }),
  },
  async mounted() {
    await this.getAllCompany()
    await this.getAllBrand()
    this.getUserId()
  },
  methods: {
    ...mapActions('brand', ['getAllCompany', 'getAllBrand', 'addBrand', 'deleteBrand', 'editBrand']),
    getUserId() {
      this.formState.id_user = store.state.user.userid
    },
    showAddModal() {
      this.modalStatus = false
      this.brandModal = true
      this.formState.brand_baru = ''
      this.formState.id_company = null
    },
    showEditModal(id) {
      this.modalStatus = true
      this.brandModal = true
      this.formState.id = id
      this.formState.brand_baru = this.brand.brandList.find(element => element.ID == id).NAMA_BRAND
    },
    showDeleteModal(id) {
      this.formState.id = id
      this.$confirm({
        title: 'Hapus Brand',
        content: 'Apakah anda yakin?',
        okText: 'Hapus',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.deleteBrand({
            id_tipe: this.formState.id,
            id_user: this.formState.id_user,
          })
          await this.getAllBrand()
          this.formState.id = null
        },
        onCancel: () => {
          this.formState.id = null
        },
      })
    },
    async saveBrand() {
      const namaBrandValidation = this.formState.brand_baru.toString().trim()
      const companyValidation = this.formState.id_company

      if (namaBrandValidation.length < 1) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom brand tidak boleh kosong',
        })
        this.formState.brand_baru = ''
        this.brandModal = true
        return
      }
      if (companyValidation == null) {
        if (!this.modalStatus) {
          notification.error({
            message: 'Gagal',
            description: 'Kolom company tidak boleh kosong',
          })
          this.brandModal = true
          return
        }
      }

      if (this.modalStatus) {
        await this.editBrand({
          id_brand: this.formState.id,
          id_user: this.formState.id_user,
          brand_baru: this.formState.brand_baru,
        })
      } else {
        await this.addBrand({
          id_user: this.formState.id_user,
          brand_baru: this.formState.brand_baru,
          id_company: this.formState.id_company,
        })
      }
      this.modalStatus = false
      this.brandModal = false
      await this.getAllBrand()
      this.formState.id = null
      this.formState.brand_baru = ''
      this.formState.id_company = null
    },
    companyHandler(company) {
      this.formState.id_company = company.split('-')[0].trim()
    },
    changeFormatDate(dates) {
      const [dateFormat, timeFormat] = dates.split(' ')
      const [year, month, date] = dateFormat.split('-')
      return `${date}-${month}-${year} ${timeFormat}`
    },
  },
}
</script>
