<template>
  <div>
    <a-card class="card card-top card-top-primary" :loading="isLoadData">
      <div class="card-header">
        <strong>Permissions</strong>
        <a-button
          @click="handleModal"
          class="btn btn-primary mb-3 float-right"
          style="margin-right: 5px; margin-left: 5px"
        >
          <i class="fa fa-plus mr-2" />
          Tambahkan Permission
        </a-button>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between mb-3">
          <div class="d-flex">
            <div class="align-self-center">
              <span>Show :</span>
            </div>
            <a-select :default-value="itemsPerPage[1]" class="mx-2" @change="handlePaginationSize">
              <a-select-option v-for="itemPerPage in itemsPerPage" :key="itemPerPage">
                {{ itemPerPage }}
              </a-select-option>
            </a-select>
            <div class="align-self-center">
              <span>entries</span>
            </div>
          </div>
          <a-input-search placeholder="input search text" style="width: 200px" />
        </div>
        <div class="table-responsive text-nowrap">
          <a-table
            :row-selection="rowSelection"
            :columns="columns"
            :data-source="permissions"
            :row-key="(permissions) => permissions.id"
            :pagination="pagination"
          >
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #action="{ text }">
              <div>
                <!-- <button type="button" class="btn btn-light">
                  <i class="fa fa-file-text-o"></i> <span class="text-black">Detail</span></button
                > -->
                <button @click="editRow(text)" type="button" class="btn btn-warning">
                  <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span>
                </button>
                <button @click="deleteRow(text)" type="button" class="btn btn-outline-danger">
                  <i class="fa fa-trash"></i><span> Hapus</span>
                </button>
              </div>
            </template>
          </a-table>
        </div>
        <a-modal
          v-model:visible="modalVisible"
          title="Tambah Permission"
          :closable="false"
          :mask-closable="false"
        >
          <template #footer>
            <a-button v-if="isSubmitForm" disabled key="backdisable" @click="handleClose">Batal</a-button>
            <a-button v-else key="back" @click="handleClose">Batal</a-button>
            <a-button @click="handleSubmit" key="submit" :loading="isSubmitForm" type="primary">Simpan</a-button>
          </template>
          <a-form label-align="left" layout="vertical">
            <a-form-item label="Role User" name="name">
              <a-select style="width: 100% !important" placeholder="Pilih salah satu role" v-model:value="formState.actor">
                <a-select-option disabled :value="null">Pilih salah satu</a-select-option>
                <a-select-option v-for="data in roleOption" :key="data.id" :value="data.role">{{
                  data.role
                }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Nama Menu" name="pagename">
              <a-input style="width: 100% !important" v-model:value="formState.pagename" />
            </a-form-item>
            <a-form-item label="Nama Module" name="subject">
              <a-input style="width: 100% !important" v-model:value="formState.subject" />
            </a-form-item>
            <a-form-item label="Permission" name="permission">
              <a-select
                style="width: 100% !important"
                mode="multiple"
                placeholder="Pilih action"
                @change="handleChange"
                v-model:value="selectedAction"
              >
                <a-select-option v-for="data in actionOption" :key="data.id" :value="data.value">{{
                  data.value
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </a-card>
  </div>
</template>

<script>
import {
  getPermissionList,
  deletePermission,
  getRoleList,
  insertPermission,
  updatePermission,
} from '@/services/connection/roles-permissions/api'
import { notification, message } from 'ant-design-vue'

const itemsPerPage = [5, 10, 15, 20]
const columns = [
  {
    title: 'Role',
    dataIndex: 'actor',
    slots: { customRender: 'name' },
  },
  {
    title: 'Nama Laman',
    dataIndex: 'pagename',
  },
  {
    title: 'Module',
    dataIndex: 'subject',
  },
  {
    title: 'Permission',
    dataIndex: 'permission',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    slots: { customRender: 'action' },
  },
]

export default {
  name: 'VbAntDesign',
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
    return {
      columns,
      rowSelection,
    }
  },
  data() {
    return {
      isLoadData: false,
      isSubmitForm: false,
      modalVisible: false,
      isValidated: false,
      permissions: [],
      roleOption: [],
      selectedAction: [],
      selectedID: null,
      actionOption: [
        {
          id: 1,
          value: 'read',
        },
        {
          id: 2,
          value: 'insert',
        },
        {
          id: 3,
          value: 'update',
        },
        {
          id: 4,
          value: 'delete',
        },
      ],
      itemsPerPage,
      pagination: {},
      formState: {
        actor: null,
        pagename: '',
        subject: '',
        permission: '',
      },
    }
  },
  mounted() {
    this.fetchGetPermissions()
    this.fetchGetRoles()
  },
  methods: {
    createRole() {
      this.$router.push({ name: 'permissions-create' })
    },
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    handleModal() {
      this.modalVisible = !this.modalVisible
    },
    handleClose() {
      this.clearForm()
      this.handleModal()
    },
    handleSubmit() {
      this.runValidator()

      if (this.isValidated) {
        if (this.selectedID) {
          this.fetchUpdate()
        } else {
          this.fetchInsert()
        }
      } else {
        console.log(false)
      }
    },
    deleteMarks() {
      console.log(this.rowSelection)
    },
    deleteAll() {},
    deleteRow(id) {
      console.log(id)
      const confirmDelete = this.confirmDelete
      this.$confirm({
        title: 'Hapus Permission',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk() {
          confirmDelete(id)
        },
      })
    },
    confirmDelete(id) {
      console.log('Deleted ID: ' + id)
      deletePermission(id)
        .then((response) => {
          console.log(response)
          const dataSource = [...this.permissions]
          this.permissions = dataSource.filter((item) => item.id !== id)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    editRow(id) {
      const dataSource = [...this.permissions]
      const filtered = dataSource.filter((item) => item.id == id)

      this.formState = {
        actor: filtered[0].actor,
        pagename: filtered[0].pagename,
        subject: filtered[0].subject,
        permission: filtered[0].permission,
      }
      this.selectedID = id

      this.convertToArray()
      this.handleModal()
    },
    handleChange(value) {
      this.selectedAction = value
      this.convertToText()
    },
    convertToText() {
      var toText = ''
      var i = 1

      this.selectedAction.forEach((x) => {
        if (i != this.selectedAction.length) {
          toText += x + ', '
        } else {
          toText += x
        }
        i++
      })
      this.formState.permission = toText
    },
    convertToArray() {
      var toArray = this.formState.permission.split(", ")
      this.selectedAction = toArray
    },
    runValidator() {
      if (this.formState.actor && this.formState.pagename && this.formState.subject && this.selectedAction.length !== 0) {
        this.isValidated = true
      } else {
        if(!this.formState.actor) {
          notification.error({
          message: 'Gagal Menyimpan',
          description: 'Wajib memilih salah satu role',
        })
        }
        if(!this.formState.pagename) {
          notification.error({
          message: 'Gagal Menyimpan',
          description: 'Kolom nama menu wajib diisi',
        })
        }
        if(!this.formState.subject) {
          notification.error({
          message: 'Gagal Menyimpan',
          description: 'Kolom nama module wajib diisi',
        })
        }
        if(!this.selectedAction.length) {
          notification.error({
          message: 'Gagal Menyimpan',
          description: 'Wajib memilih minimal 1 permission',
        })
        }
        this.isValidated = false
      }
    },
    clearForm() {
      this.formState.actor = null
      this.formState.pagename = ''
      this.formState.subject = ''
      this.formState.permission = ''
      this.selectedAction = []
      this.selectedID = null
    },
    fetchGetPermissions() {
      this.isLoadData = true
      getPermissionList()
        .then((response) => {
          if (response) {
            this.permissions = response
          }
          this.isLoadData = false
        })
        .catch((err) => {
          this.isLoadData = false
          console.error(err)
        })
    },
    fetchGetRoles() {
      this.isLoadData = true
      getRoleList()
        .then((response) => {
          if (response) {
            this.roleOption = response
          }
          this.isLoadData = false
        })
        .catch((err) => {
          this.isLoadData = false
          console.error(err)
        })
    },
    fetchUpdate() {
      this.isSubmitForm = true
      updatePermission(this.selectedID, this.formState)
      .then((response) => {
        if (response) {
          message.success('Data berhasil diupdate')
          this.fetchGetPermissions()
        }
        this.isSubmitForm = false
        this.handleClose()
      })
      .catch((err) => {
        console.error(err)
      })
    },
    fetchInsert() {
      this.isSubmitForm = true
      insertPermission(this.formState)
      .then((response) => {
        if (response) {
          message.success('Data berhasil ditambahkan')
          this.fetchGetPermissions()
        }
        this.isSubmitForm = false
        this.handleClose()
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
