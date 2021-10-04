<template>
  <div class="card card-top card-top-primary">
    <div class="card-header">
      <vb-headers-card-header :data="{ title: 'Form Tambah Program' }" />
    </div>
    <div class="card-body">
      <a-form :model="formState" label-align="left" layout="vertical" :rules="rules">
        <a-form-item label="Program Name" name="program_title">
          <a-input v-model:value="formState.program_title" class="input-style" />
        </a-form-item>
        <a-form-item label="Description" name="program_detail">
          <quill-editor style="height: 200px" v-model:value="formState.program_detail" />
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
        <a-form-item label="Start Date" name="start_date" style="font-weight:bold">
          <a-input type="date" v-model:value="formState.start_date" placeholder="Enter Start Date" />
        </a-form-item>
        <a-form-item label="Finish Date" name="finish_date" style="font-weight:bold">
          <a-input type="date" v-model:value="formState.finish_date" placeholder="Enter Finish Date" />
        </a-form-item>
        <a-form-item>
          <button class="btn btn-main text-nowrap pull-left" @click="onSubmit">

            Tambah
          </button>
          <router-link class="btn text-nowrap pull-left ml-3" to="/marketing/program">

            Cancel
          </router-link>


        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
  import {
    quillEditor,
  } from 'vue3-quill'
  import {
    defineComponent,
    reactive,
    toRaw,
  } from 'vue'
  import {
    storePost,
  } from '@/services/connection/program/api'
  import {
    useRouter,
  } from 'vue-router'
  import {
    message,
  } from 'ant-design-vue';
  import VbHeadersCardHeader from '../header/Header'

  export default defineComponent({
    components: {
      // InboxOutlined,
      VbHeadersCardHeader,
      quillEditor,
    },
    setup() {
      const rules = {
        program_title: [{
          required: true,
          message: 'Masukkan Program Name!',
          type: 'string',
        } ],
        program_detail: [{
          required: true,
          message: 'Masukkan Description!',
          type: 'string',
        } ],
        start_date: [{
          required: true,
          message: 'Masukkan Tanggal Mulai!',
          type: 'date',
        } ],
        finish_date: [{
          required: true,
          message: 'Masukkan Tanggal Selesai!',
          type: 'date',
        } ],
      }
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
           console.log(response)
          })
      }

      const formState = reactive({
        post_date: getCurrentDate(),
        // post_time: getCurrentTime(),
        program_title: '',
        // post_slug: 'program_name',
        program_detail: '',
        start_date: '',
        finish_date: '',
        // publication_status: 'Draft',
        // tag: 'bcd542e2-3292-45bc-8c82-27832cb80171',
      })

      const onSubmit = () => {
        const config = {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        }

        if (formState.program_title && formState.program_detail && formState.start_date && formState.finish_date) {

          addNewPost(toRaw(formState), config)
           formState.post_date = ''
          // formState.post_time = ''
          formState.program_title = ''
          // formState.post_slug = 'program_name'
          formState.program_detail = ''
          // formState.publication_status = 'Draft'
          // formState.tag = 'bcd542e2-3292-45bc-8c82-27832cb80172'
          formState.start_date = ''
          formState.finish_date = ''
          router.push('/marketing/program')
          message.success('Program berhasil ditambahkan')
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      }

      return {
        rules,
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
<style scoped>
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .input-style:hover,
  .input-style:focus,
  .input-style:active {
    border-color: #b20838;
  }

</style>
