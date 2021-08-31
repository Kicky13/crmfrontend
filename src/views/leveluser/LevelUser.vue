<template>
  <div>    
    <div class="card card-top card-top-primary">
      <div class="card-header d-flex">
        <div class="align-self-center">
          <strong>Tambah Jenis User :</strong>
        </div>
        <a-input
          placeholder="Nama jenis user"
          class="mx-3"
          style="width: 200px"
          v-model:value="userBaru"
        />
        <a-button
          type="primary"
          @click="tambahUserBaru"
        >
          <i class="fa fa-save mr-2" />
          Save
        </a-button>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between mb-3">
          <div class="d-flex">
            <div class="align-self-center">
              <span>Show :</span>
            </div>
            <a-select
              :default-value="itemsPerPage[1]"
              class="mx-2"
              @change="handlePaginationSize"
            >
              <a-select-option
                v-for="itemPerPage in itemsPerPage"
                :key="itemPerPage"
              >
                {{itemPerPage}}
              </a-select-option>
            </a-select>
            <div class="align-self-center">
              <span>entries</span>
            </div>
          </div>
          <a-input-search
            placeholder="input search text"
            style="width: 200px"
          />
        </div>
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="columns"
            :data-source="dataSourceTable"
            :row-key="dataSourceTable => dataSourceTable.id"
            :pagination="pagination"
          >
            <template #name="{ text }">
              <a href="javascript:;">{{ text }}</a>
            </template>
            <template #action="{ text }">
              <div>
                <button
                  type="button"
                  class="btn btn-warning mr-1"
                  @click="showEditUserModal(text)"
                >
                  <i class="fa fa-pencil-square-o mr-1" />
                  <span class="text-black">Ubah</span>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="deleteConfirm(text)"
                >
                  <i class="fa fa-trash mr-1" />
                  <span>Hapus</span>
                </button>
              </div>
            </template>
          </a-table>
        </div>        
      </div>
    </div>
    <a-modal
      :title="`Edit Menu: ${editItem.nama_user}`"
      :visible="editUserModalVisible"
      @ok="editUserModalHandleOk"
      @cancel="editUserModalHandleCancel"
    >
      <a-form>
        <a-form-item label="Jenis User">
          <a-input v-model:value="inputValueUser" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getUser, deleteUser, updateUser, addUser } from '@/services/connection/user/api'
import { message } from 'ant-design-vue'

const itemsPerPage = [5, 10, 15, 20]
const columns = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'ID Jenis User',
    dataIndex: 'id_user',
    key: 'id_user',
  },
  {
    title: 'Nama Jenis User',
    dataIndex: 'nama_user',
    key: 'nama_user',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'id',
    slots: { customRender: 'action' },
  },
]

export default {
  setup() {
    return {
      itemsPerPage,
      columns,
    }
  },
  data() {
    return {
      dataSourceTable: [],
      pagination: {},
      editUserModalVisible: false,
      editItem: {
        id: null,
        id_user: '',
        nama_user: '',
      },
      inputValueUser: '',
      userBaru: '',
    }
  },
  mounted() {
    this.fetchGetUser()
  },
  methods: {
    fetchGetUser() {
      getUser()
        .then((response) => {
          let i = 1
          this.dataSourceTable = []
          if (response) {
            response.forEach(item => {
              item.no = i++
              this.dataSourceTable.push(item)
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    deleteUserById(id) {
      deleteUser(id)
      .then(response => {
        console.log(response)
        this.fetchGetUser()
        message.success('User berhasil dihapus')
      })
      .catch(err => {
        console.error(err)
      })
    },
    updateUserById(id, data) {
      updateUser(id, data)
      .then(response => {
        console.log(response)
        this.fetchGetUser()
        message.success('User berhasil diupdate')
      })
      .catch(err => {
        console.error(err)
      })
    },
    addNewUser(data) {
      addUser(data)
      .then(response => {
        console.log(response)
        this.fetchGetUser()
        message.success('User berhasil ditambah')
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteConfirm(id) {
      const deleteMethod = this.deleteUserById
      this.$confirm({
        title: 'Hapus User',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk() {
          deleteMethod(id)
        },
      });
    },
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    showEditUserModal(id) {
      this.getUserEdit(id)
      this.editUserModalVisible = true
    },
    editUserModalHandleOk() {
      this.editItem.nama_user = this.inputValueUser
      this.updateUserById(this.editItem.id, this.editItem)
      this.editItem = {
        id: null,
        id_user: '',
        nama_user: '',
      }
      this.editUserModalVisible = false
    },
    editUserModalHandleCancel() {
      this.editUserModalVisible = false
    },
    getUserEdit(id) {
      const row = this.dataSourceTable.find(data => data.id === id)
      this.editItem.id = row.id
      this.editItem.id_user = row.id_user
      this.editItem.nama_user = row.nama_user
      this.inputValueUser = row.nama_user
    },
    makeIdUser() {
      let id = ''
      for (let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * 9) + 1
        id += random
      }

      return id
    },
    tambahUserBaru() {
      const dataForm = {
        id_user: this.makeIdUser(),
        nama_user: this.userBaru,
      }
      const exist = this.dataSourceTable.find(data => data.nama_user.toLowerCase() === dataForm.nama_user.toLowerCase())
      if (!exist) {
        this.addNewUser(dataForm)
        this.userBaru = ''
      } else {
        message.error('User sudah tersedia')
      }
    },
  },
}
</script>