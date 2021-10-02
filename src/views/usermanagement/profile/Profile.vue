<template>
  <div>
    <div class="row">
      <div class="col-md-4 col-xs-4">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Mapping User</strong>
          </div>
          <div class="card-header">
            <div class="d-flex flex-wrap flex-column align-items-center">
              <div class="vb__utils__avatar vb__utils__avatar--size64 mb-3">
                <img
                  lazy="loading"
                  v-once
                  src="resources/images/avatars/5.jpg"
                  alt="Mary Stanform"
                />
              </div>
              <div class="text-center">
                <div class="text-dark font-weight-bold font-size-20">Mary Stanform</div>
                <div class="font-size-16">Kode / ID : 7781</div>
                <div class="font-size-16">Username : adam12</div>
                <div class="font-size-16">Email : adam12@gmail.com</div>
              </div>
            </div>
          </div>
          <div class="card-header align-self-center">
            <strong>Jenis User : General Sales Manager</strong>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-xs-8">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Hierarki Down / Bawahan Langsung</strong>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between mb-3" style="margin-bottom: 10px">
              <div class="align-self-center">
                <strong>Daftar Senior Sales Manager (SSM) : </strong>
              </div>
              <div class="d-flex">
                <a-select v-model:value="selectedUser" class="mx-3" style="width: 200px">
                  <a-select-option disabled :value="null">Pilih salah satu</a-select-option>
                  <a-select-option v-for="data in userOption" :key="data.id" :value="data.userid">{{
                    data.name
                  }}</a-select-option>
                </a-select>
                <a-button type="primary">
                  <i class="fa fa-plus mr-2" />
                  Tambahkan
                </a-button>
              </div>
            </div>
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
                :columns="columns"
                :data-source="users"
                :row-key="users => users.id"
                :pagination="pagination"
              >
                <template #action>
                  <div>
                    <button type="button" class="btn btn-outline-danger">
                      <i class="fa fa-trash"></i><span> Hapus</span>
                    </button>
                  </div>
                </template>
              </a-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRaw } from 'vue'
import { notification, message } from 'ant-design-vue'
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
      itemsPerPage,
    }
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      userOption: [],
      pagination: {},
      id: null,
      isLoading: false,
    }
  },
  mounted() {
    this.fetchGetUsers()
  },
  methods: {
    handlePaginationSize(size) {
      this.pagination.pageSize = size
    },
    fetchGetUsers() {
      getUserList()
        .then(response => {
          if (response) {
            this.users = response
            this.userOption = response
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
