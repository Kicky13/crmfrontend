<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="5">
        <a-select
          v-model:value="wpApproval.params.nm_tso"
          placeholder="TSO"
          show-search
          class="w-100"
          @change="handleTSO"
        >
          <a-select-option disabled value="">Pilih TSO</a-select-option>
          <a-select-option
            v-for="(tso, index) in wpApproval.dataTSO"
            :value="tso.nm_user"
            :key="index"
          >
            {{ tso.id_m_hierarchy }} - {{ tso.nm_user }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-select
          v-model:value="wpApproval.params.tahun"
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
          v-model:value="wpApproval.params.bulan"
          placeholder="Bulan"
          show-search
          class="w-100"
          @change="handleBulan"
        >
          <a-select-option disabled value="">Bulan</a-select-option>
          <a-select-option
            v-for="(bulan, index) in wpApproval.data_bulan"
            :value="bulan.id"
            :key="index"
          >
            {{ bulan.name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
        <a-select
          v-model:value="wpApproval.params.week"
          placeholder="Week"
          show-search
          class="w-100"
          @change="handleWeek"
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            v-for="(week, index) in wpApproval.dataWeekly"
            :value="week.id"
            :key="index"
          >
            {{ week.name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="9">
        <div class="d-flex justify-content-end">
          <button
            :disabled="
              wpApproval.wpApprovalList.length == 0
                ? true
                : wpApproval.wpApprovalList == 0
                ? true
                : false
            "
            type="button"
            class="btn btn-success mr-2"
            @click="approveModal"
          >
            <i class="fa fa-check mr-1" />
            Approve
          </button>
          <a-button
            :disabled="
              wpApproval.wpApprovalList.length == 0
                ? true
                : wpApproval.wpApprovalList == 0
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
      :columns="wpApproval.columns"
      :data-source="wpApproval.wpApprovalList"
      :loading="wpApproval.isLoading"
      :pagination="wpApproval.pagination"
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
        <a-select
          :disabled="editdata != true ? false : true"
          v-model:value="wpApproval.formData.nama_distrik"
          placeholder="Distrik"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option
            v-for="(distrik, index) in wpApproval.dataDistrikRET"
            :value="distrik.nm_wilayah"
            :key="index"
          >
            {{ distrik.id_reference_wilayah }} - {{ distrik.nm_wilayah }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="editdata != true ? false : true"
          v-model:value="wpApproval.formData.tahun"
          placeholder="Tahun"
          class="w-100 mb-4"
          show-search
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
          v-model:value="wpApproval.formData.bulan"
          placeholder="Bulan"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Bulan</a-select-option>
          <a-select-option
            v-for="(bulan, index) in wpApproval.data_bulan"
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
          v-model:value="wpApproval.formData.week"
          placeholder="Week"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            v-for="(week, index) in wpApproval.dataWeekly"
            :value="week.id"
            :key="index"
          >
            {{ week.name }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row :gutter="[24]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          :disabled="editdata != true ? false : true"
          v-model:value="wpApproval.formData.nama_produk"
          placeholder="Produk"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Produk</a-select-option>
          <a-select-option
            v-for="(product, index) in wpApproval.dataProduct"
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
          v-model:value="wpApproval.formData.brand"
          placeholder="brand"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih brand</a-select-option>
          <a-select-option
            v-for="(brand, index) in wpApproval.brandList"
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
          v-model:value="wpApproval.formData.type"
          placeholder="Tipe"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Tipe</a-select-option>
          <a-select-option
            v-for="(type, index) in wpApproval.tipeList"
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
          v-model:value="wpApproval.formData.kemasan"
          placeholder="Kemasan"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Kemasan</a-select-option>
          <a-select-option
            v-for="(kemasan, index) in wpApproval.kemasanList"
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
          v-model:value="wpApproval.formData.rbp_gross"
          placeholder="RBP Gross"
          class=" mb-4 w-100"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="5" v-if="wpApproval.promoDistrik">
        <a-select
          :disabled="true"
          v-model:value="wpApproval.formData.promo"
          placeholder="0"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option :value="0">0</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="5" v-else>
        <a-select
          v-model:value="wpApproval.formData.promo"
          placeholder="Promo"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option
            v-for="(promo, index) in wpApproval.promoDistrik"
            :value="promo.nilai_zak"
            :key="index"
          >
            {{ promo.program }} - {{ promo.nilai_zak }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="1">
        <a-tooltip placement="topLeft">
          <template #title>
            <span>Refresh Promo</span>
          </template>
          <a-button
            :disabled="
              wpApproval.formData.id_distrik == null ||
              wpApproval.formData.tahun == `` ||
              wpApproval.formData.bulan == ``
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
      <!-- <a-col :xs="24" :md="12" :lg="6">
        <a-input-number
          type="number"
          v-model:value="wpApproval.formData.promo"
          placeholder="Promo"
          class=" mb-4 w-100"
        />
      </a-col> -->
      <a-col :xs="24" :md="12" :lg="6">
        <a-input-number
          :disabled="true"
          type="number"
          v-model:value="wpApproval.formData.rbp_net"
          placeholder="RBP Net"
          class="mb-4 w-100"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input-number
          type="number"
          v-model:value="wpApproval.formData.rsp"
          placeholder="RSP"
          class=" mb-4 w-100"
        />
      </a-col>
    </a-row>
    <div class="row">
      <div class="col-md-12">
        <a-textarea v-model:value="wpApproval.formData.notes" show-count :maxlength="100" />
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
      wpApproval: state => state.wpApproval.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    await this.getDataTSO({
      id_atasan: this.$store.state.user.idJabatan,
    })
    await this.getMasterProduct()
  },
  methods: {
    ...mapActions('wpApproval', [
      'updateDataWeekly',
      'submitReject',
      'submitApprove',
      'getDataTSO',
      'getDataTable',
      'getDistrik',
      'getMasterProduct',
      'getPromotion',
    ]),
    // Edit Modal
    async showEditModal(value) {
      this.addModal = true
      this.editdata = true
      this.uuid = value.uuid
      await this.$store.commit('wpApproval/changeWPApproval', {
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
        },
      })
    },

    // Save Modal
    async saveWeeklyPrice() {
      if (
        this.wpApproval.formData.id_distrik != null &&
        this.wpApproval.formData.tahun != '' &&
        this.wpApproval.formData.bulan != '' &&
        this.wpApproval.formData.week != '' &&
        this.wpApproval.formData.id_produk != null &&
        this.wpApproval.formData.rbp_gross != null &&
        this.wpApproval.formData.promo != null &&
        this.wpApproval.formData.rbp_net != null &&
        this.wpApproval.formData.rsp != null
      ) {
        if (this.editdata == true) {
          await this.updateDataWeekly({
            uuid: this.uuid,
          })
          if (this.wpApproval.status == 'sukses') {
            await this.$store.commit('wpApproval/changeWPApproval', {
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
        title: 'Weekly Price Approval',
        content: 'Apakah anda yakin akan melakukan approve pada data ini?',
        okText: 'Approve',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.submitApprove()
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
    async handleTSO() {
      // filter berdasarkan nama
      let dataSource = [...this.wpApproval.dataTSO]
      let filtered = dataSource.filter(x => x.nm_user == this.wpApproval.params.nm_tso)
      this.wpApproval.params.id_tso = filtered[0].id_m_hierarchy

      await this.getDistrik({
        id_tso: this.wpApproval.params.id_tso,
      })

      // validasi
      if (
        this.wpApproval.params.tahun != '' &&
        this.wpApproval.params.bulan != '' &&
        this.wpApproval.params.week != '' &&
        this.wpApproval.params.id_tso != ''
      ) {
        await this.getDataTable()
      } else {
      }
    },
    async handleTahun() {
      // validasi
      if (
        this.wpApproval.params.tahun != '' &&
        this.wpApproval.params.bulan != '' &&
        this.wpApproval.params.week != '' &&
        this.wpApproval.params.id_tso != ''
      ) {
        await this.getDataTable()
      } else {
      }
    },
    async handleBulan() {
      // validasi
      if (
        this.wpApproval.params.tahun != '' &&
        this.wpApproval.params.bulan != '' &&
        this.wpApproval.params.week != '' &&
        this.wpApproval.params.id_tso != ''
      ) {
        await this.getDataTable()
      } else {
      }
    },
    async handleWeek() {
      // validasi
      if (
        this.wpApproval.params.tahun != '' &&
        this.wpApproval.params.bulan != '' &&
        this.wpApproval.params.week != '' &&
        this.wpApproval.params.id_tso != ''
      ) {
        await this.getDataTable()
      } else {
      }
    },
    async handleDataPromo() {
      await this.getPromotion()
    },
    // handle gross
    handleGross() {
      let rbpGross = this.wpApproval.formData.rbp_gross
      let promo = this.wpApproval.formData.promo
      this.wpApproval.formData.rbp_net = rbpGross -= promo
    },
  },
}
</script>
