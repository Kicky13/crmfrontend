<template>
  <transition name="fade">
    <a-alert
      v-if="alertVisible"
      message="Artikel berhasil dihapus"
      type="success"
      closable
      class="mb-4"
    />
  </transition>
  <ul class="list-unstyled mb-0">
    <li :class="$style.item" v-for="post in posts" :key="post.id">
      <a href="javascript:;" :class="$style.itemLink">
        <div :class="$style.itemCover" class="mr-3">
          <img src="@/assets/images/news/1.jpg" alt="Hands" />
        </div>
        <div>
          <div class="font-weight-bold text-blue" v-text="post.title" />
          <div>03/08/2021, 20:10 WIB</div>
          <div v-text="post.detail" />
        </div>
        <div class="nav-item dropdown">
          <a-dropdown placement="bottomRight" :trigger="['click']">
            <a class="nav-link pt-sm-0" href="javascript: void(0);">
              <i class="fa fa-ellipsis-v" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">Edit</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="deletePost(post.id)">Hapus</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a>
    </li>
  </ul>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      posts: [],
      alertVisible: false,
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      axios
      .get('http://localhost:3000/posts')
      .then(response => this.posts = response.data)
    },
    deletePost(id) {
      const deleteConfirm = confirm('Apakah anda yakin?')
      if (deleteConfirm) {
        axios
        .delete(`http://localhost:3000/posts/${id}`)
        .then(response => {
          this.posts = response.data
          this.getPosts()
          this.alertVisible = true
          setTimeout(() => {
            this.alertVisible = false
          }, 5000)
        })
      }
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>

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
