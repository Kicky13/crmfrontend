<template>
  <div class="table-responsive text-nowrap">
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="permissions">
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
import { getPermissionList } from '@/services/connection/apiService'

const columns = [
  {
    title: 'Actor',
    dataIndex: 'actor',
  },
  {
    title: 'Page Name',
    dataIndex: 'pagename',
    slots: { customRender: 'name' },
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
  },
  {
    title: 'Permission',
    dataIndex: 'permission',
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
      permissions: [],
    }
  },
  mounted() {
    this.fetchGetPermissionList()
  },
  methods: {
    fetchGetPermissionList() {
      getPermissionList()
      .then(response => {
        if (response) {
          this.permissions = response
        }
      })
    },
  },
}
</script>
