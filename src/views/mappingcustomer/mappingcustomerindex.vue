<template>
  <div>
    <loading
      v-model:active="isLoading"
      :is-full-page="fullPage"
    />
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Import Mapping Toko Sales Distributor</strong>
      </div>
      <div class="card-body">
        <a
          href="https://docs.google.com/uc?export=download&id=1JPIj0sawD_ou0h75sFz3Wsn3IV47r6VO"
          download
          class="btn btn-main mb-3"
        >
          <i class="fa fa-download mr-2" />
          Download Template Mapping Customer
        </a>
        <a-button
          type="primary"
          class="float-right mb-3"
          @click="handleSubmit"
        >
          <i class="fa fa-eye mr-2" />
          Preview
        </a-button>
        <a-form-item
          label="Upload File"
          class="float-right mb-3"
          style="margin-right: 10px;"
        >
          <input
            type="file"
            id="file"
            ref="file"
            class="file_input"
            @change="onFileChanged"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            placeholder="Pilih File yang Akan diupload"
          />
        </a-form-item>
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="mappingCustomer.columns"
            :data-source="mappingCustomer.listData"
            row-key="id"
          >
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #username="{ text }">
              <template v-if="text">
                <a-tag color="green">{{ text }}</a-tag>
              </template>
              <template v-else>
                <a-tag color="red">{{ text }}</a-tag>
              </template>
            </template>
            <template #customer="{ text }">
              <template v-if="text">
                <a-tag color="green">{{ text }}</a-tag>
              </template>
              <template v-else>
                <a-tag color="red">{{ text }}</a-tag>
              </template>
            </template>
            <template #distribution="{ text }">
              <template v-if="text">
                <a-tag color="green">{{ text }}</a-tag>
              </template>
              <template v-else>
                <a-tag color="red">{{ text }}</a-tag>
              </template>
            </template>
          </a-table>
        </div>
        <div class="d-flex flex-row-reverse mt-4">
          <a-button
            type="primary"
            :disabled="isDisabled"
            @click="onSubmitData"
          >
            <i class="fa fa-upload mr-2" />
            Commit to Database
          </a-button>
          <a-button
            type="primary"
            class="mr-2"
            :disabled="isDisabled"
            @click="downloadTokoSalesHandle" 
          >
            Download
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataList, deleteData } from '@/services/connection/mapping-customer/api'
import { message } from 'ant-design-vue'
import { defineComponent, reactive, toRaw } from 'vue'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
  name: 'VbAntDesign',
  // components: {
  //   UploadOutlined,
  // },
  setup() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      getCheckboxProps: record => ({
        props: {
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        },
      }),
    }
    const fileList = []
    return {
      rowSelection,
      fileList,
      headers: {
        authorization: 'authorization-text',
      },
    }
  },
  data() {
    return {
      sukses: 'success',
      gagal: 'failed',
      nonwpm: 'Non WPM',
      isLoading: false,
      fullPage: true,
      file1: null,
      file2: null,
      dataSourceTable: [],
      isDisabled: true,
      usernameCek: [],
      usernameCekIndex: 0,
    }
  },
  computed: {
    ...mapState({
      mappingCustomer: state => state.mappingCustomer.data,
    }),
  },
  methods: {
    ...mapActions('mappingCustomer', ['submitData', 'getDataFromExcel']),
    downloadTokoSalesHandle() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id Sales', 'Username', 'Id Toko', 'Nama Toko', 'ID Distributor', 'Nama Distributor', 'Laporan Cek Data']
        const filterVal = ['sales', 'username', 'id_toko', 'customer', 'kode_distributor', 'distributor', 'message']
        const list = this.mappingCustomer.listData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType,
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    onFileChanged() {
      this.mappingCustomer.body.file = this.$refs.file.files[0]
    },
    async handleSubmit() {
      await this.getDataFromExcel()
      this.mappingCustomer.listData.map(data => {
        this.usernameCek.push(data.username_cek)
      })
      console.log(this.usernameCek)
      this.isDisabled = this.mappingCustomer.listData.length ? false : true
    },
    onSubmitData() {
      this.$confirm({
        title: 'Apakah anda yakin akan menambahkan data tersebut?',
        okText: 'Iya',
        okType: 'danger',
        cancelText: 'Tidak',
        onOk: async () => {
          await this.submitData()
          this.$store.commit('customerMapping/changeCustomerMapping', {
            listData: [],
          })
        },
        onCancel() {},
      })
    },
  },
})
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
<style lang="scss" scoped>
.file_input {
  height: 3rem !important;
  line-height: 30px !important;
}
</style>