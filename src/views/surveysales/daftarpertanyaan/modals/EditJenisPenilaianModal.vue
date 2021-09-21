<template>
  <a-modal
    title="Edit Jenis Penilaian"
    :visible="modalVisible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="Jenis Penilaian">
        <a-input
          placeholder="Masukkan jenis penilaian"
          v-model:value="isNewJenisPenilaian"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: {
    modalVisible: Boolean,
    newJenisPenilaian: {
      type: String,
      default: '',
    },
  },
  emits: [
    'handleOk',
    'handleCancel',
  ],
  data() {
    return {
      isNewJenisPenilaian: '',
    }
  },
  watch: {
    newJenisPenilaian() {
      this.isNewJenisPenilaian = this.newJenisPenilaian
    },
  },
  methods: {
    handleOk() {
      this.$emit('handleOk', this.isNewJenisPenilaian)
    },
    handleCancel() {
      this.$emit('handleCancel')
      this.isNewJenisPenilaian = this.newJenisPenilaian
    },
  },
}
</script>