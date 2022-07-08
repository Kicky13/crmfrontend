<template>
  <a-modal
    :title="
      `${
        modalStatus ? 'Tambah Opsional Jawaban [' + pertanyaanTitle + ']' : 'Edit Opsional Jawaban'
      }`
    "
    :visible="modalVisible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="Jawaban">
        <a-input placeholder="Masukkan opsi jawaban" v-model:value="isNewJawaban" />
      </a-form-item>
      <a-form-item label="Poin">
        <a-input placeholder="Masukkan poin" v-model:value="isNewPoin" />
      </a-form-item>
    </a-form>
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="Jenis Isian">
        <a-select placeholder="Pilih jenis isian" v-model:value="isNewIsian">
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
    pertanyaanTitle: {
      type: String,
      default: '',
    },
    newJawaban: {
      type: String,
      default: '',
    },
    newIsian: {
      type: String,
      default: '',
    },
    newPoin: {
      type: String,
      default: '',
    },
  },
  emits: ['handleOk', 'handleCancel'],
  data() {
    return {
      isNewJawaban: '',
      isNewPoin: '',
      isNewIsian: '',
    }
  },
  watch: {
    newJawaban() {
      this.isNewJawaban = this.newJawaban
    },
    newPoin() {
      this.isNewPoin = this.newPoin
    },
    newIsian() {
      this.isNewIsian = this.newIsian
    },
  },
  methods: {
    handleOk() {
      this.isNewJawaban = this.isNewJawaban.trim()
      this.isNewPoin = this.isNewPoin.trim()
      this.isNewIsian = this.isNewIsian.trim()

      if (!this.isNewJawaban) {
        notification.error({
          message: 'Tambah Jawaban',
          description: 'Kolom jawaban masih kosong',
        })
        return
      }

      if (!this.isNewPoin) {
        notification.error({
          message: 'Tambah Jawaban',
          description: 'Kolom poin masih kosong',
        })
        return
      }

      if (!this.isNewIsian) {
        notification.error({
          message: 'Tambah Jawaban',
          description: 'Kolom jenis isian masih kosong',
        })
        return
      }

      const dataForm = {
        jawaban: this.isNewJawaban,
        poin: this.isNewPoin,
        jenis_isian: this.isNewIsian,
      }
      this.$emit('handleOk', this.modalStatus, dataForm)
      this.isNewJawaban = ''
      this.isNewPoin = ''
      this.isNewIsian = ''
    },
    handleCancel() {
      this.$emit('handleCancel')
      this.isNewJawaban = this.newJawaban
      this.isNewPoin = this.newPoin
      this.isNewIsian = this.newIsian
    },
  },
}
</script>
