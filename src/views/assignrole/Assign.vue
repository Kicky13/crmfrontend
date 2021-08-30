<template>
  <div>
    <div :class="$style.head" class="bg-light d-flex flex-column">
      <div class="card-header card-header-flex border-bottom-0">
        <div class="d-flex flex-column justify-content-center">
          <h5 class="mb-0 text-color-6">Assign Role</h5>
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
                    <i class="fa fa-plus-square-o">
                    <a @click="createRole"> Tambah baru</a>
                    </i>
                  </a-menu-item>
                  <a-menu-item>
                    <i class="fa fa-trash">
                    <a href="javascript:;"> Hapus ditandai</a>
                    </i>
                  </a-menu-item>
                  <a-menu-item>
                    <i class="fa fa-ban">
                    <a href="javascript:;"> Hapus semua</a>
                    </i>
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
      <a-table :row-selection="rowSelection" :columns="columns" :data-source="assigns">
      <template #action="{ text }">
          <div>
              <button type="button" class="btn btn-light">
                <i class="fa fa-file-text-o"></i> <span class="text-black">Detail</span></button
              ><button @click="goUpdate(text)" type="button" class="btn btn-warning">
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
import { toRaw } from 'vue'
import { getAssignList, deleteAssign } from '@/services/connection/roles-permissions/api'

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
    }
  },
  data() {
    return {
      assigns: [],
    }
  },
  mounted() {
    this.fetchGetAssign()
  },
  methods: {
    createRole() {
      this.$router.push({ name: 'assignrole-create' })
    },
    deleteRow(id) {
      console.log("Deleted ID: " + id)
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
      .catch(err => { console.error(err) })
    },
    goUpdate(id) {
      const dataSource = [...this.assigns]
      const currData = dataSource.filter(x => x.id === id)
      this.$router.push({ name: 'assignrole-update', params: { id: id, user: currData[0].user, role: currData[0].role } })
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
