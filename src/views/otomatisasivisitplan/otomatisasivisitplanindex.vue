<template>
  <div>    
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Otomatisasi Visit Plan</strong>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-xs-3 col-md-3">            
            <a-form-item label="Pilih Tahun">
              <a-select v-model="selectedTahun" @change="setSelectMethod" class="col-lg-12 col-md-12 pr-2" style="width: 100% !important;" placeholder=" -- Tahun -- ">
                <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                <a-select-option v-for="(tahun,index) in listTahun" :value="tahun.id" :key="index">
                  {{ tahun.tahun }}
                </a-select-option>
                <!-- <a-select-option value="2021">2021</a-select-option>
                <a-select-option value="2020">2020</a-select-option>
                <a-select-option value="2019">2019</a-select-option> -->
              </a-select>
            </a-form-item> 
          </div>
          <div class="col-xs-3 col-md-3">            
            <a-form-item label="Pilih Bulan">
              <a-select v-model="selectedBulan" @change="setSelectMethod" class="col-lg-12 col-md-12 pr-2" style="width: 100% !important;" placeholder=" -- Bulan -- ">
                <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
                <a-select-option v-for="(bulan,index) in listBulan" :value="bulan.id" :key="index">
                  {{ bulan.bulan }}
                </a-select-option>
                <!-- <a-select-option value="1">Januari</a-select-option>
                <a-select-option value="2">Februari</a-select-option>
                <a-select-option value="3">Maret</a-select-option>
                <a-select-option value="4">April</a-select-option>
                <a-select-option value="5">Mei</a-select-option>
                <a-select-option value="6">Juni</a-select-option>
                <a-select-option value="7">Juli</a-select-option>
                <a-select-option value="8">Agustus</a-select-option>
                <a-select-option value="9">September</a-select-option>
                <a-select-option value="10">Oktober</a-select-option>
                <a-select-option value="11">November</a-select-option>
                <a-select-option value="12">Desember</a-select-option> -->
              </a-select>
            </a-form-item> 
          </div>
          <div class="col-xs-2 col-md-2">
            <a-button
              type="primary"
              class="mb-3"
            >
              <i class="fa fa-eye mr-2" />
              View
            </a-button>
          </div>
        </div>
        
        <div class="table-responsive text-nowrap">
          <a-table :columns="columns" :data-source="permissions" :scroll="{ x: 1500 }">
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>            
            <template #status="{ text }">
              <div v-if="text==sukses">
                <a-tag color="green">{{ text }}</a-tag>
              </div>              
              <div v-else-if="text==gagal">
                <a-tag color="red">{{ text }}</a-tag>
              </div>              
              <div v-else-if="text==nonwpm">
                <a-tag color="yellow">{{ text }}</a-tag>
              </div>
            </template>
            <template #action="{ text }">
              <div>
                <button type="button" class="btn btn-light">
                  <i class="fa fa-file-text-o"></i> <span class="text-black">Detail</span></button
                ><button type="button" class="btn btn-warning">
                  <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span></button
                ><button @click="deleteRow(text)" type="button" class="btn btn-outline-danger">
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
import { getPermissionList, deletePermission } from '@/services/connection/otomatisasi-visit/api'
import { getTahunList, getBulanList } from '@/services/connection/master-data/api'

const columns = [
  {
    title: 'IdSales',
    dataIndex: 'idsales',
    key: 'username',
    width: 100,
    fixed: 'left',
    // slots: { customRender: 'name' },
  },
  {
    title: 'Nama Sales',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    fixed: 'left',
    // slots: { customRender: 'name' },
  },
  {
    title: 'Distributor',
    dataIndex: 'distributor',
    key: 'distributor',
    // slots: { customRender: 'name' },
  },
  {
    title: 'Distrik',
    dataIndex: 'distrik',
    key: 'distrik',
  },
  {
    title: 'TSO',
    dataIndex: 'tso',
    key: 'tso',
  },
  {
    title: 'Tahun',
    dataIndex: 'tahun',
    key: 'tahun',
  },
  {
    title: 'Bulan',
    dataIndex: 'bulan',
    key: 'bulan',
  },
  {
    title: 'N Jadwal',
    dataIndex: 'njadwal',
    key: 'njadwal',
  },
  {
    title: 'Status',
    fixed: 'right',
    width: 100,
    dataIndex: 'status',
    key: 'status',
    slots: { customRender: 'status' },
  },
]

export default {
  name: 'VbAntDesign',
  // components: {
  //   UploadOutlined,
  // },
  setup() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
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
      sukses: "success",
      gagal: "failed",
      nonwpm: "Non WPM",
      file1: null,
      file2: null,
      selectedTahun: null,
      selectedBulan: null,
      permissions: [],
      listTahun: [],
      listBulan: [],
    }
  },
  mounted() {
    this.fetchGetPermissions()
    this.fetchGetDataTahun()
    this.fetchGetDataBulan()
  },
  methods: {
    createRole() {
      this.$router.push({ name: 'permissions-create' })
    },
    deleteMarks() {
      console.log(this.rowSelection)
    },
    deleteAll() {},
    deleteRow(id) {
      console.log("Deleted ID: " + id)
      deletePermission(id)
      .then(response => {
        console.log(response)
        const dataSource = [...this.permissions]
        this.permissions = dataSource.filter(item => item.id !== id)
      })
      .catch(err => {
        console.error(err)
      })
    },
    fetchGetPermissions() {
      getPermissionList()
        .then((response) => {
          if (response) {
            this.permissions = response
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fetchGetDataBulan() {
      getBulanList()
        .then((response) => {
          if (response) {
            this.listBulan = response
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fetchGetDataTahun() {
      getTahunList()
        .then((response) => {
          if (response) {
            this.listTahun = response
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
