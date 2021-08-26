<template>
  <div class="card card-top card-top-primary">
    <div class="card-header">
      <vb-headers-card-header :data="{ title: 'Form Tambah Artikel' }" />
    </div>
    <div class="card-body">
      <a-form
        :model="formState"
        label-align="left"
        layout="vertical"
        :rules="rules"
      >
        <a-form-item label="Judul" name="judul">
          <a-input
            v-model:value="formState.post_title"
            class="input-style"
          />
        </a-form-item>
        <a-form-item label="Detail" name="detail">
          <quill-editor
            style="height: 200px"
            v-model:value="formState.post_detail"
          />
        </a-form-item>
        <a-form-item label="Gambar" name="gambar">
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
            Tambah
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
import { defineComponent, reactive, toRaw } from 'vue'
import { storePost } from '@/services/connection/artikel/api'
import { useRouter } from 'vue-router'
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
    const rules = {
      judul: [
        {
          required: true,
          message: 'Masukkan judul artikel!',
          type: 'string',
        },
      ],
      detail: [
        {
          required: true,
          message: 'Masukkan detail artikel!',
          type: 'string',
        },
      ],
      gambar: [
        {
          required: true,
          message: 'Upload gambar artikel!',
          type: 'string',
        },
      ],
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
      const second = String(today.getSeconds()).padStart(2, '0')

      return `${hour}:${minute}:${second}`
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
      publication_status: 'Draft',
      tag: 'bcd542e2-3292-45bc-8c82-27832cb80171',
    })

    const onSubmit = () => {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      }
      if (formState.post_title && formState.post_detail && formState.image) {
        addNewPost(toRaw(formState), config)
        formState.post_date = ''
        formState.post_time = ''
        formState.post_title = ''
        formState.post_slug = 'judul_artikel'
        formState.post_detail = ''
        formState.publication_status = 'Draft'
        formState.tag = 'bcd542e2-3292-45bc-8c82-27832cb80171'
        formState.image = ''
        router.push('/marketing/artikel')
        message.success('Artikel berhasil ditambahkan')
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
      fileList: [
        {
          uid: '-1',
          name: '.jpg/.png',
          status: 'error',
        },
      ],
    };
  },
  methods: {
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
        this.formState.image = this.fileList[0]
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