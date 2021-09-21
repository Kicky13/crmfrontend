<template>
  <div>
    <a-card class="card card-top card-top-primary">
      <div class="card-header">
        <strong>List Data : </strong> Jenis User
        <a-button class="btn btn-success"> Disini </a-button>
      </div>
      <div class="card-body">
        <a-button type="primary">
          <i class="fa fa-download mr-2" />
          Download Format import data user
        </a-button>
        <a-button
          class="btn btn-primary mb-3 float-right"
          style="margin-right: 5px; margin-left: 5px"
        >
          <i class="fa fa-eye mr-2" />
          Preview
        </a-button>
        <a-upload class="btn btn-light mb-3 float-right">
          <i class="fa fa-upload" /> Upload disini
        </a-upload>
        <div class="card card-top card-top-primary container-fluid">
          <div class="card-header d-flex justify-content-center">
            <strong>Preview Data User</strong>
          </div>
          <div class="card-body">
            <a-table
              :columns="columns"
              :data-source="users"
              :row-key="(users) => users.id"
              :pagination="pagination"
            />
          </div>
          <div class="card-header align-self-center">
            <a-button
              class="btn btn-primary align-self-center"
            >
              <i class="fa fa-upload mr-2" />
              Import
            </a-button>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getUserList } from '@/services/connection/user-management/api'

const itemsPerPage = [5, 10, 15, 20]
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
      users: [],
      pagination: {},
    }
  },
  mounted() {
    this.fetchGetUsers()
  },
  methods: {
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
