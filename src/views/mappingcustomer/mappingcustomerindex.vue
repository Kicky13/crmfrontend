<template>
  <div>
    <loading v-model:active="isLoading" :is-full-page="fullPage" />
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Import Mapping Toko Sales Distributor</strong>
      </div>
      <div class="card-body">
        <a-button type="primary">
          <a
            href="https://storage.googleapis.com/crm-assets/Template/Template%20Upload%20Mapping%20Toko%20Sales.xlsx"
            download
          >
            <i class="fa fa-download mr-2" />
            Download Template Mapping Customer
          </a>
        </a-button>
        <a-button type="primary" class="float-right mb-3" @click="handleSubmit">
          <i class="fa fa-eye mr-2" />
          Preview
        </a-button>
        <a-form-item label="Upload File" class="float-right mb-3" style="margin-right: 10px">
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
            table-layout="auto"
            :columns="mappingCustomer.columns"
            :data-source="mappingCustomer.listData"
            :scroll="{ x: 1500 }"
            :loading="isLoading"
            row-key="id"
          >
            <template #icon="{ text }">
              <div v-if="text.cek_data === true">
                <a-tooltip :title="text.message">
                  <img lazy="loading" v-once src="@/assets/images/check.svg" alt="Benar" />
                </a-tooltip>
              </div>
              <div v-else>
                <a-tooltip :title="text.message">
                  <img lazy="loading" v-once src="@/assets/images/wrong.svg" alt="Salah" />
                </a-tooltip>
              </div>
            </template>
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #username="{ text }">
              <template
                v-if="mappingCustomer.listData.find(data => data.username === text).username_cek"
              >
                <a-tag color="green">{{ text }}</a-tag>
              </template>
              <template v-else>
                <a-tag color="red">{{ text }}</a-tag>
              </template>
            </template>
            <template #customer="{ text }">
              <template
                v-if="mappingCustomer.listData.find(data => data.customer === text).customer_cek"
              >
                <a-tag color="green">{{ text }}</a-tag>
              </template>
              <template v-else>
                <a-tag color="red">{{ text }}</a-tag>
              </template>
            </template>
            <template #distributor="{ text }">
              <template
                v-if="
                  mappingCustomer.listData.find(data => data.distributor === text).distributor_cek
                "
              >
                <a-tag color="green">{{ text }}</a-tag>
              </template>
              <template v-else>
                <a-tag color="red">{{ text }}</a-tag>
              </template>
            </template>
            <template #days="{ text }">
              <div v-if="text == istrue">
                <a-checkbox checked="true" />
              </div>
              <div v-else-if="text == isfalse">
                <a-checkbox checked="true" disabled />
              </div>
            </template>
          </a-table>
        </div>
        <div class="d-flex flex-row-reverse mt-4">
          <Can do="read" on="MappingCustomer">
            <a-button
              type="primary"
              :disabled="commitToDatabaseButtonDisabled"
              @click="onSubmitData"
            >
              <i class="fa fa-upload mr-2" />
              Commit to Database
            </a-button>
          </Can>
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
import { filter } from 'lodash'
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
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
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
    }
  },
  computed: {
    ...mapState({
      mappingCustomer: state => state.mappingCustomer.data,
    }),
    commitToDatabaseButtonDisabled() {
      let dataSource = [...this.mappingCustomer.listData]
      let filtered = dataSource.filter(x => x.cek_data == false)
      if (dataSource.length == 0 || filtered.length > 0) {
        return true
      }
      return false
    },
  },
  methods: {
    ...mapActions('mappingCustomer', ['submitData', 'getDataFromExcel']),
    downloadTokoSalesHandle() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = [
          'ID Kota',
          'ID Sales',
          'Username',
          'ID Toko',
          'Nama Toko',
          'ID Distributor',
          'Nama Distributor',
          'Laporan Cek Data',
        ]
        const filterVal = [
          'id_reference_wilayah',
          'sales',
          'username',
          'id_toko',
          'customer',
          'kode_distributor',
          'distributor',
          'message',
        ]
        const list = this.mappingCustomer.listData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'Data Mapping Customer',
          autoWidth: this.autoWidth,
          bookType: this.bookType,
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }),
      )
    },
    onFileChanged() {
      this.mappingCustomer.body.file = this.$refs.file.files[0]
    },
    async handleSubmit() {
      this.isLoading = true
      await this.getDataFromExcel()
      this.isLoading = false
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
