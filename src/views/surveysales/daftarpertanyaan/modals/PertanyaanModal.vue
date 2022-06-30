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
    <a-form
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <a-form-item label="Jenis Isian">
        <a-select
          placeholder="Pilih jenis isian"
          v-model:value="isNewIsian"
        >
          <a-select-option disabled value="">Pilih jenis isian</a-select-option>
          <a-select-option value="0">Pilih salah satu</a-select-option>
          <a-select-option value="1">Pilih beberapa</a-select-option>
          <a-select-option value="2">Isian</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { notification } from 'ant-design-vue'

export default {
  props: {
    modalVisible: Boolean,
    modalStatus: Boolean,
    newPertanyaan: {
      type: String,
      default: '',
    },
    newPIsian: {
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
      isNewIsian: '',
    }
  },
  watch: {
    newPertanyaan() {
      this.isNewPertanyaan = this.newPertanyaan
    },
    newIsian() {
      this.isNewIsian = this.newIsian
    },
  },
  methods: {
    handleOk() {
      this.isNewPertanyaan = this.isNewPertanyaan.trim()
      if (!this.isNewPertanyaan) {
        notification.error({
          message: 'Tambah Pertanyaan',
          description: 'Kolom pertanyaan masih kosong',
        })
        return
      }

      if (!this.isNewIsian) {
        notification.error({
          message: 'Tambah Pertanyaan',
          description: 'Kolom jenis isian masih kosong',
        })
        return
      }

      const formData = {
        pertanyaan: this.isNewPertanyaan,
        isian: this.isNewIsian,
      }
      this.$emit('handleOk', this.modalStatus, formData)
      this.isNewPertanyaan = ''
      this.isNewIsian = ''
    },
    handleCancel() {
      this.$emit('handleCancel')
      this.isNewPertanyaan = this.newPertanyaan
      this.isNewIsian = this.newIsian
    },
  },
}
</script>