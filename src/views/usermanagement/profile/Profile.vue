<template>
  <div>
    <div class="row mb-2">
      <div class="col-md-4 col-xs-4">
        <router-link :to="`/users/hierarchy`" class="font-weight-bold text-primary">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
          Kembali ke User Hirarki</router-link
        >
      </div>
    </div>
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
                  :src="require('@/assets/images/users.png')"
                  alt="Mary Stanform"
                />
              </div>
              <div class="text-center">
                <div class="text-dark font-weight-bold font-size-20">
                  {{ userManagement.detail_jabatan.namaUser }}
                </div>
                <div class="font-size-16">
                  Kode / ID : {{ userManagement.detail_jabatan.idUser }}
                </div>
                <div class="font-size-16">
                  Username : {{ userManagement.detail_jabatan.namaUser }}
                </div>
                <div class="font-size-16">Email : {{ userManagement.detail_jabatan.email }}</div>
              </div>
            </div>
          </div>
          <div class="card-header align-self-center">
            <strong>Jenis User : {{ userManagement.detail_jabatan.namaJabatan }}</strong>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-xs-8">
        <div class="card card-top card-top-primary">
          <div class="card-header d-flex">
            <strong class="align-self-center">Hierarki Down / Bawahan Langsung</strong>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 col-xs-12 mb-2"></div>
              <div class="col-md-4 col-xs-12 mb-2"></div>
              <div class="col-md-4 col-xs-12 mb-2">
                <a-button type="primary" class="float-right">
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
                :columns="userManagement.columns_hirarki"
                :data-source="userManagement.list_hirarki_down"
                :row-key="data => data.iduser"
                :pagination="userManagement.pagination"
                :loading="userManagement.isLoading"
              >
                <template #no="{ index }">
                  <div>
                    {{ index + 1 }}
                  </div>
                </template>
                <template #id_user="{ text }">
                  <div>
                    {{ text.iduser }}
                  </div>
                </template>
                <template #nama_sales="{ text }">
                  <div>
                    {{ text.namasales }}
                  </div>
                </template>
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
import { mapState, mapActions } from 'vuex'

const itemsPerPage = [5, 10, 15, 20]

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
      rowSelection,
      itemsPerPage,
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      userManagement: state => state.userManagement.data,
    }),
  },
  async mounted() {
    await this.getDetailProfile({
      id_jabatan: this.$route.params.uuid,
    })
    await this.getListDownHirarki({
      id_user: this.$route.params.uuid,
    })
  },
  methods: {
    ...mapActions('userManagement', ['getDetailProfile', 'getListDownHirarki']),
    handlePaginationSize(size) {
      this.userManagement.pagination.pageSize = size
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
