<template>
  <a-form :model="formState" label-align="left" layout="vertical">
    <a-form-item label="Judul">
      <a-input v-model:value="formState.title" />
    </a-form-item>
    <a-form-item label="Kategori">
      <a-select v-model:value="formState.category">
        <a-select-option value="bola">Bola</a-select-option>
        <a-select-option value="lifestyle">Lifestyle</a-select-option>
        <a-select-option value="teknologi">Teknologi</a-select-option>
        <a-select-option value="travel">Travel</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Konten">
      <quill-editor style="height: 200px"></quill-editor>
    </a-form-item>
    <a-form-item label="Unggah Gambar">
      <a-upload-dragger>
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">Klik atau seret gambar di sini untuk mengunggah</p>
        <p class="ant-upload-hint">
          Mendukung untuk unggahan satu atau lebih dari satu gambar. Dilarang keras mengunggah data perusahaan atau
          berkas penting lainnya
        </p>
      </a-upload-dragger>
    </a-form-item>
    <a-form-item>
      <button class="btn btn-main btn-with-addon text-nowrap" type="submit">
        <span class="btn-addon">
          <i class="btn-addon-icon fe fe-plus-circle"></i>
        </span>
        Tambah
      </button>
    </a-form-item>
  </a-form>
</template>
<script>
import { quillEditor } from 'vue3-quill'
import { InboxOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, toRaw } from 'vue'

export default defineComponent({
  components: {
    InboxOutlined,
    quillEditor,
  },
  setup() {
    const formState = reactive({
      email: '',
      password: '',
      address: '',
      address2: '',
      state: '',
      city: [],
      zip: '',
      agree: false,
    })

    const onSubmit = () => {
      console.log('submit!', toRaw(formState))
    }

    return {
      formState,
      onSubmit,
    }
  },
})
</script>
