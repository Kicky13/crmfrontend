<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <!-- <a-col :xs="24" :md="5">
        <a-select
          v-model:value="wpPublish.params.nm_tso"
          placeholder="ASM"
          show-search
          class="w-100"
          @change="handleASM"
        >
          <a-select-option disabled value="">Pilih ASM</a-select-option>
          <a-select-option
            v-for="(asm, index) in wpPublish.dataASM"
            :value="asm.nm_user"
            :key="index"
          >
            {{ asm.id_m_hierarchy }} - {{ asm.nm_user }}
          </a-select-option>
        </a-select>
      </a-col> -->
      <a-col :xs="24" :md="3">
        <a-select
          v-model:value="wpPublish.params.tahun"
          placeholder="Tahun"
          show-search
          class="w-100"
          @change="handleTahun"
        >
          <a-select-option disabled value="">Tahun</a-select-option>
          <a-select-option v-for="(tahun, index) in years" :value="tahun" :key="index">
            {{ tahun }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="4">
        <a-select
          v-model:value="wpPublish.params.bulan"
          placeholder="Bulan"
          show-search
          class="w-100"
          @change="handleBulan"
        >
          <a-select-option disabled value="">Bulan</a-select-option>
          <a-select-option
            v-for="(bulan, index) in wpPublish.data_bulan"
            :value="bulan.id"
            :key="index"
          >
            {{ bulan.name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="4">
        <a-select
          v-model:value="wpPublish.params.week"
          placeholder="Week"
          show-search
          class="w-100"
          :disabled="wpPublish.params.nm_tso != `` && wpPublish.params.tahun != `` ? false : true"
          @change="handleWeek"
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            v-for="(weekly, index) in wpPublish.dataWeekParams"
            :value="weekly.week"
            :key="index"
          >
            Week {{ weekly.week }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="2">
        <a-tooltip placement="topLeft">
          <template #title>
            <span>Refresh Filter</span>
          </template>
          <a-button @click="refreshFilter()" type="primary">
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </a-button>
        </a-tooltip>
      </a-col>
      <a-col :xs="24" :md="11">
        <div class="d-flex justify-content-end">
          <button
            :disabled="
              wpPublish.wpPublishList.length == 0
                ? true
                : wpPublish.wpPublishList == 0
                ? true
                : false
            "
            type="button"
            class="btn btn-success mr-2"
            @click="approveModal"
          >
            <i class="fa fa-check mr-1" />
            Publish
          </button>
          <a-button
            :disabled="
              wpPublish.wpPublishList.length == 0
                ? true
                : wpPublish.wpPublishList == 0
                ? true
                : false
            "
            type="primary"
            @click="rejectModal"
          >
            <i class="fa fa-minus mr-2" />
            Reject
          </a-button>
        </div>
      </a-col>
    </a-row>
    <a-table
      ref="table"
      :columns="wpPublish.columns"
      :data-source="wpPublish.wpPublishList"
      :loading="wpPublish.isLoading"
      :pagination="wpPublish.pagination"
      :row-key="data => data"
      :scroll="{ x: 2000 }"
    >
      <template #distrik="{ text }">
        <span>{{ text.nm_wilayah }}</span>
      </template>
      <template #tahun="{ text }">
        <span>{{ text.tahun }}</span>
      </template>
      <template #bulan="{ text }">
        <span>{{ text.bulan }}</span>
      </template>
      <template #week="{ text }">
        <span>{{ text.week }}</span>
      </template>
      <template #status="{ text }">
        <span>{{ text.status }}</span>
      </template>
      <template #produk="{ text }">
        <span>{{ text.nm_produk }}</span>
      </template>
      <template #brand="{ text }">
        <span>{{ text.nm_brand }}</span>
      </template>
      <template #type="{ text }">
        <span>{{ text.nm_type_produk }}</span>
      </template>
      <template #kemasan="{ text }">
        <span>{{ text.nm_satuan }}</span>
      </template>
      <template #rbp_gross="{ text }">
        <span>{{ text.rbp_gross }}</span>
      </template>
      <template #promo="{ text }">
        <span>{{ text.promo }}</span>
      </template>
      <template #rbp_net="{ text }">
        <span>{{ text.rbp_net }}</span>
      </template>
      <template #rsp="{ text }">
        <span>{{ text.rsp }}</span>
      </template>
      <template #notes="{ text }">
        <span>{{ text.notes }}</span>
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
        </div>
      </template>
    </a-table>
  </a-card>

  <!-- Modal Form -->
  <a-modal
    v-model:visible="addModal"
    title="Form Weekly Price"
    ok-text="Simpan"
    width=""
    :style="{ padding: '0 20px' }"
    :on-ok="saveWeeklyPrice"
  >
    <template #footer>
      <a-button key="back" @click="addModal = false">
        Batal
      </a-button>
      <a-button key="submit" type="primary" @click="saveWeeklyPrice">
        {{ editdata == true ? 'Ubah' : 'Simpan' }}
      </a-button>
    </template>
    <a-row :gutter="[24]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-input
          :disabled="editdata != true ? false : true"
          v-model:value="wpPublish.formData.nama_distrik"
          placeholder="Promo"
          class=" mb-4 w-100 input_white_disable"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="editdata != true ? false : true"
          v-model:value="wpPublish.formData.tahun"
          placeholder="Tahun"
          class="w-100 mb-4 input_white_disable"
          show-search
          @change="handleTahunForm()"
        >
          <a-select-option disabled value="">Pilih Tahun</a-select-option>
          <a-select-option v-for="(tahun, index) in years" :value="tahun" :key="index">
            {{ tahun }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="editdata != true ? false : true"
          v-model:value="wpPublish.formData.bulan"
          placeholder="Bulan"
          class="w-100 mb-4 input_white_disable"
          show-search
          @change="handleBulansForm()"
        >
          <a-select-option disabled value="">Pilih Bulan</a-select-option>
          <a-select-option
            v-for="(bulan, index) in wpPublish.data_bulan"
            :value="bulan.id"
            :key="index"
          >
            {{ bulan.name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="editdata != true ? false : true"
          v-model:value="wpPublish.formData.week"
          placeholder="Week"
          class="w-100 mb-4 input_white_disable"
          show-search
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            v-for="(weekly, index) in wpPublish.dataWeekForm"
            :value="weekly.week"
            :key="index"
          >
            Week {{ weekly.week }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row :gutter="[24]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="editdata != true ? false : true"
          v-model:value="wpPublish.formData.nama_produk"
          placeholder="Produk"
          class="w-100 mb-4 input_white_disable"
          show-search
        >
          <a-select-option disabled value="">Pilih Produk</a-select-option>
          <a-select-option
            v-for="(product, index) in wpPublish.dataProduct"
            :value="product.NAMA_PRODUK"
            :key="index"
          >
            {{ product.ID }} - {{ product.NAMA_PRODUK }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="true"
          v-model:value="wpPublish.formData.brand"
          placeholder="brand"
          class="w-100 mb-4 input_white_disable"
          show-search
        >
          <a-select-option disabled value="">Pilih brand</a-select-option>
          <a-select-option
            v-for="(brand, index) in wpPublish.brandList"
            :value="brand.ID"
            :key="index"
          >
            {{ brand.NAMA_BRAND }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="true"
          v-model:value="wpPublish.formData.type"
          placeholder="Tipe"
          class="w-100 mb-4 input_white_disable"
          show-search
        >
          <a-select-option disabled value="">Pilih Tipe</a-select-option>
          <a-select-option
            v-for="(type, index) in wpPublish.tipeList"
            :value="type.ID"
            :key="index"
          >
            {{ type.NAMA_TIPE_SEMEN }}
          </a-select-option>
        </a-select>
      </a-col>

      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="true"
          v-model:value="wpPublish.formData.kemasan"
          placeholder="Kemasan"
          class="w-100 mb-4 input_white_disable"
          show-search
        >
          <a-select-option disabled value="">Pilih Kemasan</a-select-option>
          <a-select-option
            v-for="(kemasan, index) in wpPublish.kemasanList"
            :value="kemasan.ID"
            :key="index"
          >
            {{ kemasan.NAMA_KEMASAN }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row :gutter="[24]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-input-number
          type="number"
          @change="handleGross()"
          v-model:value="wpPublish.formData.rbp_gross"
          placeholder="RBP Gross"
          class=" mb-4 w-100"
        />
      </a-col>
      <a-col
        :xs="24"
        :md="12"
        :lg="5"
        v-if="wpPublish.promoDistrik && wpPublish.promoDistrik.length > 0"
      >
        <a-select
          v-model:value="wpPublish.formData.promo"
          placeholder="0"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option
            v-for="(promo, index) in wpPublish.promoDistrik"
            :value="promo.nilai_zak"
            :key="index"
          >
            {{ promo.program.toUpperCase() }} - {{ promo.nilai_zak }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="5" v-else>
        <a-select
          :disabled="true"
          v-model:value="wpPublish.formData.promo"
          placeholder="Promo"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option :value="0">0</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="1">
        <a-tooltip placement="topLeft">
          <template #title>
            <span>Refresh Promo</span>
          </template>
          <a-button
            :disabled="
              wpPublish.formData.id_distrik == null ||
              wpPublish.formData.tahun == `` ||
              wpPublish.formData.bulan == `` ||
              wpPublish.formData.id_brand == null
                ? true
                : false
            "
            @click="handleDataPromo()"
            type="primary"
          >
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </a-button>
        </a-tooltip>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input-number
          :disabled="true"
          type="number"
          v-model:value="wpPublish.formData.rbp_net"
          placeholder="RBP Net"
          class=" mb-4 w-100 input_white_disable"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input-number
          type="number"
          v-model:value="wpPublish.formData.rsp"
          placeholder="RSP"
          class=" mb-4 w-100"
        />
      </a-col>
    </a-row>
    <div class="row">
      <div class="col-md-12">
        <a-textarea v-model:value="wpPublish.formData.notes" show-count :maxlength="100" />
      </div>
    </div>
  </a-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      addModal: false,
      editdata: false,
      uuid: '',
    }
  },
  computed: {
    ...mapState({
      wpPublish: state => state.wpPublish.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    // await this.getDataASM({
    //   id_atasan: this.$store.state.user.idJabatan,
    // })
    await this.getMasterProduct()
  },
  methods: {
    ...mapActions('wpPublish', [
      'updateDataWeekly',
      'submitReject',
      'submitPublish',
      'getDataASM',
      'getDataTable',
      'getDistrik',
      'getMasterProduct',
      'getPromotion',
      'getDataWeekParams',
      'getDataWeekForm',
    ]),
    // Edit Modal
    async showEditModal(value) {
      this.addModal = true
      this.editdata = true
      this.uuid = value.uuid
      await this.$store.commit('wpPublish/changeWPPublish', {
        formData: {
          id_distrik: value.id_distrik,
          nama_distrik: value.nm_wilayah,
          nama_produk: value.nm_produk,
          brand: value.nm_brand,
          type: value.nm_type_produk,
          kemasan: value.nm_satuan,
          tahun: value.tahun,
          bulan: value.bulan,
          week: value.week,
          id_produk: value.id_produk,
          rbp_gross: value.rbp_gross,
          promo: value.promo,
          rbp_net: value.rbp_net,
          rsp: value.rsp,
          notes: value.notes,
          id_brand: value.id_brand,
        },
      })
    },

    // Save Modal
    async saveWeeklyPrice() {
      if (
        this.wpPublish.formData.id_distrik != null &&
        this.wpPublish.formData.tahun != '' &&
        this.wpPublish.formData.bulan != '' &&
        this.wpPublish.formData.week != '' &&
        this.wpPublish.formData.id_produk != null &&
        this.wpPublish.formData.rbp_gross != null &&
        this.wpPublish.formData.promo != null &&
        this.wpPublish.formData.rbp_net != null &&
        this.wpPublish.formData.rsp != null
      ) {
        if (this.editdata == true) {
          await this.updateDataWeekly({
            uuid: this.uuid,
          })
          if (this.wpPublish.status == 'sukses') {
            await this.$store.commit('wpPublish/changeWPPublish', {
              formData: {
                id_distrik: null,
                tahun: '',
                bulan: '',
                week: '',
                id_produk: 1,
                rbp_gross: null,
                promo: null,
                rbp_net: null,
                rsp: null,
                brand: null,
                type: null,
                kemasan: null,
                notes: '',
              },
            })
          }
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

    // Approve button
    approveModal() {
      this.$confirm({
        title: 'Weekly Price Publish',
        content: 'Apakah anda yakin akan melakukan publish pada data ini?',
        okText: 'Publish',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.submitPublish()
          await this.getDataTable()
        },
        onCancel: () => {},
      })
    },

    // Reject button
    rejectModal() {
      this.$confirm({
        title: 'Weekly Price Reject',
        content: 'Apakah anda yakin akan melakukan reject pada data ini?',
        okText: 'Reject',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.submitReject()
          await this.getDataTable()
        },
        onCancel: () => {},
      })
    },

    // handle select
    async handleASM() {
      // filter berdasarkan nama
      let dataSource = [...this.wpPublish.dataASM]
      let filtered = dataSource.filter(x => x.nm_user == this.wpPublish.params.nm_tso)
      this.wpPublish.params.id_asm = filtered[0].id_m_hierarchy

      //  await this.getDistrik({
      //     id_tso: this.wpPublish.params.id_tso,
      //   })

      // validasi
      if (
        this.wpPublish.params.tahun != '' &&
        this.wpPublish.params.bulan != '' &&
        this.wpPublish.params.week != '' &&
        this.wpPublish.params.id_asm != ''
      ) {
        await this.getDataTable()
      } else {
      }
    },
    async handleTahun() {
      // validasi
      if (
        this.wpPublish.params.tahun != '' &&
        this.wpPublish.params.bulan != '' &&
        this.wpPublish.params.week != ''
      ) {
        await this.getDataTable()
      } else if (
        this.wpPublish.params.tahun != '' &&
        this.wpPublish.params.bulan != '' &&
        this.wpPublish.params.week == ''
      ) {
        await this.getDataWeekParams()
      }
    },
    async handleBulan() {
      // validasi
      if (
        this.wpPublish.params.tahun != '' &&
        this.wpPublish.params.bulan != '' &&
        this.wpPublish.params.week != ''
      ) {
        await this.getDataTable()
      } else if (
        this.wpPublish.params.tahun != '' &&
        this.wpPublish.params.bulan != '' &&
        this.wpPublish.params.week == ''
      ) {
        await this.getDataWeekParams()
      }
    },
    async handleWeek() {
      // validasi
      if (
        this.wpPublish.params.tahun != '' &&
        this.wpPublish.params.bulan != '' &&
        this.wpPublish.params.week != ''
      ) {
        await this.getDataTable()
      } else if (
        this.wpPublish.params.tahun != '' &&
        this.wpPublish.params.bulan != '' &&
        this.wpPublish.params.week == ''
      ) {
      }
    },
    async handleTahunForm() {
      // validasi
      if (
        this.wpPublish.formData.tahun != '' &&
        this.wpPublish.formData.bulan != '' &&
        this.wpPublish.formData.week != ''
      ) {
      } else if (
        this.wpPublish.formData.tahun != '' &&
        this.wpPublish.formData.bulan != '' &&
        this.wpPublish.formData.week == ''
      ) {
        await this.getDataWeekForm()
      }
    },
    async handleBulanForm() {
      // validasi
      if (
        this.wpPublish.formData.tahun != '' &&
        this.wpPublish.formData.bulan != '' &&
        this.wpPublish.formData.week != ''
      ) {
      } else if (
        this.wpPublish.formData.tahun != '' &&
        this.wpPublish.formData.bulan != '' &&
        this.wpPublish.formData.week == ''
      ) {
        await this.getDataWeekForm()
      }
    },
    async handleDataPromo() {
      await this.getPromotion()
    },
    // handle gross
    handleGross() {
      let rbpGross = this.wpPublish.formData.rbp_gross
      let promo = this.wpPublish.formData.promo
      this.wpPublish.formData.rbp_net = rbpGross -= promo
    },

    refreshFilter() {
      this.wpPublish.params.nm_tso = ''
      this.wpPublish.params.tahun = ''
      this.wpPublish.params.bulan = ''
      this.wpPublish.params.week = ''
      this.wpPublish.wpPublishList = []
      this.wpPublish.params.id_asm = null
    },
  },
}
</script>
