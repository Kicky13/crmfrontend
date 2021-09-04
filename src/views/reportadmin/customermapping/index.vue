<template>
  <div>
    <div class="card card-top card-top-primary">
      <div class="card-header">
        <strong>Customer Mapping</strong>
      </div>
      <div class="card-body">
        <div class="filter_data mb-4">
          <div class="row">
            <div class="col-md-3">
              <div class="row d-flex">
                <div class="col-md-4 col-xs-12 align-self-center">
                  <span>Filter By</span>
                </div>
                <div class="col-md-8 col-xs-12">
                  <a-select v-model="selected" show-search class="w-100 pr-2">
                    <a-select-option value="All" selecte>All</a-select-option>
                    <a-select-option value="Region">Region</a-select-option>
                    <a-select-option value="Provinsi">Provinsi</a-select-option>
                    <a-select-option value="Area">Area</a-select-option>
                    <a-select-option value="Distributor">Distributor</a-select-option>
                  </a-select>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="row d-flex">
                <div class="col-md-3 col-xs-12 align-self-center">
                  <span>Filter Set</span>
                </div>
                <div class="col-md-7 col-xs-12">
                  <a-select v-model="selected" show-search class="w-100 pr-2">
                    <a-select-option value="All" selecte>All</a-select-option>
                    <a-select-option value="Region">Region</a-select-option>
                    <a-select-option value="Provinsi">Provinsi</a-select-option>
                    <a-select-option value="Area">Area</a-select-option>
                    <a-select-option value="Distributor">Distributor</a-select-option>
                  </a-select>
                </div>
                <div class="col-md-2 col-xs-12">
                  <a-button type="primary" @click="buttonGet">
                    <i class="fa fa-eye mr-2" />
                    View
                  </a-button>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row">
                <div class="col-md-6"></div>
                <div class="col-md-6 col-xs-12">
                  <a-button class="btn_export float-right" @click="buttonGet">
                    <i class="fa fa-download mr-2" />
                    Export
                  </a-button>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-6 col-xs-12 d-flex">
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
            <div class="col-md-6 col-xs-12 ">
              <a-input-search
                placeholder="input search text"
                style="width: 200px"
                class="float-right"
              />
            </div>
          </div>
        </div>

        <div class="data_table table-responsive text-nowrap">
          <a-table
            :columns="columns"
            :pagination="pagination"
            :row-key="dataSourceTable => dataSourceTable.id"
          >
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: 'No.',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'Kode Customer',
    dataIndex: 'kd_customer',
    key: 'kd_customer',
  },
  {
    title: 'Nama Customer',
    dataIndex: 'nama_customer',
    key: 'nama_customer',
  },
  {
    title: 'Alamat',
    dataIndex: 'alamat',
    key: 'alamat',
  },
  {
    title: 'Distributor',
    dataIndex: 'distributor',
    key: 'distributor',
  },
  {
    title: 'Sales',
    dataIndex: 'sales',
    key: 'sales',
  },
  {
    title: 'Nama SO',
    dataIndex: 'nama_so',
    key: 'nama_so',
  },
  {
    title: 'Nama SM',
    dataIndex: 'nama_sm',
    key: 'nama_sm',
  },
  {
    title: 'Nama SSM',
    dataIndex: 'nama_ssm',
    key: 'nama_ssm',
  },
  {
    title: 'Nama GSM',
    dataIndex: 'nama_gsm',
    key: 'nama_gsm',
  },
  {
    title: 'Create AT',
    dataIndex: 'create_at',
    key: 'create_at',
  },
]
export default {
  name: 'CustomerMapping',
  setup() {
    return {
      columns,
    }
  },
  data() {
    return {
      itemsPerPage: [5, 10, 15, 20],
      dataSourceTable: [],
      pagination: {},
    }
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
