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
          v-model:value="newUsername"
        />
        <a-button
          type="primary"
          @click="addNewUsername"
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
                v-for="(itemPerPage, i) in itemsPerPage"
                :key="i"
              >
                {{ itemPerPage }}
              </a-select-option>
            </a-select>
            <div class="align-self-center">
              <span>entries</span>
            </div>
          </div>
          <a-input-search
            placeholder="input search text"
            style="width: 200px"
            v-model:value="keyword"
          />
        </div>
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="columns"
            :data-source="dataTable"
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
                  @click="showUserEditModal(text)"
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
    <!-- User Edit Modal Start -->
    <vb-user-edit-modal
      :modal-visible="modalVisible"
      :username="editItem.nama_user"
      :edit-username="editUsername"
      @handle-ok="handleOk"
      @handle-cancel="modalVisible = false"
    />
    <!-- User Edit Modal End -->
  </div>
</template>

<script>
import { getLevelUser, deleteLevelUser, updateLevelUser, addLevelUser } from '@/services/connection/leveluser/api'
import VbUserEditModal from './modals/UserEditModal'
import { notification } from 'ant-design-vue'

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
  components: {
    VbUserEditModal,
  },
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
      modalVisible: false,
      editUsername: '',
      editItem: {},
      newUsername: '',
      keyword: '',
    }
  },
  computed: {
    dataTable() {
      return this.dataSourceTable.filter(dataSource => dataSource.nama_user.toLowerCase().includes(this.keyword.toLowerCase()))
    },
  },
  mounted() {
    this.fetchLevelUsers()
  },
  methods: {
    fetchLevelUsers() {
      getLevelUser()
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
    addNewLevelUser(data) {
      addLevelUser(data)
      .then(response => {
        console.log(response)
        this.fetchLevelUsers()
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteLevelUserById(id) {
      deleteLevelUser(id)
      .then(response => {
        console.log(response)
        this.fetchLevelUsers()
      })
      .catch(err => {
        console.error(err)
      })
    },
    updateLevelUserById(id, data) {
      updateLevelUser(id, data)
      .then(response => {
        console.log(response)
        this.fetchLevelUsers()
      })
      .catch(err => {
        console.error(err)
      })
    },
    deleteConfirm(id) {
      const deleteMethod = this.deleteLevelUserById
      this.$confirm({
        title: 'Hapus User',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk() {
          deleteMethod(id)
          notification.success({
            message: 'Hapus User',
            description: 'User berhasil dihapus',
          })
        },
      });
    },
    makeIdUser() {
      let id = ''
      for (let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * 9) + 1
        id += random
      }

      return id
    },
    addNewUsername() {
      const dataForm = {
        id_user: this.makeIdUser(),
        nama_user: this.newUsername,
      }
      const exist = this.dataSourceTable.find(data => data.nama_user.toLowerCase() === dataForm.nama_user.toLowerCase())
      if (!exist) {
        this.addNewLevelUser(dataForm)
        notification.success({
          message: 'Tambah User',
          description: 'User berhasil ditambah',
        })
        this.newUsername = ''
      } else {
        notification.warning({
          message: 'Tambah User',
          description: 'User sudah tersedia',
        })
      }
    },
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    getUserEdit(id) {
      const row = this.dataSourceTable.find(data => data.id === id)
      this.editItem.id = row.id
      this.editItem.id_user = row.id_user
      this.editItem.nama_user = row.nama_user
      this.editUsername = row.nama_user
    },
    showUserEditModal(id) {
      this.getUserEdit(id)
      this.modalVisible = true
    },
    handleOk(newEditUsername) {
      this.editItem.nama_user = newEditUsername
      this.updateLevelUserById(this.editItem.id, this.editItem)
      notification.success({
          message: 'Update User',
          description: 'User berhasil diupdate',
        })
      this.resetAfterSubmit()
      this.modalVisible = false
    },
    resetAfterSubmit() {
      this.editItem = {}
      this.editUsername = ''
      this.keyword = ''
    },
  },
}
</script>