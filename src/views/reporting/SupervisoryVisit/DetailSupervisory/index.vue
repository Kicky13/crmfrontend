<template>
  <div class="supervisory">
    <div class="row mb-2">
      <div class="col-md-4 col-xs-4">
        <a
          @click="$router.push(`/reporting/supervisory-visit`)"
          class="font-weight-bold text-primary"
        >
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
          Kembali ke Reporting Supervisory Visit
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
            <h5>MAJ.8676334.S03</h5>
          </div>
          <div class="supervisory_company">
            <span>MAJU ANUGRAH,PT</span>
          </div>
          <div class="supervisory_position">
            <span>Supervisor / AM :</span>
          </div>
          <div class="supervisory_name">
            <span>
              ACIP LESMANA
            </span>
          </div>
          <hr />
          <div class="supervisory_points p-2">
            <div class="points">
              <div class="d-flex">
                <div class="p-2 title">Poin Perolehan</div>
                <div class="ml-auto p-2 point">28</div>
              </div>
            </div>
            <div class="points">
              <div class="d-flex">
                <div class="p-2 title">Poin Maksimal</div>
                <div class="ml-auto p-2 point">33</div>
              </div>
            </div>
            <div class="points_counts">
              <div class="d-flex">
                <div class="p-2 title">Hasil Penilaian</div>
                <div class="ml-auto p-2 point">84.85</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card card-top supervisory_survey p-3">
          <span class="font-weight-bold title">Foto Survey</span>
          <div
            class="photo_survey"
            :style="'background-image: url(' + require('@/assets/LandingPage/images/FooterBG.webp')"
          ></div>
        </div>
      </div>
      <div class="col-md-6 col-xs-6 ">
        <div class="card card-top supervisory_questions p-3">
          <span class="title_survey">Hasil Penilaian Survei Sales</span>
          <table class="mt-4 table_questions table">
            <thead>
              <tr>
                <th>No</th>
                <th>Pertanyaan</th>
                <th>Jawaban</th>
                <th>Poin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="4" class="mt-4">
                  <div class="btn btn-tabs w-100">
                    Tahapan 1 - Perencanaan dan Persiapan
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Membawa katalog promosi / e-katalog</td>
                <td>[1] - Ya</td>
                <td>
                  <div class="progress">
                    <div
                      class="progress-bar progress-bar-striped bg-success"
                      role="progressbar"
                      style="width: 10%"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Membawa Brosur / e-brosur</td>
                <td>[1] - Ya</td>
                <td>
                  <div class="progress">
                    <div
                      class="progress-bar progress-bar-striped bg-success"
                      role="progressbar"
                      style="width: 100%"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </td>
              </tr>

              <!-- Tahapan next -->
              <tr>
                <td colspan="4" class="mt-4">
                  <div class="btn btn-tabs w-100">
                    Tahapan 2 - Membuka Kunjungan
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Membawa katalog promosi / e-katalog</td>
                <td>[1] - Ya</td>
                <td>
                  <div class="progress">
                    <div
                      class="progress-bar progress-bar-striped bg-success"
                      role="progressbar"
                      style="width: 10%"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Membawa Brosur / e-brosur</td>
                <td>[1] - Ya</td>
                <td>
                  <div class="progress">
                    <div
                      class="progress-bar progress-bar-striped bg-success"
                      role="progressbar"
                      style="width: 100%"
                      aria-valuenow="100"
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
              Strike Rate, Customer Active, NOO, Sell-out Toko, Menanggapi Komplain, Perilaku
              Salesman (Kedisiplinan Pelaksanaan Salesmanship)
            </div>
            <hr />
          </div>
          <div class="data_detail">
            <div class="title_detail">
              <span>Tanggal Survei</span>
            </div>
            <div class="body_detail mt-2">
              Selasa, 27 Juni 2022
            </div>
            <hr />
          </div>
          <div class="data_detail">
            <div class="title_detail">
              <span>Toko Customer</span>
            </div>
            <div class="body_detail mt-2">
              MEKAR JAYA ABADI (Telp. 081216593321)
            </div>
            <hr />
          </div>
          <div class="data_detail">
            <div class="title_detail">
              <span>Lokasi</span>
            </div>
            <div class="body_detail mt-2">
              TANAH BARU RT.01 RW.06 - BOJONG GEDE - KABUPATEN BOGOR - JAWA BARAT
              <br />
              [AREA 35 - REGION 2]
            </div>
            <hr />
          </div>
          <div class="data_detail">
            <div class="title_detail">
              <span>Atasan Sales Distributor</span>
            </div>
            <div class="body_detail mt-2">
              <span class="badge badge-success">AM -> ACIP LESMANA</span>
              <span class="badge badge-danger">SM -> DENI HERMAWAN</span>
              <span class="badge badge-warning">SSM -> WAHYUDI</span>
              <span class="badge badge-info">GSM -> EKO HERMANTO</span>
            </div>
            <hr />
          </div>
          <div class="data_detail">
            <div class="title_detail">
              <span>Evaluasi & Tindakan Perbaikan</span>
            </div>
            <div class="body_detail mt-2">
              Sales sangat rajin dan tepat waktu
            </div>
          </div>
        </div>
      </div>
    </div>
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
        id_visited: this.$route.params.id,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/Reporting/SupervisoryVisit/index.scss';
</style>
