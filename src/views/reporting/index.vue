<template>
  <div>
    <div class="card card-radius">
      <div class="card-header bg-primary text-white header_report"></div>
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
        <div class="list_download d-flex">
          <div class="list_download_information">
            Download Hasil Survey (7 Hari Terakhir)
          </div>
          <div class="list_download_icon ml-auto">
            <i class="fa fa-download" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>

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
        <label for="exampleFormControlInput1" class="font-weight-bold text-black"
          >Pilih Region</label
        >
        <br />
        <a-select
          placeholder="Pilih Region"
          v-model:value="reporting.bodyRegion.nama"
          @change="handleRegionChange"
          class="w-100"
          show-search
        >
          <a-select-option
            v-for="data in reporting.daftar_region"
            :key="data.idRegion"
            :value="data.namaRegion"
            >{{ data.idRegion }} - {{ data.namaRegion }}</a-select-option
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
    await this.getHirarkiInternal()
    await this.getListAllRegion()
  },
  methods: {
    ...mapActions('reporting', [
      'getHirarkiInternal',
      'getTsoDistrik',
      'getDownloadTokoDist',
      'getDownloadCustomers',
      'getListAllRegion',
    ]),
    ...mapActions('userManagement', ['getDataTable']),
    async hirarkiInternalDownload() {
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

      //   const list = [
      //     // {
      //     //   idJabatan: element.idJabatan,
      //     //   // namaJabatan: 'ASM Distrik 1',
      //     //   // jenisUser: 'ASM',
      //     //   // idUser: 8273,
      //     //   // namaUser: 'Kikik',
      //     //   // username: 'kikik13',
      //     //   // tglMulai: '12/02/2021',
      //     //   // tglAkhir: '10/12/2022',
      //     //   // idJabatanAtasan: 72367,
      //     //   // jabatanAtasan: 'GSM Region 1',
      //     //   // namaAtasan: 'Nidhom',
      //     //   // tglMulaiAtasan: '12/02/2021',
      //     //   // tglAkhirAtasan: '10/12/2022',
      //     // },
      //   ]

      this.exportToExcel(
        header,
        filterVal,
        this.reporting.listHirarkiInternal,
        'master-mapping-hirarki-internal',
      )
    },
    async tsoDistrikDownload() {
      await this.getTsoDistrik()
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
      ]
      // const list = [
      //   {
      //     idTso: 5666,
      //     usernameTso: 'kiki22',
      //     namaTso: 'Kiki',
      //     idJabatan: 8237,
      //     namaJabatan: 'TSO 1',
      //     startJabatan: '12/02/2021',
      //     endJabatan: '12/02/2022',
      //     idDistrik: 2811,
      //     namaDistrik: 'Kabupaten Gresik',
      //     startDistrik: '12/02/2021',
      //     endDistrik: '12/02/2022',
      //   },
      //   {
      //     idTso: 5666,
      //     usernameTso: 'kiki22',
      //     namaTso: 'Kiki',
      //     idJabatan: 8237,
      //     namaJabatan: 'TSO 1',
      //     startJabatan: '12/02/2021',
      //     endJabatan: '12/02/2022',
      //     idDistrik: 3531,
      //     namaDistrik: 'Kabupaten Pasuruan',
      //     startDistrik: '12/02/2021',
      //     endDistrik: '12/02/2022',
      //   },
      //   {
      //     idTso: 5667,
      //     usernameTso: 'umam99',
      //     namaTso: 'Umam',
      //     idJabatan: 7887,
      //     namaJabatan: 'TSO 5',
      //     startJabatan: '12/02/2021',
      //     endJabatan: '12/02/2022',
      //     idDistrik: 8988,
      //     namaDistrik: 'Kabupaten Probolinggo',
      //     startDistrik: '12/02/2021',
      //     endDistrik: '12/02/2022',
      //   },
      // ]
      this.exportToExcel(header, filterVal, this.reporting.listTsoDistrik, 'mapping-tso-distrik')
    },
    async tokoDistributorDownload() {
      await this.getDownloadTokoDist({
        id_jabatanTSO: this.reporting.body.id_jabatanTSO,
      })

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
      // const list = [
      //   {
      //     idToko: 1000292,
      //     namaToko: 'UD. SUBUR',
      //     idDistributor: 10092238,
      //     namaDistributor: 'PT. Bersinar',
      //     idDistrik: 29391,
      //     namaDistrik: 'Kabupaten Gresik',
      //   },
      //   {
      //     idToko: 1000777,
      //     namaToko: 'UD. JAWA MAKMUR',
      //     idDistributor: 88819,
      //     namaDistributor: 'PT. Bersinar',
      //     idDistrik: 29391,
      //     namaDistrik: 'Kabupaten Gresik',
      //   },
      //   {
      //     idToko: 10008191,
      //     namaToko: 'UD. KALIMANTAN',
      //     idDistributor: 12192,
      //     namaDistributor: 'PT. Randuagung',
      //     idDistrik: 72717,
      //     namaDistrik: 'Kabupaten Probolinggo',
      //   },
      // ]
      this.exportToExcel(
        header,
        filterVal,
        this.reporting.listDownloadTokoDist,
        'mapping-toko-distributor',
      )
    },
    async customerSalesDownload() {
      await this.getDownloadCustomers({
        id_jabatanTSO: this.reporting.body.id_jabatanTSO,
      })

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
      // const list = [
      //   {
      //     idSales: 7272,
      //     namaSales: 'Kiki',
      //     usernameSales: 'kikik11',
      //     idJabatanSales: 72732,
      //     jabatanSales: 'MHJ.182.1H1',
      //     startJabatan: '12/05/2021',
      //     endJabatan: '12/05/2023',
      //     idDistributor: 6267,
      //     namaDistributor: 'PT. Selalu Bahagia',
      //     kodeToko: 2123,
      //     namaToko: 'Toko Bangunan, TK',
      //     sun: 'N',
      //     mon: 'N',
      //     tue: 'Y',
      //     wed: 'Y',
      //     thu: 'N',
      //     fri: 'Y',
      //     sat: 'N',
      //     w1: 'N',
      //     w2: 'N',
      //     w3: 'Y',
      //     w4: 'Y',
      //     w5: 'Y',
      //   },
      //   {
      //     idSales: 5673,
      //     namaSales: 'Fauzan',
      //     usernameSales: 'fauzan',
      //     idJabatanSales: 3828,
      //     jabatanSales: 'MHJ.182.22Y',
      //     startJabatan: '12/05/2021',
      //     endJabatan: '12/05/2023',
      //     idDistributor: 89182,
      //     namaDistributor: 'PT. Bangun Karya',
      //     kodeToko: 83829,
      //     namaToko: 'Kokoh, TK',
      //     sun: 'N',
      //     mon: 'N',
      //     tue: 'Y',
      //     wed: 'Y',
      //     thu: 'N',
      //     fri: 'Y',
      //     sat: 'N',
      //     w1: 'N',
      //     w2: 'N',
      //     w3: 'Y',
      //     w4: 'Y',
      //     w5: 'Y',
      //   },
      // ]
      this.exportToExcel(
        header,
        filterVal,
        this.reporting.listDownloadCustomers,
        'mapping-customer-sales',
      )
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

      await this.getDataTable({
        id_level_hirarki: 40,
      })
    },

    async openModalCustomers() {
      this.reporting.modalVisibleTSO = true
      this.reporting.identify = 'Customers'

      await this.getDataTable({
        id_level_hirarki: 40,
      })
    },

    async openModalReportLastWeek() {
      this.reporting.modalVisibleRegion = true
      this.reporting.identify = 'Report Last Week'
    },

    handleTSOChange() {
      const dataSource = [...this.userManagement.users]
      let filterTSO = dataSource.filter(item => item.nama == this.reporting.body.nama)
      this.reporting.body.id_jabatanTSO = filterTSO[0].idJabatan
    },

    handleRegionChange() {},
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
