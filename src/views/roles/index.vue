<template>
  <div>
    <a-card class="card card-top card-top-primary" :loading="isLoading">
      <div class="card-header d-flex">
        <strong>Roles Management</strong>
      </div>
      <div class="card-body">
        <Can i="create" a="Roles">
          <div class="d-flex justify-content" style="margin-bottom: 10px">
            <div class="align-self-center">
              <strong>{{ id == null ? 'Tambah Role : ' : 'Update Role : ' }}</strong>
            </div>
            <a-input
              placeholder="Nama role"
              class="mx-3"
              style="width: 200px"
              v-model:value="role"
            />
            <a-input
              placeholder="Kode role"
              class="mx-3"
              style="width: 200px"
              v-model:value="code"
            />
            <a-button type="primary" @click="handleSave" :loading="isSubmitForm">
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
        </Can>
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
            :data-source="roles"
            :row-key="(roles) => roles.id"
            :pagination="pagination"
          >
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #action="{ text }">
              <div>
                <!-- <button type="button" class="btn btn-light">
                  <i class="fa fa-file-text-o"></i> <span class="text-black">Detail</span></button> -->
                <Can i="update" a="Roles">
                  <button @click="goUpdate(text)" type="button" class="btn btn-warning">
                    <i class="fa fa-pencil-square-o"></i> <span class="text-black">Ubah</span>
                  </button>
                </Can>
                <Can i="delete" a="Roles">
                  <button @click="handleDelete(text)" type="button" class="btn btn-outline-danger">
                    <i class="fa fa-trash"></i><span> Hapus</span>
                  </button>
                </Can>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import {
  getRoleList,
  deleteRole,
  insertRole,
  updateRole,
} from '@/services/connection/roles-permissions/api'
import { notification, message } from 'ant-design-vue'

const itemsPerPage = [5, 10, 15, 20]
const columns = [
  {
    title: 'Name',
    dataIndex: 'role',
    slots: { customRender: 'name' },
  },
  {
    title: 'Code',
    dataIndex: 'code',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
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
      itemsPerPage,
      columns,
      rowSelection,
    }
  },
  data() {
    return {
      roles: [],
      pagination: {},
      role: '',
      code: '',
      id: null,
      isLoading: false,
      isSubmitForm: false,
    }
  },
  mounted() {
    this.fetchGetRoles()
  },
  methods: {
    createRole() {
      this.$router.push({ name: 'roles-create' })
    },
    handleDelete(id) {
      const confirmDelete = this.deleteRow
      this.$confirm({
        title: 'Hapus Role',
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
      deleteRole(id)
        .then((response) => {
          console.log(response)
          const dataSource = [...this.roles]
          this.roles = dataSource.filter((item) => item.id !== id)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    clearForm() {
      this.role = ''
      this.code = ''
      this.id = null
    },
    handleSave() {
      if (this.formValidation()) {
        if (this.id !== null) {
          this.updateRole()
        } else {
          this.insertRole()
        }
      }
    },
    insertRole() {
      this.isSubmitForm = true
      const formData = {
        role: this.role,
        code: this.code,
        createdAt: '06/04/2021',
      }
      insertRole(formData)
        .then((response) => {
          if (response) {
            console.log(response)
            message.success('Role berhasil ditambahkan')
            this.fetchGetRoles()
            this.clearForm()
          }
          this.isSubmitForm = false
        })
        .catch((err) => {
          console.error(err)
          message.error('Oops, sepertinya ada masalah')
          this.isSubmitForm = false
        })
    },
    updateRole() {
      this.isSubmitForm = true
      const formData = {
        role: this.role,
        code: this.code,
        createdAt: '06/04/2021',
      }
      updateRole(this.id, formData)
        .then((response) => {
          if (response) {
            console.log(response)
            message.success('Role berhasil ditambahkan')
            this.fetchGetRoles()
            this.clearForm()
          }
          this.isSubmitForm = false
        })
        .catch((err) => {
          console.error(err)
          message.error('Oops, sepertinya ada masalah')
          this.isSubmitForm = false
        })
    },
    formValidation() {
      const dataSource = [...this.roles]
      const currentData = dataSource.filter((x) => x.code === this.code)
      if (this.role === '' && this.code === '') {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
        return false
      }
      if (currentData.length !== 0) {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Data sudah ada',
        })
        return false
      }
      return true
    },
    fetchGetRoles() {
      this.isLoading = true
      this.roles = []
      getRoleList()
        .then((response) => {
          if (response) {
            this.roles = response
          }
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          console.error(err)
        })
    },
    goUpdate(id) {
      const dataSource = [...this.roles]
      const currentData = dataSource.filter((x) => x.id === id)
      this.role = currentData[0].role
      this.code = currentData[0].code
      this.id = id
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
