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
                  <a-form-item label="Actor">
                    <a-input v-model:value="formState.actor" />
                  </a-form-item>
                </div>
                <div class="col-lg-6">
                  <a-form-item label="Page Name">
                    <a-input v-model:value="formState.pagename" />
                  </a-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <a-form-item label="Subject">
                    <a-input v-model:value="formState.subject" />
                  </a-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <a-form-item label="Permission">
                    <a-input v-model:value="formState.permission" />
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
import { insertPermission } from '@/services/connection/apiService'

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
    }
  },
  methods: {
    handleSubmit() {
      const formData = toRaw(this.formState)
      insertPermission(formData)
      .then(response => {
        if (response) {
          console.log(response)
          this.$router.push({ path: '/permissions' })
        }
      })
      .catch(err => { console.error(err) })
    },
  },
}
</script>
