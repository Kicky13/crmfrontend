<template>
  <div>
    <router-link to="/marketing/artikel/tambah">
      <a-button
        type="primary"
        class="mb-4"
      >
        <i class="fa fa-plus mr-2" />
        Tambah Artikel
      </a-button>
    </router-link>
    <vb-list-artikel
      :post-items="posts"
      @delete-message="deleteSuccess"
    />
  </div>
</template>

<script>
import { listPost } from '@/services/connection/artikel/api'
import VbListArtikel from './ListArtikel'
import { message } from 'ant-design-vue';

export default {
  components: {
    VbListArtikel,
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