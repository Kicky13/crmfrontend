<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Validasi Harga Produk</strong>
        <Can do="create" a="validasiHarga">
          <a-button type="primary" class="mb-3 float-right" @click="showModal">
            <i class="fa fa-plus mr-2" />
            Tambah Harga Produk
          </a-button>
        </Can>
      </div>
      <div class="card-body">
        <div class="table-responsive text-nowrap">
          <a-table :columns="columns" :data-source="dataSourceTable" row-key="id">
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #action="{ text }">
              <div>
                <Can do="update" a="validasiHarga">
                  <button type="button" class="btn btn-warning" @click="showModalEdit(text)">
                    <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span>
                  </button>
                </Can>
                <Can do="delete" a="validasiHarga">
                  <button @click="showConfirm(text)" type="button" class="btn btn-outline-danger">
                    <i class="fa fa-trash"></i><span> Hapus</span>
                  </button>
                </Can>
              </div>
            </template>
          </a-table>
        </div>
        <a-modal
          v-model:visible="visible"
          title="Form Validasi Harga Survey"
          :confirm-loading="confirmLoading"
          @ok="statusModal ? handleUpdate() : handleOk()"
        >
          <a-form :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="Pilih Produk">
              <a-select
                v-model:value="formState.idproduk"
                @change="setSelectMethod"
                placeholder=" -- Pilih Produk -- "
              >
                <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                <a-select-option
                  v-for="(produk, index) in listProduk"
                  :value="produk.id"
                  :key="index"
                >
                  {{ produk.id }} - {{ produk.namaproduk }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-input type="hidden" v-model:value="formState.namaproduk" />
            <a-form-item label="Harga Beli Minimal">
              <a-input type="number" v-model:value="formState.hargaBeliMin" />
            </a-form-item>
            <a-form-item label="Harga Beli Maksimal">
              <a-input type="number" v-model:value="formState.hargaBeliMax" />
            </a-form-item>
            <a-form-item label="Harga Jual Minimal">
              <a-input type="number" v-model:value="formState.hargaJualMin" />
            </a-form-item>
            <a-form-item label="Harga Jual Maksimal">
              <a-input type="number" v-model:value="formState.hargaJualMax" />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
// import { getDataList, deleteData } from '@/services/connection/radius-distrik/api'
import { toRaw } from 'vue'
import {
  getProdukList,
  getSelectProdukList,
  getNamaProdukList,
  deleteData,
  showpost,
} from '@/services/connection/master-data/api'
import { insertProduk, updateProduk } from '@/services/connection/validasiHargaProduk/api'
import { Modal } from 'ant-design-vue'

const columns = [
  {
    title: 'No.',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'ID Produk',
    dataIndex: 'idproduk',
    key: 'idproduk',
  },
  {
    title: 'Nama Produk',
    dataIndex: 'namaproduk',
    key: 'namaproduk',
  },
  {
    title: 'Harga Beli',
    dataIndex: 'hargaBeli',
    key: 'hargaBeli',
  },
  {
    title: 'Harga Jual',
    dataIndex: 'hargaJual',
    key: 'hargaJual',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    width: 150,
    key: 'id',
    slots: {
      customRender: 'action',
    },
  },
]

export default {
  name: 'VbAntDesign',
  // components: {
  //   UploadOutlined,
  // },
  setup() {
    const rowSelection = {
      getCheckboxProps: record => ({
        props: {
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        },
      }),
    }
    const fileList = []
    return {
      columns,
      rowSelection,
      fileList,
      headers: {
        authorization: 'authorization-text',
      },
    }
  },
  data() {
    return {
      dataSourceTable: [],
      visible: false,
      loading: false,
      confirmLoading: false,
      listProduk: [],
      formState: {
        id: '',
        idproduk: '',
        namaproduk: '',
        hargaBeliMin: '',
        hargaBeliMax: '',
        hargaJualMin: '',
        hargaJualMax: '',
        issig: 'true',
        status: 'active',
      },
      statusModal: false,
    }
  },
  mounted() {
    this.fetchGetDataSource()
    this.fetchGetDataProduk()
  },
  methods: {
    showModal() {
      this.visible = true
      this.statusModal = false
    },
    showModalEdit(id) {
      const uuid = id
      this.visible = true
      this.statusModal = true
      // showpost(id)
      getProdukList()
        .then(response => {
          if (response) {
            const post = response.data.find(post => post.id === id)
            this.formState.id = post.id
            this.formState.idproduk = post.idproduk
            this.formState.namaproduk = post.namaproduk
            this.formState.hargaBeliMin = post.hargaBeliMin
            this.formState.hargaBeliMax = post.hargaBeliMax
            this.formState.hargaJualMin = post.hargaJualMin
            this.formState.hargaJualMax = post.hargaJualMax
          }
        })
        .catch(err => {
          if (err) {}
        })
    },
    handleOk(e) {
      this.confirmLoading = true
      const formData = toRaw(this.formState)
      insertProduk(formData)
        .then(response => {
          if (response) {
            this.fetchGetDataSource()
          }
        })
        .catch(err => {
          if (err) {}
        })
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleUpdate(e) {
      this.confirmLoading = true
      const formData = toRaw(this.formState)
      updateProduk(this.formState.id, formData)
        .then(response => {
          if (response) {
            this.fetchGetDataSource()
          }
        })
        .catch(err => {
          if (err) {}
        })
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      this.visible = false
      this.statusModal = false
    },
    deleteDataById(id) {
      deleteData(id)
        .then(response => {
          if (response) {
            const dataSource = [...this.dataSourceTable]
            this.dataSourceTable = dataSource.filter(item => item.id !== id)
          }
        })
        .catch(err => {
          if (err) {}
        })
    },
    showConfirm(id) {
      const deleteMethod = this.deleteDataById
      this.$confirm({
        title: 'Hapus Validasi Harga',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk() {
          deleteMethod(id)
        },
      })
    },
    setSelectMethod(value) {
      const id = value
      getSelectProdukList()
        .then(response => {
          if (response) {
            const post = response.data.find(post => post.id === id)
            this.formState.namaproduk = post.namaproduk
          }
        })
        .catch(err => {
          if (err) {}
        })
    },

    createRole() {
      this.$router.push({
        name: 'validasi-harga',
      })
    },
    fetchGetDataSource() {
      getProdukList()
        .then(response => {
          if (response) {
            this.dataSourceTable = response.data
            this.formState = {
              id: '',
              idproduk: '',
              rownum: '',
              namaproduk: '',
              hargaBeliMin: '',
              hargaBeliMax: '',
              hargaJualMin: '',
              hargaJualMax: '',
              issig: 'true',
              status: 'active',
            }
          }
        })
        .catch(err => {
          if (err) {}
        })
    },
    fetchGetDataProduk() {
      getSelectProdukList()
        .then(response => {
          if (response) {
            this.listProduk = response.data
          }
        })
        .catch(err => {
          if (err) {}
        })
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
