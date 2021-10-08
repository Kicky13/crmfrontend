<template>
  <div class="card card-top card-top-primary">
    <div class="card-header">
      <vb-headers-card-header :data="{ title: 'Form Edit Program' }" />
    </div>
    <div class="card-body">
      <a-form :model="formState" label-align="left" layout="vertical" :rules="rules">
        <a-form-item label="Program Name" name="programName">
          <a-input v-model:value="formState.programName" class="input-style" />
        </a-form-item>
        <a-form-item label="Description" name="description">
          <quill-editor style="height: 200px" v-model:value="formState.description" />
        </a-form-item>
        <div class="row">
          <div class="col-md-6">
            <a-form-item label="Start Date" name="startDate" style="font-weight:bold">
              <a-date-picker type="date" v-model:value="formState.startDate" placeholder="Enter Start Date"
                style="width:100%" />
            </a-form-item>
          </div>
          <div class="col-md-6">
            <a-form-item label="Finish Date" name="FinishDate" style="font-weight:bold">
              <a-date-picker type="date" v-model:value="formState.FinishDate" placeholder="Enter Finish Date"
                style="width:100%" />
            </a-form-item>
          </div>
        </div>


        <a-form-item>
          <a-button type="primary" html-type="submit" @click="onSubmit">
            Update
          </a-button>
          <router-link to="/marketing/program" style="margin-left: 10px;">
            <a-button>
              Cancel
            </a-button>
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
    onMounted,
    reactive,
    toRaw,
  } from 'vue'
  import {
    useRoute,
    useRouter,
  } from 'vue-router';
  import {
    listPost,
    updatePost,
  } from '@/services/connection/program/api'
  import {
    message,
  } from 'ant-design-vue';
  import VbHeadersCardHeader from '../header/Header'



  export default defineComponent({
    components: {
      quillEditor,
      VbHeadersCardHeader,
    },
    setup() {
      onMounted(() => {
        getPostById()
      })
      const rules = {
        programName: [{
          required: true,
          message: 'Masukkan Program Name!',
          type: 'string',
        }],
        description: [{
          required: true,
          message: 'Masukkan Description!',
          type: 'string',
        }],
        startDate: [{
          required: true,
          message: 'Masukkan Tanggal Mulai!',
          type: 'date',
        }],
        FinishDate: [{
          required: true,
          message: 'Masukkan Tanggal Selesai!',
          type: 'date',
        }],
      }

      const route = useRoute()

      const router = useRouter()

      const getPostById = () => {
        const id = route.params.userId
        listPost()
          .then(response => {
            if (response) {
              console.log(response.data)
              const post = response.data.find(post => post.id === id)
              //console.log(date("dd/mm/yyyy",post.start_date))
              formState.programID = post.id
              formState.post_date = post.program_date
              // formState.post_time = post.program_time
              formState.programName = post.program_title
              // formState.post_slug = response.post_slug
              formState.description = post.program_detail
              formState.startDate = post.start_date
              formState.FinishDate = post.finish_date
              // formState.publication_status = response.publication_status
              // formState.tag = response.tag
              //   formState.image = response.image
            }
          })
      }

      const updatePostById = (param, config) => {
        updatePost(param, config)
          .then(response => {
            if (response) {}
          })
      }

      const formState = reactive({
        post_date: '',
        // post_time: '',
        programName: '',
        // post_slug: 'program_name',
        description: '',
        startDate: '',
        FinishDate: '',
        // publication_status: 'Draft',
        // tag: 'bcd542e2-3292-45bc-8c82-27832cb80171',
      })

      const onSubmit = () => {
        const config = {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        }
        if (formState.programName && formState.description && formState.startDate && formState.FinishDate) {
          updatePostById(toRaw(formState), config)
          formState.programID = ''
          formState.post_date = ''
          // formState.post_time = ''
          formState.programName = ''
          // formState.post_slug = 'program_name'
          formState.description = ''
          formState.startDate = ''
          formState.FinishDate = ''
          // formState.publication_status = 'Draft'
          // formState.tag = 'bcd542e2-3292-45bc-8c82-27832cb80171'
          // formState.image = ''
          router.push('/marketing/program')
          message.success('Program berhasil diupate')
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
    data() {
      return {
        previewVisible: false,
        previewImage: '',
        fileList: [],
      };
    },
    mounted() {
      this.getPostById()
    },
    methods: {
      getPostById() {
        const id = this.$route.params.userId
        listPost()
          .then(response => {
            if (response) {


            }
          })
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
