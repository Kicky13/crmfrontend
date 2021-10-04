<template>
  <div>Detail Berita</div>
</template>

<script>
import { showPost } from '@/services/connection/artikel/api'

export default { 
  data() {
    return {
      post: {},
      imageSrc: '',
    }
  },
  mounted() {
    this.getPostById()
  },
  methods: {
    getPostById() {
      const artikelId = this.$route.params.id
      showPost(artikelId)
      .then(response => {
        this.post = response
        this.imageSrc = response.image.thumbUrl
      })
    },
  },
}
</script>
