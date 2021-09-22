<template>
  <div>
    <template v-if="insertPermission">
      <router-link to="/marketing/artikel/tambah">
        <a-button
          type="primary"
          class="mb-4"
        >
          <i class="fa fa-plus mr-2" />
          Tambah Artikel
        </a-button>
      </router-link>
    </template>
    <vb-list-berita
      :posts="posts"
      @delete-success="deleteSuccess"
    />
  </div>
</template>

<script>
import { postList } from '@/services/connection/artikel/api'
import { getPermissionList } from '@/services/connection/roles-permissions/api'
import VbListBerita from './listberita/ListBerita'
import { notification } from 'ant-design-vue';

export default {
  components: {
    VbListBerita,
  },
  data() {
    return {
      posts: [],
      editPostItem: {},
      role: '',
      insertPermission: false,
    };
  },
  mounted() {
    this.fetchPostList()
    this.getPermissionByRole()
  },
  methods: {
    getRole() {
      this.role = JSON.parse(localStorage.getItem('userData')).role
    },
    getPermissionByRole() {
      this.getRole()
      getPermissionList()
      .then(response => {
        this.insertPermission = response.filter(item => item.actor === this.role && item.pagename === 'Berita')[0].permission.includes('insert')
      })
    },
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