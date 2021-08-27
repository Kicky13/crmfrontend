<template>
  <a-row :gutter="[40, 40]">
    <a-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="8"
      v-for="postItem in postItems"
      :key="postItem.id"
    >
      <div class="card card-top card-top-primary h-100">
        <div class="card-header d-flex justify-content-between">
          <h5
            class="card-title title-ellipsis"
            v-text="postItem.post_title"
          />
          <!--<div class="nav-item dropdown">
             <a-dropdown
              placement="bottomCenter"
              :trigger="['click']"
            >
              <a
                class="nav-link pt-sm-0"
                href="javascript: void(0);"
              >
                <i class="fa fa-caret-down" />
              </a>
              <template #overlay>
                <a-menu>
                  <router-link :to="{ path: `/marketing/artikel/edit/${postItem.id}` }">
                    <a-menu-item>
                      <a>Edit</a>
                    </a-menu-item>
                  </router-link>
                  <a-menu-item>
                    <a @click="deleteConfirm(postItem.id)">Hapus</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown> 
          </div>-->
        </div>
        <div class="card-body pb-0">
          <div
            class="card-text detail-ellipsis"
            v-html="postItem.post_detail"
          />
        </div>
        <div class="card-footer bg-transparent d-flex justify-content-between">
          <div class="text-main align-self-center">{{postItem.post_date}} {{postItem.post_time}}</div>
          <a-button
            type="primary"
          >
            Read More
          </a-button>
        </div>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      postItems: [],
      alertVisible: false,
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      axios
      .get('http://localhost:2000/posts')
      .then(response => this.postItems = response.data)
    },
    deletePost(id) {
      const deleteConfirm = confirm('Apakah anda yakin?')
      if (deleteConfirm) {
        axios
        .delete(`http://localhost:2000/posts/${id}`)
        .then(response => {
          this.postItems = response.data
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
.title-ellipsis,
.detail-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
}
.detail-ellipsis {
  -webkit-line-clamp: 4;
}
</style>