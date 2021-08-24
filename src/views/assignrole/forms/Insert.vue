<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header"><vb-headers-card-header :data="{ title: 'Create New Role' }" /></div>
          <div class="card-body">
            <a-form :label-col="labelCol" :wrapper-col="wrapperCol" label-align="left">
              <a-form-item label="Role name">
                <a-select v-model:value="formState.user">
                      <a-select-option v-for="data in userOption" :key="data.id" :value="data.name">{{data.name}}</a-select-option>
                    </a-select>
              </a-form-item>
              <a-form-item label="Role Code">
                <a-select v-model:value="formState.role">
                      <a-select-option v-for="data in roleOption" :key="data.id" :value="data.role">{{data.role}}</a-select-option>
                    </a-select>
              </a-form-item>
            </a-form>
            <button @click="handleSubmit" type="submit" class="btn btn-success px-5">Submit Data</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VbHeadersCardHeader from './Header.vue'
import { toRaw } from 'vue'
import { insertAssign, getUserList, getRoleList } from '@/services/connection/roles-permissions/api'

export default {
  name: 'VbFormExamples',
  components: {
    VbHeadersCardHeader,
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
      isLoading: false,
    }
  },
  mounted() {
    this.fetchGetUsers()
    this.fetchGetRoles()
  },
  methods: {
    handleSubmit() {
      this.isLoading = true
      const formData = toRaw(this.formState)
      insertAssign(formData)
      .then(response => {
        if (response) {
          console.log(response)
          this.$router.push({ path: '/assignrole' })
        }
        this.isLoading = false
      })
      this.isLoading = false
      .catch(err => { console.error(err) })
    },
    fetchGetUsers() {
      this.isLoading = true
      getUserList()
      .then(response => {
        if (response) {
          this.userOption = response
        }
        this.isLoading = false
      })
      .catch(err => {
        console.error(err)
        this.isLoading = false
      })
    },
    fetchGetRoles() {
      this.isLoading = true
      getRoleList()
      .then(response => {
        if (response) {
          this.roleOption = response
        }
        this.isLoading = false
      })
      .catch(err => {
        console.error(err)
      })
    },
  },
}
</script>
