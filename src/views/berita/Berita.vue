<template>
  <div>
    <router-link to="/berita/tambah">
      <a-button
        type="primary"
        class="mb-4"
      >
        <i class="fa fa-plus mr-2" />
        Tambah Berita
      </a-button>
    </router-link>
    <vb-list-berita
      :post-items="posts"
      @delete-message="deleteSuccess"
    />
  </div>
</template>

<script>
import { listPost } from '@/services/connection/berita/api'
import VbListBerita from './ListBerita'
import { message } from 'ant-design-vue';

export default {
  components: {
    VbListBerita,
  },
  data() {
    return {
      posts: [],
      editPostItem: {},
    };
  },
  mounted() {
    this.getListPost()
  },
  methods: {
    getListPost() {
      this.posts = []
      listPost()
      .then(response => {
        if (response) {
          response.forEach(item => this.posts.unshift(item))
        }
      })
    },
    deleteSuccess() {
      this.getListPost()
      message.success('Berita berhasil dihapus')
    },
  },
}
</script>