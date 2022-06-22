<template>
  <div>
    <a-card class="card card-top card-top-primary">
      <div class="card-header px-0">
        <a-row :gutter="[16, 16]" class="mb-3">
          <a-col :xs="24" :md="6">
            <a-select placeholder="Filter By" show-search class="w-100">
              <a-select-option disabled value="">Pilih</a-select-option>
            </a-select>
          </a-col>
          <a-col :xs="24" :md="6">
            <a-select placeholder="Filter Set" show-search class="w-100">
              <a-select-option disabled value="">Pilih</a-select-option>
            </a-select>
          </a-col>
          <a-col :xs="24" :md="6">
            <a-select
              placeholder="Filter Tahun"
              show-search
              class="w-100"
              @change="handleChangeTahun"
            >
              <a-select-option disabled value="">Pilih Tahun</a-select-option>
              <a-select-option v-for="(tahun, index) in years" :value="tahun" :key="index">
                {{ tahun }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :xs="24" :md="2">
            <a-tooltip placement="topLeft">
              <template #title>
                <span>Refresh Filter</span>
              </template>
              <a-button @click="refreshFilter()" type="primary">
                <i class="fa fa-refresh" aria-hidden="true"></i>
              </a-button>
            </a-tooltip>
          </a-col>
          <a-col :xs="24" :md="4">
            <a-button type="primary" class="w-100" @click="showReport">
              <i class="fa fa-eye mr-2" />
              Tampilkan
            </a-button>
          </a-col>
        </a-row>
      </div>

      <div class="card-body p-0">
        <div class="d-flex mt-4 justify-content-between mb-3">
          <div class="d-flex">
            <div class="align-self-center">
              <span>Show :</span>
            </div>
            <a-select
              :default-value="reportingSupervisory.itemsPerPage[1]"
              class="mx-2"
              @change="handlePaginationSize"
            >
              <a-select-option
                v-for="itemPerPage in reportingSupervisory.itemsPerPage"
                :key="itemPerPage"
              >
                {{ itemPerPage }}
              </a-select-option>
            </a-select>
            <div class="align-self-center">
              <span>entries</span>
            </div>
          </div>
        </div>
        <div class="table-responsive text-nowrap">
          <a-table
            ref="table"
            :columns="reportingSupervisory.columns"
            :data-source="reportingSupervisory.dataTable"
            :loading="reportingSupervisory.isLoading"
            :row-key="data => data"
            :scroll="{ x: 2000 }"
          >
            <template #no_survei="{ text }">
              <span>{{ text.no_survei }}</span>
            </template>
            <template #tanggal="{ text }">
              <span>{{ text.tanggal }}</span>
            </template>
            <template #sales="{ text }">
              <span>{{ text.sales }}</span>
            </template>
            <template #so="{ text }">
              <span>{{ text.so }}</span>
            </template>
            <template #distributor="{ text }">
              <span>{{ text.distributor }}</span>
            </template>
            <template #customer="{ text }">
              <span>{{ text.customer }}</span>
            </template>
            <template #nilai="{ text }">
              <span>{{ text.nilai }}</span>
            </template>
            <template #alamat="{ text }">
              <span>{{ text.alamat }}</span>
            </template>
            <template #action="{ text }">
              <router-link
                :to="`/reporting/supervisory-visit/${text.id}`"
                class="btn btn-success mr-1"
                data-toggle="tooltip"
                title="Data Detail"
              >
                <i class="fa fa-eye" />
              </router-link>
            </template>
          </a-table>
        </div>
      </div>
    </a-card>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  nama: 'reportingSupervisory',
  computed: {
    ...mapState({
      reportingSupervisory: state => state.reportingSupervisory.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  mounted() {
    this.collapseClose()
  },
  methods: {
    ...mapActions('reportingSupervisory', ['']),
    collapseClose() {
      this.$store.getters.settings.isMenuCollapsed = false
    },
  },
}
</script>
