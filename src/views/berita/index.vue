<template>
  <div>
    <button type="button" class="btn btn-main mb-3" @click="showModalTambah">
      <i class="fa fa-plus" />
      <span class="text-black"> Tambah Berita</span>
    </button>
    <div class="card">
      <div class="card-body">
        <transition name="fade">
        <a-alert
          v-if="alertVisible"
          :message="alertMessage"
          type="success"
          closable
          class="mb-4"
        />
      </transition>
        <vb-list-berita :post-list="posts" @delete-message="deleteAlert" />
      </div>
    </div>
    <vb-form-tambah-berita :show-modal-tambah="modalTambahVisible" @handle-ok="modalTambahHandleOk" @handle-cancel="modalTambahHandleCancel" />
  </div>
</template>
<script>
import { getPostList, addPost } from '@/services/connection/apiService'
import VbListBerita from './ListBerita'
import VbFormTambahBerita from './tambah'

export default {
  components: {
    VbListBerita,
    VbFormTambahBerita,
  },
  data() {
    return {
      alertMessage: '',
      alertVisible: false,
      modalTambahVisible: false,
      posts: [],
      postDate: '',
      postTitle: '',
      postSlug: 'judul_artikel',
      postDetail: '',
      postPublicationStatus: 'Draft',
      postTag: 'bcd542e2-3292-45bc-8c82-27832cb80171',
    };
  },
  mounted() {
    this.fetchGetPostList()
  },
  methods: {
    fetchGetPostList() {
      this.posts = []
      getPostList()
      .then(response => {
        if (response) {
          response.forEach(item => this.posts.unshift(item))
        }
      })
    },
    addNewPost(date, title, slug, detail, publication_status, tag) {
      addPost(date, title, slug, detail, publication_status, tag)
      .then(response => {
        if (response) {}
      })
    },
    showModalTambah() {
      this.modalTambahVisible = true
    },
    modalTambahHandleOk(e) {
      this.modalTambahVisible = false
      this.postTitle = e.title
      this.postDetail = e.detail
      this.postDate = this.getCurrentDate()
      this.addNewPost(this.postDate, this.postTitle, this.postSlug, this.postDetail, this.postPublicationStatus, this.postTag)
      this.fetchGetPostList()
      this.alertMessage = 'Berita berhasil ditambah'
      this.afterUpdatePost()
    },
    modalTambahHandleCancel() {
      this.modalTambahVisible = false
    },
    getCurrentDate() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      return `${dd}-${mm}-${yyyy}`;
    },
    deleteAlert() {
      this.fetchGetPostList()
      this.alertMessage = 'Berita berhasil dihapus'
      this.afterUpdatePost()
    },
    afterUpdatePost() {
      this.alertVisible = true
      window.scroll({
        top: 0,
        behavior: 'smooth',
      })
      setTimeout(() => {
        this.alertVisible = false
        this.alertMessage = ''
      }, 5000)
    },
  },
}
</script>
<style scoped>
.nav-item {
  margin-left: auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>