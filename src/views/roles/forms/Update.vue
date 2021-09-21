<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <vb-headers-card-header :data="{ title: 'Create New Role' }" />
          </div>
          <div class="card-body">
            <a-form :label-col="labelCol" :wrapper-col="wrapperCol" label-align="left">
              <a-form-item label="Role name">
                <a-input v-model:value="formState.role" placeholder="Insert Role name..." />
              </a-form-item>
              <a-form-item label="Role Code">
                <a-input v-model:value="formState.code" placeholder="Insert Role code..." />
              </a-form-item>
            </a-form>
            <button @click="handleSubmit" type="submit" class="btn btn-success px-5">
              Submit Data
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VbHeadersCardHeader from './Header.vue'
import { toRaw } from 'vue'
import { notification } from 'ant-design-vue'
import { updateRole, getRoleList } from '@/services/connection/roles-permissions/api'

export default {
  name: 'VbFormExamples',
  components: {
    VbHeadersCardHeader,
  },
  props: {
      id: {
          type: String,
          required: true,
      },
      role: {
          type: String,
          required: true,
      },
      code: {
          type: String,
          required: true,
      },
  },
  setup() {
    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    }
  },
  data() {
    return {
      isLoading: false,
      formState: {
        role: '',
        code: '',
        createdAt: '06/04/2021',
      },
      roleList: [],
    }
  },
  mounted() {
    this.fetchGetRoleList()
    this.initiateForm()
  },
  methods: {
    handleSubmit() {
      const formData = toRaw(this.formState)
      if (this.formValidation(formData)) {
        updateRole(this.id, formData)
          .then((response) => {
            if (response) {
              console.log(response)
              this.$router.push({ path: '/roles' })
            }
          })
          .catch((err) => {
            console.error(err)
          })
      } else {
          notification.error({
              message: 'Error!',
              description: 'Data already Exist',
          })
      }
    },
    initiateForm() {
        this.formState.role = this.role
        this.formState.code = this.code
    },
    formValidation(formData) {
      const dataSource = [...this.roleList]
      const currentData = dataSource.filter((x) => x.code === formData.code)

      if (currentData.length == 0) {
        return true
      }
      return false
    },
    fetchGetRoleList() {
      this.isLoading = true
      getRoleList()
        .then((response) => {
          if (response) {
            this.roleList = response
          }
          this.isLoading = false
        })
        .then((err) => {
          console.error(err)
        })
    },
  },
}
</script>
