<template>
  <div class="card card-top card-top-primary">
    <div class="card-header">
      <vb-headers-card-header :data="{ title: 'Form Tambah Artikel' }" />
    </div>
    <div class="card-body">
      <a-form
        :model="formState"
        :rules="rules"
        label-align="left"
        layout="vertical"
      >
        <a-form-item
          label="Judul"
          name="judul"
        >
          <a-input
            v-model:value="formState.judul"
            class="input-style"
          />
        </a-form-item>
        <a-form-item
          label="Detail"
          name="detail"
        >
          <quill-editor
            style="height: 200px"
            v-model:value="formState.detail"
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
            :transform-file="transformFile"
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
import { newStorePost } from '@/services/connection/artikel/api'
import { useRouter } from 'vue-router'
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
      judul: [
        {
          required: true,
          message: 'Masukkan judul berita!',
          type: 'string',
        },
      ],
      detail: [
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
    const router = useRouter()
    const addNewPost = (param, config) => {
      newStorePost(param, config)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    }
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
    const formState = reactive({
      date: '',
      judul: '',
      detail: '',
      image: null,
    })
    const onSubmit = () => {
      const config = {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      }
      if (formState.judul && formState.detail && formState.image) {
        if (!(formState.image.status === 'removed')) {
          formState.date = `${getCurrentDate()} ${getCurrentTime()}`
          const param = new FormData()
          param.append('date', formState.date)
          param.append('judul', formState.judul)
          param.append('detail', formState.detail)
          param.append('image', formState.image)
          addNewPost(param, config)
          router.push('/marketing/berita')
          notification.success({
            message: 'Tambah Berita',
            description: 'Berita berhasil ditambah',
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
        // this.formState.image = this.fileList[0]
      }
    },
    transformFile(file) {
      this.formState.image = file
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
