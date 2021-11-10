<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header d-flex align-items-center justify-content-between">
        <strong>Level User</strong>
        <Can do="create" on="News">
          <div class="d-flex">
            <div class="align-self-center">
              <span>Tambah Jenis User :</span>
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
        </Can>
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
            :loading="isLoading"
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
      :username="editItem.namaJenisUser"
      :edit-username="editUsername"
      @handle-ok="handleOk"
      @handle-cancel="modalVisible = false"
    />
    <!-- User Edit Modal End -->
  </div>
</template>

<script>
import { levelUserList, deleteLevelUser, updateLevelUser, addLevelUser } from '@/services/connection/leveluser/api'
import VbUserEditModal from './modals/UserEditModal'
import { notification } from 'ant-design-vue'

const itemsPerPage = [5, 10, 15, 20]

export default {
  components: {
    VbUserEditModal,
  },
  setup() {
    return {
      itemsPerPage,
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
      isLoading: false,
      columns: [
        {
          title: 'No.',
          dataIndex: 'no',
          key: 'no',
        },
        {
          title: 'ID Jenis User',
          dataIndex: 'idJenisUser',
          key: 'idJenisUser',
        },
        {
          title: 'Nama Jenis User',
          dataIndex: 'namaJenisUser',
          key: 'namaJenisUser',
        },
        {
          title: 'Action',
          dataIndex: 'idJenisUser',
          key: 'idJenisUser',
          slots: { customRender: 'action' },
        },
      ],
    }
  },
  computed: {
    dataTable() {
      return this.dataSourceTable.filter(dataSource => dataSource.namaJenisUser.toLowerCase().includes(this.keyword.toLowerCase()))
    },
  },
  mounted() {
    this.fetchLevelUsers()
    this.removeAction()
  },
  methods: {
    fetchLevelUsers() {
      this.isLoading = true
      levelUserList()
        .then((response) => {
          let i = 1
          this.dataSourceTable = []
          if (response) {
            response.data.forEach(item => {
              item.no = i++
              this.dataSourceTable.push(item)
              this.isLoading = false
            })
          }
        })
        .catch((err) => {
          console.error(err)
          this.isLoading = false
        })
    },
    addNewLevelUser(data) {
      addLevelUser(data)
      .then(response => {
        if (response) {
          this.fetchLevelUsers()
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteLevelUserById(id) {
      deleteLevelUser(id)
      .then(response => {
        if (response) {
          this.fetchLevelUsers()
        }
      })
      .catch(err => {
        console.error(err)
      })
    },
    updateLevelUserById(id, data) {
      updateLevelUser(id, data)
      .then(response => {
        if (response) {
          this.fetchLevelUsers()
        }
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
    addNewUsername() {
      let check = this.newUsername.trim()
      if (check) {
        const dataForm = {}
        dataForm.namaJenisUser = this.newUsername
        const exist = this.dataSourceTable.find(data => data.namaJenisUser.toLowerCase() === dataForm.namaJenisUser.toLowerCase())
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
      } else {
        notification.error({
          message: 'Tambah User',
          description: 'Kolom tambah user masih kosong',
        })
      }
    },
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    getUserEdit(id) {
      const row = this.dataSourceTable.find(data => data.idJenisUser === id)
      this.editItem.idJenisUser = row.idJenisUser
      this.editItem.namaJenisUser = row.namaJenisUser
      this.editUsername = row.namaJenisUser
    },
    showUserEditModal(id) {
      this.getUserEdit(id)
      this.modalVisible = true
    },
    handleOk(newEditUsername) {
      const dataForm = {}
      dataForm.idJenisUser = this.editItem.idJenisUser
      dataForm.namaJenisUser = newEditUsername
      this.updateLevelUserById(dataForm)
      notification.success({
          message: 'Update User',
          description: 'User berhasil diupdate',
        })
      this.resetAfterSubmit()
      this.modalVisible = false
    },
    removeAction() {
      const abilityUser = this.$store.state.user.ability
      const check = abilityUser.filter(ability => ability.action === 'update' || ability.action === 'delete')
      if (!check.length) {
        this.columns.pop()
      }
    },
    resetAfterSubmit() {
      this.editItem = {}
      this.editUsername = ''
      this.keyword = ''
    },
  },
}
</script>