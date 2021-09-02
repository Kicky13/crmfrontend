<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header d-flex">
        <strong>PERMISSIONS</strong>
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
      </div>
    </div>
  </div>
</template>

<script>
import { getPermissionList, deletePermission } from '@/services/connection/roles-permissions/api'

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
      permissions: [],
      itemsPerPage,
      pagination: {},
    }
  },
  mounted() {
    this.fetchGetPermissions()
  },
  methods: {
    createRole() {
      this.$router.push({ name: 'permissions-create' })
    },
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    deleteMarks() {
      console.log(this.rowSelection)
    },
    deleteAll() {},
    deleteRow(id) {
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
    fetchGetPermissions() {
      getPermissionList()
        .then((response) => {
          if (response) {
            this.permissions = response
          }
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
