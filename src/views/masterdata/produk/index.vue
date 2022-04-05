<template>
  <a-card class="card card-top card-top-primary">
    <div class="d-flex justify-content-end mb-3">
      <a-button
        type="primary"
        @click="showAddModal"
      >
        <i class="fa fa-plus mr-2" />
        Tambah
      </a-button>
    </div>
    <a-table
      :columns="produk.columns"
      :data-source="produk.produkList"
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
    title="Form Produk"
    ok-text="Simpan"
    cancel-text="Batal"
    :on-ok="saveProduk"
  >
    <a-input
      placeholder="Nama Produk"
      class="mb-3"
    />
    <a-select
      placeholder="Brand"
      class="w-100 mb-3"
      show-search
    >
      <a-select-option disabled value="">Pilih Brand</a-select-option>
      <a-select-option value="brand1">Brand 1</a-select-option>
    </a-select>
    <a-select
      placeholder="Tipe"
      class="w-100 mb-3"
      show-search
    >
      <a-select-option disabled value="">Pilih Tipe</a-select-option>
      <a-select-option value="tipe1">Tipe 1</a-select-option>
    </a-select>
    <a-select
      placeholder="Kemasan"
      class="w-100"
      show-search
    >
      <a-select-option disabled value="">Pilih Kemasan</a-select-option>
      <a-select-option value="kemasan1">Kemasan 1</a-select-option>
    </a-select>
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
      produk: state => state.produk.data,
    }),
  },
  methods: {
    showAddModal() {
      this.addModal = true
    },
    showEditModal(value) {},
    showDeleteModal(value) {},
    saveProduk() {
      this.addModal = false
    },
  },
}
</script>
