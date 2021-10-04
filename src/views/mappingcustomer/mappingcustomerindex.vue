<template>
  <div>
    <loading v-model:active="isLoading" :is-full-page="fullPage" />
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Import Mapping Toko Sales Distributor</strong>
      </div>
      <div class="card-body">
        <a-button
          type="primary"
          class="mb-3"
          href="https://docs.google.com/spreadsheets/d/1JPIj0sawD_ou0h75sFz3Wsn3IV47r6VO/edit?usp=sharing&ouid=113668497592391900713&rtpof=true&sd=true"
          target="_blank"
        >
          <i class="fa fa-download mr-2" />
          Download Template Mapping Customer
        </a-button>

        <a-button type="primary" class="mb-3 float-right" @click="previewDataUpload">
          <i class="fa fa-eye mr-2" />
          Preview
        </a-button>
        <a-form-item label="Upload File" class="mb-3 float-right" style="margin-right: 10px;">
          <a-input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            placeholder="Pilih File yang Akan diupload"
          />
        </a-form-item>
        <div v-if="isVisible" class="table-responsive text-nowrap">
          <a-table :columns="columns" :data-source="dataSourceTable" row-key="id">
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #status="{ text }">
              <div v-if="text == sukses">
                <a-tag color="green">{{ text }}</a-tag>
              </div>
              <div v-else-if="text == gagal">
                <a-tag color="red">{{ text }}</a-tag>
              </div>
              <div v-else-if="text == nonwpm">
                <a-tag color="yellow">{{ text }}</a-tag>
              </div>
            </template>
          </a-table>
        </div>
        <a-button
          v-if="isVisible"
          type="primary"
          :class="dataSourceTable.length > 0 ? `mb-3 float-right` : `mb-3 float-right disabled`"
          @click="submitDataUpload"
        >
          <i class="fa fa-upload mr-2" />
          Commit to Database
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataList, deleteData } from '@/services/connection/mapping-customer/api'
import { message } from 'ant-design-vue'
import { defineComponent, reactive, toRaw } from 'vue'

const columns = [
  {
    title: 'Id Sales',
    dataIndex: 'id',
    key: 'id',
    // fixed: 'left',
    slots: { customRender: 'name' },
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    // fixed: 'left',
    // slots: { customRender: 'name' },
  },
  {
    title: 'Id Customer',
    dataIndex: 'customerid',
    key: 'customerid',
    // slots: { customRender: 'name' },
  },
  {
    title: 'Nama Customer',
    dataIndex: 'customername',
    key: 'customername',
  },
  {
    title: 'Id Distributor',
    dataIndex: 'distributorid',
    key: 'distributorid',
  },
  {
    title: 'Nama Distributor',
    dataIndex: 'distributorname',
    key: 'distributorname',
  },
  {
    title: 'Status',
    // fixed: 'right',
    dataIndex: 'status',
    key: 'status',
    slots: { customRender: 'status' },
  },
]

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
      sukses: 'success',
      gagal: 'failed',
      nonwpm: 'Non WPM',
      isVisible: false,
      isLoading: false,
      fullPage: true,
      file1: null,
      file2: null,
      dataSourceTable: [],
    }
  },
  mounted() {},
  methods: {
    previewDataUpload() {
      this.isLoading = true
      this.fetchGetDataSource()
      this.isVisible = true
      this.isLoading = false
      message.success('Preview Data Upload Selesai')
    },
    submitDataUpload() {
      this.isLoading = true
      this.isVisible = false
      this.isLoading = false
      message.success('Mapping Customer Berhasil Disimpan')
    },
    downloadTemplate() {
      location.href =
        'https://docs.google.com/spreadsheets/d/1JPIj0sawD_ou0h75sFz3Wsn3IV47r6VO/edit?usp=sharing&ouid=113668497592391900713&rtpof=true&sd=true'
    },
    fetchGetDataSource() {
      getDataList()
        .then(response => {
          if (response) {
            this.dataSourceTable = response
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
})
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
