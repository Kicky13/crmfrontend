<template>
  <div class="card card-top card-top-primary">
    <div class="card-header">
      <vb-headers-card-header :data="{ title: 'Form Edit Program' }" />
    </div>
    <div class="card-body">
      <a-form
        :model="formState"
        label-align="left"
        layout="vertical"
        :rules="rules"
      >
        <a-form-item label="Program Name" name="post_title">
          <a-input
            v-model:value="formState.post_title"
            class="input-style"
          />
        </a-form-item>
        <a-form-item label="Description" name="post_detail">
          <quill-editor
            style="height: 200px"
            v-model:value="formState.post_detail"
          />
        </a-form-item>
        <a-form-item label="Start Date" name="startDate" style="font-weight:bold">
          <a-input type="date" v-model:value="formState.startDate" placeholder="Enter Start Date" />
        </a-form-item>
        <a-form-item label="Finish Date" name="FinishDate" style="font-weight:bold">
          <a-input type="date" v-model:value="formState.FinishDate" placeholder="Enter Finish Date" />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            @click="onSubmit"
          >
            Edit
          </a-button>
          <router-link
            to="/marketing/program"
            style="margin-left: 10px;"
          >
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
import { quillEditor } from 'vue3-quill'
import { defineComponent, onMounted, reactive, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { showPost, updatePost } from '@/services/connection/program/api'
import { message } from 'ant-design-vue';
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
        post_title: [{
          required: true,
          message: 'Masukkan Program Name!',
          type: 'string',
        } ],
        post_detail: [{
          required: true,
          message: 'Masukkan Description!',
          type: 'string',
        } ],
        startDate: [{
          required: true,
          message: 'Masukkan Tanggal Mulai!',
          type: 'date',
        } ],
        FinishDate: [{
          required: true,
          message: 'Masukkan Tanggal Selesai!',
          type: 'date',
        } ],
      }

    const route = useRoute()

    const router = useRouter()

    const getPostById = () => {
      const id = route.params.userId
      showPost(id)
      .then(response => {
        if (response) {
          formState.id = response.id
          formState.post_date = response.post_date
          formState.post_time = response.post_time
          formState.post_title = response.post_title
          // formState.post_slug = response.post_slug
          formState.post_detail = response.post_detail
          formState.startDate = response.startDate
          formState.FinishDate = response.FinishDate
          // formState.publication_status = response.publication_status
          // formState.tag = response.tag
        //   formState.image = response.image
        }
      })
    }

    const updatePostById = (id, param, config) => {
      updatePost(id, param, config)
      .then(response => {
        if (response) {}
      })
    }

    const formState = reactive({
      post_date: '',
      post_time: '',
      post_title: '',
      // post_slug: 'program_name',
      post_detail: '',
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
      if (formState.post_title && formState.post_detail && formState.startDate && formState.FinishDate) {
      updatePostById(formState.id, toRaw(formState), config)
      formState.post_date = ''
      formState.post_time = ''
      formState.post_title = ''
      // formState.post_slug = 'program_name'
      formState.post_detail = ''
      formState.startDate = ''
      formState.FinishDate = ''
      // formState.publication_status = 'Draft'
      // formState.tag = 'bcd542e2-3292-45bc-8c82-27832cb80171'
      formState.image = ''
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
      showPost(id)
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