<template>
  <a-card class="card card-top card-top-primary">
    <div class="card-header">
      <vb-headers-card-header :data="{ title: 'Form Tambah Berita' }" />
    </div>
    <div class="card-body">
      <a-form label-align="left" layout="vertical">
        <a-form-item label="Judul" name="judul">
          <a-input class="input-style" v-model:value="postTitle" />
        </a-form-item>
        <a-form-item label="Detail" name="detail">
          <quill-editor style="height: 200px" v-model:value="postDetail" />
        </a-form-item>
        <a-form-item label="Gambar" name="image">
          <!-- <a-upload
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
            <img
              alt="Default"
              style="width: 100%"
              :src="previewImage"
            />
          </a-modal> -->
          <input type="file" ref="file" @change="onFileSelected" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSubmit">
            Tambah
          </a-button>
          <router-link to="/marketing/berita" style="margin-left: 10px;">
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
import { defineComponent, reactive, toRaw } from 'vue'
import { storePost, newStorePost } from '@/services/connection/artikel/api'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'
import VbHeadersCardHeader from '../header/Header'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default defineComponent({
  components: {
    quillEditor,
    VbHeadersCardHeader,
  },
  data() {
    return {
      postDate: '',
      postTitle: '',
      postDetail: '',
      postImage: null,
      selectedFile: null,
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: '.jpg/.png',
          status: 'error',
        },
      ],
    }
  },
  methods: {
    getCurrentDate() {
      const today = new Date()
      const date = String(today.getDate()).padStart(2, '0')
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const year = today.getFullYear()

      return `${date}-${month}-${year}`
    },
    getCurrentTime() {
      const today = new Date()
      const hour = String(today.getHours()).padStart(2, '0')
      const minute = String(today.getMinutes()).padStart(2, '0')
      const second = String(today.getSeconds()).padStart(2, '0')

      return `${hour}:${minute}:${second}`
    },
    addNewPost(param) {
      // storePost(param, config)
      newStorePost(param)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSubmit() {
      this.postDate = `${this.getCurrentDate()} ${this.getCurrentTime()}`
      // const param = {
      //   date: this.postDate,
      //   judul: this.postTitle,
      //   detail: this.postDetail,
      //   image: this.postImage,
      // }
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const param = new FormData()
      param.append('date', this.postDate)
      param.append('judul', this.postTitle)
      param.append('detail', this.postDetail)
      param.append('image', this.postImage)
      this.addNewPost(param, config)
      notification.success({
        message: 'Tambah Berita',
        description: 'Berita berhasil ditambah',
      })
    },
    onFileSelected() {
      this.postImage = this.$refs.file.files[0]
    },
    handleCancel() {
      this.previewVisible = false
    },

    // async handlePreview(file) {
    //   if (!file.url && !file.preview) {
    //     file.preview = await getBase64(file.originFileObj);
    //   }
    //   this.previewImage = file.url || file.preview;
    //   this.previewVisible = true;
    // },
    // handleChange(info) {
    //   let fileList = [...info.fileList]
    //   fileList = fileList.slice(-1)
    //   fileList = fileList.map(file => {
    //     if (file.response) {
    //       file.url = file.response.url
    //     }
    //     return file
    //   })
    //   if (!fileList.length) {
    //     this.fileList = [
    //       {
    //         uid: '-1',
    //         name: '.jpg/.png',
    //         status: 'error',
    //       },
    //     ]
    //   } else {
    //     this.fileList = fileList
    //     this.formState.image = this.fileList[0]
    //   }
    // },
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
