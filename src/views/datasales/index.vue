<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Data Sales SBI</strong>
        
        <a-button type="btn btn-success" @click="resetData()" class="btn pull-right">
          <i class="fa fa-refresh mr-1" />
          Reset
        </a-button>
       
      </div>
      
      <div class="card-body">
        <a-form :model="form">
          
          <a-row>
            <a-col md="3" class="mr-4">
              <a-form-item label="Region">
                <a-select v-model:value="formState.regionId" @change="setSelectMethodRegion" placeholder=" -- Choose Region -- "
                  style="width: 200px">
                  <a-select-option value="">ALL</a-select-option>
                  <a-select-option v-for="(region,index) in listRegion" :value="region.id" :key="index">
                    {{ region.regionName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col md="3" class="mr-4">
              <a-form-item label="Provinsi">
                <a-select v-model:value="formState.provinsiId" @change="setSelectMethodProvinsi"
                  placeholder=" -- Choose Provinsi -- " style="width: 200px">
                  <a-select-option value="">ALL</a-select-option>
                  <a-select-option v-for="(provinsi,index) in listProvinsi" :value="provinsi.id" :key="index">
                    {{ provinsi.provinsiName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col md="3" class="mr-4">
              <a-form-item label="Distributor">
                <a-select v-model:value="formState.distributorId" placeholder=" -- Chose Distributor -- " style="width: 200px">
                  <a-select-option value="">ALL</a-select-option>
                  <a-select-option v-for="(distributor,index) in listDistributor" :value="distributor.id" :key="index">
                    {{ distributor.distributorName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col md="3" class="mr-4 mb-2">
              <a-row>
                <a-col md="6" class="ml-2 mr-4">
                  <a-button type="primary" @click="handleOk()">
                    <i class="fa fa-eye mr-1" />
                    View
                  </a-button>
                </a-col>
                <a-col md="5">
                  <Can do="create" on="DataSales">
                  <a-button type="btn btn-success" @click="showModal">
                    <i class="fa fa-download mr-1" />
                    Export
                  </a-button>
                  </Can>
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
    tableFilter,
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
      this.fetchGetDistributor()
    },
    methods: {

      handleOk() {
        //    alert('berhasil')
        const regionID = this.formState.regionId
        const provinsiID = this.formState.provinsiId
        const distributorID = this.formState.distributorId
        tableFilter(regionID, provinsiID, distributorID)

          .then(response => {
            if (response) {
              console.log(response)
              this.dataSourceTable = response
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      resetData() {
          this.fetchGetDataSource()
      },

      setSelectMethodRegion(regionId) {
        if (regionId == '') {
          this.fetchGetProvinsi()
        } else {
          getProvinsiList(regionId)
            .then(response => {
              if (response) {
                //this.listProvinsi = []
                // this.listProvinsi = [response]
                this.listProvinsi = response
                console.log(this.listProvinsi)
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
      },
      setSelectMethodProvinsi(provinsiId) {
        if (provinsiId == '') {
          this.fetchGetDistributor()
        } else {
          getdistributorSBIList(provinsiId)
            .then(response => {
              if (response) {
                // this.listDistributor = []
                // this.listDistributor = [response]
                this.listDistributor = response
              }
            })
            .catch(err => {
              console.error(err)
            })
        }


      },
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
      fetchGetDistributor() {
        getdistributorSBIList()
          .then((response) => {
            if (response) {
              this.listDistributor = response
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
