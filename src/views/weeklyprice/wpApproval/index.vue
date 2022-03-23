<template>
  <a-card class="card card-top card-top-primary">
    <div class="d-flex justify-content-between mb-3">
      <div>
        <a-select
          placeholder="TSO"
          show-search
          class="mr-2"
        >
          <a-select-option disabled value="">Pilih TSO</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            TSO
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
          class="mr-2"
        >
          <a-select-option disabled value="">Pilih Bulan</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Bulan
          </a-select-option>
        </a-select>
        <a-select
          placeholder="Week"
          show-search
        >
          <a-select-option disabled value="">Pilih Week</a-select-option>
          <a-select-option
            data-toggle="tooltip"
            data-placement="top"
          >
            Week
          </a-select-option>
        </a-select>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-success mr-2"
          @click="showApproveModal"
        >
          <i class="fa fa-check mr-1" />
          Approve
        </button>
        <a-button
          type="primary"
        >
          <i class="fa fa-minus mr-2" />
          Reject
        </a-button>
      </div>
    </div>
    <a-table
      :columns="wpApproval.columns"
      :data-source="wpApproval.wpApprovalList"
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
      wpApproval: state => state.wpApproval.data,
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
    showApproveModal() {
      this.$confirm({
        title: 'Weekly Price Approval',
        content: 'Apakah anda yakin?',
        okText: 'Approve',
        okType: 'primary',
        cancelText: 'Batal',
        onOk: () => {},
        onCancel: () => {},
      })
    },
  },
}
</script>
