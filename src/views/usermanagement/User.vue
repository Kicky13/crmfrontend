<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header d-flex">
        <a-tabs :default-active-key="1" @change="changeTabs" class="vb-tabs-bold justify-content-between mb-3">
          <a-tab-pane v-for="menutab in menutabs" :key="menutab.id" :tab="menutab.role" />
        </a-tabs>
      </div>
      <div class="card-header d-flex">
        <strong>{{ "Daftar User " +  selectedTitle + " (" + selectedShorthand + ")"}}</strong>
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
            :data-source="users"
            :row-key="(user) => user.id"
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
import { getUserList } from '@/services/connection/user-management/api'

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
      actiiveTabs: {},
      users: [],
      selectedTabId: 1,
      selectedTitle: 'General Sales Manager',
      selectedShorthand: 'GSM',
      itemsPerPage,
      menutabs,
      pagination: {},
    }
  },
  mounted() {
    this.fetchGetUsers()
  },
  methods: {
    changeTabs(key) {
      console.log(key)
      const dataRes = [...this.menutabs]
      const filtered = dataRes.filter((x) => x.id == key)
      this.actiiveTabs = filtered[0]
      this.selectedTitle = this.actiiveTabs.role
      this.selectedShorthand = this.actiiveTabs.shorthand
      this.selectedTabId = key
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
      getUserList()
        .then((response) => {
          if (response) {
            this.users = response
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
