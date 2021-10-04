<template>
  <div>
    <a-card class="card card-top card-top-primary" :loading="isLoading">
      <div class="card-header d-flex">
        <strong>Assign Role</strong>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content" style="margin-bottom: 10px">
          <div class="align-self-center">
            <strong>Assign Role :</strong>
          </div>
          <a-select v-model:value="formState.user" class="mx-3" style="width: 200px">
            <a-select-option disabled value="disabled">Pilih salah satu user</a-select-option>
            <a-select-option v-for="data in userOption" :key="data.id" :value="data.name">{{
              data.name
            }}</a-select-option>
          </a-select>
          <a-select v-model:value="formState.role" class="mx-3" style="width: 200px">
            <a-select-option disabled value="disabled">Pilih salah satu role</a-select-option>
            <a-select-option v-for="data in roleOption" :key="data.id" :value="data.role">{{
              data.role
            }}</a-select-option>
          </a-select>
          <a-button type="primary" @click="handleSave">
            <i class="fa fa-save mr-2" />
            Save
          </a-button>
          <a-button
            :hidden="id == null ? true : false"
            type="button"
            style="margin-left: 5px"
            class="btn btn-outline-danger"
            @click="clearForm"
          >
            <i class="fa fa-times" />
            Cancel
          </a-button>
        </div>
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
            :data-source="assigns"
            :row-key="assigns => assigns.id"
            :pagination="pagination"
          >
            <template #action="{ text }">
              <div>
                <button type="button" class="btn btn-light">
                  <i class="fa fa-file-text-o"></i> <span class="text-black">Detail</span></button
                ><button @click="goUpdate(text)" type="button" class="btn btn-warning">
                  <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span></button
                ><button @click="handleDelete(text)" type="button" class="btn btn-outline-danger">
                  <i class="fa fa-trash"></i><span> Hapus</span>
                </button>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { toRaw } from 'vue'
import { notification, message } from 'ant-design-vue'
import {
  getAssignList,
  deleteAssign,
  getRoleList,
  getUserList,
  insertAssign,
} from '@/services/connection/roles-permissions/api'

const itemsPerPage = [5, 10, 15, 20]
const columns = [
  {
    title: 'User Name',
    dataIndex: 'user',
  },
  {
    title: 'Role',
    dataIndex: 'role',
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
      getCheckboxProps: record => ({
        props: {
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        },
      }),
    }
    return {
      columns,
      rowSelection,
      itemsPerPage,
    }
  },
  data() {
    return {
      assigns: [],
      userOption: [],
      roleOption: [],
      pagination: {},
      id: null,
      isLoading: false,
      isSubmit: false,
      formState: {
        user: 'disabled',
        role: 'disabled',
      },
    }
  },
  mounted() {
    this.fetchGetAssign()
    this.fetchGetUsers()
    this.fetchGetRoles()
  },
  methods: {
    createRole() {
      this.$router.push({ name: 'assignrole-create' })
    },
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    handleDelete(id) {
      const confirmDelete = this.deleteRow
      this.$confirm({
        title: 'Hapus Assign',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk() {
          confirmDelete(id)
        },
      })
    },
    deleteRow(id) {
      console.log('Deleted ID: ' + id)
      deleteAssign(id)
        .then(response => {
          console.log(response)
          const dataSource = [...this.assigns]
          this.assigns = dataSource.filter(item => item.id !== id)
        })
        .catch(err => {
          console.error(err)
        })
    },
    fetchGetAssign() {
      getAssignList()
        .then(response => {
          if (response) {
            this.assigns = response
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleSave() {
      const formData = toRaw(this.formState)
      if (this.formValidation(formData)) {
        if (this.id !== null) {
          this.fetchSubmitUpdate(formData)
        } else {
          this.fetchSubmitInsert(formData)
        }
      }
    },
    fetchSubmitInsert(formData) {
      this.isLoading = true
      insertAssign(formData)
        .then(response => {
          if (response) {
            this.clearForm()
            this.fetchGetAssign()
            message.success('Data berhasil ditambahkan')
          }
          this.isLoading = false
        })
        .catch(err => {
          this.isLoading = false
          console.error(err)
        })
    },
    fetchSubmitUpdate(formData) {
      this.isSubmit = true
      updateAssign(this.id, formData)
        .then(response => {
          if (response) {
            this.clearForm()
            this.fetchGetAssign()
            message.success('Data berhasil diperbaharui')
          }
          this.isSubmit = false
        })
        .catch(err => {
          this.isSubmit = false
          console.error(err)
        })
    },
    formValidation(formData) {
      const listData = [...this.assigns]
      const currData = listData.filter(x => x.user === formData.user && x.role === formData.role)
      if (formData.user === 'disabled' || formData.role === 'disabled') {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
        return false
      }

      if (currData.length !== 0) {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Data sudah ada',
        })
        return false
      }

      return true
    },
    clearForm() {
      this.formState.user = 'disabled'
      this.formState.role = 'disabled'
      this.id = null
    },
    goUpdate(id) {
      const dataSource = [...this.assigns]
      const currData = dataSource.filter(x => x.id === id)
      this.id = id
      this.formState.user = currData[0].user
      this.formState.role = currData[0].role
    },
    fetchGetUsers() {
      this.isLoading = true
      getUserList()
        .then(response => {
          if (response) {
            this.userOption = response
          }
          this.isLoading = false
        })
        .catch(err => {
          console.error(err)
          this.isLoading = false
        })
    },
    fetchGetRoles() {
      this.isLoading = true
      getRoleList()
        .then(response => {
          if (response) {
            this.roleOption = response
          }
          this.isLoading = false
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
