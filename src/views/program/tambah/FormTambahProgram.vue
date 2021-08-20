<template>
  <a-form :model="formState" label-align="left" layout="vertical">
    <a-form-item label="Program Name" style="font-weight:bold">
      <a-input v-model:value="formState.title" placeholder="Enter Program Name"/>
    </a-form-item>
    <a-form-item label="Description" style="font-weight:bold">
      <textarea v-model="description" placeholder="Enter Description" rows="5" style="width:100%;border-radius:15px"></textarea>
    </a-form-item>
    <!-- <a-form-item label="Konten">
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
    </a-form-item> -->
    <a-form-item label="Start Date" style="font-weight:bold">
      <a-input type="date" v-model:value="formState.startDate" placeholder="Enter Start Date"/>
    </a-form-item>
    <a-form-item label="Finish Date" style="font-weight:bold">
      <a-input type="date" v-model:value="formState.FinishDate" placeholder="Enter Finish Date"/>
    </a-form-item>
    <a-form-item>
        <a class="btn btn-default btn-with-addon text-nowrap pull-right ml-3" href="#/program">
        <span class="btn-addon">
          <i class="btn-addon-icon fa fa-window-close"></i>
        </span>
        Cancel
      </a>
      <button class="btn btn-main btn-with-addon text-nowrap pull-right" type="submit">
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
    // InboxOutlined,
    // quillEditor,
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
