<template>
  <div>    
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Validasi Harga Produk</strong>
        <a-button
          type="primary"
          class="mb-3 float-right"
          @click="showModal"
        >
          <i class="fa fa-plus mr-2" />
          Tambah Harga Produk
        </a-button>
      </div>
      <div class="card-body">
        <div class="table-responsive text-nowrap">
          <a-table :columns="columns" :data-source="dataSourceTable" row-key="id">
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #action="{ text }">
              <div>
                <button type="button" class="btn btn-warning" @click="showModalEdit(text)">
                  <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span>
                </button>
                <button @click="showConfirm(text)" type="button" class="btn btn-outline-danger">
                  <i class="fa fa-trash"></i><span> Hapus</span>
                </button>
              </div>
            </template>
          </a-table>
        </div>
        <a-modal v-model:visible="visible" title="Form Validasi Harga Survey" :confirm-loading="confirmLoading" @ok="handleOk">
          <a-form :model="formState" label-align="left" layout="vertical">
            <a-form-item label="Pilih Produk">
              <a-select v-model:value="formState.idproduk" @change="setSelectMethod"  placeholder=" -- Pilih Produk -- ">
                <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                <a-select-option v-for="(produk,index) in listProduk" :value="produk.id" :key="index">
                  {{ produk.id }} - {{ produk.namaproduk }}
                </a-select-option>
              </a-select>
            </a-form-item> 
            <a-input type="hidden" v-model:value="formState.namaproduk"/>
            <a-form-item label="Harga Beli Minimal">
              <a-input type="number" v-model:value="formState.hargaBeliMin" placeholder="Harga Beli Minimal"/>
            </a-form-item>
            <a-form-item label="Harga Beli Maksimal">
              <a-input type="number" v-model:value="formState.hargaBeliMax" placeholder="Harga Beli Maksimal"/>
            </a-form-item>
            <a-form-item label="Harga Jual Minimal">
              <a-input type="number" v-model:value="formState.hargaJualMin" placeholder="Harga Jual Minimal"/>
            </a-form-item>
            <a-form-item label="Harga Jual Maksimal">
              <a-input type="number" v-model:value="formState.hargaJualMax" placeholder="Harga Jual Maksimal"/>
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
import { getProdukList,getSelectProdukList,getNamaProdukList,deleteData,showpost } from '@/services/connection/master-data/api'
import { insertProduk } from '@/services/connection/validasiHargaProduk/api'
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
    dataIndex: 'hargaBeliMax',
    key: 'hargaBeliMax',
  },
  {
    title: 'Harga Jual',
    dataIndex: 'hargaJualMax',
    key: 'hargaJualMax',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    width: 150,
    key: 'id',
    slots: { customRender: 'action' },
  },
]

export default {
  name: 'VbAntDesign',
  // components: {
  //   UploadOutlined,
  // },
  setup() {
    const rowSelection = {
      
      getCheckboxProps: (record) => ({
        props: {
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        },
      }),
    }
    const fileList = [];
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
        id:'',
        idproduk:'',
        rownum : '',
        namaproduk:'',
        hargaBeliMin: '',
        hargaBeliMax: '',
        hargaJualMin: '',
        hargaJualMax: '',
        issig : 'true',
        status:'active',
      },
    }
  },
  mounted() {
    this.fetchGetDataSource()
    this.fetchGetDataProduk()
  },
  methods: {
    showModal() {
      console.log(this.visible)
      this.visible = true
      console.log(this.visible)
    },
    showModalEdit(id) {
      console.log(id)
      this.visible = true
      showpost(id)     
      .then(response => {
        if (response) {
          console.log(response)
          this.formState.idproduk = response.idproduk
          this.formState.namaproduk = response.namaproduk
          this.formState.hargaBeliMin = response.hargaBeliMin
          this.formState.hargaBeliMax = response.hargaBeliMax
          this.formState.hargaJualMin = response.hargaJualMin
          this.formState.hargaJualMax = response.hargaJualMax
        }
      })
      .catch(err => {
        console.error(err)
      })
    },
    handleOk(e) {
      console.log(e)
      this.confirmLoading = true;
      const formData = toRaw(this.formState)
      insertProduk(formData)
        .then((response) => {
          if (response) {
            console.log(response)
            this.$router.push({ name: '/validasiharga' })
          }
        })
        .catch((err) => {
          console.error(err)
        })
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log(e)
      this.visible = false
    },
    deleteDataById(id) {      
      console.log("Deleted ID: " + id)
      deleteData(id)
      .then(response => {
        if (response) {
          console.log(response)
          const dataSource = [...this.dataSourceTable]
          this.dataSourceTable = dataSource.filter(item => item.id !== id)
        }
      })
      .catch(err => {
        console.error(err)
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
      });
    }, 
   setSelectMethod(value) {
      getNamaProdukList(value)     
      .then(response => {
        if (response) {
          console.log(response)
          this.formState.namaproduk = response.namaproduk
        }
      })
      .catch(err => {
        console.error(err)
      })
    
    },
    
    createRole() {
      this.$router.push({ name: 'validasi-harga' })
    },
    deleteMarks() {
      console.log(this.rowSelection)
    },
    deleteAll() {},
    // deleteRow(id) {
    //   console.log("Deleted ID: " + id)
    //   deleteData(id)
    //   .then(response => {
    //     console.log(response)
    //     const dataSource = [...this.dataSourceTable]
    //     this.dataSourceTable = dataSource.filter(item => item.id !== id)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    // },
    fetchGetDataSource() {
      getProdukList()
        .then((response) => {
          if (response) {
            this.dataSourceTable = response
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fetchGetDataProduk() {
      getSelectProdukList()
        .then((response) => {
          if (response) {
            this.listProduk = response
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
