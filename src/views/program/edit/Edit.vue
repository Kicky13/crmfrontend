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
            <a-form-item label="Start Date" name="startDate" style="font-weight: bold">
              <!-- <a-input type="date" v-model:value="formState.startDate" placeholder="Enter Start Date"
                style="width:100%" /> -->
              <vue-datepicker
                class="ant-calendar-picker ant-calendar-picker-input ant-input"
                v-model="formState.startDate"
                input-format="dd-MM-yyyy"
              />
              <!-- <a-date-picker
                v-model:value="formState.startDate"
                :disabled-date="disabledStartDate"
                show-time
                format="DD-MM-YYYY"
                placeholder="Start"
                @openChange="handleStartOpenChange"
              /> -->
            </a-form-item>
          </div>
          <div class="col-md-6">
            <a-form-item label="Finish Date" name="FinishDate" style="font-weight: bold">
              <!-- <a-input type="date" v-model:value="formState.FinishDate" placeholder="Enter Finish Date"
                style="width:100%" /> -->
              <vue-datepicker
                class="ant-calendar-picker ant-calendar-picker-input ant-input"
                v-model="formState.FinishDate"
                :lower-limit="formState.startDate"
                input-format="dd-MM-yyyy"
              />
              <!-- <a-date-picker
                v-model:value="formState.FinishDate"
                :disabled-date="disabledEndDate"
                show-time
                format="YYYY-MM-DD"
                placeholder="End"
                :open="endOpen"
                @openChange="handleEndOpenChange"
              /> -->
            </a-form-item>
          </div>
        </div>

        <a-form-item>
          <a-button type="primary" html-type="submit" @click="onSubmit"> Update </a-button>
          <router-link to="/marketing/program" style="margin-left: 10px">
            <a-button> Cancel </a-button>
          </router-link>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { quillEditor } from 'vue3-quill'
import VueDatepicker from 'vue3-datepicker'
import { defineComponent, onMounted, reactive, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { listPost, updatePost } from '@/services/connection/program/api'
import { message } from 'ant-design-vue'
import { notification } from 'ant-design-vue'
import { moment } from 'moment'
import VbHeadersCardHeader from '../header/Header'

export default defineComponent({
  components: {
    quillEditor,
    VbHeadersCardHeader,
    VueDatepicker,
  },
  setup() {
    onMounted(() => {
      getPostById()
    })
    const rules = {
      programName: [
        {
          required: true,
          message: 'Masukkan Program Name!',
          type: 'string',
        },
      ],
      description: [
        {
          required: true,
          message: 'Masukkan Description!',
          type: 'string',
        },
      ],
      startDate: [
        {
          required: true,
          message: 'Masukkan Tanggal Mulai!',
          type: 'date',
        },
      ],
      FinishDate: [
        {
          required: true,
          message: 'Masukkan Tanggal Selesai!',
          type: 'date',
        },
      ],
    }

    const route = useRoute()

    const router = useRouter()

    const getPostById = () => {
      const id = route.params.userId
      listPost().then((response) => {
        if (response) {
          const post = response.data.find((post) => post.id === id)
          formState.programID = post.id
          formState.post_date = post.program_date
          // formState.post_time = post.program_time
          formState.programName = post.program_title
          // formState.post_slug = response.post_slug
          formState.description = post.program_detail
          formState.startDate = formatDate(post.start_date)
          formState.FinishDate = formatDate(post.finish_date)
          // formState.publication_status = response.publication_status
          // formState.tag = response.tag
          //   formState.image = response.image
        }
      })
    }

    const formatDate = (date) => {
      let components = date.split('-')
      let newDate = components[1] + '-' + components[0] + '-' + components[2]
      return new Date(newDate)
    }

    const updatePostById = (param, config) => {
      updatePost(param, config).then((response) => {
        if (response) {
           if (response.status === 200) {
              router.push('/marketing/program')
              notification.success({
                message: 'Update Program',
                description: 'Program berhasil diupdate',
              })
            } else {
             notification.error({
                message: 'Update Program',
                description: 'Program Gagal diupdate',
              })
            }
        }
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
      if (
        formState.programName &&
        formState.description &&
        formState.startDate &&
        formState.FinishDate
      ) {
        let startDate = new Date(formState.startDate).toLocaleDateString('en-GB')
        let endDate = new Date(formState.FinishDate).toLocaleDateString('en-GB')
        formState.startDate = startDate.toString().replace('/', '-').replace('/', '-')
        formState.FinishDate = endDate.toString().replace('/', '-').replace('/', '-')
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
        // router.push('/marketing/program')
        // message.success('Program berhasil diupate')
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
      // eslint-disable-next-line vue/no-dupe-keys
      endOpen: false,
    }
  },
  mounted() {
    this.getPostById()
  },
  methods: {
    getPostById() {
      const id = this.$route.params.userId
      listPost().then((response) => {
        if (response) {
        }
      })
    },
    disabledStartDate(startValue) {
      const endValue = this.formState.FinishDate
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.formState.startDate
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      } else {
        this.endOpen = false
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = false
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
