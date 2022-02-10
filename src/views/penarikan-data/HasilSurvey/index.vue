<template>
  <div>
    <a-card class="card card-top card-top-primary">
      <div class="card-header pl-0 pr-0">
        <div class="row">
          <div class="col-md-3">
            <a-select
              v-model:value="penarikanData.body_report_survey.region_name"
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
              :upper-limit="dateLowerLimit"
              :lower-limit="dateBeforeLimit"
              v-model="penarikanData.body_report_survey.start_date"
            />
          </div>
          <div class="col-md-3 pl-0">
            <datepicker></datepicker>
            <vue-datepicker
              v-model="penarikanData.body_report_survey.end_date"
              class="ant-calendar-picker ant-calendar-picker-input ant-input w-100"
              placeholder="Tanggal Akhir"
              input-format="dd-MM-yyyy"
              :upper-limit="dateLowerLimit"
              :lower-limit="dateBeforeLimit"
            />
          </div>
          <div class="col-md-3">
            <a-button
              type="primary"
              :disabled="penarikanData.list_report_survey.length > 0 ? false : true"
              class="mb-3 float-right"
              @click="handleModalReportSurvey()"
            >
              <i class="fa fa-download mr-2" />
              Export
            </a-button>
            <a-button
              :loading="penarikanData.isLoading"
              type="primary"
              :disabled="
                penarikanData.body_report_survey.start_date &&
                penarikanData.body_report_survey.end_date &&
                penarikanData.body_report_survey.id_region
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
        <div class="d-flex mt-4 justify-content-between mb-3">
          <div class="d-flex">
            <div class="align-self-center">
              <span>Show :</span>
            </div>
            <a-select
              :default-value="penarikanData.itemsPerPage[1]"
              class="mx-2"
              @change="handlePaginationSize"
            >
              <a-select-option v-for="itemPerPage in penarikanData.itemsPerPage" :key="itemPerPage">
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
            :columns="penarikanData.columns_report_survey"
            :data-source="penarikanData.list_report_survey"
            :pagination="penarikanData.pagination"
            :loading="penarikanData.isLoading"
            :row-key="data => data"
          >
            <template #no="{index}">
              <div>{{ index + 1 }}</div>
            </template>
            <template #id_sales="{ text }">
              <div>
                {{ text.ID_SALES }}
              </div>
            </template>
            <template #nama_sales="{ text }">
              <div>
                {{ text.NAMA_SALES }}
              </div>
            </template>
            <template #username="{ text }">
              <div>
                {{ text.USERNAME }}
              </div>
            </template>
            <template #np_hp="{ text }">
              <div>
                {{ text.NO_HP }}
              </div>
            </template>
            <template #id_toko="{ text }">
              <div>
                {{ text.ID_TOKO }}
              </div>
            </template>
            <template #nama_toko="{ text }">
              <div>
                {{ text.NAMA_TOKO }}
              </div>
            </template>
            <template #kode_distributor="{ text }">
              <div>
                {{ text.KODE_DISTRIBUTOR }}
              </div>
            </template>
            <template #nama_distributor="{ text }">
              <div>
                {{ text.NAMA_DISTRIBUTOR }}
              </div>
            </template>
            <template #id_distrik="{ text }">
              <div>
                {{ text.ID_DISTRIK }}
              </div>
            </template>
            <template #nama_distrik="{ text }">
              <div>
                {{ text.NAMA_DISTRIK }}
              </div>
            </template>
            <template #id_area="{ text }">
              <div>
                {{ text.ID_AREA }}
              </div>
            </template>
            <template #nama_area="{ text }">
              <div>
                {{ text.NAMA_AREA }}
              </div>
            </template>
            <template #id_provinsi="{ text }">
              <div>
                {{ text.ID_PROVINSI }}
              </div>
            </template>
            <template #nama_provinsi="{ text }">
              <div>
                {{ text.NAMA_PROVINSI }}
              </div>
            </template>
            <template #id_region="{ text }">
              <div>
                {{ text.ID_REGION }}
              </div>
            </template>
            <template #tahun="{ text }">
              <div>
                {{ text.TAHUN }}
              </div>
            </template>

            <template #bulan="{ text }">
              <div>
                {{ text.BULAN }}
              </div>
            </template>
            <template #hari="{ text }">
              <div>
                {{ text.HARI }}
              </div>
            </template>
            <template #waktu_mulai="{ text }">
              <div>
                {{ text.WAKTU_MULAI }}
              </div>
            </template>
            <template #waktu_selesai="{ text }">
              <div>
                {{ text.WAKTU_SELESAI }}
              </div>
            </template>
            <template #waktu_kunjungan="{ text }">
              <div>
                {{ text.WAKTU_KUNJUNGAN }}
              </div>
            </template>
            <template #jam="{ text }">
              <div>
                {{ text.JAM }}
              </div>
            </template>
            <template #menit="{ text }">
              <div>
                {{ text.MENIS }}
              </div>
            </template>
            <template #apps_info="{ text }">
              <div>
                {{ text.APPS_INFO }}
              </div>
            </template>
            <template #jml_order="{ text }">
              <div>
                {{ text.JML_ORDER }}
              </div>
            </template>
            <template #target="{ text }">
              <div>
                {{ text.TARGET }}
              </div>
            </template>
            <template #realisasi="{ text }">
              <div>
                {{ text.REALISASI }}
              </div>
            </template>
            <template #unplan_target="{ text }">
              <div>
                {{ text.UNPLAN_TARGET }}
              </div>
            </template>
            <template #unplan_real="{ text }">
              <div>
                {{ text.UNPLAN_REAL }}
              </div>
            </template>
            <template #id_gsm="{ text }">
              <div>
                {{ text.ID_GSM }}
              </div>
            </template>
            <template #nama_gsm="{ text }">
              <div>
                {{ text.NAMA_GSM }}
              </div>
            </template>

            <template #id_sm="{ text }">
              <div>
                {{ text.ID_SM }}
              </div>
            </template>
            <template #nama_sm="{ text }">
              <div>
                {{ text.NAMA_SM }}
              </div>
            </template>
            <template #id_so="{ text }">
              <div>
                {{ text.ID_SO }}
              </div>
            </template>
            <template #nama_so="{ text }">
              <div>
                {{ text.NAMA_SO }}
              </div>
            </template>
          </a-table>
        </div>
      </div>

      <a-modal
        v-model:visible="penarikanData.modalVisibleSurvey"
        :closable="true"
        :mask-closable="true"
      >
        <div class="information pl-5 pr-5 pt-2 text-center">
          Apakah anda yakin akan melakukan export data report visit pada tanggal
          <span class="font-weight-bold">{{ startDate }}</span> hingga
          <span class="font-weight-bold">{{ endDate }}</span> untuk <br />
          <span class="font-weight-bold text-uppercase">
            region {{ penarikanData.body_report_survey.id_region }}</span
          >
          ?
        </div>

        <template #footer>
          <div>
            <a-button
              @click="reportSurveyDownload()"
              :loading="penarikanData.isLoading"
              key="submit"
              type="primary"
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
import moment from 'moment'

