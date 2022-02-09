<template>
  <div>
    <a-card class="card card-top card-top-primary">
      <div class="card-header pl-0 pr-0">
        <div class="row">
          <div class="col-md-3">
            <a-select
              v-model:value="penarikanData.body_report_visit.region_name"
              placeholder="Pilih Region"
              class="w-100"
              show-search
              @change="handleRegion()"
            >
              <a-select-option disabled value="">Pilih Salah Satu</a-select-option>
              <a-select-option
                v-for="(item, index) in reporting.daftar_region"
                :value="item.namaRegion"
                :key="`distrik_${index}`"
                data-toggle="tooltip"
                data-placement="top"
                :title="item.namaRegion"
              >
                {{ item.idRegion }} - {{ item.namaRegion }}
              </a-select-option>
            </a-select>
          </div>

          <div class="col-md-3 pl-0">
            <datepicker></datepicker>
            <vue-datepicker
              class="ant-calendar-picker ant-calendar-picker-input ant-input w-100"
              placeholder="Tanggal Mulai"
              input-format="dd-MM-yyyy"
              v-model="penarikanData.body_report_visit.start_date"
            />
          </div>
          <div class="col-md-3 pl-0">
            <datepicker></datepicker>
            <vue-datepicker
              v-model="penarikanData.body_report_visit.end_date"
              class="ant-calendar-picker ant-calendar-picker-input ant-input w-100"
              placeholder="Tanggal Akhir"
              input-format="dd-MM-yyyy"
            />
          </div>
          <div class="col-md-3">
            <a-button
              type="primary"
              :disabled="penarikanData.list_report_visit.length > 0 ? false : true"
              class="mb-3 float-right"
              @click="handleModalReportVisit()"
            >
              <i class="fa fa-download mr-2" />
              Export
            </a-button>
            <a-button
              :loading="penarikanData.isLoading"
              type="primary"
              :disabled="
                penarikanData.body_report_visit.start_date &&
                penarikanData.body_report_visit.end_date &&
                penarikanData.body_report_visit.id_region
                  ? false
                  : true
              "
              class="mb-3 float-right mr-2"
              @click="handleView()"
            >
              <i class="fa fa-eye mr-2" />
              View
            </a-button>
          </div>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive text-nowrap">
          <a-table
            :columns="penarikanData.columns_report_visit"
            :data-source="penarikanData.list_report_visit"
            :pagination="penarikanData.pagination_report_visit"
            :loading="penarikanData.isLoading"
            :row-key="data => data"
          >
            <template #no="{index}">
              <div>{{ index + 1 }}</div>
            </template>
            <template #id_sales="{ text }">
              <div>
                {{ text.id_sales }}
              </div>
            </template>
          </a-table>
        </div>
      </div>

      <a-modal
        v-model:visible="penarikanData.modalVisibleVisit"
        :closable="true"
        :mask-closable="true"
      >
        <div class="information pl-5 pr-5 pt-2 text-center">
          Apakah anda yakin akan melakukan export data hasil survey pada tanggal 2022-02-07 hingga
          2022-02-07 untuk <br />
          region 1 - Surabaya ?
        </div>

        <template #footer>
          <div>
            <a-button :loading="penarikanData.isLoading" key="submit" type="primary"
              >Export Data</a-button
            >
          </div>
        </template>
      </a-modal>
    </a-card>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import VueDatepicker from 'vue3-datepicker'

export default {
  name: 'ReportVisit',
  components: {
    VueDatepicker,
  },
  data() {
    return {}
  },

  computed: {
    ...mapState({
      penarikanData: state => state.penarikanData.data,
      reporting: state => state.reporting.data,
    }),
  },
  watch: {
    startValue(val) {
      console.log('startValue', val)
    },
    endValue(val) {
      console.log('endValue', val)
    },
  },
  async mounted() {
    await this.getListAllRegion()
  },
  methods: {
    ...mapActions('penarikanData', ['getDataReportHasilSurvey']),
    ...mapActions('reporting', ['getListAllRegion']),

    handleModalReportVisit() {
      this.penarikanData.modalVisibleVisit = true
    },

    handleRegion() {
      let dataSource = [...this.reporting.daftar_region]
      let filtered = dataSource.filter(
        x => x.namaRegion == this.penarikanData.body_report_visit.region_name,
      )
      this.penarikanData.body_report_visit.id_region = filtered[0].idRegion
    },

    async handleView() {
      await this.getDataReportHasilSurvey()
    },
  },
}
</script>
