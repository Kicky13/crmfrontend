<template>
  <div>Detail Berita</div>
</template>

<script>
import { postList } from '@/services/connection/berita/api'

export default { 
  data() {
    return {
      post: {},
    }
  },
  mounted() {
    this.getPostById()
  },
  methods: {
    getPostById() {
      const artikelId = this.$route.params.id
      postList(artikelId)
      .then(response => {
        if (response) {
          console.log(response)
        }
      })
    },
  },
}
</script>
