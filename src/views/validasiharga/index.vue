<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Validasi Harga Produk</strong>
        <Can do="create" on="ValidasiHarga">
          <a-button type="primary" class="mb-3 float-right" @click="showModal">
            <i class="fa fa-plus mr-2" />
            Tambah Harga Produk
          </a-button>
        </Can>
      </div>
      <div class="card-body">
        <div class="table-responsive text-nowrap">
          <a-table :columns="columns" :data-source="dataSourceTable" row-key="id">
            <template #no="{ index }">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>

            <template #action="{ text }">
              <div>
                <Can do="update" on="ValidasiHarga">
                  <button type="button" class="btn btn-success mr-2" @click="showModalEdit(text)">
                    <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span>
                  </button>
                </Can>
                <Can do="delete" on="ValidasiHarga">
                  <button @click="showConfirm(text)" type="button" class="btn btn-danger">
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
          :after-close="resetFormState"
          :confirm-loading="confirmLoading"
          @ok="statusModal ? handleUpdate() : handleOk()"
        >
          <a-form :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="Pilih Produk">
              <a-select
                v-model:value="pilihProdukOption"
                show-search
                @change="setSelectMethod"
                placeholder=" -- Pilih Produk -- "
                required
              >
                <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                <a-select-option
                  v-for="(produk, index) in listProduk"
                  :value="`${produk.id}-${produk.namaproduk}`"
                  :key="index"
                >
                  {{ produk.id }} - {{ produk.namaproduk }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-input type="hidden" v-model:value="formState.namaproduk" />
            <a-form-item label="Harga Beli Minimal">
              <a-input-number
                v-model:value="formState.hargaBeliMin"
                :formatter="value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')"
                :parser="value => value.replace(/[Rp.]\s?|(,*)/g, '')"
                style="width: 100%"
              />
            </a-form-item>
            <a-form-item label="Harga Beli Maksimal">
              <a-input-number
                v-model:value="formState.hargaBeliMax"
                :formatter="value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')"
                :parser="value => value.replace(/[Rp.]\s?|(,*)/g, '')"
                style="width: 100%"
              />
            </a-form-item>
            <a-form-item label="Harga Jual Minimal">
              <a-input-number
                v-model:value="formState.hargaJualMin"
                :formatter="value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')"
                :parser="value => value.replace(/[Rp.]\s?|(,*)/g, '')"
                style="width: 100%"
              />
            </a-form-item>
            <a-form-item label="Harga Jual Maksimal">
              <a-input-number
                v-model:value="formState.hargaJualMax"
                :formatter="value => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')"
                :parser="value => value.replace(/[Rp.]\s?|(,*)/g, '')"
                style="width: 100%"
              />
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
import { Modal, notification } from 'ant-design-vue'
import { add, forEach } from 'lodash'
import Swal from 'sweetalert2'

const columns = [
  {
    title: 'No.',
    key: 'index',
    render: (text, record, index) => index,
    slots: { customRender: 'no' },
  },
  // {
  //   title: 'ID Produk',
  //   dataIndex: 'idproduk',
  //   key: 'idproduk',
  // },
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
      pilihProdukOption: '',
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
            this.pilihProdukOption = `${this.formState.idproduk} - ${this.formState.namaproduk}`
          }
        })
        .catch(err => {
          if (err) {
          }
        })
    },
    handleOk(e) {
      this.confirmLoading = true
      if (
        this.formState.idproduk == '' ||
        this.formState.hargaBeliMin == '' ||
        this.formState.hargaBeliMax == '' ||
        this.formState.hargaJualMin == '' ||
        this.formState.hargaJualMax == ''
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: `Field Tidak Boleh Kosong!`,
          showConfirmButton: false,
          timer: 2000,
        })
        setTimeout(() => {
          this.visible = false
          this.confirmLoading = false
        }, 1000)
        return true
      }
      const formData = toRaw(this.formState)
      try {
        insertProduk(formData)
          .then(response => {
            if (response.status == true) {
              this.fetchGetDataSource()

              Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: response.message,
                showConfirmButton: false,
                timer: 2000,
              })
            } else {
              let message = response.message
              message.forEach(x =>
                Swal.fire({
                  icon: 'error',
                  title: 'Opps...',
                  text: x,
                  showConfirmButton: false,
                  timer: 2000,
                }),
              )
            }
          })
          .catch(err => {
            if (err) {
              Swal.fire({
                icon: 'error',
                title: 'Opps...',
                text: 'Maaf, terjadi kesalahan!',
                showConfirmButton: false,
                timer: 2000,
              })
            }
          })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: 'Maaf, terjadi kesalahan!',
          showConfirmButton: false,
          timer: 2000,
        })
      }

      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 1000)
    },
    handleUpdate(e) {
      this.confirmLoading = true
      if (
        this.formState.idproduk == '' ||
        this.formState.hargaBeliMin == '' ||
        this.formState.hargaBeliMax == '' ||
        this.formState.hargaJualMin == '' ||
        this.formState.hargaJualMax == ''
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: 'Field Tidak Boleh Kosong!',
          showConfirmButton: false,
          timer: 2000,
        })
        setTimeout(() => {
          this.visible = false
          this.confirmLoading = false
        }, 1000)
        return true
      }
      const formData = toRaw(this.formState)
      try {
        updateProduk(this.formState.id, formData)
          .then(response => {
            if (response == true) {
              this.fetchGetDataSource()
              this.fetchGetDataProduk()

              Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: 'Data berhasil diupdate!',
                showConfirmButton: false,
                timer: 2000,
              })
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Opps...',
                text: 'Data gagal diupdate',
                showConfirmButton: false,
                timer: 2000,
              })
            }
          })
          .catch(err => {
            if (err) {
              Swal.fire({
                icon: 'error',
                title: 'Opps...',
                text: 'Maaf, terjadi kesalahan!',
                showConfirmButton: false,
                timer: 2000,
              })
            }
          })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: 'Maaf, terjadi kesalahan!',
          showConfirmButton: false,
          timer: 2000,
        })
      }
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 1000)
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
            Swal.fire({
              icon: 'success',
              title: 'Success...',
              text: 'Data berhasil dihapus!',
              showConfirmButton: false,
              timer: 2000,
            })
          }
        })
        .catch(err => {
          if (err) {
          }
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
      const id = parseInt(value.split('-')[0])
      getSelectProdukList()
        .then(response => {
          if (response) {
            const post = response.data.find(post => post.id === id)
            this.formState.idproduk = id
            this.formState.namaproduk = post.namaproduk
          }
        })
        .catch(err => {
          if (err) {
          }
        })
    },

    createRole() {
      this.$router.push({
        name: 'validasi-harga',
      })
    },
    addFormatNumber(harga) {
      return harga
        .split('s/d')
        .map(value => `Rp. ${value.trim().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00`)
        .join(' s/d ')
    },
    fetchGetDataSource() {
      getProdukList()
        .then(response => {
          if (response) {
            this.dataSourceTable = response.data
            this.dataSourceTable.map(data => {
              data.hargaBeli = this.addFormatNumber(data.hargaBeli)
              data.hargaJual = this.addFormatNumber(data.hargaJual)
            })
            this.resetFormState()
          }
        })
        .catch(err => {
          if (err) {
          }
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
          if (err) {
          }
        })
    },
    resetFormState() {
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
      this.pilihProdukOption = ''
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
