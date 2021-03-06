<template>
  <a-card class="card card-top card-top-primary" :loading="isLoading">
    <div class="card-header">
      <vb-headers-card-header :data="{ title: 'Form Update Berita' }" />
    </div>
    <div class="card-body">
      <a-form label-align="left" layout="vertical" :model="formState" :rules="rules">
        <a-form-item label="Judul" name="judul">
          <a-input class="input-style" v-model:value="formState.judul" />
        </a-form-item>
        <a-form-item label="Detail" name="detail">
          <quill-editor style="height: 200px" v-model:value="formState.detail" />
        </a-form-item>
        <a-form-item label="Gambar" name="image">
          <a-upload
            accept="image/png, image/jpg, image/jpeg"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            :file-list="fileList"
            :transform-file="transformFile"
            @preview="handlePreview"
            @change="handleChange"
          >
            <i class="fe fe-plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </a-upload>
          <a-modal :footer="null" :visible="previewVisible" @cancel="previewVisible = false">
            <img
              v-once
              lazy="loading"
              alt="Gambar Berita"
              style="width: 100%"
              :src="previewImage"
            />
          </a-modal>
        </a-form-item>
        <a-form-item>
          <a-button class="mr-2" html-type="submit" type="primary" @click="onSubmit">
            Update
          </a-button>
          <router-link to="/marketing/berita">
            <a-button>
              Batal
            </a-button>
          </router-link>
        </a-form-item>
      </a-form>
    </div>
  </a-card>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { updatePost, postList } from '@/services/connection/berita/api'
import { useRoute, useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'
import { quillEditor } from 'vue3-quill'
import VbHeadersCardHeader from '../header/Header'
import Swal from 'sweetalert2'

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
    const route = useRoute()
    const router = useRouter()
    onMounted(() => {
      getPostById()
    })
    const getPostById = () => {
      const id = route.params.artikelId
      try {
        postList()
          .then(response => {
            if (response) {
              const post = response.data.find(post => post.id === id)
              formState.id = post.id
              formState.date = post.post_date + ' ' + post.post_time
              formState.judul = post.post_title
              formState.detail = post.post_detail
            }
          })
          .catch(err => {
            if (err) {
            }
          })
      } catch (error) {
        notification.error({
          message: 'Error',
          description: error.message,
        })
      }
    }
    const updatePostById = (id, param, config) => {
      try {
        updatePost(id, param, config)
          .then(response => {
            if (response) {
              if (response.status === 200) {
                router.push('/marketing/berita')

                Swal.fire({
                  icon: 'success',
                  title: 'Success...',
                  text: 'Berita berhasil diupdate!',
                  showConfirmButton: false,
                  timer: 2000,
                })
              } else {
                Swal.fire({
                  icon: 'warning',
                  title: 'Warning...',
                  text: response.message[1].replace(
                    'image yang diperbolehkan adalah',
                    'Format gambar harus',
                  ),
                  showConfirmButton: false,
                  timer: 2000,
                })
                // notification.warning({
                //   message: 'Update Berita',
                //   description: response.message[1].replace(
                //     'image yang diperbolehkan adalah',
                //     'Format gambar harus',
                //   ),
                // })
              }
            }
          })
          .catch(err => {
            if (err) {
            }
          })
      } catch (error) {
        notification.error({
          message: 'Error',
          description: error.message,
        })
      }
    }
    const formState = reactive({
      id: '',
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
          const param = new FormData()
          param.append('judul', formState.judul)
          param.append('detail', formState.detail)
          param.append('date', formState.date)
          param.append('image', formState.image)
          updatePostById(formState.id, param, config)
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
      imagedata: null,
    }
  },
  mounted() {
    this.getPostById()
  },
  methods: {
    getPostById() {
      this.isLoading = true
      const id = this.$route.params.artikelId
      try {
        postList()
          .then(response => {
            if (response) {
              const imgObj = response.data.find(data => data.id === id).post_image
              const imgName = imgObj.split('/')
              const lastIndex = imgName.length - 1
              const info = {
                fileList: [
                  {
                    uid: '-1',
                    name: '.jpg/.png',
                    status: 'error',
                  },
                  {
                    uid: '0',
                    name: imgName[lastIndex],
                    status: 'done',
                    url: imgObj,
                  },
                ],
              }
              this.handleChange(info)
              this.isLoading = false
            }
          })
          .catch(err => {
            this.isLoading = false
          })
      } catch (error) {
        notification.error({
          message: 'Error',
          description: error.message,
        })
      }
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
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
        this.formState.image = null
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
          this.fileList = fileList
          const formats = ['jpg', 'jpeg', 'png', 'gif', 'webp']
          const nameInput = this.fileList[0].name
          const formatInput = this.fileList[0].type.split('/')[1]
          const check = formats.some(element => element === formatInput)
          if (!check) {
            this.fileList = [
              {
                uid: '-1',
                name: nameInput,
                status: 'error',
              },
            ]
          }
        }
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
