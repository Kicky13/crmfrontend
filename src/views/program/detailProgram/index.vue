<template>
  <div class="row mb-2">
    <div class="col-md-4 col-xs-4">
      <router-link :to="`/marketing/program`" class="font-weight-bold text-primary">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        Kembali ke List Program</router-link
      >
    </div>
  </div>
  <a-card class="card card-top card-top-primary" :loading="isLoading">
    <div class="card-header">
      <center>
        <h5 class="mb-0">
          <strong>{{ post.program_title }}</strong>
        </h5>
        <small>
          <strong>{{ post.start_date }} - {{ post.finish_date }}</strong>
        </small>
      </center>

      <!-- <div class="text-main mt-2">{{ post.start_date }} {{ post.finish_date }}</div> -->
    </div>
    <div class="card-body">
      <p class="my-4 mb-2" v-html="post.program_detail" />
    </div>
    <div class="card-footer">
      <router-link to="/marketing/program">
        <a-button type="primary">Kembali</a-button>
      </router-link>
    </div>
  </a-card>
</template>
<script>
import { listPost } from '@/services/connection/program/api'
//import VbHeadersCardHeader from '../header/Header'

export default {
  data() {
    return {
      post: {},
      isLoading: false,
    }
  },
  mounted() {
    this.getPostById()
  },
  methods: {
    getPostById() {
      this.isLoading = true
      const id = this.$route.params.userId
      try {
        listPost(id).then(response => {
          if (response) {
            this.post = response.data.find(post => post.id === id)
            this.isLoading = false
          }
        })
      } catch (error) {
        notification.error({
          message: 'Error',
          description: error.message,
        })
      }
    },
  },
}
</script>
<style scoped>
.image-body {
  width: 100%;
  height: 400px;
}
</style>