export default {
  name: 'ReportVisit',
  components: {
    VueDatepicker,
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      dateLowerLimit: null,
      dateBeforeLimit: null,
    }
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

    handleModalReportSurvey() {
      this.penarikanData.modalVisibleSurvey = true
      this.startDate = moment(this.penarikanData.body_report_survey.start_date).format('DD-MM-YYYY')
      this.endDate = moment(this.penarikanData.body_report_survey.end_date).format('DD-MM-YYYY')
    },

    handleRegion() {
      let dataSource = [...this.reporting.daftar_region]
      let filtered = dataSource.filter(
        x => x.namaRegion == this.penarikanData.body_report_survey.region_name,
      )
      this.penarikanData.body_report_survey.id_region = filtered[0].idRegion
    },

    async handleView() {
      await this.getDataReportHasilSurvey()
    },

    reportSurveyDownload() {
      const header = [
        'ID_SALES',
        'NAMA_SALES',
        'USERNAME',
        'NO_HP',
        'NM_USER',
        'ID_TOKO',
        'NAMA_TOKO',
        'KODE_DISTRIBUTOR',
        'NAMA_DISTRIBUTOR',
        'ID_DISTRIK',
        'NAMA_DISTRIK',
        'ID_AREA',
        'NAMA_AREA',
        'ID_PROVINSI',
        'NAMA_PROVINSI',
        'ID_REGION',
        'TAHUN',
        'BULAN',
        'HARI',
        'WAKTU_MULAI',
        'WAKTU_SELESAI',
        'WAKTU_KUNJUNGAN',
        'JAM',
        'MENIT',
        'APPS_INFO',
        'JUMLAH_ORDER',
        'TARGET',
        'REALISASI',
        'UNPLAN_TARGET',
        'UNPLAN_REAL',
        'ID_GSM',
        'NAMA_GSM',
        'ID_SM',
        'NAMA_SM',
        'ID_SO',
        'NAMA_SO',
      ]
      const filterVal = [
        'ID_SALES',
        'NAMA_SALES',
        'USERNAME',
        'NO_HP',
        'NM_USER',
        'ID_TOKO',
        'NAMA_TOKO',
        'KODE_DISTRIBUTOR',
        'NAMA_DISTRIBUTOR',
        'ID_DISTRIK',
        'NAMA_DISTRIK',
        'ID_AREA',
        'NAMA_AREA',
        'ID_PROVINSI',
        'NAMA_PROVINSI',
        'ID_REGION',
        'TAHUN',
        'BULAN',
        'HARI',
        'WAKTU_MULAI',
        'WAKTU_SELESAI',
        'WAKTU_KUNJUNGAN',
        'JAM',
        'MENIT',
        'APPS_INFO',
        'JUMLAH_ORDER',
        'TARGET',
        'REALISASI',
        'UNPLAN_TARGET',
        'UNPLAN_REAL',
        'ID_GSM',
        'NAMA_GSM',
        'ID_SM',
        'NAMA_SM',
        'ID_SO',
        'NAMA_SO',
      ]
      this.exportToExcel(header, filterVal, this.penarikanData.list_report_survey, 'report-visit')
    },
    handlePaginationSize(size) {
      this.penarikanData.pagination.pageSize = size
    },
    exportToExcel(header, filterVal, list, filename) {
      import('@/vendor/Export2Excel').then(excel => {
        const data = this.formatJson(filterVal, list)

        excel.export_json_to_excel({
          header,
          data,
          filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType,
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }),
      )
    },
  },
}
</script>
