<template>
  <a-card
    class="card card-top card-top-primary"
    :loading="isLoading"
  >
    <div class="card-header">
      <vb-headers-card-header :data="{ title: `${ post.post_title }` }" />
      <div class="text-main mt-2">{{ post.post_date }} {{ post.post_time }}</div>
    </div>
    <div class="card-body">
      <img
        :src="post.post_image"
        alt="Gambar Berita"
        class="img-fluid img-thumbnail"
        style="width: 100%; max-height: 500px;"
      >
      <!-- eslint-disable vue/no-v-html -->
      <p
        class="my-4"
        v-html="post.post_detail"
      />
      <router-link to="/marketing/berita">
        <a-button type="primary">Kembali</a-button>
      </router-link>
    </div>
  </a-card>
</template>

<script>
import { postList } from '@/services/connection/berita/api'
import VbHeadersCardHeader from '../header/Header'

export default { 
  components: {
    VbHeadersCardHeader,
  },
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
      const artikelId = this.$route.params.artikelId
      postList(artikelId)
      .then(response => {
        if (response) {
          this.post = response.data.find(post => post.id === artikelId)
          this.isLoading = false
        }
      })
    },
  },
}
</script>