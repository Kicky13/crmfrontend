<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Import Visit Plan Sales Distributor</strong>
      </div>
      <div class="card-body">
        <!-- <div class="col-xs-12 col-md-12" style="margin-bottom: 10px;">
          <strong>Lihat Data</strong> : Sales Distributor dan Mapping Toko
          <a-button type="primary" class="mb-3">
            Disini
          </a-button>
        </div> -->
        <a
          href="https://storage.googleapis.com/crm-assets/Template/TEMPLATE_UPLOADS_VISIT_PLAN_NEW.xlsx"
          download
          class="mb-3 btn btn-primary"
        >
          <i class="fa fa-download mr-2" />
          Download Template Visit Plan
        </a>

        <a-button type="primary" @click="handleSubmit()" class="mb-3 float-right">
          <i class="fa fa-eye mr-2" />
          Preview
        </a-button>
        <a-form-item label="Upload File" class="mb-3 float-right" style="margin-right: 10px">
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
        <div class="table-visit table-responsive text-nowrap">
          <a-table
            class=""
            :columns="visitPlan.columns"
            :data-source="visitPlan.listData"
            :scroll="{ x: 1500 }"
            :loading="visitPlan.isLoading"
            :row-class-name="tableRowClassName"
            :row-key="(data) => data.id_toko"
          >
            <template #icon="{ text }">
              <div v-if="text.status === true">
                <img lazy="loading" v-once src="@/assets/images/check.svg" alt="Benar" />
              </div>
              <div v-else>
                <img lazy="loading" v-once src="@/assets/images/wrong.svg" alt="Salah" />
              </div>
            </template>
            <template #nama_toko="{ text }">
              <div data-toggle="tooltip" data-placement="top" :title="text.nama_toko">
                {{ text.nama_toko.slice(0, 12) + `....` }}
              </div>
            </template>
            <template #distributor="{ text }">
              <div data-toggle="tooltip" data-placement="top" :title="text.nama_distributor">
                {{ text.nama_distributor.slice(0, 12) + `....` }}
              </div>
            </template>
            <template #days="{ text }">
              <div v-if="text == istrue">
                <a-checkbox checked="true" />
              </div>
              <div v-else-if="text == isfalse">
                <a-checkbox checked="true" disabled />
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
        <div class="d-flex flex-row-reverse mt-4">
          <a-button
            type="primary"
            @click="onSubmitData()"
            class="mt-2"
            :disabled="isDisabled"
            :class="visitPlan.listData.length > 0 ? `mb-3 float-right` : `mb-3 float-right`"
          >
            <i class="fa fa-upload mr-2" />
            Commit to Database
          </a-button>

          <a-button type="primary" class="mt-2 mr-2" :disabled="isDisabled" @click="downloadData">
            Download
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPermissionList, deletePermission } from '@/services/connection/upload-visit/api'
import { mapState, mapActions } from 'vuex'
import { _ } from 'vue-underscore'

export default {
  name: 'VbAntDesign',
  // components: {
  //   UploadOutlined,
  // },
  setup() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      getCheckboxProps: (record) => ({
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
      isfalse: 0,
      istrue: 1,
      isDisabled: true,
      file1: null,
      file2: null,
      permissions: [],
    }
  },
  computed: {
    ...mapState({
      visitPlan: (state) => state.visitPlan.data,
    }),
  },
  mounted() {},
  methods: {
    ...mapActions('visitPlan', ['submitData', 'getDataFromExcel']),
    tableRowClassName(text) {
      if (text.status === false) {
        return 'non-active'
      } else {
        return ''
      }
    },
    onFileChanged() {
      this.visitPlan.body.file = this.$refs.file.files[0]
    },
    downloadData() {
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = [
          'Username',
          'Id Toko',
          'Nama Toko',
          'Distributor',
          'Minggu',
          'Senin',
          'Selasa',
          'Rabu',
          'Kamis',
          'Jumat',
          'Sabtu',
          'W1',
          'W2',
          'W3',
          'W4',
          'W5',
        ]
        const filterVal = [
          'username',
          'id_toko',
          'nama_toko',
          'nama_distributor',
          'minggu',
          'senin',
          'selasa',
          'rabu',
          'kamis',
          'jumat',
          'sabtu',
          'w1',
          'w2',
          'w3',
          'w4',
          'w5',
        ]
        const list = this.visitPlan.listData
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
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }),
      )
    },
    async handleSubmit() {
      await this.getDataFromExcel()
      let dataStatus = _.where(this.visitPlan.listData, { status: false })
      this.isDisabled = dataStatus.length > 0 ? true : false
    },
    onSubmitData() {
      this.$confirm({
        title: 'Apakah anda yakin akan menambahkan  data tersebut?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          await this.submitData()
          this.$store.commit('visitPlan/changeVisitPlan', {
            listData: [],
          })
        },
        onCancel() {},
      })
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
<style>
.table-visit .ant-table-tbody .non-active td {
  background-color: red !important;
  color: white;
}
</style>
<style lang="scss" scoped>
.file_input {
  height: 3rem !important;
  line-height: 30px !important;
}
</style>
