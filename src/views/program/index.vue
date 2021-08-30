<template>
  <div>
      
    <router-link to="/marketing/program/tambah">
      <button type="button" class="btn btn-main mb-3">
        <i class="fa fa-plus" />
        <span class="text-black"> Tambah Program</span>
      </button>
    </router-link>
    <vb-list-artikel
      :post-items="posts"
      @delete-message="deleteSuccess"
    />
    <div class="row">
        
            <vb-list-program :post-items="posts"
      @delete-message="deleteSuccess"/>
        
    </div>
  </div>
</template>

<script>
import { listPost } from '@/services/connection/artikel/api'
import VbListProgram from './ListProgram'
import { message } from 'ant-design-vue';

export default {
  components: {
    VbListProgram,
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
