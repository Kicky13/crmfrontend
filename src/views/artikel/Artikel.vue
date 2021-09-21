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
      :posts="posts"
      @delete-success="deleteSuccess"
    />
  </div>
</template>

<script>
import { postList } from '@/services/connection/artikel/api'
import VbListArtikel from './listartikel/ListArtikel'
import { notification } from 'ant-design-vue';

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
    this.fetchPostList()
  },
  methods: {
    fetchPostList() {
      this.posts = []
      postList()
      .then(response => {
        if (response) {
          response.forEach(item => this.posts.unshift(item))
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteSuccess() {
      this.fetchPostList()
      notification.success({
        message: 'Hapus Berita',
        description: 'Berita berhasil dihapus',
      })
    },
  },
}
</script>