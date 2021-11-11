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
          <a-select v-model:value="formState.idUser" class="mx-3" style="width: 200px">
            <a-select-option disabled :value="null">Pilih salah satu user</a-select-option>
            <a-select-option v-for="data in userOption" :key="data.id" :value="data.name">{{
              data.name
            }}</a-select-option>
          </a-select>
          <a-select v-model:value="formState.idJenisUser" class="mx-3" style="width: 200px">
            <a-select-option disabled :value="null">Pilih salah satu role</a-select-option>
            <a-select-option v-for="data in roleOption" :key="data.id_jenis" :value="data.name">{{
              data.name
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
                <!-- <button type="button" class="btn btn-light">
                  <i class="fa fa-file-text-o"></i> <span class="text-black">Detail</span></button> -->
                  <button @click="goUpdate(text)" type="button" class="btn btn-warning">
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
  optionJenisUser,
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
    dataIndex: 'levelUser',
  },
  {
    title: 'Action',
    dataIndex: 'id_user',
    slots: { customRender: 'action' },
  },
]

export default {
  name: 'VbAntDesign',
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
      offset: 1,
      limit: 50,
      id: null,
      isLoading: false,
      isSubmit: false,
      formState: {
        idUser: null,
        idJenisUser: null,
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
      deleteAssign(id)
        .then(response => {
          const dataSource = [...this.assigns]
          this.assigns = dataSource.filter(item => item.id !== id)
        })
        .catch(err => {
          if (err) {}
        })
    },
    fetchGetAssign() {
      getAssignList(this.offset, this.limit)
        .then(response => {
          if (response) {
            this.assigns = response.data
          }
        })
        .catch(err => {
          if (err) {}
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
          if (err) {
            this.isLoading = false
          }
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
          if (err) {
            this.isSubmit = false
          }
        })
    },
    formValidation(formData) {
      const listData = [...this.assigns]
      const currData = listData.filter(x => x.user === formData.user && x.role === formData.role)
      if (formData.idUser === null || formData.idJenisUser === null) {
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
      this.formState.idUser = null
      this.formState.idJenisUser = null
      this.id = null
    },
    goUpdate(id) {
      const dataSource = [...this.assigns]
      const currData = dataSource.filter(x => x.id === id)
      this.id = id
      this.formState.idUser = currData[0].user
      this.formState.idJenisUser = currData[0].role
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
          if (err) {
            this.isLoading = false
          }
        })
    },
    fetchGetRoles() {
      this.isLoading = true
      optionJenisUser()
        .then(response => {
          if (response) {
            this.roleOption = response.data
          }
          this.isLoading = false
        })
        .catch(err => {
          if (errr) {}
        })
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
