<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <vb-headers-card-header :data="{ title: 'Create New Permission' }" />
          </div>
          <div class="card-body">
            <a-form label-align="left" layout="vertical">
              <div class="row">
                <div class="col-lg-6">
                  <a-form-item label="Role">
                    <a-select v-model:value="formState.actor">
                      <a-select-option v-for="data in roleOption" :key="data.id" :value="data.role">{{data.role}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
                <div class="col-lg-6">
                  <a-form-item label="Nama Laman">
                    <a-input v-model:value="formState.pagename" />
                  </a-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <a-form-item label="Module">
                    <a-input v-model:value="formState.subject" />
                  </a-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <a-form-item label="Permission">
                    <a-select v-model:value="formState.permission">
                      <a-select-option v-for="data in permitOption" :key="data.id" :value="data.text">{{data.text}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </div>
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
import { insertPermission, getRoleList } from '@/services/connection/roles-permissions/api'

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
        actor: '',
        pagename: '',
        subject: '',
        permission: '',
      },
      roleOption: [],
      permitOption: [
        {
          id: 1,
          text: 'read',
        },
        {
          id: 2,
          text: 'create',
        },
        {
          id: 3,
          text: 'update',
        },
        {
          id: 4,
          text: 'delete',
        },
        {
          id: 5,
          text: 'manage',
        },
      ],
    }
  },
  mounted() {
    this.fetchGetRoleList()
  },
  methods: {
    handleSubmit() {
      const formData = toRaw(this.formState)
      insertPermission(formData)
        .then((response) => {
          if (response) {
            console.log(response)
            this.$router.push({ path: '/permissions' })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fetchGetRoleList() {
      getRoleList()
      .then(response => {
        if (response) {
          this.roleOption = response
        }
      })
      .catch(err => { console.error(err) })
    },
  },
}
</script>
