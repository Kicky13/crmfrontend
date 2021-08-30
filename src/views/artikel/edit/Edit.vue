<template>
  <div class="card card-top card-top-primary">
    <div class="card-header">
      <vb-headers-card-header :data="{ title: 'Form Edit Artikel' }" />
    </div>
    <div class="card-body">
      <a-form
        :model="formState"
        label-align="left"
        layout="vertical"
      >
        <a-form-item label="Judul">
          <a-input
            v-model:value="formState.post_title"
            class="input-style"
          />
        </a-form-item>
        <a-form-item label="Detail">
          <quill-editor
            style="height: 200px"
            v-model:value="formState.post_detail"
          />
        </a-form-item>
        <a-form-item label="Gambar">
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
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
            <img
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
            Edit
          </a-button>
          <router-link
            to="/marketing/artikel"
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
import { showPost, updatePost } from '@/services/connection/artikel/api'
import { message } from 'ant-design-vue';
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
    onMounted(() => {
      getPostById()
    })

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
          formState.post_slug = response.post_slug
          formState.post_detail = response.post_detail
          formState.publication_status = response.publication_status
          formState.tag = response.tag
          formState.image = response.image
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
      post_slug: 'judul_artikel',
      post_detail: '',
      publication_status: 'Draft',
      tag: 'bcd542e2-3292-45bc-8c82-27832cb80171',
    })

    const onSubmit = () => {
       const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      }
      updatePostById(formState.id, toRaw(formState), config)
      formState.post_date = ''
      formState.post_time = ''
      formState.post_title = ''
      formState.post_slug = 'judul_artikel'
      formState.post_detail = ''
      formState.publication_status = 'Draft'
      formState.tag = 'bcd542e2-3292-45bc-8c82-27832cb80171'
      formState.image = ''
      router.push('/marketing/artikel')
      message.success('Artikel berhasil diupate')
    }

    return {
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
        }
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