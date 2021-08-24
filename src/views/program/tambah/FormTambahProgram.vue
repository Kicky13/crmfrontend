<template>
  <a-form :model="formState" label-align="left" layout="vertical">
    <a-form-item label="Program Name" style="font-weight:bold">
      <a-input v-model:value="formState.post_title" placeholder="Enter Program Name"/>
    </a-form-item>
    <a-form-item label="Description" style="font-weight:bold">
      <textarea v-model="formState.post_detail" placeholder="Enter Description" rows="5" style="width:100%;border-radius:15px"></textarea>
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
        <router-link class="btn btn-default btn-with-addon text-nowrap pull-right ml-3" to="/program">
        <span class="btn-addon">
          <i class="btn-addon-icon fa fa-window-close"></i>
        </span>
        Cancel
      </router-link>
      <button class="btn btn-main btn-with-addon text-nowrap pull-right" @click="onSubmit">
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
import { storePost } from '@/services/connection/apiService'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';

export default defineComponent({
  components: {
    // InboxOutlined,
    // quillEditor,
  },
  setup() {
    const router = useRouter()

    const getCurrentDate = () => {
      const today = new Date()
      const date = String(today.getDate()).padStart(2, '0')
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const year = today.getFullYear()

      return `${date}-${month}-${year}`
    }

    const getCurrentTime = () => {
      const today = new Date();
      const hour = String(today.getHours()).padStart(2, '0')
      const minute = String(today.getMinutes()).padStart(2, '0')

      return `${hour}:${minute}`
    }
    
    const addNewPost = (param, config) => {
      storePost(param, config)
      .then(response => {
        if (response) {}
      })
    }

    const formState = reactive({
      post_date: getCurrentDate(),
      post_time: getCurrentTime(),
      post_title: '',
      post_slug: 'judul_artikel',
      post_detail: '',
      startDate:'',
      FinishDate:'',
      publication_status: 'Draft',
      tag: 'bcd542e2-3292-45bc-8c82-27832cb80171',
    })

    const onSubmit = () => {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
    }
     addNewPost(toRaw(formState), config)
      formState.post_date = ''
      formState.post_time = ''
      formState.post_title = ''
      formState.post_slug = 'judul_artikel'
      formState.startDate = ''
      formState.publication_status = 'Draft'
      formState.tag = 'bcd542e2-3292-45bc-8c82-27832cb80172'
      formState.startDate =''
      formState.FinishDate=''
      router.push('/program')
      message.success('Program berhasil ditambahkan')
    }

    return {
      formState,
      onSubmit,
    }
  },
  
  methods: {
    handleCancel() {
      this.previewVisible = false
    },
    
    
  },
})
</script>
