<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="4">
        <a-select
          v-model:value="wpmPromotion.params.id_distrik_ret"
          placeholder="Distrik"
          show-search
          class="w-100"
          @change="handleChangeDistrik"
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option
            v-for="(distrik, index) in wpmPromotion.dataDistrikRET"
            :value="distrik.ID"
            :key="index"
          >
            {{ distrik.ID }} - {{ distrik.NAMA_DISTRIK_RET }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="4">
        <a-select
          v-model:value="wpmPromotion.params.tahun"
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
      </a-col>
      <a-col :xs="24" :md="4">
        <a-select
          v-model:value="wpmPromotion.params.bulan"
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
      </a-col>
    </a-row>
    <a-table
      ref="table"
      :columns="wpmPromotion.columns"
      :data-source="wpmPromotion.dataTable"
      :loading="wpmPromotion.isLoading"
      :pagination="wpmPromotion.pagination"
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
    </a-table>
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
          :disabled="editdata != true ? false : true"
          v-model:value="wpmPromotion.formData.id_distrik_ret"
          placeholder="Distrik RET"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Distrik RET</a-select-option>
          <a-select-option
            v-for="(distrik, index) in wpmPromotion.dataDistrikRET"
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
          v-model:value="wpmPromotion.formData.start_date"
          class="w-100"
          format="YYYY-MM-DD"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-date-picker
          placeholder="Tanggal Selesai"
          v-model:value="wpmPromotion.formData.end_date"
          class="w-100"
          format="YYYY-MM-DD"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6" />
    </a-row>
    <a-row :gutter="[24]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="editdata != true ? false : true"
          v-model:value="wpmPromotion.formData.id_brand"
          placeholder="Brand"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Brand</a-select-option>
          <a-select-option
            v-for="(brand, index) in wpmPromotion.brandList"
            :value="brand.ID"
            :key="index"
          >
            {{ brand.ID }} - {{ brand.NAMA_BRAND }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="editdata != true ? false : true"
          v-model:value="wpmPromotion.formData.id_kategori_promo"
          placeholder="Kategori"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Kategori</a-select-option>
          <a-select-option
            v-for="(promo, index) in wpmPromotion.promoList"
            :value="promo.ID"
            :key="index"
          >
            {{ promo.ID }} - {{ promo.NAMA_KATEGORI_PROMO }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input placeholder="Program" v-model:value="wpmPromotion.formData.program" class="w-100" />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input
          placeholder="Nilai ZAK"
          v-model:value="wpmPromotion.formData.nilai_zak"
          class=" mb-4"
        />
      </a-col>
    </a-row>
    <a-textarea v-model:value="wpmPromotion.formData.mekanisme" placeholder="Mekanisme" :rows="5" />
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
      wpmPromotion: state => state.wpmPromotion.data,
      weeklyInput: state => state.weeklyInput.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    await this.getDistrikRET()
    await this.getAllKategoriPromo()
    await this.getAllBrand()
  },
  methods: {
    ...mapActions('wpmPromotion', [
      'updateDataPromo',
      'getDistrikRET',
      'getAllKategoriPromo',
      'getAllBrand',
      'getDataTable',
      'insertDataPromo',
      'deleteDataRow',
    ]),

    async showAddModal() {
      this.addModal = true
      await this.$store.commit('wpmPromotion/changeWPMPromotion', {
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
      await this.$store.commit('wpmPromotion/changeWPMPromotion', {
        formData: {
          id_distrik_ret: value.id_distrik,
          start_date: value.start_date,
          end_date: value.end_date,
          id_brand: value.id_brand,
          id_kategori_promo: value.id_kategori_promo,
          program: value.program,
          nilai_zak: value.nilai_zak,
          mekanisme: value.mekanisme,
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
        this.wpmPromotion.formData.id_distrik_ret != null &&
        this.wpmPromotion.formData.start_date != '' &&
        this.wpmPromotion.formData.end_date != '' &&
        this.wpmPromotion.formData.id_brand != null &&
        this.wpmPromotion.formData.program != '' &&
        this.wpmPromotion.formData.id_kategori_promo != null &&
        this.wpmPromotion.formData.nilai_zak != null &&
        this.wpmPromotion.formData.mekanisme != ''
      ) {
        if (this.editdata == true) {
          await this.updateDataPromo({
            uuid: this.uuid,
          })
          if (this.weeklyInput.status == 'sukses') {
            await this.$store.commit('wpmPromotion/changeWPMPromotion', {
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

    async handleChangeDistrik() {
      if (
        this.wpmPromotion.params.id_distrik_ret != null &&
        this.wpmPromotion.params.tahun != '' &&
        this.wpmPromotion.params.bulan != ''
      ) {
        await this.getDataTable()
      } else {
      }
    },

    async handleChangeTahun() {
      if (
        this.wpmPromotion.params.id_distrik_ret != null &&
        this.wpmPromotion.params.tahun != '' &&
        this.wpmPromotion.params.bulan != ''
      ) {
        await this.getDataTable()
      } else {
      }
    },

    async handleChangeBulan() {
      if (
        this.wpmPromotion.params.id_distrik_ret != null &&
        this.wpmPromotion.params.tahun != '' &&
        this.wpmPromotion.params.bulan != ''
      ) {
        await this.getDataTable()
      } else {
      }
    },
  },
}
</script>
