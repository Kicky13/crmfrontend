<template>
  <a-modal
    :title="`${ modalStatus ? 'Tambah Opsional Jawaban [' + pertanyaanTitle + ']' : 'Edit Opsional Jawaban'}`"
    :visible="modalVisible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item label="Jawaban">
        <a-input
          placeholder="Masukkan opsi jawaban"
          v-model:value="isNewJawaban"
        />
      </a-form-item>
      <a-form-item label="Poin">
        <a-input
          placeholder="Masukkan poin"
          v-model:value="isNewPoin"
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
    pertanyaanTitle: {
      type: String,
      default: '',
    },
    newJawaban: {
      type: String,
      default: '',
    },
    newPoin: {
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
      isNewJawaban: '',
      isNewPoin: '',
    }
  },
  watch: {
    newJawaban() {
      this.isNewJawaban = this.newJawaban
    },
    newPoin() {
      this.isNewPoin = this.newPoin
    },
  },
  methods: {
    handleOk() {
      const dataForm = {
        jawaban: this.isNewJawaban,
        poin: this.isNewPoin,
      }
      this.$emit('handleOk', this.modalStatus, dataForm)
      this.isNewJawaban = ''
      this.isNewPoin = ''
    },
    handleCancel() {
      this.$emit('handleCancel')
      this.isNewJawaban = this.newJawaban
      this.isNewPoin = this.newPoin
    },
  },
}
</script>