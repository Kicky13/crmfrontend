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
      :columns="weeklyConfig.columns"
      :data-source="weeklyConfig.weeklyConfigList"
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
    title="Form Weekly Config"
    ok-text="Simpan"
    cancel-text="Batal"
    :on-ok="saveWeeklyConfig"
  >
    <a-input
      placeholder="Week Name"
      class="mb-3"
    />
    <a-input
      placeholder="Tanggal Mulai"
      class="mb-3"
    />
    <a-input
      placeholder="Tanggal Selesai"
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
      weeklyConfig: state => state.weeklyConfig.data,
    }),
  },
  methods: {
    showAddModal() {
      this.addModal = true
    },
    showEditModal(value) {},
    showDeleteModal(value) {},
    saveWeeklyConfig() {
      this.addModal = false
    },
  },
}
</script>
