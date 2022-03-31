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
      :columns="brand.columns"
      :data-source="brand.brandList"
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
    title="Form Brand"
    ok-text="Simpan"
    cancel-text="Batal"
    :on-ok="saveBrand"
  >
    <a-input
      placeholder="Brand"
    />
    <a-select placeholder="Perusahaan" class="w-100 my-3">
      <a-select-option disabled value="">Pilih Perusahaan</a-select-option>
      <a-select-option data-toggle="tooltip" data-placement="top">Perusahaan</a-select-option>
    </a-select>
    <a-textarea
      placeholder="Keterangan"
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
      brand: state => state.brand.data,
    }),
  },
  methods: {
    showAddModal() {
      this.addModal = true
    },
    showEditModal(value) {},
    showDeleteModal(value) {},
    saveBrand() {
      this.addModal = false
    },
  },
}
</script>
