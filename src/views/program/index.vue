<template>
  <div>
      <Can do="create" on="Program">
    <router-link to="/marketing/program/tambah">
      <button type="button" class="btn btn-main mb-3">
        <i class="fa fa-plus" />
        <span class="text-black"> Tambah Program</span>
      </button>
    </router-link>
    </Can>
    
    
            <vb-list-program :post-items="posts"
      @delete-message="deleteSuccess"/>
        
    
  </div>
</template>

<script>
import { listPost } from '@/services/connection/program/api'
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
          console.log(response)
          response.data.forEach(item => this.posts.unshift(item))
        }
      })
    },
    deleteSuccess() {
      this.getListPost()
      
      message.success('Program Name berhasil dihapus')
    },
  },
}
</script>
