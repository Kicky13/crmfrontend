<template>
  <a-modal
    :title="`${ modalStatus ? 'Tambah Pertanyaan [' + jenisPenilaianTitle + ']' : 'Edit Pertanyaan'}`"
    :visible="modalVisible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item label="Pertanyaan">
        <a-input
          placeholder="Masukkan pertanyaan"
          v-model:value="isNewPertanyaan"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: {
    modalVisible: Boolean,
    modalStatus: Boolean,
    newPertanyaan: {
      type: String,
      default: '',
    },
    jenisPenilaianTitle: {
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
      isNewPertanyaan: '',
    }
  },
  watch: {
    newPertanyaan() {
      this.isNewPertanyaan = this.newPertanyaan
    },
  },
  methods: {
    handleOk() {
      this.$emit('handleOk', this.modalStatus, this.isNewPertanyaan)
      this.isNewPertanyaan = ''
    },
    handleCancel() {
      this.$emit('handleCancel')
      this.isNewPertanyaan = this.newPertanyaan
    },
  },
}
</script>