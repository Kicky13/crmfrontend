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
    title: 'Name',
    dataIndex: 'name',
    slots: { customRender: 'name' },
  },
  {
    title: 'Code',
    dataIndex: 'code',
  },
  {
    title: 'Created Date',
    dataIndex: 'date',
  },
  {
    title: 'Action',
    slots: { customRender: 'action' },
  },
]
const data = [
  {
    key: '1',
    name: 'admin',
    code: 'ID829J',
    date: '2021/07/08',
  },
  {
    key: '2',
    name: 'admintoko',
    code: 'ID823A',
    date: '2021/07/08',
  },
  {
    key: '3',
    name: 'pembeli',
    code: 'ID876H',
    date: '2021/07/08',
  },
  {
    key: '4',
    name: 'supervisor',
    code: 'ID129B',
    date: '2021/07/08',
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
