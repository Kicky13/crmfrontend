<template>
  <div class="supervisory">
    <div class="row mb-2">
      <div class="col-md-4 col-xs-4">
        <a
          @click="$router.push(`/reporting/supervisory-visit-tso`)"
          class="font-weight-bold text-primary"
        >
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
          Kembali ke Reporting Supervisory Visit TSO
        </a>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 col-xs-3">
        <div class="card card-top text-center">
          <div class="card-header supervisory_card_header"></div>
          <div class="supervisory_avatar">
            <img
              lazy="loading"
              v-once
              :src="require('@/assets/images/icon/users-visit.png')"
              alt="Photo profile"
            />
          </div>
          <div class="supervisory_number_position">
            <h5>
              {{
                reportingSupervisory.detailVisit &&
                  reportingSupervisory.detailVisit.global_info &&
                  reportingSupervisory.detailVisit.global_info[0] &&
                  reportingSupervisory.detailVisit.global_info[0].id_reference_distributor
              }}
            </h5>
          </div>
          <div class="supervisory_company">
            <span>{{
              reportingSupervisory.detailVisit &&
                reportingSupervisory.detailVisit.global_info &&
                reportingSupervisory.detailVisit.global_info[0] &&
                reportingSupervisory.detailVisit.global_info[0].nm_distributor
            }}</span>
          </div>
          <div class="supervisory_position">
            <span>Supervisor / AM :</span>
          </div>
          <div class="supervisory_name">
            <span>
              {{
                reportingSupervisory.detailVisit &&
                  reportingSupervisory.detailVisit.global_info &&
                  reportingSupervisory.detailVisit.global_info[0] &&
                  reportingSupervisory.detailVisit.global_info[0].supervisor_am
              }}
            </span>
          </div>
          <hr />
          <div class="supervisory_points p-2">
            <div class="points">
              <div class="d-flex">
                <div class="p-2 title">Poin Perolehan</div>
                <div class="ml-auto p-2 point">
                  {{
                    reportingSupervisory.detailVisit &&
                      reportingSupervisory.detailVisit.nilai_info &&
                      reportingSupervisory.detailVisit.nilai_info.poin_get
                  }}
                </div>
              </div>
            </div>
            <div class="points">
              <div class="d-flex">
                <div class="p-2 title">Poin Maksimal</div>
                <div class="ml-auto p-2 point">
                  {{
                    reportingSupervisory.detailVisit &&
                      reportingSupervisory.detailVisit.nilai_info &&
                      reportingSupervisory.detailVisit.nilai_info.poin_max
                  }}
                </div>
              </div>
            </div>
            <div class="points_counts">
              <div class="d-flex">
                <div class="p-2 title">Hasil Penilaian</div>
                <div class="ml-auto p-2 point">
                  {{
                    reportingSupervisory.detailVisit &&
                      reportingSupervisory.detailVisit.nilai_info &&
                      reportingSupervisory.detailVisit.nilai_info.nilai
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card card-top supervisory_survey p-3">
          <span class="font-weight-bold title">Foto Survey</span>
          <!-- <div
            class="photo_survey"
            :style="'background-image: url(' + require('@/assets/LandingPage/images/FooterBG.webp')"
          ></div> -->

          <div
            v-if="
              reportingSupervisory.detailVisit &&
                reportingSupervisory.detailVisit.foto_info &&
                reportingSupervisory.detailVisit.foto_info.length > 0
            "
          >
            <a-carousel arrows>
              <template #prevArrow>
                <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                  <left-circle-outlined />
                </div>
              </template>
              <template #nextArrow>
                <div class="custom-slick-arrow" style="right: 10px">
                  <right-circle-outlined />
                </div>
              </template>

              <div
                v-for="(item, index) in reportingSupervisory.detailVisit.foto_info"
                :key="`index_${index}`"
              >
                <div
                  :style="'background-image: url(' + item.path_foto_visit"
                  style="border-radius: 4px; background-repeat: no-repeat; width: 100%;height: 300px;background-position: 50% 50%; background-size: cover;"
                ></div>
              </div>
            </a-carousel>
          </div>
          <div v-else>
            <a-carousel arrows>
              <template #prevArrow>
                <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                  <left-circle-outlined />
                </div>
              </template>
              <template #nextArrow>
                <div class="custom-slick-arrow" style="right: 10px">
                  <right-circle-outlined />
                </div>
              </template>
              <div>
                <img
                  src="@/assets/images/noimage.svg"
                  class="img-fluid w-100"
                  style="height:280px;"
                />
              </div>
              <div>
                <img
                  src="@/assets/images/noimage.svg"
                  class="img-fluid w-100"
                  style="height:280px;"
                />
              </div>
            </a-carousel>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-xs-6 ">
        <div class="card card-top supervisory_questions p-3">
          <span class="title_survey">Hasil Penilaian Survei Sales</span>
          <table class="mt-4 table_questions table">
            <thead>
              <tr>
                <th width="30">No</th>
                <th>Pertanyaan</th>
                <th width="140">Jawaban</th>
                <th width="100">Poin</th>
              </tr>
            </thead>
            <tbody v-for="(quest, index) in questions" :key="index">
              <tr>
                <td colspan="4" class="mt-4">
                  <div class="btn btn-tabs w-100">
                    {{ quest[0].nm_jenis_penilaian }}
                  </div>
                </td>
              </tr>
              <tr v-for="(quest_detail, indexQuest) in quest" :key="indexQuest">
                <td>{{ indexQuest + 1 }}</td>
                <td>{{ quest_detail.nm_penilaian_sales }}</td>
                <td>
                  [{{ quest_detail.nm_optional_jawaban == 'Tidak' ? 2 : 1 }}] -
                  {{ quest_detail.nm_optional_jawaban }}
                </td>
                <td>
                  <div class="progress">
                    <div
                      class="progress-bar progress-bar-striped bg-success"
                      role="progressbar"
                      style="width: 10%"
                      :aria-valuenow="quest_detail.point"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-3 col-xs-3">
        <div class="card card-top supervisory_detail p-3">
          <div class="data_detail">
            <div class="title_detail">
              <span>Objektif Pelaksanaan Survei</span>
            </div>
            <div class="body_detail mt-2">
              {{
                reportingSupervisory.detailVisit &&
                reportingSupervisory.detailVisit.additional_info &&
                reportingSupervisory.detailVisit.additional_info.objektif == ''
                  ? 'Tidak tersedia'
                  : reportingSupervisory.detailVisit &&
                    reportingSupervisory.detailVisit.additional_info &&
                    reportingSupervisory.detailVisit.additional_info.objektif
              }}
            </div>
            <hr />
          </div>
          <div class="data_detail">
            <div class="title_detail">
              <span>Tanggal Survei</span>
            </div>
            <div class="body_detail mt-2">
              {{
                reportingSupervisory.detailVisit &&
                  reportingSupervisory.detailVisit.additional_info &&
                  formatTimestamp(reportingSupervisory.detailVisit.additional_info.tanggal_survei)
              }}
            </div>
            <hr />
          </div>
          <div class="data_detail">
            <div class="title_detail">
              <span>Toko Customer</span>
            </div>
            <div class="body_detail mt-2">
              {{
                reportingSupervisory.detailVisit &&
                  reportingSupervisory.detailVisit.additional_info &&
                  reportingSupervisory.detailVisit.additional_info.toko_customer &&
                  reportingSupervisory.detailVisit.additional_info.toko_customer.nama_toko
              }}
              (Telp.
              {{
                reportingSupervisory.detailVisit &&
                  reportingSupervisory.detailVisit.additional_info &&
                  reportingSupervisory.detailVisit.additional_info.toko_customer &&
                  reportingSupervisory.detailVisit.additional_info.toko_customer.telp_toko
              }})
            </div>
            <hr />
          </div>
          <div class="data_detail">
            <div class="title_detail">
              <span>Lokasi</span>
            </div>
            <div class="body_detail mt-2">
              {{
                reportingSupervisory.detailVisit &&
                  reportingSupervisory.detailVisit.additional_info &&
                  reportingSupervisory.detailVisit.additional_info.lokasi &&
                  reportingSupervisory.detailVisit.additional_info.lokasi.alamat
              }}
              ,
              {{
                reportingSupervisory.detailVisit &&
                  reportingSupervisory.detailVisit.additional_info &&
                  reportingSupervisory.detailVisit.additional_info.lokasi &&
                  reportingSupervisory.detailVisit.additional_info.lokasi.kota
              }}
              ,
              {{
                reportingSupervisory.detailVisit &&
                  reportingSupervisory.detailVisit.additional_info &&
                  reportingSupervisory.detailVisit.additional_info.lokasi &&
                  reportingSupervisory.detailVisit.additional_info.lokasi.provinsi
              }}
              <br />
              [{{
                reportingSupervisory.detailVisit &&
                  reportingSupervisory.detailVisit.additional_info &&
                  reportingSupervisory.detailVisit.additional_info.lokasi &&
                  reportingSupervisory.detailVisit.additional_info.lokasi.area
              }}
              -
              {{
                reportingSupervisory.detailVisit &&
                  reportingSupervisory.detailVisit.additional_info &&
                  reportingSupervisory.detailVisit.additional_info.lokasi &&
                  reportingSupervisory.detailVisit.additional_info.lokasi.region
              }}]
            </div>
            <hr />
          </div>
          <div class="data_detail">
            <div class="title_detail">
              <span>Atasan Sales Distributor</span>
            </div>
            <div class="body_detail mt-2">
              <span class="badge badge-success"
                >AM ->
                {{
                  reportingSupervisory.detailVisit &&
                    reportingSupervisory.detailVisit.additional_info &&
                    reportingSupervisory.detailVisit.additional_info.atasan &&
                    reportingSupervisory.detailVisit.additional_info.atasan.am
                }}</span
              >
              <span class="badge badge-danger"
                >SM ->
                {{
                  reportingSupervisory.detailVisit &&
                    reportingSupervisory.detailVisit.additional_info &&
                    reportingSupervisory.detailVisit.additional_info.atasan &&
                    reportingSupervisory.detailVisit.additional_info.atasan.sm
                }}</span
              >
              <span class="badge badge-warning"
                >SSM ->
                {{
                  reportingSupervisory.detailVisit &&
                    reportingSupervisory.detailVisit.additional_info &&
                    reportingSupervisory.detailVisit.additional_info.atasan &&
                    reportingSupervisory.detailVisit.additional_info.atasan.ssm
                }}</span
              >
              <span class="badge badge-info"
                >GSM ->
                {{
                  reportingSupervisory.detailVisit &&
                    reportingSupervisory.detailVisit.additional_info &&
                    reportingSupervisory.detailVisit.additional_info.evaluasi &&
                    reportingSupervisory.detailVisit.additional_info.atasan.gsm
                }}</span
              >
            </div>
            <hr />
          </div>
          <div class="data_detail">
            <div class="title_detail">
              <span>Evaluasi & Tindakan Perbaikan</span>
            </div>
            <div class="body_detail mt-2">
              {{
                reportingSupervisory.detailVisit &&
                  reportingSupervisory.detailVisit.additional_info &&
                  reportingSupervisory.detailVisit.additional_info.evaluasi
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { _ } from 'vue-underscore'
import moment from 'moment'

export default {
  nama: 'reportingSupervisory',
  data() {
    return {
      questions: [],
    }
  },
  computed: {
    ...mapState({
      reportingSupervisory: state => state.reportingSupervisory.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    await this.getDataDetail()
    this.collapseClose()
  },
  methods: {
    ...mapActions('reportingSupervisory', ['getDataDetailSupervisoryVisit']),
    collapseClose() {
      this.$store.getters.settings.isMenuCollapsed = true
    },
    async getDataDetail() {
      await this.getDataDetailSupervisoryVisit({
        id_visited: this.$route.params.id_supervisory,
      })

      let dataDetail = Object.values(
        this.reportingSupervisory.detailVisit.detail_nilai_info.detail_penilain,
      )

      this.questions = dataDetail
      console.log(`this`, dataDetail)
    },
    formatTimestamp(time) {
      if (time) {
        return moment(time).format('DD MMMM YYYY')
      } else {
        return null
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/Reporting/SupervisoryVisit/index.scss';
</style>

<style scoped>
/* For demo */
/* .ant-carousel >>> .slick-slide {
  text-align: center;
  height: 300px;
  line-height: 160px;
  background: #fff;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
} */

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 300px;
  line-height: 160px;
  background: #fff;
  overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: black;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

#mapContainer {
  width: 100%;
  height: 60vh;
  z-index: 0 !important;
}
</style>
