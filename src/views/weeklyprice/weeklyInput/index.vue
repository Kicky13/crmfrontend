<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="4">
        <a-select
          v-model:value="weeklyInput.params.tahun"
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
      <a-col :xs="24" :md="3">
        <a-select
          v-model:value="weeklyInput.params.bulan"
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
      <a-col :xs="24" :md="3">
        <a-select
          v-model:value="weeklyInput.params.week"
          placeholder="Week"
          show-search
          class="w-100"
          @change="handleSubmit"
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            v-for="(week, index) in weeklyInput.dataWeekly"
            :value="week.id"
            :key="index"
          >
            {{ week.name }}
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

      <a-col :xs="24" :md="12">
        <div class="d-flex justify-content-end">
          <a-button type="primary" class="mr-2" @click="showAddModal">
            <i class="fa fa-plus mr-2" />
            Tambah
          </a-button>
          <a-button type="primary" @click="showConfirmDuplicate" class="mr-2">
            <i class="fa fa-copy mr-2" />
            Duplicate Last Week
          </a-button>
          <a-button
            type="primary"
            :disabled="
              weeklyInput.dataTable.length == 0 ? true : weeklyInput.dataTable == 0 ? true : false
            "
            @click="showConfirmModal"
          >
            <i class="fa fa-upload mr-2" />
            Submit
          </a-button>
        </div>
      </a-col>
    </a-row>
    <a-table
      ref="table"
      :columns="weeklyInput.columns"
      :data-source="weeklyInput.dataTable"
      :loading="weeklyInput.isLoading"
      :pagination="weeklyInput.pagination"
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
  </a-card>

  <!-- Add Modal -->
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
          v-model:value="weeklyInput.formData.nama_distrik"
          placeholder="Distrik"
          class="w-100 mb-4"
          show-search
          @change="handleDistrik()"
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option
            v-for="(distrik, index) in weeklyInput.dataDistrikRET"
            :value="distrik.nama_distrik"
            :key="index"
          >
            {{ distrik.id_distrik }} - {{ distrik.nama_distrik }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          v-model:value="weeklyInput.formData.tahun"
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
          v-model:value="weeklyInput.formData.bulan"
          placeholder="Bulan"
          class="w-100 mb-4"
          show-search
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
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          v-model:value="weeklyInput.formData.week"
          placeholder="Week"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            v-for="(week, index) in weeklyInput.dataWeekly"
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
          v-model:value="weeklyInput.formData.nama_produk"
          placeholder="Produk"
          class="w-100 mb-4"
          show-search
          @change="handleProduct()"
        >
          <a-select-option disabled value="">Pilih Produk</a-select-option>
          <a-select-option
            v-for="(product, index) in weeklyInput.dataProduct"
            :value="product.NAMA_PRODUK"
            :key="index"
          >
            {{ product.ID }} - {{ product.NAMA_PRODUK }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <!-- <a-select
          :disabled="true"
          v-model:value="weeklyInput.formData.brand"
          placeholder="brand"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih brand</a-select-option>
          <a-select-option
            v-for="(brand, index) in weeklyInput.brandList"
            :value="brand.ID"
            :key="index"
          >
            {{ brand.NAMA_BRAND }}
          </a-select-option>
        </a-select> -->
        <a-input
          :disabled="true"
          v-model:value="weeklyInput.formData.brand"
          placeholder="Brand"
          class=" mb-4 w-100"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <!-- <a-select
          :disabled="true"
          v-model:value="weeklyInput.formData.type"
          placeholder="Tipe"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Tipe</a-select-option>
          <a-select-option
            v-for="(type, index) in weeklyInput.tipeList"
            :value="type.ID"
            :key="index"
          >
            {{ type.NAMA_TIPE_SEMEN }}
          </a-select-option>
        </a-select> -->

        <a-input
          :disabled="true"
          v-model:value="weeklyInput.formData.type"
          placeholder="Tipe"
          class=" mb-4 w-100"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <!-- <a-select
          :disabled="true"
          v-model:value="weeklyInput.formData.kemasan"
          placeholder="Kemasan"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Kemasan</a-select-option>
          <a-select-option
            v-for="(kemasan, index) in weeklyInput.kemasanList"
            :value="kemasan.ID"
            :key="index"
          >
            {{ kemasan.NAMA_KEMASAN }}
          </a-select-option>
        </a-select> -->

        <a-input
          :disabled="true"
          v-model:value="weeklyInput.formData.kemasan"
          placeholder="Kemasan"
          class=" mb-4 w-100"
        />
      </a-col>
    </a-row>
    <a-row :gutter="[24]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-input-number
          :min="1"
          :max="100000"
          v-model:value="weeklyInput.formData.rbp_gross"
          placeholder="RBP Gross"
          class=" mb-4 w-100"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input-number
          :min="1"
          :max="100000"
          v-model:value="weeklyInput.formData.promo"
          placeholder="Promo"
          class=" mb-4 w-100"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input-number
          :min="1"
          :max="100000"
          v-model:value="weeklyInput.formData.rbp_net"
          placeholder="RBP Net"
          class=" mb-4 w-100"
        />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input-number
          :min="1"
          :max="100000"
          v-model:value="weeklyInput.formData.rsp"
          placeholder="RSP"
          class=" mb-4 w-100"
        />
      </a-col>
    </a-row>
    <div class="row">
      <div class="col-md-12">
        <a-textarea v-model:value="weeklyInput.formData.notes" show-count :maxlength="100" />
      </div>
    </div>
  </a-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { notification } from 'ant-design-vue'

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
      weeklyInput: state => state.weeklyInput.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2021 }, (value, index) => 2022 + index)
    },
  },
  async mounted() {
    await this.getMasterProduct()
    await this.getAllBrand()
    await this.getAllTipe()
    await this.getAllKemasan()
    await this.getDistrik()
  },
  methods: {
    ...mapActions('weeklyInput', [
      'getAllKemasan',
      'getAllTipe',
      'getAllBrand',
      'getDataTable',
      'getMasterProduct',
      'getDistrik',
      'deleteDataRow',
      'insertDataWeekly',
      'updateDataWeekly',
      'submitDataWeekly',
      'duplicateDataWeekly',
    ]),

    async showAddModal() {
      this.addModal = true
      await this.$store.commit('weeklyInput/changeWeeklyInput', {
        formData: {
          id_distrik: null,
          tahun: '',
          bulan: '',
          week: '',
          id_produk: null,
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
      this.editdata = false
    },
    async showEditModal(value) {
      this.addModal = true
      this.editdata = true
      this.uuid = value.uuid
      console.log(`---value`, value)
      await this.$store.commit('weeklyInput/changeWeeklyInput', {
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
    showConfirmModal() {
      this.$confirm({
        title: 'Weekly Price Confirmation',
        content: 'Apakah anda yakin?',
        okText: 'Konfirmasi',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.submitDataWeekly()
          await this.getDataTable()
        },
        onCancel: () => {},
      })
    },
    showConfirmDuplicate() {
      this.$confirm({
        title: 'Weekly Price Confirmation',
        content: 'Apakah anda yakin menduplikat dari minggu sebelumnya?',
        okText: 'Konfirmasi',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: async () => {
          await this.duplicateDataWeekly()
        },
        onCancel: () => {},
      })
    },
    async saveWeeklyPrice() {
      if (
        this.weeklyInput.formData.id_distrik != null &&
        this.weeklyInput.formData.tahun != '' &&
        this.weeklyInput.formData.bulan != '' &&
        this.weeklyInput.formData.week != '' &&
        this.weeklyInput.formData.id_produk != null &&
        this.weeklyInput.formData.rbp_gross != null &&
        this.weeklyInput.formData.rbp_net != null &&
        this.weeklyInput.formData.rsp != null
      ) {
        if (this.editdata == true) {
          await this.updateDataWeekly({
            uuid: this.uuid,
          })
          if (this.weeklyInput.status == 'sukses') {
            await this.$store.commit('weeklyInput/changeWeeklyInput', {
              formData: {
                id_distrik: null,
                tahun: '',
                bulan: '',
                week: '',
                id_produk: null,
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
        } else {
          await this.insertDataWeekly()
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
    async handleChangeTahun() {
      if (
        this.weeklyInput.params.tahun != '' &&
        this.weeklyInput.params.bulan != '' &&
        this.weeklyInput.params.week != ''
      ) {
        await this.getDataTable()
        // notification.success({
        //   message: 'Success',
        //   description: 'Data berhasil ditampilkan.',
        // })
      } else {
        // notification.error({
        //   message: 'Error',
        //   description: 'Mohon Maaf. Data tahun, bulan dan week harap diisi.',
        // })
      }
    },
    async handleChangeBulan() {
      if (
        this.weeklyInput.params.tahun != '' &&
        this.weeklyInput.params.bulan != '' &&
        this.weeklyInput.params.week != ''
      ) {
        await this.getDataTable()
        // notification.success({
        //   message: 'Success',
        //   description: 'Data berhasil ditampilkan.',
        // })
      } else {
        // notification.error({
        //   message: 'Error',
        //   description: 'Mohon Maaf. Data tahun, bulan dan week harap diisi.',
        // })
      }
    },
    async handleSubmit() {
      if (
        this.weeklyInput.params.tahun != '' &&
        this.weeklyInput.params.bulan != '' &&
        this.weeklyInput.params.week != ''
      ) {
        await this.getDataTable()
        // notification.success({
        //   message: 'Success',
        //   description: 'Data berhasil ditampilkan.',
        // })
      } else {
        // notification.error({
        //   message: 'Error',
        //   description: 'Mohon Maaf. Data tahun, bulan dan week harap diisi.',
        // })
      }
    },
    handleProduct() {
      let dataSource = [...this.weeklyInput.dataProduct]
      let filtered = dataSource.filter(x => x.NAMA_PRODUK == this.weeklyInput.formData.nama_produk)
      this.weeklyInput.formData.id_produk = filtered[0].ID
      this.weeklyInput.formData.brand = filtered[0].NAMA_BRAND
      this.weeklyInput.formData.type = filtered[0].NM_TYPE_PRODUK
      this.weeklyInput.formData.kemasan = filtered[0].NAMA_KEMASAN
    },

    handleDistrik() {
      let dataSource = [...this.weeklyInput.dataDistrikRET]
      let filtered = dataSource.filter(
        x => x.nama_distrik == this.weeklyInput.formData.nama_distrik,
      )
      this.weeklyInput.formData.id_distrik = filtered[0].id_distrik
    },
    refreshFilter() {
      this.weeklyInput.params.tahun = ''
      this.weeklyInput.params.bulan = ''
      this.weeklyInput.params.week = ''
      this.weeklyInput.dataTable = []
    },
  },
}
</script>
