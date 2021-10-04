<template>
  <a-card class="card card-top card-top-primary" :loading="isLoading">
    <div class="card-header">
      <vb-headers-card-header :data="{ title: 'Form Update Berita' }" />
    </div>
    <div class="card-body">
      <a-form
        :model="formState"
        label-align="left"
        layout="vertical"
        :rules="rules"
      >
        <a-form-item
          label="Judul"
          name="post_title"
        >
          <a-input
            v-model:value="formState.post_title"
            class="input-style"
          />
        </a-form-item>
        <a-form-item
          label="Detail"
          name="post_detail"
        >
          <quill-editor
            style="height: 200px"
            v-model:value="formState.post_detail"
          />
        </a-form-item>
        <a-form-item
          label="Gambar"
          name="image"
        >
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            accept="image/png, image/jpg, image/jpeg"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <i class="fe fe-plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img lazy="loading" v-once
              alt="Default"
              style="width: 100%"
              :src="previewImage"
            />
          </a-modal>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            @click="onSubmit"
          >
            Update
          </a-button>
          <router-link
            to="/marketing/berita"
            style="margin-left: 10px;"
          >
            <a-button>
              Cancel
            </a-button>
          </router-link>
        </a-form-item>
      </a-form>
    </div>
  </a-card>
</template>

<script>
import { quillEditor } from 'vue3-quill'
import { defineComponent, onMounted, reactive, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { showPost, updatePost } from '@/services/connection/artikel/api'
import { notification } from 'ant-design-vue';
import VbHeadersCardHeader from '../header/Header'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default defineComponent({
  components: {
    quillEditor,
    VbHeadersCardHeader,
  },
  setup() {
    const rules = {
      post_title: [
        {
          required: true,
          message: 'Masukkan judul berita!',
          type: 'string',
        },
      ],
      post_detail: [
        {
          required: true,
          message: 'Masukkan detail berita!',
          type: 'string',
        },
      ],
      image: [
        {
          required: true,
          message: 'Upload gambar berita!',
          type: 'object',
        },
      ],
    }
    const route = useRoute()
    const router = useRouter()
    onMounted(() => {
      getPostById()
    })
    const getPostById = () => {
      const id = route.params.userId
      showPost(id)
      .then(response => {
        if (response) {
          formState.id = response.id
          formState.post_date = response.post_date
          formState.post_time = response.post_time
          formState.post_title = response.post_title
          formState.post_slug = response.post_slug
          formState.post_detail = response.post_detail
          formState.publication_status = response.publication_status
          formState.tag = response.tag
          formState.image = response.image
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
    const updatePostById = (id, param, config) => {
      updatePost(id, param, config)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    }
    const formState = reactive({
      post_date: '',
      post_time: '',
      post_title: '',
      post_slug: 'judul_artikel',
      post_detail: '',
      publication_status: 'Draft',
      tag: 'bcd542e2-3292-45bc-8c82-27832cb80171',
      image: null,
    })
    const onSubmit = () => {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      }
      if (formState.post_title && formState.post_detail && formState.image) {
        if (!(formState.image.status === 'removed')) {
          updatePostById(formState.id, toRaw(formState), config)
          router.push('/marketing/berita')
          notification.success({
            message: 'Update Berita',
            description: 'Berita berhasil diupdate',
          })
        } else {
          formState.image = null
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
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
      isLoading: false,
    };
  },
  mounted() {
    this.getPostById()
  },
  methods: {
    getPostById() {
      this.isLoading = true
      const id = this.$route.params.userId
      showPost(id)
      .then(response => {
        if (response) {
          const info = {
            fileList: [
              {
                uid: '-1',
                name: '.jpg/.png',
                status: 'error',
              },
              { ...response.image },
            ],
          }
          this.handleChange(info)
          setTimeout(() => {
            this.isLoading = false
          }, 800)
        }
      })
      .catch(err => {
        console.error(err)
          setTimeout(() => {
            this.isLoading = false
          }, 800)
      })
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange(info) {
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })
      if (!fileList.length) {
        this.fileList = [
          {
            uid: '-1',
            name: '.jpg/.png',
            status: 'error',
          },
        ]
      } else {
        this.fileList = fileList
        if (!Object.keys(this.fileList[0]).length) {
          this.fileList = [
            {
              uid: '-1',
              name: '.jpg/.png',
              status: 'error',
            },
          ]
          this.formState.image = null
        } else {
          this.formState.image = this.fileList[0]
        }
      }
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