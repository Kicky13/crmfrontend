<template>
  <a-card class="card card-top card-top-primary">
    <div class="d-flex justify-content-between mb-3">
      <a-input-search
        placeholder="Cari produk"
        style="width: 200px"
        @change="searchData"
      />
      <a-button
        type="primary"
        @click="showAddModal"
      >
        <i class="fa fa-plus mr-2" />
        Tambah
      </a-button>
    </div>
    <a-table
      :columns="produk.columns"
      :data-source="dataList"
      :loading="produk.isLoading"
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
    v-model:visible="produkModal"
    title="Form Produk"
  >
    <template #footer>
      <a-button
        key="back"
        @click="produkModal = false"
      >
        Batal
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="produk.isLoading"
        @click="saveProduk"
      >
        {{ modalStatus ? 'Update' : 'Simpan' }}
      </a-button>
    </template>
    <a-input
      placeholder="Nama Produk"
      class="mb-3"
      v-model:value="formState.produk_baru"
    />
    <a-select
      placeholder="Tipe"
      show-search
      class="w-100 mb-3"
      v-model:value="formState.id_tipe_semen"
    >
      <a-select-option disabled value="">Pilih Tipe</a-select-option>
      <a-select-option
        v-for="(item, index) in tipe.tipeList"
        :value="item.ID"
        :key="index"
        :title="item.NAMA_TIPE_SEMEN"
        data-toggle="tooltip"
        data-placement="top"
      >
        {{ item.ID }} - {{ item.NAMA_TIPE_SEMEN }}
      </a-select-option>
    </a-select>
    <a-select
      placeholder="Brand"
      show-search
      class="w-100 mb-3"
      v-model:value="formState.id_brand"
    >
      <a-select-option disabled value="">Pilih Brand</a-select-option>
      <a-select-option
        v-for="(item, index) in brand.brandList"
        :value="item.ID"
        :key="index"
        :title="item.NAMA_BRAND"
        data-toggle="tooltip"
        data-placement="top"
      >
        {{ item.ID }} - {{ item.NAMA_BRAND }}
      </a-select-option>
    </a-select>
    <a-select
      placeholder="Kemasan"
      show-search
      class="w-100 mb-3"
      v-model:value="formState.id_kemasan"
    >
      <a-select-option disabled value="">Pilih Kemasan</a-select-option>
      <a-select-option
        v-for="(item, index) in kemasan.kemasanList"
        :value="item.ID"
        :key="index"
        :title="item.NAMA_KEMASAN"
        data-toggle="tooltip"
        data-placement="top"
      >
        {{ item.ID }} - {{ item.NAMA_KEMASAN }}
      </a-select-option>
    </a-select>
    <a-select
      placeholder="Tipe Produk"
      show-search
      class="w-100"
      v-model:value="formState.id_type_produk"
    >
      <a-select-option disabled value="">Pilih Tipe Produk</a-select-option>
      <a-select-option
        v-for="(item, index) in produk.typeProdukList"
        :value="item.ID"
        :key="index"
        :title="item.NAMA_TYPE_PRODUK"
        data-toggle="tooltip"
        data-placement="top"
      >
        {{ item.ID }} - {{ item.NAMA_TYPE_PRODUK }}
      </a-select-option>
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
      produkModal: false,
      formState: {
        id: null,
        id_user: null,
        id_satuan: null,
        id_brand: null,
        id_type_produk: null,
        id_kemasan: null,
        id_tipe_semen: null,
        produk_baru: '',
      },
      modalStatus: false,
      dataList: [],
    }
  },
  computed: {
    ...mapState({
      produk: state => state.produk.data,
      brand: state => state.brand.data,
      tipe: state => state.tipe.data,
      kemasan: state => state.kemasan.data,
    }),
  },
  async mounted() {
    await this.setAllProduk()
    this.getUserId()
  },
  methods: {
    ...mapActions('produk', ['getAllProduk', 'getAllTypeProduk', 'addProduk', 'deleteProduk', 'editProduk']),
    ...mapActions('brand', ['getAllBrand']),
    ...mapActions('tipe', ['getAllTipe']),
    ...mapActions('kemasan', ['getAllKemasan']),
    getUserId() {
      this.formState.id_user = store.state.user.userid
    },
    async setAllProduk() {
      this.dataList = []
      await this.getAllProduk()
      this.produk.produkList.map(list => this.dataList.push(list))
    },
    async showAddModal() {
      await this.getAllBrand()
      await this.getAllTypeProduk()
      await this.getAllTipe()
      await this.getAllKemasan()
      this.modalStatus = false
      this.produkModal = true
      this.formState.produk_baru = ''
      this.formState.id_brand = null
      this.formState.id_tipe_semen = null
      this.formState.id_kemasan = null
      this.formState.id_type_produk = null
    },
    async showEditModal(id) {
      await this.getAllBrand()
      await this.getAllTypeProduk()
      await this.getAllTipe()
      await this.getAllKemasan()
      this.modalStatus = true
      this.produkModal = true
      this.formState.id = id
      const produkById = this.produk.produkList.find(element => element.ID == id)
      this.formState.produk_baru = produkById.NAMA_PRODUK
      this.formState.id_brand = produkById.ID_BRAND
      this.formState.id_tipe_semen = produkById.ID_TIPE
      this.formState.id_kemasan = produkById.ID_KEMASAN
      this.formState.id_type_produk = produkById.ID_TYPE_PRODUK
    },
    showDeleteModal(id) {
      this.formState.id = id
      this.$confirm({
        title: 'Hapus Produk',
        content: 'Apakah anda yakin?',
        okText: 'Hapus',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.deleteProduk({
            id_produk: this.formState.id,
            id_user: this.formState.id_user,
          })
          await this.setAllProduk()
          this.formState.id = null
        },
        onCancel: () => {
          this.formState.id = null
        },
      })
    },
    async saveProduk() {
      const produkBaruValidation = this.formState.produk_baru.toString().trim()
      const brandValidation = this.formState.id_brand
      const tipeValidation = this.formState.id_tipe_semen
      const typeProdukValidation = this.formState.id_type_produk
      const kemasanValidation = this.formState.id_kemasan

      if (produkBaruValidation.length < 1) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom nama produk tidak boleh kosong',
        })
        this.formState.produk_baru = ''
        this.produkModal = true
        return
      }
      if (brandValidation == null) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom brand tidak boleh kosong',
        })
        this.produkModal = true
        return
      }
      if (tipeValidation == null) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom tipe tidak boleh kosong',
        })
        this.produkModal = true
        return
      }
      if (typeProdukValidation == null) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom tipe produk tidak boleh kosong',
        })
        this.produkModal = true
        return
      }
      if (kemasanValidation == null) {
        notification.error({
          message: 'Gagal',
          description: 'Kolom kemasan tidak boleh kosong',
        })
        this.produkModal = true
        return
      }
      if (this.modalStatus) {
        await this.editProduk({
          id_produk: this.formState.id,
          id_user: this.formState.id_user,
          produk_baru: this.formState.produk_baru,
          id_satuan: this.formState.id_kemasan,
          id_brand: this.formState.id_brand,
          id_type_produk: this.formState.id_type_produk,
          id_tipe_semen: this.formState.id_tipe_semen,
        })
      } else {
        await this.addProduk({
          id_user: this.formState.id_user,
          produk_baru: this.formState.produk_baru,
          id_satuan: this.formState.id_kemasan,
          id_brand: this.formState.id_brand,
          id_type_produk: this.formState.id_type_produk,
          id_tipe_semen: this.formState.id_tipe_semen,
        })
      }
      this.modalStatus = false
      this.produkModal = false
      await this.setAllProduk()
      this.formState.id = null
      this.formState.produk_baru = ''
      this.formState.id_satuan = null
      this.formState.id_brand = null
      this.formState.id_type_produk = null
      this.formState.id_kemasan = null
      this.formState.id_tipe = null
    },
    searchData(keyword) {
      if (keyword) {
        this.dataList = this.produk.produkList.filter(produk =>
          produk.NAMA_PRODUK.toLowerCase().includes(keyword.target.value.toLowerCase()),
        )
      } else {
        this.dataList = this.produk.produkList
      }
    },
  },
}
</script>
