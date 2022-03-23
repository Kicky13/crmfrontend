<template>
  <a-card class="card card-top card-top-primary">
    <div class="d-flex justify-content-between mb-3">
      <div>
        <a-select
          placeholder="Distrik"
          show-search
          class="mr-2"
        >
          <a-select-option disabled value="">Pilih Distrik</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Distrik
          </a-select-option>
        </a-select>
        <a-select
          placeholder="Tahun"
          show-search
          class="mr-2"
        >
          <a-select-option disabled value="">Pilih Tahun</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Tahun
          </a-select-option>
        </a-select>
        <a-select
          placeholder="Bulan"
          show-search
        >
          <a-select-option disabled value="">Pilih Bulan</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Bulan
          </a-select-option>
        </a-select>
      </div>
      <div>
        <a-button
          type="primary"
          class="mr-2"
          @click="showAddModal"
        >
          <i class="fa fa-plus mr-2" />
          Tambah
        </a-button>
      </div>
    </div>
    <a-table
      :columns="wpPromotion.columns"
      :data-source="wpPromotion.promotionList"
      :scroll="{ x: 1500 }"
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
    title="Form Promo"
    ok-text="Simpan"
    cancel-text="Batal"
    width=""
    :style="{ padding: '0 20px' }"
    :on-ok="savePromo"
  >
    <a-row :gutter="[24]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          placeholder="Distrik RET"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Distrik RET</a-select-option>
          <a-select-option value="distrikret1">Distrik RET 1</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input placeholder="Tanggal Mulai" class=" mb-4" />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input placeholder="Tanggal Selesai" class=" mb-4" />
      </a-col>
      <a-col :xs="24" :md="12" :lg="6" />
    </a-row>
    <a-row :gutter="[24]">
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          placeholder="Brand"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Brand</a-select-option>
          <a-select-option value="brand1">Brand 1</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          placeholder="Kategori"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Kategori</a-select-option>
          <a-select-option value="kategori1">Kategori 1</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-select
          placeholder="Program"
          class="w-100 mb-4"
          show-search
        >
          <a-select-option disabled value="">Pilih Program</a-select-option>
          <a-select-option value="program1">Program 1</a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="12" :lg="6">
        <a-input placeholder="Nilai ZAK" class=" mb-4" />
      </a-col>
    </a-row>
    <a-textarea
      placeholder="Mekanisme"
      :rows="5"
    />
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
      wpPromotion: state => state.wpPromotion.data,
    }),
  },
  methods: {
    showAddModal() {
      this.addModal = true
    },
    showEditModal(value) {},
    showDeleteModal(value) {},
    savePromo() {
      this.addModal = false
    },
  },
}
</script>
