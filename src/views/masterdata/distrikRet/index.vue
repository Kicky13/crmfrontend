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
      :columns="distrikRET.columns"
      :data-source="distrikRET.distrikRetList"
    >
      <template #action="{ text }">
        <div>
          <button
            type="button"
            class="btn btn-info mr-1"
            data-toggle="tooltip"
            title="Tambah Distrik"
            @click="showTambahDistrikModal(text)"
          >
            <i class="fa fa-map-marker mx-1" />
          </button>
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
    title="Form Distrik RET"
    ok-text="Simpan"
    cancel-text="Batal"
    :on-ok="saveDistrikRet"
  >
    <a-input
      placeholder="Distrik RET"
      class="mb-3"
    />
    <a-textarea
      placeholder="Keterangan"
      :rows="5"
    />
  </a-modal>

  <!-- Add Distrik Modal -->
  <a-modal
    v-model:visible="tambahDistrikModal"
    title="Tambah Distrik"
    ok-text="Simpan"
    cancel-text="Batal"
    :on-ok="saveTambahDistrik"
  >
    <a-select
      placeholder="Distrik"
      class="w-100 mb-3"
      show-search
    >
      <a-select-option disabled value="">Pilih Distrik</a-select-option>
      <a-select-option value="distrik1">Distrik 1</a-select-option>
    </a-select>
  </a-modal>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      addModal: false,
      tambahDistrikModal: false,
    }
  },
  computed: {
    ...mapState({
      distrikRET: state => state.distrikRET.data,
    }),
  },
  methods: {
    showAddModal() {
      this.addModal = true
    },
    showEditModal(value) {},
    showDeleteModal(value) {},
    showTambahDistrikModal() {
      this.tambahDistrikModal = true
    },
    saveDistrikRet() {
      this.addModal = false
    },
    saveTambahDistrik(){
      this.tambahDistrikModal = false
    },
  },
}
</script>
