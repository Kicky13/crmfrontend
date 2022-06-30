<template>
  <a-card class="card card-top card-top-primary">
    <div class="row mb-4">
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-4">
            <a-select
              v-model:value="wpPromotion.params.region_name"
              placeholder="Region"
              show-search
              class="w-100"
              @change="handleChangeRegion"
            >
              <a-select-option disabled value="">Pilih Region</a-select-option>
              <a-select-option
                v-for="(region, index) in wpPromotion.regionList"
                :value="region.nama_region"
                :key="index"
              >
                {{ region.id_region }} - {{ region.nama_region }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-4">
            <a-select
              v-model:value="wpPromotion.params.province_name"
              placeholder="Provinsi"
              show-search
              class="w-100"
              @change="handleChangeProvince"
            >
              <a-select-option disabled value="">Pilih Provinsi</a-select-option>
              <a-select-option
                v-for="(provinsi, index) in wpPromotion.provinceList"
                :value="provinsi.nama_provinsi"
                :key="index"
              >
                {{ provinsi.id_provinsi }} - {{ provinsi.nama_provinsi }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-4">
            <a-select
              v-model:value="wpPromotion.params.id_distrik_ret"
              placeholder="Distrik RET"
              show-search
              class="w-100"
              @change="handleChangeDistrikRET"
            >
              <a-select-option disabled value="">Pilih Distrik RET</a-select-option>
              <a-select-option
                v-for="(distrik, index) in wpPromotion.dataDistrikRET"
                :value="distrik.id_district_ret"
                :key="index"
              >
                {{ distrik.id_district_ret }} - {{ distrik.nama_district_ret }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-md-4">
            <a-select
              v-model:value="wpPromotion.params.distrik_name"
              placeholder="Distrik"
              show-search
              class="w-100"
              @change="handleChangeDistrik"
            >
              <a-select-option disabled value="">Pilih Distrik</a-select-option>
              <a-select-option
                v-for="(distrik, index) in wpPromotion.distrikList"
                :value="distrik.nama_distrik"
                :key="index"
              >
                {{ distrik.id_distrik }} - {{ distrik.nama_distrik }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-4">
            <a-select
              v-model:value="wpPromotion.params.tahun"
              placeholder="Tahun"
              show-search
              class="w-100"
              @change="handleChangeTahun"
            >
              <a-select-option disabled value="">Pilih Tahun</a-select-option>
              <a-select-option v-for="(tahun, index) in years" :value="tahun" :key="index">
                {{ tahun }}
              </a-select-option>
            </a-select>
          </div>
          <div class="col-md-4">
            <a-select
              v-model:value="wpPromotion.params.bulan"
              placeholder="Bulan"
              show-search
              class="w-100"
              @change="handleChangeBulan"
            >
              <a-select-option disabled value="">Pilih Bulan</a-select-option>
              <a-select-option
                v-for="(bulan, index) in weeklyInput.data_bulan"
                :value="bulan.id"
                :key="index"
              >
                {{ bulan.name }}
              </a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-6">
            <a-tooltip placement="topLeft">
              <template #title>
                <span>Refresh Filter</span>
              </template>
              <a-button @click="refreshFilter()" type="primary" class="ml-auto">
                <i class="fa fa-refresh" aria-hidden="true"></i>
              </a-button>
            </a-tooltip>
          </div>
          <div class="col-md-6">
            <a-button type="primary" class="w-100" @click="showAddModal">
              <i class="fa fa-plus mr-2" />
              Tambah
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between mb-3">
      <div class="d-flex">
        <div class="align-self-center">
          <span>Show :</span>
        </div>
        <a-select
          :default-value="wpPromotion.itemsPerPage[1]"
          class="mx-2"
          @change="handlePaginationSize"
        >
          <a-select-option v-for="itemPerPage in wpPromotion.itemsPerPage" :key="itemPerPage">
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
        :columns="wpPromotion.columns"
        :data-source="wpPromotion.dataTable"
        :loading="wpPromotion.isLoading"
        :pagination="wpPromotion.pagination"
        :row-key="data => data"
        :scroll="{ x: 2000 }"
      >
        <template #distrik="{ text }">
          <span>{{ text.nm_distrik }}</span>
        </template>
        <template #tanggal_mulai="{ text }">
          <span>{{ text.start_date }}</span>
        </template>
        <template #tanggal_selesai="{ text }">
          <span>{{ text.end_date }}</span>
        </template>
        <template #brand="{ text }">
          <span>{{ text.nm_brand }}</span>
        </template>
        <template #kategori="{ text }">
          <span>{{ text.nm_kategori_promo }}</span>
        </template>
        <template #asal_program="{ text }">
          <span>{{ text.program }}</span>
        </template>
        <template #nilai="{ text }">
          <span>{{ text.nilai_zak }}</span>
        </template>
        <template #mekanisme="{ text }">
          <span>{{ text.mekanisme }}</span>
        </template>
        <template #action="{ text }">
          <div>
            <button
              type="button"
              class="btn btn-success mr-1"
              data-toggle="tooltip"
              title="Sunting"
              @click="showEditModal(text)"
            >
              <i class="fa fa-pencil-square-o" />
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-toggle="tooltip"
              title="Hapus"
              @click="showDeleteModal(text)"
            >
              <i class="fa fa-trash" />
            </button>
          </div>
        </template>
      </a-table>
    </div>
  </a-card>

  <!-- Add Modal -->
  <a-modal
    v-model:visible="addModal"
    title="Form Promo"
    ok-text="Simpan"
    cancel-text="Batal"
    width=""
    :style="{ padding: '0 20px' }"
    :on-ok="savePromo"
  >
    <template #footer>
      <a-button key="back" @click="addModal = false">
        Batal
      </a-button>
      <a-button key="submit" type="primary" @click="savePromo">
        {{ editdata == true ? 'Ubah' : 'Simpan' }}
      </a-button>
    </template>
    <a-row :gutter="[24]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="editdata == true ? true : false"
          v-model:value="wpPromotion.formData.id_distrik_ret"
          placeholder="Distrik RET"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Distrik RET</a-select-option>
          <a-select-option
            v-for="(distrik, index) in wpPromotion.dataDistrikRET"
            :value="distrik.ID"
            :key="index"
          >
            {{ distrik.ID }} - {{ distrik.NAMA_DISTRIK_RET }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-date-picker
          placeholder="Tanggal Mulai"
          v-model:value="wpPromotion.formData.start_date"
          class="w-100"
          format="YYYY-MM-DD"
          :disabled-date="disabledStartDate"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-date-picker
          placeholder="Tanggal Selesai"
          v-model:value="wpPromotion.formData.end_date"
          class="w-100"
          format="YYYY-MM-DD"
          :disabled-date="disabledEndDate"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6" />
    </a-row>
    <a-row :gutter="[24]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="editdata == true ? true : false"
          v-model:value="wpPromotion.formData.nama_brand"
          placeholder="Brand"
          class="w-100 mb-4"
          show-search
          @change="handleBrand()"
        >
          <a-select-option disabled value="">Pilih Brand</a-select-option>
          <a-select-option
            v-for="(brand, index) in wpPromotion.brandList"
            :value="brand.NAMA_BRAND"
            :key="index"
          >
            {{ brand.ID }} - {{ brand.NAMA_BRAND }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="editdata == true ? true : false"
          v-model:value="wpPromotion.formData.id_kategori_promo"
          placeholder="Kategori"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Kategori</a-select-option>
          <a-select-option
            v-for="(promo, index) in wpPromotion.promoList"
            :value="promo.ID"
            :key="index"
          >
            {{ promo.ID }} - {{ promo.NAMA_KATEGORI_PROMO }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="editdata == true ? true : false"
          v-model:value="wpPromotion.formData.program"
          placeholder="Kategori"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Program</a-select-option>
          <a-select-option :value="`Principal`"> Principal </a-select-option>
          <a-select-option :value="`Distributor`"> Distributor </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input-number
          type="number"
          placeholder="Nilai ZAK"
          v-model:value="wpPromotion.formData.nilai_zak"
          class=" mb-4 w-100"
        />
      </a-col>
    </a-row>
    <a-textarea v-model:value="wpPromotion.formData.mekanisme" placeholder="Mekanisme" :rows="5" />
  </a-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { notification } from 'ant-design-vue'

export default {
  data() {
    return {
      addModal: false,
      editdata: false,
    }
  },
  computed: {
    ...mapState({
      wpPromotion: state => state.wpPromotion.data,
      weeklyInput: state => state.weeklyInput.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    await this.getRegion()
    await this.getAllKategoriPromo()
    await this.getAllBrand()
  },
  methods: {
    ...mapActions('wpPromotion', [
      'updateDataPromo',
      'getDistrikRET',
      'getAllKategoriPromo',
      'getAllBrand',
      'getDataTable',
      'insertDataPromo',
      'deleteDataRow',
      'getRegion',
      'getProvinsi',
      'getDistrik',
      'refreshFilterData',
    ]),
    handlePaginationSize(size) {
      this.wpPromotion.pagination.pageSize = size
    },
    disabledStartDate(startValue) {
      const endValue = this.wpPromotion.formData.end_date
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },

    disabledEndDate(endValue) {
      const startValue = this.wpPromotion.formData.start_date
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },

    async showAddModal() {
      this.addModal = true
      this.editdata = false

      await this.$store.commit('wpPromotion/changePromotion', {
        formData: {
          id_distrik_ret: null,
          start_date: '',
          end_date: '',
          id_brand: null,
          id_kategori_promo: null,
          program: '',
          nilai_zak: null,
          mekanisme: '',
        },
      })
    },

    async showEditModal(value) {
      this.addModal = true
      this.editdata = true
      this.uuid = value.uuid
      await this.$store.commit('wpPromotion/changePromotion', {
        formData: {
          id_distrik_ret: value.id_distrik,
          start_date: value.start_date,
          end_date: value.end_date,
          id_brand: value.id_brand,
          id_kategori_promo: value.id_kategori_promo,
          program: value.program,
          nilai_zak: value.nilai_zak,
          mekanisme: value.mekanisme,
          edit_zak: value.nilai_zak,
        },
      })
    },

    showDeleteModal(value) {
      this.$confirm({
        title: 'Weekly Price Confirmation',
        content: 'Apakah anda yakin menghapus data ini?',
        okText: 'Konfirmasi',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.deleteDataRow({
            uuid: value.uuid,
          })
          await this.getDataTable()
        },
        onCancel: () => {},
      })
    },

    async savePromo() {
      if (
        this.wpPromotion.formData.id_distrik_ret != null &&
        this.wpPromotion.formData.start_date != '' &&
        this.wpPromotion.formData.end_date != '' &&
        this.wpPromotion.formData.id_brand != null &&
        this.wpPromotion.formData.program != '' &&
        this.wpPromotion.formData.id_kategori_promo != null &&
        this.wpPromotion.formData.nilai_zak != null &&
        this.wpPromotion.formData.mekanisme != ''
      ) {
        if (this.editdata == true) {
          await this.updateDataPromo({
            uuid: this.uuid,
          })
          if (this.weeklyInput.status == 'sukses') {
            await this.$store.commit('wpPromotion/changePromotion', {
              formData: {
                id_distrik_ret: null,
                start_date: '',
                end_date: '',
                id_brand: null,
                id_kategori_promo: null,
                program: '',
                nilai_zak: null,
                mekanisme: '',
              },
            })
          }
        } else {
          await this.insertDataPromo()
        }
        await this.getDataTable()
        this.addModal = false
      } else {
        notification.error({
          message: 'Error',
          description: 'Mohon Maaf. Data harus terisi lengkap.',
        })
      }
    },
    async handleChangeRegion() {
      let dataSource = [...this.wpPromotion.regionList]
      let filtered = dataSource.filter(x => x.nama_region == this.wpPromotion.params.region_name)

      this.wpPromotion.params.id_region = filtered[0].id_region

      await this.getProvinsi()
    },

    async handleChangeProvince() {
      let dataSource = [...this.wpPromotion.provinceList]
      let filtered = dataSource.filter(
        x => x.nama_provinsi == this.wpPromotion.params.province_name,
      )

      this.wpPromotion.params.id_provinsi = filtered[0].id_provinsi

      await this.getDistrikRET()
    },

    async handleChangeDistrikRET() {
      await this.getDistrik()
    },
    async handleChangeDistrik() {
      let dataSource = [...this.wpPromotion.distrikList]
      let filtered = dataSource.filter(x => x.nama_distrik == this.wpPromotion.params.distrik_name)
      this.wpPromotion.params.id_distrik = filtered[0].id_distrik
      this.$store.commit('wpPromotion/changePromotion', {
        dataTable: [],
      })
      if (
        this.wpPromotion.params.id_region != '' &&
        this.wpPromotion.params.id_provinsi != '' &&
        this.wpPromotion.params.id_distrik != '' &&
        this.wpPromotion.params.id_distrik_ret != null &&
        this.wpPromotion.params.tahun != '' &&
        this.wpPromotion.params.bulan != ''
      ) {
        await this.getDataTable()
      } else {
      }
    },

    async handleChangeTahun() {
      this.$store.commit('wpPromotion/changePromotion', {
        dataTable: [],
      })
      if (this.wpPromotion.params.tahun != '' && this.wpPromotion.params.bulan != '') {
        await this.getDataTable()
      } else {
      }
    },

    async handleChangeBulan() {
      this.$store.commit('wpPromotion/changePromotion', {
        dataTable: [],
      })
      if (this.wpPromotion.params.tahun != '' && this.wpPromotion.params.bulan != '') {
        await this.getDataTable()
      } else {
      }
    },

    async handleBrand() {
      let dataSourceBrand = [...this.wpPromotion.brandList]
      let filtered = dataSourceBrand.filter(
        brand => brand.NAMA_BRAND == this.wpPromotion.formData.nama_brand,
      )
      this.wpPromotion.formData.id_brand = filtered[0].ID
    },

    async refreshFilter() {
      await this.refreshFilterData()
    },
  },
}
</script>
