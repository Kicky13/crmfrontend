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
    <vb-list-berita
      :posts="posts"
      @delete-success="deleteSuccess"
    />
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
      urlImage: null,
    }
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
          this.posts = response.data
          this.urlImage = response.data[0].post_image
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