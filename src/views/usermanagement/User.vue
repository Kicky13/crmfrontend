<template>
  <div>
    <a-card class="card card-top card-top-primary" :loading="isLoading">
      <div class="card-header d-flex">
        <a-tabs
          :default-active-key="0"
          @change="changeTabs"
          class="vb-tabs-bold justify-content-between mb-3"
        >
          <a-tab-pane
            v-for="menutab in userManagement.listUser"
            :key="menutab.id_jenis"
            :tab="menutab.name"
          />
        </a-tabs>
      </div>
      <div class="card-header">
        <strong>{{ 'Daftar User ' + selectedTitle + ' (' + selectedShorthand + ')' }}</strong>
        <a-button type="primary" class="mb-3 float-right" @click="openModal">
          <i class="fa fa-plus mr-2" />
          {{ 'Tambah ' + selectedShorthand }}
        </a-button>
        <a-button
          class="btn btn-success mb-3 float-right"
          style="margin-right: 5px; margin-left: 5px"
          @click="goExport"
        >
          <i class="fa fa-upload mr-2" />
          Export Users
        </a-button>
        <a-button @click="goImport" class="btn btn-light mb-3 float-right">
          <i class="fa fa-download mr-2" />
          Import Users
        </a-button>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between mb-3">
          <div class="d-flex">
            <div class="align-self-center">
              <span>Show :</span>
            </div>
            <a-select
              :default-value="userManagement.itemsPerPage[0]"
              class="mx-2"
              @change="handlePaginationSize"
            >
              <a-select-option
                v-for="itemPerPage in userManagement.itemsPerPage"
                :key="itemPerPage"
              >
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
            :columns="userManagement.columns"
            :data-source="userManagement.users"
            :row-key="user => user.id"
            :pagination="pagination"
          >
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #action="{ text }">
              <div>
                <button @click="handleDetail" type="button" class="btn btn-light">
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
        <a-modal
          v-model:visible="modalVisible"
          :title="'Tambah ' + selectedTitle"
          :closable="false"
          :mask-closable="false"
        >
          <template #footer>
            <a-button key="back" @click="closeModal">Batal</a-button>
            <a-button @click="handleSubmit" :loading="isSubmit" key="submit" type="primary"
              >Simpan</a-button
            >
          </template>
          <a-form label-align="left" layout="vertical">
            <a-form-item label="Nama User" name="name">
              <a-input style="width: 100% !important" v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="Username" name="username">
              <a-input style="width: 100% !important" v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="Password" name="password">
              <a-input style="width: 100% !important" v-model:value="formState.password" />
            </a-form-item>
            <a-form-item label="Email" name="email">
              <a-input style="width: 100% !important" v-model:value="formState.email" />
            </a-form-item>
            <a-form-item label="No HP" name="nohp">
              <a-input style="width: 100% !important" v-model:value="formState.nohp" />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getUserList, insertUser } from '@/services/connection/user-management/api'
import { toRaw } from 'vue'
import { notification, message } from 'ant-design-vue'
import { mapState, mapActions } from 'vuex'
const itemsPerPage = [5, 10, 15, 20]
const menutabs = [
  {
    id: 1,
    role: 'General Sales Manager',
    shorthand: 'GSM',
  },
  {
    id: 2,
    role: 'Senior Sales Manager',
    shorthand: 'SSM',
  },
  {
    id: 3,
    role: 'Sales Manager',
    shorthand: 'SM',
  },
  {
    id: 4,
    role: 'Area Manager',
    shorthand: 'AM',
  },
  {
    id: 5,
    role: 'Sales Dist',
    shorthand: 'SD',
  },
  {
    id: 6,
    role: 'Distributor',
    shorthand: 'Dist',
  },
  {
    id: 7,
    role: 'SPC',
    shorthand: 'SPC',
  },
]
const columns = [
  {
    title: 'No',
    dataIndex: 'id',
  },
  {
    title: 'ID User',
    dataIndex: 'userid',
  },
  {
    title: 'Nama Sales',
    dataIndex: 'name',
  },
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Password',
    dataIndex: 'password',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'No. HP',
    dataIndex: 'nohp',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    slots: { customRender: 'action' },
  },
]

