<template>
  <div class="table-responsive text-nowrap">
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="data">
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
const columns = [
  {
    title: 'Actor',
    dataIndex: 'actor',
  },
  {
    title: 'Page Name',
    dataIndex: 'name',
    slots: { customRender: 'name' },
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
  },
  {
    title: 'Permission',
    dataIndex: 'action',
  },
  {
    title: 'Action',
    slots: { customRender: 'action' },
  },
]
const data = [
  {
    key: '1',
    actor: 'admin',
    name: 'All Page',
    subject: 'all',
    action: 'manage',
  },
  {
    key: '2',
    actor: 'admintoko',
    name: 'Management Toko',
    subject: 'Shop',
    action: 'manage',
  },
  {
    key: '3',
    actor: 'admintoko',
    name: 'Dashboard',
    subject: 'Dashboard',
    action: 'read',
  },
  {
    key: '4',
    actor: 'admintoko',
    name: 'Dashboard',
    subject: 'Dashboard',
    action: 'read',
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
      data,
      columns,
      rowSelection,
    }
  },
}
</script>
