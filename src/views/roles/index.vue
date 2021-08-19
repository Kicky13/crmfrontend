<template>
  <div>
    <div :class="$style.head" class="bg-light d-flex flex-column">
      <div class="card-header card-header-flex border-bottom-0">
        <div class="d-flex flex-column justify-content-center">
          <h5 class="mb-0 text-color-6">Permissions</h5>
        </div>
        <div class="ml-auto d-flex flex-column justify-content-center">
          <div class="dropdown d-inline-block">
            <a-dropdown placement="bottomRight" :trigger="['click']">
              <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-noarrow">
                <i class="fe fe-more-horizontal" />
              </button>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a @click="createRole">Create New</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">Delete Marks</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">Delete All</a>
                  </a-menu-item>
                  <a-menu-divider />
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="card border-0">
      <div class="table-responsive text-nowrap">
      <a-table :row-selection="rowSelection" :columns="columns" :data-source="roles">
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
</template>

<script>
import { getRoleList, deleteRole } from '@/services/connection/apiService'

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
    }
  },
  data() {
    return {
      roles: [],
    }
  },
  mounted() {
    this.fetchGetRoles()
  },
  methods: {
    createRole() {
      this.$router.push({ name: 'roles-create' })
    },
    deleteRow(id) {
      console.log("Deleted ID: " + id)
      deleteRole(id)
      .then(response => {
        console.log(response)
        const dataSource = [...this.roles]
        this.roles = dataSource.filter(item => item.id !== id)
      })
      .catch(err => {
        console.error(err)
      })
    },
    fetchGetRoles() {
      getRoleList()
      .then(response => {
        if (response) {
          this.roles = response
        }
      })
      .catch(err => { console.error(err) })
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
