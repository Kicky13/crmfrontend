<template>
  <div>
    <div v-if="isHidden" class="card card-top card-top-primary" style="height: 50vh"></div>
    <div v-else class="card card-top card-top-primary">
      <div class="card-body p-2">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-3"></div>
          <div class="col-md-3"></div>
          <div class="col-md-3">
            <a-button type="primary" @click="handleRefresh()" class="mb-3 float-right">
              <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
              Refresh
            </a-button>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <iframe
              height="900"
              :src="sowDashboard.dataMetabase"
              frameborder="0"
              style="border:0"
              allowfullscreen
              class="w-100"
            ></iframe>

            <!-- <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/a1720189-80a3-472b-b86d-cab660b975c9/page/oFpoC" frameborder="0" style="border:0" allowfullscreen></iframe> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import { notification, message } from 'ant-design-vue'
import { mapState, mapActions } from 'vuex'
import { _ } from 'vue-underscore'
import VueHighcharts from 'vue3-highcharts'
import Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
More(Highcharts)

export default {
  components: {
    // VueApexCharts,
    // VueHighcharts,
  },
  setup() {
    return {
      // itemsPerPage,
    }
  },
  data: function() {
    return {
      isHidden: false,
      link: '',
      Highcharts,
      //fungsi menampilkan google map
      ready: false,
      fallbackProcedure: 'gps', //gps | geolocation | address | manually
      zoom: 17, //Default Zoom
      geolocation: {
        // If GPS and Find by address fails then, map will be positioned by a default geolocation
        lat: 31.73858,
        lng: -35.98628,
        zoom: 2,
      },
      address: {
        query: 'Albania, Tirane', //If GPS fails, Find by address is triggered
        zoom: 10,
      },
      manually: {
        address_description: '21 Dhjetori, Tirana, Albania',
        city: 'Tirana',
        country: 'Albania',
        lat: 41.3267905,
        lng: 19.8060475,
        state: 'Tirana County',
        zip_code: '',
        zoom: 17,
      },
      place: {},

      //fungsi menampilkan chart
      chartOptions: {
        chart: {
          width: '400',
          type: 'pie',
        },
        legend: {
          position: 'bottom',
        },
        series: [100],
        labels: ['Default'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },

      chartOptions_area: {
        chart: {
          height: 350,
          type: 'bubble',
          zoom: {
            enabled: true,
            type: 'xy',
          },
        },
        series: [
          {
            name: 'Bubble1',
            data: {
              min: 10,
              max: 60,
            },
          },
          {
            name: 'Bubble2',
            data: {
              min: 10,
              max: 60,
            },
          },
          {
            name: 'Bubble3',
            data: {
              min: 10,
              max: 60,
            },
          },
          {
            name: 'Bubble4',
            data: {
              min: 10,
              max: 60,
            },
          },
        ],
        xaxis: {
          tickAmount: 10,
          labels: {
            formatter: function(val) {
              return parseFloat(val).toFixed(1)
            },
          },
        },
        yaxis: {
          tickAmount: 7,
        },
      },

      // bubble chart
      chartBubble: {
        chart: {
          type: 'bubble',
          plotBorderWidth: 1,
          zoomType: 'xy',
          height: 320,
        },
        legend: {
          enabled: false,
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '',
        },

        xAxis: {
          gridLineWidth: 1,
          title: {
            text: 'Persentasi SOW',
          },
          labels: {
            format: '{value}',
          },
          plotLines: [
            {
              // color: 'black',
              // dashStyle: 'dot',
              // width: 2,
              // value: 65
              // showInLegend: true,
              // label: {
              //   rotation: 0,
              //   y: 15,
              //   style: {
              //     fontStyle: 'italic',
              //   },
              //   text: 'Safe fat intake 65g/day',
              // },
              // zIndex: 3,
            },
          ],
        },
        yAxis: {
          startOnTick: false,
          endOnTick: false,
          title: {
            text: 'Total Customer',
          },
          labels: {
            format: '{value}',
          },
          maxPadding: 0.2,
          // plotLines: [
          //   {
          //     color: 'black',
          //     dashStyle: 'dot',
          //     width: 2,
          //     value: 50,
          //     // label: {
          //     //   align: 'right',
          //     //   style: {
          //     //     fontStyle: 'italic',
          //     //   },
          //     //   text: 'Safe sugar intake 50g/day',
          //     //   x: -10,
          //     // },
          //     zIndex: 3,
          //   },
          // ],
        },
        tooltip: {
          useHTML: true,
          headerFormat: '<table>',
          pointFormat:
            '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
            '<tr><th>Persentase:</th><td>{point.x}%</td></tr>' +
            '<tr><th>Total Customer:</th><td>{point.y}</td></tr>' +
            '<tr><th>Volume Penjualan:</th><td>{point.z}</td></tr>',
          footerFormat: '</table>',
          followPointer: true,
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
          },
        },

        series: [
          {
            data: [],
          },
        ],
      },

      isLoading: false,
      // srcDataStudio:
      //   'https://datastudio.google.com/embed/reporting/d23218ab-bb90-430e-884b-0f764f5959ec/page/oFpoC',
      srcDataStudio: '',
    }
  },
  computed: {
    ...mapState({
      sowDashboard: state => state.sowDashboard.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2019 }, (value, index) => 2020 + index)
    },
  },
  async mounted() {
    // this.handleRefresh()
    await this.getProvinsi()
    this.urlMap()
    this.handlePagination(5)
    // await this.getMetabaseSOW()
    // await this.submitLabel()
    // await this.getDataTable()
    await this.getData()
  },
  methods: {
    ...mapActions('sowDashboard', [
      'getProvinsi',
      'getListTabel',
      'getArea',
      'getDistrik',
      'getDistributor',
      'getBrand',
      'submitLabel',
      'getDataTable',
      'getDataScatterChart',
      'getDataChart',
      'getMetabaseSOW',
      'getMetabaseSOWTSO',
      'getMetabaseSOWSPC',
      'getMetabaseSOWASM',
      'getMetabaseSOWAdmin',
      'getDataTso',
      'getDataAdminDistributor',
      'getDataDistributor',
      'getDataSpc',
      'getDataAsm',
    ]),
    errorMessageUser(text) {
      this.$swal({
        icon: 'error',
        title: 'Oops...',
        text,
      });
    },

    async handleRefresh() {
      // await this.getMetabaseSOW()
      await this.getData()
      // var params = {
      //   'ds4.regional': ['Regional 4', 'Regional 3'],
      // }
      // var paramsAsString = JSON.stringify(params)
      // var encodedParams = encodeURIComponent(paramsAsString)
      // this.srcDataStudio =
      //   'https://datastudio.google.com/embed/reporting/a1720189-80a3-472b-b86d-cab660b975c9/page/oFpoC?params=' +
      //   encodedParams

      // console.log(`---srcDataStudio`, this.srcDataStudio)
    },

    async getData() {
      const userData = JSON.parse(localStorage.getItem('userData'))
      const roleUser = userData.role

      switch (roleUser) {
        case 'TSO':
          await this.getDataTso({
            id: userData.userid,
          })

          await this.getMetabaseSOWTSO({
            pregion: this.sowDashboard.getDataTsoResult.pregion,
          })

          if (!this.sowDashboard.getDataTsoResult.status) {
            this.errorMessageUser('TSO belum dimapping ke Distrik')
            this.isHidden = true
          }
        break
        case 'SPC':
          await this.getDataSpc({
            id: userData.userid,
          })

          await this.getMetabaseSOWSPC({
            pregion: this.sowDashboard.getDataSpcResult.pregion,
          })

          if (!this.sowDashboard.getDataSpcResult.status) {
            this.errorMessageUser('SPC belum dimapping ke Region')
            this.isHidden = true
          }
        break
        case 'ASM':
          await this.getDataAsm({
            id: userData.userid,
          })

          await this.getMetabaseSOWASM({
            pregion: this.sowDashboard.getDataAsmResult.pregion,
          })

          if (!this.sowDashboard.getDataAsmResult.status) {
            this.errorMessageUser('ASM belum dimapping ke TSO')
            this.isHidden = true
          }
        break

        case 'Admin Dist':
          await this.getDataAdminDistributor({
            id: userData.userid,
          })

          await this.getDataDistributor({
            id: this.sowDashboard.getDataAdminDistributorResult.id_distributor,
          })

          await this.getMetabaseSOW({
            pdistrik: this.sowDashboard.getDataDistributorResult.pdistrik,
            pdistributor: this.sowDashboard.getDataDistributorResult.pdistributor,
          })

          // await this.getMetabaseSOWAdmin({
          //   pdistrik: [],
          //   pdistributor: [],
          // })

          if (!this.sowDashboard.getDataDistributorResult.status) {
            this.errorMessageUser('Distributor belum dimapping ke toko')
            this.isHidden = true
          }
        break
        case 'Admin':
          await this.getMetabaseSOWAdmin({
            pdistrik: [],
            pdistributor: [],
          })
          break
        default:
        // await this.getMetabaseSOW({
        //   pdistrik: [],
        //   pdistributor: [],
        // })
      }
    },

    tableRowClassName(text) {
      if (text.sow > '100%') {
        return 'non-active'
      } else {
        return ''
      }
    },
    handlePagination(size) {
      this.sowDashboard.pagination.pageSize = size
    },
    urlMap() {
      // let lat =
      //   this.koordinatLock.dataDetailHistory.latitude === null ? 0 : this.detail_visit.latitude
      // let long =
      //   this.koordinatLock.dataDetailHistory.longitude === null
      //     ? 0
      //     : this.detail_visit.latitude.longitude
      let keyApi = `AIzaSyD89e9RP1mKfBHWE16auSGPJOUoJ1oxMSI`
      this.link =
        `https://www.google.com/maps/embed/v1/view?key=` +
        keyApi +
        `&center=` +
        `&zoom=18&maptype=satellite`
    },
    getMapData(place) {
      this.place = place
    },
    async handleArea() {
      let dataSource = [...this.sowDashboard.dataProvinsi]
      let filtered = dataSource.filter(
        x => x.nama_provinsi == this.sowDashboard.formData.selectedProvinsi,
      )
      this.sowDashboard.formData.id_provinsi = filtered[0].id_provinsi

      await this.getArea({
        provinsi_id: this.sowDashboard.formData.id_provinsi,
      })
    },

    handleDistrik(value) {
      const id = value
      this.getDistrik(id)
    },
    handleDistributor() {
      let dataSource = [...this.sowDashboard.dataDistrik]
      let filtered = dataSource.filter(
        x => x.nama_distrik == this.sowDashboard.formData.selectedDistrik,
      )
      this.sowDashboard.formData.id_distrik = filtered[0].id_distrik
      this.getDistributor({
        distrik_id: this.sowDashboard.formData.id_distrik,
      })
    },
    handleBrand(value) {
      const id = value
      this.getBrand(id)
    },
    searchToko(keyword) {
      this.sowDashboard.isLoading = true

      if (keyword) {
        let data = this.sowDashboard.dataTable.filter(dataSource =>
          dataSource.nm_customer.toLowerCase().includes(keyword.toLowerCase()),
        )

        if (data.length > 0) {
          setTimeout(() => {
            this.sowDashboard.dataTable = data
            this.sowDashboard.isLoading = false
          }, 500)

          return false
        }
      } else {
        setTimeout(() => {
          this.sowDashboard.dataTable = this.sowDashboard.dataTableSearch
          this.sowDashboard.isLoading = false
        }, 500)
      }
    },
    async handleOk() {
      if (
        this.sowDashboard.formData.selectedProvinsi == null &&
        this.sowDashboard.selectedArea == null &&
        this.sowDashboard.selectedMonth == null &&
        this.sowDashboard.selectedYear == null
      ) {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Provinsi, Area , Bulan dan Tahun tidak boleh kosong.',
        })
      } else {
        // post data submit all label
        await this.submitLabel({
          provinsi_id: this.sowDashboard.formData.id_provinsi,
          distrik_id: this.sowDashboard.formData.id_distrik,
        })

        // get data chart pie
        await this.getDataChart({
          provinsi_id: this.sowDashboard.formData.id_provinsi,
          distrik_id: this.sowDashboard.formData.id_distrik,
        })
        if (this.sowDashboard.statusPie == 'sukses') {
          let labelName = []
          let presentaseData = []
          this.sowDashboard.chartDashboard.forEach(element => {
            presentaseData.push(element.persentase_data)
            labelName.push(element.nama)
          })

          let dataLabel = _.filter(labelName, function(x) {
            return x != null
          })
          let dataPersentase = _.filter(presentaseData, function(x) {
            return x != 0
          })

          this.chartOptions.series = dataPersentase
          this.chartOptions.labels = dataLabel
        }

        // get data bubble chart
        await this.getDataScatterChart({
          provinsi_id: this.sowDashboard.formData.id_provinsi,
          distrik_id: this.sowDashboard.formData.id_distrik,
        })

        if (this.sowDashboard.statusScatter == 'sukses') {
          let persentaseWithColor = []

          this.sowDashboard.scatterChart.data.forEach(element => {
            persentaseWithColor.push({
              name: element.name,
              x: element.x,
              y: element.y,
              z: element.z,
              color: '#' + Math.floor(Math.random() * 16777215).toString(16),
            })
          })
          // console.log(`-this.sowDashboard.scatterChart`, persentaseWithColor)
          // console.log(`this.sowDashboard.scatterChart`, this.sowDashboard.scatterChart)

          this.chartBubble.series[0].data = persentaseWithColor

          console.log(` this.chartBubble.series.data`, this.chartBubble.series[0])
        }

        // get data table
        await this.getDataTable({
          provinsi_id: this.sowDashboard.formData.id_provinsi,
          distrik_id: this.sowDashboard.formData.id_distrik,
        })
      }
    },
  },
}
</script>

<style>
.style_donut {
  height: 350px;
}

.style_area {
  height: 350px;
}

.list_download {
  width: 100%;
  background-color: white;

  height: auto;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0px 12px 21px -14px rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 0px 12px 21px -14px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 12px 21px -14px rgba(0, 0, 0, 0.16);
}
.table-sow .ant-table-tbody .non-active td {
  background-color: red !important;
  color: white;
}
.style_icon {
  font-size: 30px;
}
</style>
<style lang="scss" scoped>
@import '@/assets/scss/Dashboard/Sow/index.scss';
</style>
