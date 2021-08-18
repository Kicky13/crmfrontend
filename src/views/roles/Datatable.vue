<template>
  <div class="table-responsive text-nowrap">
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="roles">
      <template #name="{ text }">
        <a href="javascript:;">{{ text }}</a>
      </template>
      <template #action>
          <div class="text-nowrap">
            <div>
              <button type="button" class="btn btn-light">
              <span class="text-blue">Edit</span>
            </button>
            <button type="button" class="btn btn-outline-danger">
              <span>Delete</span>
            </button>
            </div>
          </div>
        </template>
    </a-table>
  </div>
</template>
<script>
import { getRoleList } from '@/services/connection/apiService'

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
    slots: { customRender: 'action' },
  },
]

export default {
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
