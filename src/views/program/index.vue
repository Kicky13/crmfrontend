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
        --- Belum ada Program ---
      </div>
    </template>
    <div class="d-flex justify-content-end mt-4">
      <a-pagination
        :current="current"
        :total="postTotal"
        :default-page-size="6"
        @change="onChange"
      />
    </div> 
    
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
      isLoading: false,
      current: 1,
      postTotal: 0,
      temp: [],
    };
  },
  mounted() {
    this.getListPost()
  },
  methods: {
    onChange(current) {
      this.current = current
      const firstIndex = this.current * 6 - 6
      const lastIndex = this.current * 6
      this.posts = this.temp.slice(firstIndex, lastIndex)
    },
    getListPost() {
      this.posts = []
      this.isLoading = true
      listPost()
      .then(response => {
        if (response) {
          // response.data.forEach(item => this.posts.unshift(item))
          this.temp = response.data
          this.postTotal = this.temp.length
          this.posts = this.temp.slice(0, 6)
          this.isLoading = false
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
