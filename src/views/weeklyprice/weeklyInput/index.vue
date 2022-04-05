<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="4">
        <a-select
          placeholder="Tahun"
          show-search
          class="w-100"
        >
          <a-select-option disabled value="">Pilih Tahun</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Tahun
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="4">
        <a-select
          placeholder="Bulan"
          show-search
          class="w-100"
        >
          <a-select-option disabled value="">Pilih Bulan</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Bulan
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="4">
        <a-select
          placeholder="Week"
          show-search
          class="w-100"
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Week
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12">
        <div class="d-flex justify-content-end">
          <a-button
            type="primary"
            class="mr-2"
            @click="showAddModal"
          >
            <i class="fa fa-plus mr-2" />
            Tambah
          </a-button>
          <a-button
            type="primary"
            class="mr-2"
          >
            <i class="fa fa-copy mr-2" />
            Duplicate Last Week
          </a-button>
          <a-button
            type="primary"
            @click="showConfirmModal"
          >
            <i class="fa fa-upload mr-2" />
            Submit
          </a-button>
        </div>
      </a-col>
    </a-row>
    <a-table
      :columns="weeklyInput.columns"
      :data-source="weeklyInput.weeklyInputList"
      :scroll="{ x: 2000 }"
    >
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
        <a-select
          placeholder="Distrik"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option value="distrik1">Distrik 1</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          placeholder="Tahun"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Tahun</a-select-option>
          <a-select-option value="2022">2022</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          placeholder="Bulan"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Bulan</a-select-option>
          <a-select-option value="1">Januari</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          placeholder="Week"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option value="week1">Week 1</a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row :gutter="[24]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          placeholder="Produk"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Produk</a-select-option>
          <a-select-option value="produk1">Produk 1</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          placeholder="brand"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih brand</a-select-option>
          <a-select-option value="brand1">Brand 1</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          placeholder="Tipe"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Tipe</a-select-option>
          <a-select-option value="tipe1">Tipe 1</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          placeholder="Kemasan"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Kemasan</a-select-option>
          <a-select-option value="kemasan1">Kemasan 1</a-select-option>
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
import { mapState } from 'vuex'

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
  },
  methods: {
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
  },
}
</script>
