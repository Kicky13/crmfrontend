<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Data Sales SBI</strong>
      </div>
      <div class="card-body">
        <a-form :model="form">
          <a-row>
            <a-col :span="6">
              <a-form-item label="Region">
                <a-select v-model:value="formState.regionId" @change="setSelectMethodRegion" placeholder=" -- ALL -- "
                  style="width: 180px">
                  <a-select-option  value="">ALL</a-select-option>
                  <a-select-option v-for="(region,index) in listRegion" :value="region.id" :key="index">
                    {{ region.regionName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="Provinsi">
                <a-select v-model:value="formState.provinsiId" @change="setSelectMethodProvinsi"
                  placeholder=" -- ALL -- " style="width: 180px">
                  <a-select-option value="">ALL</a-select-option>
                  <a-select-option v-for="(provinsi,index) in listProvinsi" :value="provinsi.id" :key="index">
                    {{ provinsi.provinsiName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="Distributor">
                <a-select v-model:value="formState.distributorId" placeholder=" -- ALL -- " style="width: 180px">
                  <a-select-option value="">ALL</a-select-option>
                  <a-select-option v-for="(distributor,index) in listDistributor" :value="distributor.id" :key="index">
                    {{ distributor.distributorName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-row>
                <a-col :span="12">
                  <a-button type="primary" @click="showModal">
                    <i class="fa fa-eye mr-1" />
                    View
                  </a-button>
                </a-col>
                <a-col :span="12">
                  <a-button type="btn btn-success" @click="showModal">

                    <i class="fa fa-download mr-1" />
                    Export
                  </a-button>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-form>
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
        <a-modal v-model:visible="visible" title="Form Validasi Harga Survey" :confirm-loading="confirmLoading"
          @ok="statusModal ? handleUpdate() : handleOk()">
          <a-form :model="formState" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="Pilih Produk">
              <a-select v-model:value="formState.idproduk" @change="setSelectMethod" placeholder=" -- Pilih Produk -- ">
                <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                <a-select-option v-for="(produk,index) in listProduk" :value="produk.id" :key="index">
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
  import {
    toRaw,
  } from 'vue'
  import {
    getDataSalesList,
    getSelectProdukList,
    getNamaProdukList,
    deleteData,
    showpost,
  } from '@/services/connection/data-sales/api'
  import {
    getProvinsiList,
    getRegionList,
    getdistributorSBIList,
  } from '@/services/connection/master-data/api'
  import {
    Modal,
  } from 'ant-design-vue'

  const columns = [{
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'ID Sales',
      dataIndex: 'idsales',
      key: 'idsales',
    },
    {
      title: 'Nama Sales',
      dataIndex: 'namasales',
      key: 'namasales',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Region',
      dataIndex: 'regionName',
      key: 'regionName',
    },
    {
      title: 'Provinsi',
      dataIndex: 'provinsiName',
      key: 'provinsiName',
    },
    {
      title: 'Distributor',
      dataIndex: 'distributorName',
      key: 'distributorName',
    },
    {
      title: 'Nama SO',
      dataIndex: 'namaSO',
      key: 'namaSO',
    },
    {
      title: 'Nama SM',
      dataIndex: 'namaSM',
      key: 'namaSM',
    },
    {
      title: 'Nama SSM',
      dataIndex: 'namaSSM',
      key: 'namaSSM',
    },
    {
      title: 'Nama GSM',
      dataIndex: 'namaGSM',
      key: 'namaGSM',
    },
    {
      title: 'Area',
      dataIndex: 'areaName',
      key: 'areaName',
    },
    {
      title: 'Distrik',
      dataIndex: 'distrikName',
      key: 'distrikName',
    },
    //   {
    //     title: 'Action',
    //     dataIndex: 'id',
    //     width: 150,
    //     key: 'id',
    //     slots: { customRender: 'action' },
    //   },
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
        listRegion: [],
        listProvinsi: [],
        listDistributor: [],
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
      this.fetchGetRegion()
      this.fetchGetProvinsi()
    },
    methods: {
      showModal() {
        console.log(this.visible)
        this.visible = true
        this.statusModal = false
      },
      showModalEdit(id) {
        console.log(id)
        this.visible = true
        this.statusModal = true
        showpost(id)
          .then(response => {
            if (response) {
              console.log(response)
              this.formState.id = response.id
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
              this.fetchGetDataSource()
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
      handleUpdate(e) {
        console.log(e)
        this.confirmLoading = true;
        const formData = toRaw(this.formState)
        console.log(formData)
        updateProduk(this.formState.id, formData)
          .then((response) => {
            if (response) {
              console.log(response)
              this.fetchGetDataSource()
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
        this.statusModal = false
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
      //   setSelectMethod(value) {
      //     getNamaProdukList(value)
      //       .then(response => {
      //         if (response) {
      //           console.log(response)
      //           this.formState.namaproduk = response.namaproduk
      //         }
      //       })
      //       .catch(err => {
      //         console.error(err)
      //       })

      //   },
      setSelectMethodRegion(regionId) {
        getProvinsiList(regionId)
          .then(response => {
            if (response) {
                this.listProvinsi = response
              console.log(this.listProvinsi)
            }
          })
          .catch(err => {
            console.error(err)
          })

      },
      setSelectMethodProvinsi(provinsiId) {
        getdistributorSBIList(provinsiId)
          .then(response => {
            if (response) {
              console.log(response)
              this.listDistributor = response
            }
          })
          .catch(err => {
            console.error(err)
          })

      },
      createRole() {
        this.$router.push({
          name: 'validasi-harga',
        })
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
        getDataSalesList()
          .then((response) => {
            if (response) {
              console.log(response)
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
      fetchGetRegion() {
        getRegionList()
          .then((response) => {
            if (response) {
              this.listRegion = response
            }
          })
          .catch((err) => {
            console.error(err)
          })
      },
      fetchGetProvinsi() {
        getProvinsiList()
          .then((response) => {
            if (response) {
                this.listProvinsi = response
                console.log(this.listProvinsi)
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
