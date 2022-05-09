<template>
  <div>
    <a-form :model="salesRoute.formData" label-align="left" layout="vertical">
      <div class="row">
        <div class="col-md-10">
          <div class="row">
            <div class="col-xs-4 col-md-4">
              <a-form-item>
                <a-select
                  class="col-lg-12 col-md-12 pr-2"
                  style="width: 100% !important"
                  placeholder="Distrik"
                  v-model:value="salesRoute.formData.selectedDistrik"
                  show-search
                  @change="handleDistributor"
                >
                  <a-select-option disabled value="">Pilih Distrik</a-select-option>

                  <a-select-option
                    v-for="(distrik, index) in salesRoute.dataDistrik"
                    :key="index"
                    :value="distrik.nama_distrik"
                  >
                    {{ distrik.id_distrik }} - {{ distrik.nama_distrik }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xs-3 col-md-3">
              <a-form-item>
                <a-select
                  class="col-lg-12 col-md-12 pr-2"
                  style="width: 100% !important"
                  placeholder="Distributor"
                  v-model:value="salesRoute.formData.selectedDistributor"
                  show-search
                  @change="handleSales"
                >
                  <a-select-option disabled value="">Pilih Distributor</a-select-option>

                  <a-select-option
                    v-for="(distributor, index) in salesRoute.dataDistributor"
                    :key="index"
                    :value="distributor.nama_distributor"
                    >{{ distributor.nama_distributor }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xs-3 col-md-3">
              <a-form-item>
                <a-select
                  class="col-lg-12 col-md-12 pr-2"
                  style="width: 100% !important"
                  placeholder="Sales"
                  v-model:value="salesRoute.formData.selectedSalesman"
                  show-search
                >
                  <a-select-option disabled value="">Pilih Salesman</a-select-option>
                  <a-select-option disabled v-if="salesRoute.dataSalesman.length == 0"
                    >Sales Tidak Tersedia</a-select-option
                  >

                  <a-select-option
                    v-else
                    data-toggle="tooltip"
                    data-placement="top"
                    v-for="(item, index) in salesRoute.dataSalesman"
                    :key="`index_${index}`"
                    :title="item.nama_sales"
                    :value="item.id_sales"
                    >{{ item.id_sales }} - {{ item.nama_sales }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </div>
            <div class="col-xs-2 col-md-2">
              <a-form-item>
                <a-date-picker
                  format="YYYY-MM-DD"
                  v-model:value="salesRoute.formData.selectedDate"
                  class="w-100"
                />
              </a-form-item>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <a-button
            :disabled="
              salesRoute.formData.selectedDistrik != `` &&
              salesRoute.formData.selectedDistributor != `` &&
              salesRoute.formData.selectedSalesman != `` &&
              salesRoute.formData.selectedDate != ``
                ? false
                : true
            "
            type="primary"
            class="mb-3 w-100"
            @click="handleOk()"
          >
            <i class="fa fa-eye mr-2" />
            Tampilkan
          </a-button>
        </div>
      </div>
    </a-form>
    <div class="row">
      <div class="col-md-12">
        <div class="card card-top card-top-primary mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="mapouter">
                  <div class="gmap_canvas">
                    <GMapMap
                      ref="myMarker"
                      :center="{ lat: latMap, lng: lngMap }"
                      :zoom="zoomMap"
                      map-type-id="terrain"
                      style="width: 100%; height: 500px"
                    >
                      <GMapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        @click="openInfoWindow(marker.id)"
                        :clickable="true"
                      />

                      <GMapPolygon :paths="paths" />
                    </GMapMap>
                    <!-- <iframe
                      class="w-100"
                      height="500"
                      id="gmap_canvas"
                      :src="link"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                    >
                    </iframe>
                    <a href="https://fmovies-online.net" />
                    <a href="https://www.embedgooglemap.net"></a> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card card-top card-top-primary mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <iframe
                  :src="linkStreetView"
                  width="454"
                  height="294"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card card-top card-top-primary mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div v-if="itemRadio == ''">
                  <a-carousel :after-change="onChange" arrows>
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

                <div v-else>
                  <div v-if="itemRadio.image.length == 0">
                    <a-carousel :after-change="onChange" arrows>
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
                  <div v-else>
                    <a-carousel :after-change="onChange" arrows>
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

                      <div v-for="(item, index) in itemRadio.image" :key="`index_${index}`">
                        <img :src="item.src" class="img-fluid w-100" style="height:180px;" />
                      </div>
                    </a-carousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-7 col-sm-7">
        <div class="card card-top card-top-primary mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <label for="" class="font-weight-bold text-black">Toko Sudah Dikunjungi</label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <div class="d-flex justify-content-between mb-3">
                  <div class="d-flex mb-2">
                    <div class="align-self-center">
                      <span>Show :</span>
                    </div>
                    <a-select
                      :default-value="salesRoute.itemsPerPage[0]"
                      class="mx-2"
                      @change="handlePagination"
                    >
                      <a-select-option
                        v-for="itemPerPage in salesRoute.itemsPerPage"
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
                    :data-source="salesRoute.detailVisit"
                    :row-key="data => data.id_toko"
                    :columns="salesRoute.columns"
                    :loading="salesRoute.isLoading"
                    :pagination="salesRoute.pagination"
                  >
                    <template #radio="{ text }">
                      <a-radio-group v-model:value="itemRadio" @change="onChange">
                        <a-radio :style="radioStyle" :value="text"> </a-radio>
                      </a-radio-group>
                    </template>
                    <template #distrik="{ text }">
                      <div>
                        {{ text.distrik_name }}
                      </div>
                    </template>
                    <template #id_toko="{ text }">
                      <div>
                        {{ text.id_toko }}
                      </div>
                    </template>
                    <template #toko="{ text }">
                      <div>
                        {{ text.nama_toko }}
                      </div>
                    </template>
                    <template #sales="{ text }">
                      <div>
                        {{ text.sales_name }}
                      </div>
                    </template>
                    <template #tanggal="{ text }">
                      <div>
                        {{ text.tanggal }}
                      </div>
                    </template>
                    <template #check_in="{ text }">
                      <div>
                        {{ text.check_in }}
                      </div>
                    </template>
                    <template #check_out="{ text }">
                      <div>
                        {{ text.check_out }}
                      </div>
                    </template>
                    <template #durasi_visit="{ text }">
                      <div>
                        {{ text.durasi_visit }}
                      </div>
                    </template>
                    <template #jarak_check="{ text }">
                      <div>
                        {{ text.jarak_check }}
                      </div>
                    </template>
                    <template #perjalanan="{ text }">
                      <div>
                        {{ text.perjalanan }}
                      </div>
                    </template>
                    <template #plan="{ text }">
                      <div>
                        {{ text.plan }}
                      </div>
                    </template>
                  </a-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-sm-5">
        <div class="card card-top card-top-primary mt-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <label for="" class="font-weight-bold text-black">Toko Belum Dikunjungi</label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-sm-12">
                <div class="d-flex justify-content-between mb-3">
                  <div class="d-flex mb-2">
                    <div class="align-self-center">
                      <span>Show :</span>
                    </div>
                    <a-select
                      :default-value="salesRoute.itemsPerPage[0]"
                      class="mx-2"
                      @change="handlePaginationToko"
                    >
                      <a-select-option
                        v-for="itemPerPage in salesRoute.itemsPerPage"
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
                    :data-source="salesRoute.detailMerchant"
                    :row-class-name="tableRowClassName"
                    :row-key="data => data.id_toko"
                    :columns="salesRoute.columns2"
                    :loading="salesRoute.isLoading2"
                    :pagination="salesRoute.paginationToko"
                  >
                    <template #kode_toko="{ text }">
                      <div>
                        {{ text.id_toko_belum_dikunjungi }}
                      </div>
                    </template>
                    <template #toko="{ text }">
                      <div>
                        {{ text.toko_belum_dikunjungi }}
                      </div>
                    </template>
                  </a-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
import { mapState, mapActions } from 'vuex'
import { _ } from 'vue-underscore'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'

export default {
  components: {
    LeftCircleOutlined,
    RightCircleOutlined,
  },
  data() {
    return {
      map: null,
      link: '',
      linkStreetView: '',
      itemRadio: '',
      latStreetView: -7.1688477,
      lngStreetView: 112.6451559,
      latMap: -7.1688477,
      lngMap: 112.6451559,
      zoomMap: 5,
      markers: [
        // {
        //   position: {
        //     lat: -6.2,
        //     lng: 106.816666,
        //   },
        // },
        // {
        //   position: {
        //     lat: -5.2,
        //     lng: 106.816666,
        //   },
        // },
      ],
      paths: [
        // { lat: -6.8145803, lng: 107.2264134 },
        // { lat: -6.7136721, lng: 107.2167302 },
      ],
    }
  },
  computed: {
    ...mapState({
      salesRoute: state => state.salesRoute.data,
    }),
  },
  async mounted() {
    // this.urlMap()
    this.urlStreetView()

    await this.getDistrik()
    this.handlePagination(5)
    this.handlePaginationToko(5)

    // Map
    this.map = L.map('mapContainer').setView([5, 120], 5)
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map)
    //use a mix of renderers
    var customPane = this.map.createPane('customPane')
    var canvasRenderer = L.canvas({ pane: 'customPane' })
    customPane.style.zIndex = 399 // put just behind the standard overlay pane which is at 400
    // L.marker([50, 14]).addTo(this.map)

    // L.marker([53, 20]).addTo(this.map)
    // L.marker([49.5, 19.5]).addTo(this.map)
    // L.marker([49, 25]).addTo(this.map)
    // L.marker([-10, 25]).addTo(this.map)
    // L.marker([10, -25]).addTo(this.map)
    // L.marker([0, 0]).addTo(this.map)

    // var pathOne = L.curve(['M', [50, 14], 'Q', [53, 20], [49, 25]], {
    //   renderer: canvasRenderer,
    // }).addTo(this.map)
    // L.curve(['M', [50, 14], 'Q', [52, 20], [49, 25]], {
    //   renderer: canvasRenderer,
    // }).addTo(this.map)
    // L.curve(['M', [50, 14], 'Q', [51, 20], [49, 25]], {
    //   renderer: canvasRenderer,
    // }).addTo(this.map)
    // L.curve(['M', [50, 14], 'Q', [50, 20], [49, 25]], {
    //   renderer: canvasRenderer,
    // }).addTo(this.map)
    // L.curve(['M', [50, 14], 'Q', [47, 20], [49, 25]], {
    //   renderer: canvasRenderer,
    // }).addTo(this.map)
  },
  onBeforeUnmount() {
    if (this.map) {
      this.map.remove()
    }
  },
  methods: {
    ...mapActions('salesRoute', [
      'getMerchantSurvey',
      'getDetailVisit',
      'getSalesman',
      'getDistrik',
      'getDistributor',
      'getMap',
    ]),

    // urlMap() {
    //   // https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly
    //   let lat = -0.789275
    //   let long = 113.921327
    //   let keyApi = `AIzaSyDTKJswQQoh-7vtUlz8FQUixHXUQncOV8c`
    //   this.link =
    //     `https://www.google.com/maps/embed/v1/view?key=` +
    //     keyApi +
    //     `&center=` +
    //     lat +
    //     `,` +
    //     long +
    //     `&zoom=5&maptype=satellite`
    // },
    urlStreetView() {
      // let lat = -7.1688477
      // let long = 112.6451559
      let keyApi = `AIzaSyDTKJswQQoh-7vtUlz8FQUixHXUQncOV8c`
      this.linkStreetView =
        `https://www.google.com/maps/embed/v1/streetview?location=` +
        this.latStreetView +
        `,` +
        this.lngStreetView +
        `&fov=80&heading=70&pitch=0&key=` +
        keyApi
    },
    myRowClickHandler(record, index) {
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      log(record) // This will be the item data for the row
    },
    async handleDistributor() {
      let dataSource = [...this.salesRoute.dataDistrik]
      let filtered = dataSource.filter(
        x => x.nama_distrik == this.salesRoute.formData.selectedDistrik,
      )

      this.salesRoute.formData.id_distrik = filtered[0].id_distrik

      await this.getDistributor()
    },
    async handleSales() {
      let dataSource = [...this.salesRoute.dataDistributor]
      let filtered = dataSource.filter(
        x => x.nama_distributor == this.salesRoute.formData.selectedDistributor,
      )

      this.salesRoute.formData.id_distributor = filtered[0].id_distributor
      await this.getSalesman({
        id_distributor: this.salesRoute.formData.id_distributor,
      })
    },
    getMapData(place) {
      this.place = place
    },

    handlePagination(size) {
      this.salesRoute.pagination.pageSize = size
    },
    handlePaginationToko(size) {
      this.salesRoute.paginationToko.pageSize = size
    },
    async handleOk() {
      if (
        this.salesRoute.formData.selectedDistrik == '' &&
        this.salesRoute.formData.selectedDate == ''
      ) {
        notification.error({
          message: 'Gagal Menyimpan',
          description: 'Distrik dan Tanggal tidak boleh kosong.',
        })
      } else {
        await this.getDetailVisit()
        await this.getMerchantSurvey()
        await this.getMap()
        await this.markerMap()
      }
    },

    markerMap() {
      let LatLng = this.salesRoute.dataMap
      LatLng.forEach(element => {
        this.markers.push({
          position: {
            lat: parseFloat(element.lattitude),
            lng: parseFloat(element.longitude),
          },
        })
      })

      LatLng.forEach(element => {
        this.paths.push({
          lat: parseFloat(element.lattitude),
          lng: parseFloat(element.longitude),
        })
      })

      // this.paths.push()

      this.latMap = parseFloat(LatLng[0].lattitude)
      this.lngMap = parseFloat(LatLng[0].longitude)
      this.zoomMap = 12
      // this.paths.push({ lat: -6.2, lng: 106.816666 }, { lat: -5.2, lng: 106.816666 })

      console.log(`-----LatLng[0]`, LatLng[0])
      console.log(`-----path1`, this.paths)
    },

    onChange(value) {
      this.latStreetView = parseFloat(this.itemRadio.latitude)
      this.lngStreetView = parseFloat(this.itemRadio.longitude)
      this.urlStreetView()
    },
  },
}
</script>

<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 300px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

#mapContainer {
  width: 100%;
  height: 60vh;
  z-index: 0 !important;
}
</style>
