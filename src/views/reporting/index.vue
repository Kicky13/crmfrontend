<template>
  <div>
    <a-card class="card card-top card-top-primary" :loading="reporting.isLoading">
      <div class="card-body p-4">
        <div class="list_download d-flex" @click="hirarkiInternalDownload">
          <div class="list_download_information">
            Download Master Mapping Hirarki Internal
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>

        <!--  -->
        <div class="list_download d-flex" @click="tsoDistrikDownload">
          <div class="list_download_information">
            Download Mapping TSO Distrik
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>

        <!--  -->
        <div class="list_download d-flex" @click="openModalDistributor()">
          <div class="list_download_information">
            Download Mapping Toko Distributor
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>

        <!--  -->
        <div class="list_download d-flex" @click="openModalCustomers()">
          <div class="list_download_information">
            Download Mapping Customer Sales
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>

        <!--  -->
        <div class="list_download d-flex" @click="openModalReportLastWeek()">
          <div class="list_download_information">
            Download Report Visit (7 Hari Terakhir)
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>

        <!--  -->
        <div class="list_download d-flex" @click="openModalReportSurveyLastWeek()">
          <div class="list_download_information">
            Download Hasil Survey (7 Hari Terakhir)
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </a-card>

    <a-modal v-model:visible="reporting.modalVisibleTSO" :closable="true" :mask-closable="true">
      <template v-if="reporting.identify === `Distributor`" #footer>
        <a-button
          @click="tokoDistributorDownload()"
          :disabled="reporting.body.nama.length > 0 ? false : true"
          key="submit"
          type="primary"
          >Download</a-button
        >
      </template>
      <template v-else #footer>
        <a-button
          @click="customerSalesDownload()"
          :disabled="reporting.body.nama.length > 0 ? false : true"
          key="submit"
          type="primary"
          >Download</a-button
        >
      </template>
      <div class="form-group">
        <label for="exampleFormControlInput1" class="font-weight-bold text-black">Pilih TSO</label>
        <br />
        <a-select
          placeholder="Pilih TSO"
          v-model:value="reporting.body.nama"
          @change="handleTSOChange"
          class="w-100"
          show-search
        >
          <a-select-option
            v-for="data in userManagement.users"
            :key="data.idJabatan"
            :value="data.nama"
            >{{ data.idJabatan }} - {{ data.nama }}</a-select-option
          >
        </a-select>
      </div>
    </a-modal>

    <!-- // Region -->

    <a-modal v-model:visible="reporting.modalVisibleRegion" :closable="true" :mask-closable="true">
      <template v-if="reporting.identify === `Report Last Week`" #footer>
        <a-button
          @click="handleDownloadReportVisit()"
          :disabled="reporting.bodyRegion.nama.length > 0 ? false : true"
          key="submit"
          type="primary"
          >Download</a-button
        >
      </template>
      <template v-else #footer>
        <a-button
          @click="handleDownloadSurveyVisit()"
          :disabled="reporting.bodyRegion.nama.length > 0 ? false : true"
          key="submit"
          type="primary"
          >Download</a-button
        >
      </template>

      <div class="form-group">
        <label for="exampleFormControlInput1" class="font-weight-bold text-black">Pilih TSO</label>
        <br />
        <a-select
          placeholder="Pilih Region"
          v-model:value="reporting.bodyRegion.nama"
          @change="handleRegionChange"
          class="w-100"
          show-search
        >
          <a-select-option
            v-for="data in userManagement.users"
            :key="data.idJabatan"
            :value="data.nama"
            >{{ data.idJabatan }} - {{ data.nama }}</a-select-option
          >
        </a-select>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Reporting',
  computed: {
    ...mapState({
      reporting: state => state.reporting.data,
      userManagement: state => state.userManagement.data,
    }),
  },
  async mounted() {
    // await this.getListAllRegion()
  },
  methods: {
    ...mapActions('reporting', [
      'getHirarkiInternal',
      'getTsoDistrik',
      'getDownloadTokoDist',
      'getDownloadCustomers',
      // 'getListAllRegion',
      'getFinalSurveyLastWeek',
      'getFinalVisitLastWeek',
    ]),
    ...mapActions('userManagement', ['getDataTable']),
    async hirarkiInternalDownload() {
      await this.getHirarkiInternal()
      if (this.reporting.status_download === `Sukses`) {
        const header = [
          'ID_JABATAN',
          'NM_JABATAN',
          'NM_JENIS_USER',
          'ID_USER',
          'NM_USER',
          'USERNAME',
          'ID_JABATAN_ATASAN',
          'JABATAN_ATASAN',
          'NM_ATASAN',
          'TGL_MULAI',
          'TGL_SELESAI',
        ]
        const filterVal = [
          'idJabatan',
          'namaJabatan',
          'jenisUser',
          'idUser',
          'namaUser',
          'username',
          'idJabatanAtasan',
          'jabatanAtasan',
          'namaAtasan',
          'tglMulai',
          'tglAkhir',
        ]
        this.exportToExcel(
          header,
          filterVal,
          this.reporting.listHirarkiInternal,
          'master-mapping-hirarki-internal',
        )
      } else {
        notification.error({
          message: 'Error',
          description: 'Maaf, terjadi kesalahan',
        })
      }
    },
    async tsoDistrikDownload() {
      await this.getTsoDistrik()
      if (this.reporting.status_download === `Sukses`) {
        const header = [
          'ID_USER_TSO',
          'USERNAME_TSO',
          'NAMA_TSO',
          'ID_JABATAN_TSO',
          'NAMA_JABATAN_TSO',
          'START_JABATAN_TSO',
          'END_JABATAN_TSO',
          'ID_DISTRIK',
          'NAMA_DISTRIK',
          'START_DISTRIK',
          'END_DISTRIK',
          'KODE_TOKO',
          'NAMA_TOKO',
        ]
        const filterVal = [
          'id_user_tso',
          'username_tso',
          'nama_tso',
          'id_jabatan',
          'nama_jabatan',
          'start_jabatan',
          'end_jabatan',
          'id_distrik',
          'nama_distrik',
          'start_distrik',
          'end_distrik',
          'kode_toko',
          'nama_toko',
        ]

        this.exportToExcel(header, filterVal, this.reporting.listTsoDistrik, 'mapping-tso-distrik')
      } else {
        notification.error({
          message: 'Error',
          description: 'Maaf, terjadi kesalahan',
        })
      }
    },
    async tokoDistributorDownload() {
      await this.getDownloadTokoDist({
        id_jabatanTSO: this.reporting.body.id_jabatanTSO,
      })

      if (this.reporting.status_download === `Sukses`) {
        const header = [
          'KODE_TOKO',
          'NAMA_TOKO',
          'ID_DISTRIBUTOR',
          'NAMA_DISTRIBUTOR',
          'ID_DISTRIK',
          'NAMA_DISTRIK',
        ]
        const filterVal = [
          'idToko',
          'namaToko',
          'idDistributor',
          'namaDistributor',
          'idDistrik',
          'namaDistrik',
        ]

        this.exportToExcel(
          header,
          filterVal,
          this.reporting.listDownloadTokoDist,
          'mapping-toko-distributor',
        )
        this.reporting.modalVisibleTSO = false
      } else {
        notification.error({
          message: 'Error',
          description: 'Maaf, terjadi kesalahan',
        })
      }
    },
    async customerSalesDownload() {
      await this.getDownloadCustomers({
        id_jabatanTSO: this.reporting.body.id_jabatanTSO,
      })

      if (this.reporting.status_download === `Sukses`) {
        const header = [
          'ID_USER_SALES',
          'USERNAME_SALES',
          'NAMA_SALES',
          'ID_JABATAN_SALES',
          'NAMA_JABATAN_SALES',
          'START_JABATAN_SALES',
          'END_JABATAN_SALES',
          'ID_DISTRIBUTOR',
          'NAMA_DISTRIBUTOR',
          'KODE_TOKO',
          'NAMA_TOKO',
          'SUN',
          'MON',
          'TUE',
          'WED',
          'THU',
          'FRI',
          'SAT',
          'WEEK_1',
          'WEEK_2',
          'WEEK_3',
          'WEEK_4',
          'WEEK_5',
        ]
        const filterVal = [
          'idSales',
          'usernameSales',
          'namaSales',
          'idJabatanSales',
          'jabatanSales',
          'startJabatan',
          'endJabatan',
          'idDistributor',
          'namaDistributor',
          'kodeToko',
          'namaToko',
          'sun',
          'mon',
          'tue',
          'wed',
          'thu',
          'fri',
          'sat',
          'w1',
          'w2',
          'w3',
          'w4',
          'w5',
        ]

        this.exportToExcel(
          header,
          filterVal,
          this.reporting.listDownloadCustomers,
          'mapping-customer-sales',
        )
        this.reporting.modalVisibleTSO = false
      }
    },
    async handleDownloadReportVisit() {
      await this.getFinalVisitLastWeek()

      if (this.reporting.status_download === 'Sukses') {
        const header = [
          'ID_SALES',
          'NAMA_SALES',
          'USERNAME',
          'NO_HP',
          'ID_CUSTOMER',
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
          'ID_KUNJUNGAN_CUSTOMER',
          'WAKTU_MULAI',
          'WAKTU_SELESAI',
          'VOLUME_PENJUALAN',
          'HARGA_PENJUALAN',
          'KAPASITAS_GUDANG_TOKO',
          'KAPASITAS_JUAL_TOKO',
          'KAPASITAS_TOKO',
          'ID_USER',
          'PEMBUAT',
          'STATUS_VISIT',
          'ID_SALES',
          'NAMA_SALES',
          'KODE_DISTRIBUTOR',
          'NAMA_DISTRIBUTOR',
          'SEMEN_MEMBANTU',
          'SEMEN_TERLAMBAT_DATANG',
          'KANTONG_TIDAK_KUAT',
          'HARGA_TIDAK_STABIL',
          'SEMEN_RUSAK_SAAT_DITERIMA',
          'TOP_KURANG_LAMA',
          'PEMESANAN_SULIT',
          'KOMPLAIN_SULIT',
          'STOK_SERING_KOSONG',
          'PROSEDUR_RUMIT',
          'TIDAK_SESUAI_SPESIFIKASI',
          'TIDAK_ADA_KELUHAN',
          'KELUHAN_LAIN_LAIN',
          'HARGA_TIDAK_BERSAING',
          'PP_TIDAK_MENARIK',
          'HADIAH_BELUM_DICAIRKAN',
          'BONUS_SEMEN',
          'SETIAP_PEMBELIAN_SEMEN',
          'BONUS_WISATA',
          'SETIAP_PEMBELIAN_WISATA',
          'POINT_REWARD',
          'SETIAP_PEMBELIAN_POINT',
          'BONUS_VOUCER',
          'SETIAP_PEMBELIAN_VOUCER',
          'POTONGAN_HARGA',
          'SETIAP_PEMBELIAN_POTONGAN',
          'LAIN_LAIN',
          'TIDAK_ADA_PROMOSI',
          'ID_SO',
          'NAMA_SO',
          'ID_SM',
          'NAMA_SM',
          'ID_SSM',
          'NAMA_SSM',
          'ID_GSM',
          'NAMA_GSM',
        ]
        const filterVal = [
          'id_hasil_survey',
          'id_kunjungan_customer',
          'tanggal_rencana_kunjungan',
          'tahun',
          'bulan',
          'hari',
          'id_user',
          'nm_customer',
          'id_region',
          'id_provinsi',
          'nama_provinsi',
          'id_area',
          'nama_area',
          'id_distrik',
          'nama_distrik',
          'id_produk',
          'nama_produk',
          'stok_saat_ini',
          'volume_pembelian',
          'harga_pembelian',
          'tanggal_pembelian',
          'top_pembelian',
          'volume_penjualan',
          'harga_penjualan',
          'kapasitas_gudang_toko',
          'kapasitas_jual_toko',
          'kapasitas_toko',
          'id_user',
          'pembuat',
          'status_visit',
          'id_sales',
          'nama_sales',
          'id_distributor',
          'nama_distributor',
          'semen_membatu',
          'semen_terlambat_datang',
          'kantong_semen_tidak_kuat',
          'harga_tidak_stabil',
          'semen_rusak_saat_diterima',
          'top_kurang_lama',
          'pemesanan_sulit',
          'komplain_sulit',
          'stok_sering_kosong',
          'prosedur_pembayaran_rumit',
          'tidak_sesuai_spesifikasi',
          'tidak_ada_keluhan',
          'keluhan_lain',
          'harga_tidak_bersaing_dengan_kompetitor',
          'program_penjualan_tidak_menarik',
          'hadiah_program_penjualan_belum_dicairkan',
          'bonus_semen',
          'setiap_pembelian',
          'wisata',
          'setiap_pembelian1',
          'point_reward',
          'setiap_pembelian2',
          'voucher',
          'setiap_pembelian3',
          'potongan_harga',
          'setiap_pembelian4',
          'lain_lain',
          'tidak_ada_promosi',
          'id_so',
          'nama_so',
          'id_sm',
          'nama_sm',
          'id_ssm',
          'nama_ssm',
          'id_gsm',
          'nama_gsm',
        ]
        this.exportToExcel(header, filterVal, this.reporting.visit_last_week, 'survey-last-week')
        this.reporting.modalVisibleRegion = false
      }
    },
    async handleDownloadSurveyVisit() {
      await this.getFinalSurveyLastWeek()

      if (this.reporting.status_download === 'Sukses') {
        const header = [
          'ID_HASIL_SURVEY',
          'ID_KUNJUNGAN_CUSTOMER',
          'TGL_RENCANA_KUNJUNGAN',
          'TAHUN',
          'BULAN',
          'HARI',
          'ID_CUSTOMER',
          'NAMA_TOKO',
          'ID_REGION',
          'ID_PROVINSI',
          'NAMA_PROVINSI',
          'ID_AREA',
          'NAMA_AREA',
          'ID_DISTRIK',
          'NAMA_DISTRIK',
          'ID_PRODUK',
          'NAMA_PRODUK',
          'STOK_SAAT_INI',
          'VOLUME_PEMBELIAN',
          'HARGA_PEMBELIAN',
          'TGL_PEMBELIAN',
          'TOP_PEMBELIAN',
          'VOLUME_PENJUALAN',
          'HARGA_PENJUALAN',
          'KAPASITAS_GUDANG_TOKO',
          'KAPASITAS_JUAL_TOKO',
          'KAPASITAS_TOKO',
          'ID_USER',
          'PEMBUAT',
          'STATUS_VISIT',
          'ID_SALES',
          'NAMA_SALES',
          'KODE_DISTRIBUTOR',
          'NAMA_DISTRIBUTOR',
          'SEMEN_MEMBANTU',
          'SEMEN_TERLAMBAT_DATANG',
          'KANTONG_TIDAK_KUAT',
          'HARGA_TIDAK_STABIL',
          'SEMEN_RUSAK_SAAT_DITERIMA',
          'TOP_KURANG_LAMA',
          'PEMESANAN_SULIT',
          'KOMPLAIN_SULIT',
          'STOK_SERING_KOSONG',
          'PROSEDUR_RUMIT',
          'TIDAK_SESUAI_SPESIFIKASI',
          'TIDAK_ADA_KELUHAN',
          'KELUHAN_LAIN_LAIN',
          'HARGA_TIDAK_BERSAING',
          'PP_TIDAK_MENARIK',
          'HADIAH_BELUM_DICAIRKAN',
          'BONUS_SEMEN',
          'SETIAP_PEMBELIAN_SEMEN',
          'BONUS_WISATA',
          'SETIAP_PEMBELIAN_WISATA',
          'POINT_REWARD',
          'SETIAP_PEMBELIAN_POINT',
          'BONUS_VOUCER',
          'SETIAP_PEMBELIAN_VOUCER',
          'POTONGAN_HARGA',
          'SETIAP_PEMBELIAN_POTONGAN',
          'LAIN_LAIN',
          'TIDAK_ADA_PROMOSI',
          'ID_SO',
          'NAMA_SO',
          'ID_SM',
          'NAMA_SM',
          'ID_SSM',
          'NAMA_SSM',
          'ID_GSM',
          'NAMA_GSM',
        ]
        const filterVal = [
          'id_hasil_survey',
          'id_kunjungan_customer',
          'tanggal_rencana_kunjungan',
          'tahun',
          'bulan',
          'hari',
          'id_user',
          'nm_customer',
          'id_region',
          'id_provinsi',
          'nama_provinsi',
          'id_area',
          'nama_area',
          'id_distrik',
          'nama_distrik',
          'id_produk',
          'nama_produk',
          'stok_saat_ini',
          'volume_pembelian',
          'harga_pembelian',
          'tanggal_pembelian',
          'top_pembelian',
          'volume_penjualan',
          'harga_penjualan',
          'kapasitas_gudang_toko',
          'kapasitas_jual_toko',
          'kapasitas_toko',
          'id_user',
          'pembuat',
          'status_visit',
          'id_sales',
          'nama_sales',
          'id_distributor',
          'nama_distributor',
          'semen_membatu',
          'semen_terlambat_datang',
          'kantong_semen_tidak_kuat',
          'harga_tidak_stabil',
          'semen_rusak_saat_diterima',
          'top_kurang_lama',
          'pemesanan_sulit',
          'komplain_sulit',
          'stok_sering_kosong',
          'prosedur_pembayaran_rumit',
          'tidak_sesuai_spesifikasi',
          'tidak_ada_keluhan',
          'keluhan_lain',
          'harga_tidak_bersaing_dengan_kompetitor',
          'program_penjualan_tidak_menarik',
          'hadiah_program_penjualan_belum_dicairkan',
          'bonus_semen',
          'setiap_pembelian',
          'wisata',
          'setiap_pembelian1',
          'point_reward',
          'setiap_pembelian2',
          'voucher',
          'setiap_pembelian3',
          'potongan_harga',
          'setiap_pembelian4',
          'lain_lain',
          'tidak_ada_promosi',
          'id_so',
          'nama_so',
          'id_sm',
          'nama_sm',
          'id_ssm',
          'nama_ssm',
          'id_gsm',
          'nama_gsm',
        ]

        this.exportToExcel(header, filterVal, this.reporting.survey_last_week, 'survey-last-week')
        this.reporting.modalVisibleRegion = false
      }
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
    async openModalDistributor() {
      this.reporting.modalVisibleTSO = true
      this.reporting.identify = 'Distributor'
      this.reporting.body.id_jabatanTSO = null
      this.reporting.body.nama = ''
      await this.getDataTable({
        id_level_hirarki: 40,
      })
    },

    async openModalCustomers() {
      this.reporting.modalVisibleTSO = true
      this.reporting.identify = 'Customers'
      this.reporting.body.id_jabatanTSO = null
      this.reporting.body.nama = ''
      await this.getDataTable({
        id_level_hirarki: 40,
      })
    },

    async openModalReportLastWeek() {
      this.reporting.modalVisibleRegion = true
      this.reporting.identify = 'Report Last Week'
      this.reporting.bodyRegion.id_tso = null
      this.reporting.bodyRegion.nama = ''
      await this.getDataTable({
        id_level_hirarki: 40,
      })
    },

    async openModalReportSurveyLastWeek() {
      this.reporting.modalVisibleRegion = true
      this.reporting.identify = 'Survey Last Week'
      this.reporting.bodyRegion.id_tso = null
      this.reporting.bodyRegion.nama = ''
      await this.getDataTable({
        id_level_hirarki: 40,
      })
    },

    handleTSOChange() {
      const dataSource = [...this.userManagement.users]
      let filterTSO = dataSource.filter(item => item.nama == this.reporting.body.nama)
      this.reporting.body.id_jabatanTSO = filterTSO[0].idJabatan
    },

    handleRegionChange() {
      const dataSource = [...this.userManagement.users]
      let filterTSO = dataSource.filter(item => item.nama == this.reporting.bodyRegion.nama)
      this.reporting.bodyRegion.id_tso = filterTSO[0].idJabatan
    },
  },
}
</script>
<style>
.card-radius {
  border-radius: 10px;
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
@import './style.scss';
</style>
