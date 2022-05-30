<template>
  <div>
    <a-form :model="salesRoute.formData" label-align="left" layout="vertical">
      <div class="row">
        <div class="col-md-10">
          <div class="row">
            <div
              class="col-xs-4 col-md-4"
              v-if="$store.state.user.levelHirarki.toLowerCase() != `admin dis`"
            >
              <a-form-item>
                <a-select
                  class="col-lg-12 col-md-12 pr-2"
                  style="width: 100% !important"
                  placeholder="Distrik"
                  v-model:value="salesRoute.formData.selectedDistrik"
                  show-search
                  @change="handleDistributor"
                >
                  <a-select-option disabled value="">{{
                    salesRoute.dataDistrik && salesRoute.dataDistrik.length > 0
                      ? `Pilih distrik`
                      : 'Data distrik tidak tersedia'
                  }}</a-select-option>

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
            <div
              class="col-xs-3 col-md-3"
              v-if="
                $store.state.user.levelHirarki.toLowerCase() == `tso` ||
                  $store.state.user.levelHirarki.toLowerCase() == ``
              "
            >
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
                    :title="item.id_sales + ` - ` + item.nama_sales + ` - ` + item.username"
                    :value="item.id_sales"
                    >{{ item.id_sales }} - {{ item.nama_sales }} -
                    {{ item.username }}</a-select-option
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
              salesRoute.formData.selectedDistrik != `` ||
              salesRoute.formData.selectedSalesman != `` ||
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
        <a-card :loading="loading" class="card card-top card-top-primary mt-3">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-md-12">
                <div class="mapouter">
                  <div class="gmap_canvas">
                    <GMapMap
                      ref="myMarker"
                      :center="{ lat: latMap, lng: lngMap }"
                      :zoom="zoomMap"
                      map-type-id="roadmap"
                      style="width: 100%; height: 500px"
                    >
                      <!-- toko sudah dikunjungi -->
                      <GMapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :icon="{
                          url:
                            'https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/344/external-store-supermarket-flatart-icons-lineal-color-flatarticons.png',
                          scaledSize: { width: 40, height: 40 },
                          labelOrigin: { x: 16, y: -10 },
                        }"
                        :clickable="true"
                        :draggable="false"
                        @click="openMarker(index)"
                      >
                        <GMapInfoWindow
                          :closeclick="true"
                          @closeclick="openMarker(null)"
                          :opened="openedMarkerID === index"
                        >
                          <div class="text-black font-weight-bold">
                            KUNJUNGAN TOKO KE {{ index + 1 }}
                          </div>
                          <div>{{ m.position.nama_toko.toUpperCase() }}</div>
                          <div>{{ m.position.sales_name.toUpperCase() }}</div>
                          <div>{{ m.position.distrik_name.toUpperCase() }}</div>
                          <div>{{ m.position.status.toUpperCase() }}</div>
                        </GMapInfoWindow>
                      </GMapMarker>
                      <!-- sales -->
                      <GMapMarker
                        :key="index"
                        v-for="(m, index) in markersPeople"
                        :position="m.position"
                        :icon="{
                          url: 'https://img.icons8.com/doodle/2x/standing-man.png',
                          scaledSize: { width: 40, height: 40 },
                          labelOrigin: { x: 16, y: -10 },
                        }"
                        :clickable="true"
                        :draggable="false"
                      />
                      <!-- toko belum dikunjungi -->
                      <GMapMarker
                        :key="index"
                        v-for="(m, index) in markersNotVisited"
                        :position="m.position"
                        :icon="{
                          url:
                            'https://img.icons8.com/external-wanicon-lineal-color-wanicon/344/external-store-user-interface-wanicon-lineal-color-wanicon.png',
                          scaledSize: { width: 30, height: 30 },
                          labelOrigin: { x: 16, y: -10 },
                        }"
                        :clickable="true"
                        :draggable="false"
                        @click="openMarker(m.id)"
                      >
                        <GMapInfoWindow
                          :closeclick="true"
                          @closeclick="openMarker(null)"
                          :opened="openedMarkerID === m.id"
                        >
                          <div>{{ m.position.nama_toko.toUpperCase() }}</div>
                          <div>{{ m.position.sales_name.toUpperCase() }}</div>
                          <div>{{ m.position.distrik_name.toUpperCase() }}</div>
                          <div>{{ m.position.status.toUpperCase() }}</div>
                        </GMapInfoWindow>
                      </GMapMarker>
                      <GMapPolyline :path="path" ref="polyline" />
                    </GMapMap>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-3 text-center">
                <img
                  class="img-fluid"
                  width="45"
                  height="45"
                  src="https://img.icons8.com/doodle/2x/standing-man.png"
                  alt=""
                  loading="lazy"
                />
                <br />
                <label for=""> Lokasi Check-In(Sales) </label>
              </div>
              <div class="col-md-3 text-center">
                <img
                  class="img-fluid"
                  width="45"
                  height="45"
                  src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/344/external-store-supermarket-flatart-icons-lineal-color-flatarticons.png"
                  alt=""
                  loading="lazy"
                />
                <br />
                <label for="">Lokasi Toko Sudah Dikunjungi</label>
              </div>
              <div class="col-md-3 text-center">
                <img
                  class="img-fluid"
                  width="45"
                  height="45"
                  src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/344/external-store-user-interface-wanicon-lineal-color-wanicon.png"
                  alt=""
                  loading="lazy"
                />
                <br />
                <label for="">Lokasi Toko Belum Dikunjungi</label>
              </div>
              <div class="col-md-3 text-center ">
                <img
                  class="img-fluid"
                  width="45"
                  height="45"
                  src="https://img.icons8.com/ios-filled/344/horizontal-line.png"
                  alt=""
                  loading="lazy"
                />
                <br />
                <label for=""> Rute Toko ke Toko Lain</label>
              </div>
            </div>
          </div>
        </a-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <a-card :loading="loading" class="card card-top card-top-primary mt-3">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-md-12">
                <iframe
                  :src="linkStreetView"
                  class="w-100"
                  height="294"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </a-card>
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
      <div class="col-md-12 col-sm-12">
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
                        {{ text.jarak_check + ` Meter` }}
                      </div>
                    </template>
                    <template #perjalanan="{ text }">
                      <div>
                        {{ text.perjalanan }}
                      </div>
                    </template>
                    <template #plan="{ text }">
                      <div>
                        {{ text.plan == 0 ? 'Unplan Visit' : 'Plan Visi' }}
                      </div>
                    </template>
                  </a-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 col-sm-8">
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
                    <template #keterangan="{ text }">
                      <div>
                        {{ text.alasan == '' ? 'Tidak ada keterangan' : text.alasan }}
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
      loading: false,
      linkStreetView: '',
      itemRadio: '',
      latStreetView: -7.1688477,
      lngStreetView: 112.6451559,
      latMap: -7.1688477,
      lngMap: 112.6451559,
      zoomMap: 5,
      markers: [],
      markersPeople: [],
      markersNotVisited: [],
      path: null,
      openedMarkerID: null,
      infoWindow: {
        position: { lat: 0, lng: 0 },
        open: false,
        template: '',
      },
    }
  },
  computed: {
    ...mapState({
      salesRoute: state => state.salesRoute.data,
    }),
  },
  async mounted() {
    this.urlStreetView()
    this.refreshData()
    // validisi perbedaan role untuk tampilan TSO, ADMIN DAN DISTRIBUTOR
    this.$store.state.user.levelHirarki.toLowerCase() == `tso`
      ? await this.getDistrik({
          idLevelHirarki: this.$store.state.user.idLevelHirarki,
          levelHirarki: this.$store.state.user.levelHirarki,
        })
      : await this.getDistrik({
          idLevelHirarki: this.$store.state.user.idLevelHirarki || '',
          levelHirarki: this.$store.state.user.levelHirarki || '',
        })
    if (this.$store.state.user.levelHirarki.toLowerCase() == `admin dis`) {
      await this.getFilterDistributor({
        id_jabatan: this.$store.state.user.idJabatan,
      })

      await this.getSalesman({
        id_distributor: this.salesRoute.dataDistributor[0].id_distributor,
      })
    }
    this.handlePagination(5)
    this.handlePaginationToko(5)
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
      'getFilterDistributor',
    ]),

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

      if (this.$store.state.user.levelHirarki.toLowerCase() == `admin dis`) {
        await this.getFilterDistributor({
          id_jabatan: this.$store.state.user.idJabatan,
        })

        await this.getSalesman({
          id_distributor: this.salesRoute.dataDistributor[0].id_distributor,
        })
      } else {
        await this.getDistributor()
      }
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
      this.loading = true

      let LatLng = this.salesRoute.dataMap
      this.markers = []
      this.path = null
      this.path = []
      this.markersPeople = []
      this.markersNotVisited = []

      console.log(`this.salesRoute.dataMap`, this.salesRoute.dataMap.length > 0)

      if (this.salesRoute.dataMap.length > 0) {
        // Toko sudah dikunjungi namun tidak ada latitude longitudenya
        let users = _.uniq(LatLng, function(x) {
          return x.lattitude
        })
        let userFilter = _.filter(users, function(x) {
          return x.lattitude != null
        })
        let tokoSudahDikunjungi = _.filter(userFilter, function(x) {
          return x.checkout_time != null
        })
        tokoSudahDikunjungi.forEach(element => {
          this.path.push({
            lat: parseFloat(element.lattitude),
            lng: parseFloat(element.longitude),
          })
        })
        tokoSudahDikunjungi.forEach(element => {
          this.markers.push({
            position: {
              id: element.id_toko,
              nama_toko: element.nama_toko,
              sales_name: element.sales_name,
              distrik_name: element.distrik_name,
              lat: parseFloat(element.lattitude),
              lng: parseFloat(element.longitude),
              status: 'Sudah Dikunjungi',
            },
          })
        })

        // Toko belum dikunjungi
        let tokoBelumDikunjungi = _.filter(LatLng, function(x) {
          return x.checkout_time == null
        })
        let tokoFilterLatLng = _.filter(tokoBelumDikunjungi, function(x) {
          return x.lattitude != null || x.longitude != null
        })
        tokoFilterLatLng.forEach(element => {
          this.markersNotVisited.push({
            position: {
              id: element.id_toko,
              nama_toko: element.nama_toko,
              sales_name: element.sales_name,
              distrik_name: element.distrik_name,
              lat: parseFloat(element.lattitude),
              lng: parseFloat(element.longitude),
              status: 'Belum Dikunjungi',
            },
          })
        })
        this.latMap = parseFloat(LatLng[0].lattitude)
        this.lngMap = parseFloat(LatLng[0].longitude)
        this.zoomMap = 12
        this.loading = false
      } else {
        this.latMap = parseFloat(-7.1688477)
        this.lngMap = parseFloat(112.6451559)
        this.zoomMap = 12
        this.loading = false
      }
    },

    markerMapByTable() {
      this.loading = true
      let dataItem = this.itemRadio
      this.markers = []
      this.path = null
      this.path = []
      this.markersPeople = []
      this.markersNotVisited = []
      this.markers.push({
        position: {
          id: dataItem.id_toko,
          nama_toko: dataItem.nama_toko,
          sales_name: dataItem.sales_name,
          distrik_name: dataItem.distrik_name,
          lat: parseFloat(dataItem.latitude),
          lng: parseFloat(dataItem.longitude),
          status: 'Sudah Dikunjungi',
        },
      })

      this.markersPeople.push({
        position: {
          lat: parseFloat(dataItem.checkin_latitude),
          lng: parseFloat(dataItem.checkin_longitude),
        },
      })

      this.path.push(
        {
          lat: parseFloat(dataItem.latitude),
          lng: parseFloat(dataItem.longitude),
        },

        {
          lat: parseFloat(dataItem.checkin_latitude),
          lng: parseFloat(dataItem.checkin_longitude),
        },
      )

      this.latMap = parseFloat(this.itemRadio.latitude)
      this.lngMap = parseFloat(this.itemRadio.longitude)
      this.zoomMap = 12
      this.loading = false
    },

    onChange(value) {
      this.latStreetView = parseFloat(this.itemRadio.latitude)
      this.lngStreetView = parseFloat(this.itemRadio.longitude)
      this.urlStreetView()
      this.markerMapByTable()
    },

    openMarker(id) {
      this.openedMarkerID = id
    },

    refreshData() {
      this.salesRoute.dataDistrik = []
      this.salesRoute.dataDistributor = []
      this.salesRoute.dataSalesman = []
      this.salesRoute.formData.selectedDistrik = ''
      this.salesRoute.formData.selectedDistributor = ''
      this.salesRoute.formData.selectedSalesman = ''
      this.salesRoute.formData.selectedDate = ''
      this.salesRoute.formData.id_distrik = ''
      this.salesRoute.formData.id_distributor = ''
      this.salesRoute.formData.id_sales = ''
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
