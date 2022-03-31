<template>
  <a-card class="card card-top card-top-primary">
    <a-row :gutter="[16, 16]" class="mb-3">
      <a-col :xs="24" :md="3">
        <a-select
          placeholder="ASM"
          show-search
          class="w-100"
        >
          <a-select-option disabled value="">Pilih ASM</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            ASM
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :xs="24" :md="3">
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
      <a-col :xs="24" :md="3">
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
      <a-col :xs="24" :md="3">
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
        <button
          type="button"
          class="btn btn-success mr-2"
          @click="showPublishModal"
        >
          <i class="fa fa-check mr-1" />
          Publish
        </button>
        <a-button
          type="primary"
        >
          <i class="fa fa-minus mr-2" />
          Reject
        </a-button>
      </div>
      </a-col>
    </a-row>
    <a-table
      :columns="wpPublish.columns"
      :data-source="wpPublish.wpPublishList"
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
      wpPublish: state => state.wpPublish.data,
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
    showPublishModal() {
      this.$confirm({
        title: 'Weekly Price Publish',
        content: 'Apakah anda yakin?',
        okText: 'Publish',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: () => {},
        onCancel: () => {},
      })
    },
  },
}
</script>
