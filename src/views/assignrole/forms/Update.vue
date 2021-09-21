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
                <a-select v-model:value="formState.user">
                  <a-select-option v-for="data in userOption" :key="data.id" :value="data.name">{{
                    data.name
                  }}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Role Code">
                <a-select v-model:value="formState.role">
                  <a-select-option v-for="data in roleOption" :key="data.id" :value="data.role">{{
                    data.role
                  }}</a-select-option>
                </a-select>
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
import {
  updateAssign,
  getUserList,
  getRoleList,
  getAssignList,
} from '@/services/connection/roles-permissions/api'

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
      user: {
          type: String,
          required: true,
      },
      role: {
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
      formState: {
        user: '',
        role: '',
      },
      userOption: [],
      roleOption: [],
      assignList: [],
      isLoading: false,
    }
  },
  mounted() {
    this.fetchGetUsers()
    this.fetchGetRoles()
    this.fetchGetAssign()
  },
  methods: {
    initiateForm() {
        this.formState.user = this.user
        this.formState.role = this.role
    },  
    handleSubmit() {
      const formData = toRaw(this.formState)
      if (this.formValidation(formData)) {
        this.isLoading = true
        updateAssign(this.id, formData).then((response) => {
          if (response) {
            console.log(response)
            this.$router.push({ path: '/assignrole' })
          }
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          console.error(err)
        })
      } else {
        notification.error({
          message: 'Error!',
          description: 'Data already Exist',
        })
      } 
    },
    formValidation(formData) {
      const listData = [...this.assignList]
      const currData = listData.filter((x) => x.user === formData.user && x.role === formData.role)
      console.log(currData.length)
      if (currData.length == 0) {
        return true
      }
      return false
    },
    fetchGetUsers() {
      this.isLoading = true
      getUserList()
        .then((response) => {
          if (response) {
            this.userOption = response
            this.initiateForm()
          }
          this.isLoading = false
        })
        .catch((err) => {
          console.error(err)
          this.isLoading = false
        })
    },
    fetchGetRoles() {
      this.isLoading = true
      getRoleList()
        .then((response) => {
          if (response) {
            this.roleOption = response
          }
          this.isLoading = false
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fetchGetAssign() {
      this.isLoading = true
      getAssignList()
        .then((response) => {
          if (response) {
            this.assignList = response
          }
          this.isLoading = false
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
