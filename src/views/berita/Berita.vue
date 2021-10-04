<template>
  <div>
    <Can
      do="create"
      on="News"
    >
      <router-link to="/marketing/berita/tambah">
        <a-button
          type="primary"
          class="mb-4"
        >
          <i class="fa fa-plus mr-2" />
          Tambah Berita
        </a-button>
      </router-link>
    </Can>
    <vb-list-berita
      :posts="posts"
      @delete-success="deleteSuccess"
    />
  </div>
</template>

<script>
import {
  newPostList,
} from '@/services/connection/artikel/api'
import VbListBerita from './listberita/ListBerita'
import { notification } from 'ant-design-vue';

export default {
  components: {
    VbListBerita,
  },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.fetchPostList()
  },
  methods: {
    fetchPostList() {
      this.posts = []
      newPostList()
      .then(response => {
        if (response) {
          response.data.forEach(item => this.posts.unshift(item))
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