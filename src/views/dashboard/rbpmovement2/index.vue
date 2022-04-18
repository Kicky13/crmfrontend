<template>
  <a-row :gutter="[32, 16]">
    <a-col :xs="24" :md="12">
      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :md="8">
          <a-select placeholder="Distrik" class="w-100">
            <a-select-option disabled value="">Pilih Distrik</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Distrik</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Provinsi" class="w-100">
            <a-select-option disabled value="">Pilih Provinsi</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Provinsi</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Distributor" class="w-100">
            <a-select-option disabled value="">Pilih Distributor</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top"
              >Distributor</a-select-option
            >
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Tahun" class="w-100">
            <a-select-option disabled value="">Pilih Tahun</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Tahun</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Bulan" class="w-100">
            <a-select-option disabled value="">Pilih Bulan</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Bulan</a-select-option>
          </a-select>
        </a-col>
      </a-row>
    </a-col>
    <a-col :xs="24" :md="12">
      <a-row :gutter="[24, 16]">
        <a-col :xs="24" :md="8">
          <a-select placeholder="Kategori" class="w-100">
            <a-select-option disabled value="">Pilih Kategori</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Kategori</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-select placeholder="Brand" class="w-100">
            <a-select-option disabled value="">Pilih Brand</a-select-option>
            <a-select-option data-toggle="tooltip" data-placement="top">Brand</a-select-option>
          </a-select>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-button type="primary" class="w-100">Tampilkan</a-button>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
  <a-row>
    <a-col :xs="12">
      <div class="card my-3">
        <div class="card-body d-flex justify-content-between">
          <div>
            <h5 class="text-secondary">Outlet Surveyed</h5>
            <h2 class="text-primary">{{ rbpMovement2.outletSurveyed }}</h2>
          </div>
          <div>
            <i class="fa fa-user text-primary" style="font-size: 5em" />
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
  <div class="card card-top card-top-primary">
    <div class="card-body">
      <div class="d-flex mb-3">
        <div class="align-self-center">
          <span>Show :</span>
        </div>
        <a-select
          :default-value="rbpMovement2.itemsPerPage[1]"
          class="mx-2"
        >
          <a-select-option
            v-for="itemPerPage in rbpMovement2.itemsPerPage"
            :key="itemPerPage"
          >
            {{ itemPerPage }}
          </a-select-option>
        </a-select>
        <div class="align-self-center">
          <span>entries</span>
        </div>
      </div>
      <a-table
        :columns="rbpMovement2.columns"
        :data-source="rbpMovement2.rbpTable"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      rbpMovement2: state => state.rbpMovement2.data,
    }),
  },
  async mounted() {
    this.getOutletSurveyed()
  },
  methods: {
    ...mapActions('rbpMovement2', ['getOutletSurveyed']),
  },
}
</script>