export default {
  name: 'VbAntDesign',

  // setup() {
  //   const rules = {
  //     name: [{ required: true, message: 'Nama wajib diisi', type: 'string' }],
  //     username: [{ required: true, message: 'Username wajib diisi', type: 'string' }],
  //     password: [{ required: true, message: 'Password wajib diisi', type: 'string' }],
  //     email: [{ required: true, message: 'Email wajib diisi', type: 'email' }],
  //     nohp: [{ required: true, message: 'No HP wajib diisi', type: 'number' }],
  //   }

  //   const handleFinish = values => {
  //     console.log(values, formState)
  //   }

  //   const handleFinishFailed = errors => {
  //     console.log(errors)
  //   }

  //   const rowSelection = {
  //     onChange: (selectedRowKeys, selectedRows) => {
  //       console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  //     },
  //     getCheckboxProps: record => ({
  //       props: {
  //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //         name: record.name,
  //       },
  //     }),
  //   }
  //   return {
  //     rules,
  //     columns,
  //     rowSelection,
  //     handleFinish,
  //     handleFinishFailed,
  //   }
  // },
  data() {
    return {
      actiiveTabs: {},
      users: [],
      selectedTabId: 1,
      formState: {
        name: '',
        username: '',
        password: '',
        email: '',
        nohp: '',
        userid: '',
      },
      selectedTitle: 'Sales',
      selectedShorthand: 'Sales',
      pagination: {},
      modalVisible: false,
      isLoading: false,
      isSubmit: false,
    }
  },
  computed: {
    ...mapState({
      userManagement: state => state.userManagement.data,
    }),
  },
  mounted() {
    this.fetchGetUsers()
    this.getListJenisUser()
  },
  methods: {
    ...mapActions('userManagement', ['getListJenisUser']),
    changeTabs(key) {
      const dataRes = [...this.userManagement.listUser]
      const filtered = dataRes.filter(x => x.id_jenis == key)
      this.actiiveTabs = filtered[0]
      console.log(`actiiveTabs`, this.actiiveTabs)
      this.selectedTitle = this.actiiveTabs.name
      this.selectedShorthand = this.actiiveTabs.name
      this.selectedTabId = key
    },
    handleDetail() {
      this.$router.push({ name: 'user-management-profile' })
    },
    openModal() {
      this.modalVisible = true
    },
    closeModal() {
      this.modalVisible = false
    },
    handleSubmit() {
      console.log(this.formState)
      if (this.formValidation()) {
        console.log(true)
        this.fetchSubmitForm()
      } else {
        console.log(false)
      }
    },
    fetchSubmitForm() {
      this.isSubmit = true
      this.formState.userid = Math.floor(Math.random() * 10000)
      const formData = toRaw(this.formState)

      insertUser(formData)
        .then(response => {
          if (response) {
            message.success('User berhasil Ditambahkan')
            this.fetchGetUsers()
          }
          this.isSubmit = false
          this.closeModal()
        })
        .catch(err => {
          console.error(err)
          message.error('Oops, sepertinya ada masalah')
          this.isSubmit = false
          this.closeModal()
        })
    },
    createRole() {
      this.$router.push({ name: 'permissions-create' })
    },
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    deleteMarks() {
      console.log(this.rowSelection)
    },
    formValidation() {
      if (
        this.formState.name &&
        this.formState.username &&
        this.formState.password &&
        this.formState.email &&
        this.formState.nohp
      ) {
        return true
      } else {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Semua kolom wajib diisi',
        })
      }
    },
    deleteAll() {},
    deleteRow(id) {
      console.log('Deleted ID: ' + id)
      // deletePermission(id)
      //   .then((response) => {
      //     console.log(response)
      //     const dataSource = [...this.users]
      //     this.users = dataSource.filter((item) => item.id !== id)
      //   })
      //   .catch((err) => {
      //     console.error(err)
      //   })
    },
    fetchGetUsers() {
      this.isLoading = true
      getUserList()
        .then(response => {
          if (response) {
            this.users = response
          }
          this.isLoading = false
        })
        .catch(err => {
          console.error(err)
          this.isLoading = false
        })
    },
    goImport() {
      this.$router.push({ name: 'user-management-export' })
    },
    goExport() {
      this.$router.push({ name: 'user-management-export' })
    },
  },
}
</script>
<style lang="scss" module scoped>
@import './style.module.scss';
</style>
