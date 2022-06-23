<template>
  <a-modal
    title="Tambah Sesi Penilaian"
    :visible="modalVisible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="Sesi Penilaian">
        <a-input
          placeholder="Masukkan sesi penilaian"
          v-model:value="isNewSesiPenilaian"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: {
    modalVisible: Boolean,
    newSesiPenilaian: {
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
      isNewSesiPenilaian: '',
    }
  },
  watch: {
    newSesiPenilaian() {
      this.isNewSesiPenilaian = this.newSesiPenilaian
    },
  },
  methods: {
    handleOk() {
      this.$emit('handleOk', this.isNewSesiPenilaian)
      this.isNewSesiPenilaian = ''
    },
    handleCancel() {
      this.$emit('handleCancel')
      this.isNewSesiPenilaian = this.newSesiPenilaian
    },
  },
}
</script>