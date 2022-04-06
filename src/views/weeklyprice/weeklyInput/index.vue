<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="4">
        <a-select
          v-model:value="weeklyInput.params.tahun"
          placeholder="Tahun"
          show-search
          class="w-100"
        >
          <a-select-option disabled value="">Pilih Tahun</a-select-option>
          <a-select-option v-for="(tahun, index) in years" :value="tahun" :key="index">
            {{ tahun }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="4">
        <a-select
          v-model:value="weeklyInput.params.bulan"
          placeholder="Bulan"
          show-search
          class="w-100"
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
      <a-col :xs="24" :md="4">
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
      <a-col :xs="24" :md="12">
        <div class="d-flex justify-content-end">
          <a-button type="primary" class="mr-2" @click="showAddModal">
            <i class="fa fa-plus mr-2" />
            Tambah
          </a-button>
          <a-button type="primary" class="mr-2">
            <i class="fa fa-copy mr-2" />
            Duplicate Last Week
          </a-button>
          <a-button type="primary" @click="showConfirmModal">
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
    cancel-text="Batal"
    width=""
    :style="{ padding: '0 20px' }"
    :on-ok="saveWeeklyPrice"
  >
    <a-row :gutter="[24]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-select placeholder="Distrik" class="w-100 mb-4" show-search>
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option value="distrik1">Distrik 1</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select placeholder="Tahun" class="w-100 mb-4" show-search>
          <a-select-option disabled value="">Pilih Tahun</a-select-option>
          <a-select-option v-for="(tahun, index) in years" :value="tahun" :key="index">
            {{ tahun }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select placeholder="Bulan" class="w-100 mb-4" show-search>
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
        <a-select placeholder="Week" class="w-100 mb-4" show-search>
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
        <a-select placeholder="Produk" class="w-100 mb-4" show-search>
          <a-select-option disabled value="">Pilih Produk</a-select-option>
          <a-select-option value="produk1">Produk 1</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select placeholder="brand" class="w-100 mb-4" show-search>
          <a-select-option disabled value="">Pilih brand</a-select-option>
          <a-select-option
            v-for="(brand, index) in weeklyInput.brandList"
            :value="brand.ID"
            :key="index"
          >
            {{ brand.NAMA_BRAND }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select placeholder="Tipe" class="w-100 mb-4" show-search>
          <a-select-option disabled value="">Pilih Tipe</a-select-option>
          <a-select-option
            v-for="(type, index) in weeklyInput.tipeList"
            :value="type.ID"
            :key="index"
          >
            {{ type.NAMA_TIPE_SEMEN }}
          </a-select-option>
        </a-select>
      </a-col>

      <a-col :xs="24" :md="12" :lg="6">
        <a-select placeholder="Kemasan" class="w-100 mb-4" show-search>
          <a-select-option disabled value="">Pilih Kemasan</a-select-option>
          <a-select-option
            v-for="(kemasan, index) in weeklyInput.kemasanList"
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
        <a-input placeholder="RBP Gross" class=" mb-4" />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input placeholder="Promo" class=" mb-4" />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input placeholder="RBP Net" class=" mb-4" />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input placeholder="RSP" class=" mb-4" />
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      addModal: false,
    }
  },
  computed: {
    ...mapState({
      weeklyInput: state => state.weeklyInput.data,
    }),
    years() {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 2019 }, (value, index) => 2020 + index)
    },
  },
  async mounted() {
    await this.getMasterProduct()
    await this.getAllBrand()
    await this.getAllTipe()
    await this.getAllKemasan()
  },
  methods: {
    ...mapActions('weeklyInput', [
      'getAllKemasan',
      'getAllTipe',
      'getAllBrand',
      'getDataTable',
      'getMasterProduct',
      'getDistrik',
    ]),

    showAddModal() {
      this.addModal = true
    },
    showEditModal(value) {},
    showDeleteModal(value) {},
    showConfirmModal() {
      this.$confirm({
        title: 'Weekly Price Confirmation',
        content: 'Apakah anda yakin?',
        okText: 'Konfirmasi',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: () => {},
        onCancel: () => {},
      })
    },
    saveWeeklyPrice() {
      this.addModal = false
    },
    async handleSubmit() {
      if (
        this.weeklyInput.params.tahun != '' &&
        this.weeklyInput.params.bulan != '' &&
        this.weeklyInput.params.week != ''
      ) {
        await this.getDataTable()
        notification.success({
          message: 'Success',
          description: 'Data berhasil ditampilkan.',
        })
      } else {
        notification.error({
          message: 'Error',
          description: 'Mohon Maaf. Data tahun, bulan dan week harap diisi.',
        })
      }
    },
  },
}
</script>
