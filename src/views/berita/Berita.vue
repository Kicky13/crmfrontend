<template>
  <div>
    <Can
      do="create"
      on="News"
    >
      <router-link to="/marketing/berita/tambah">
        <a-button
          class="mb-4"
          type="primary"
        >
          <i class="fa fa-plus mr-2" />
          Tambah Berita
        </a-button>
      </router-link>
    </Can>
    <template v-if="isLoading">
      <div class="d-flex justify-content-center align-items-center">
        <div class="spinner-grow spinner-grow-sm text-main" role="status" />
        <div class="spinner-grow text-main mx-2" role="status" />
        <div class="spinner-grow spinner-grow-sm text-main" role="status" />
      </div>
    </template>
    <template v-else>
      <vb-list-berita
        v-if="posts.length"
        :posts="posts"
        @delete-success="deleteSuccess"
      />
      <div
        v-else
        class="text-main text-center font-italic"
      >
        --- Belum ada berita ---
      </div>
    </template>
  </div>
</template>

<script>
import { postList } from '@/services/connection/berita/api'
import VbListBerita from './listberita/ListBerita'
import { notification } from 'ant-design-vue';

export default {
  components: {
    VbListBerita,
  },
  data() {
    return {
      posts: [],
      isLoading: false,
    }
  },
  mounted() {
    this.fetchPostList()
  },
  methods: {
    fetchPostList() {
      this.posts = []
      this.isLoading = true
      postList()
      .then(response => {
        if (response) {
          this.posts = response.data
          this.isLoading = false
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