<template>
  <a-row :gutter="[16, 16]">
    <a-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="8"
      v-for="post in posts"
      :key="post.id"
    >
      <div class="card card-top card-top-primary h-100">
        <div class="card-body pb-0">
          <Can
            do="create"
            on="News"
          >
            <div class="nav-item dropdown d-flex flex-row-reverse">
              <a-dropdown
                placement="bottomCenter"
                :trigger="['click']"
              >
                <a
                  class="nav-link pt-sm-0 pr-0"
                  href="javascript: void(0);"
                >
                  <i class="fa fa-caret-down" />
                </a>
                <template #overlay>
                  <a-menu>
                    <router-link :to="{ path: `/marketing/berita/update/${ post.id }` }">
                      <a-menu-item>
                        <a>Update</a>
                      </a-menu-item>
                    </router-link>
                    <a-menu-item>
                      <a @click="deleteConfirm(post.id)">Hapus</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </Can>
          <img
            :src="post.post_image"
            alt="Gambar"
            class="img-thumbnail mb-2"
            style="width: 100%; height: 150px;"
          />
          <!-- eslint-disable vue/no-v-html -->
          <h5
            class="card-text detail-ellipsis"
            v-html="post.post_title"
          />
        </div>
        <div class="card-footer bg-transparent d-flex justify-content-between">
          <div class="text-main align-self-center">{{ post.post_date }} {{post.post_time}}</div>
          <router-link :to="`/marketing/berita/detail/${ post.id }`">
            <a-button type="primary">Selengkapnya</a-button>
          </router-link>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { deletePost } from '@/services/connection/berita/api'

export default {
  props: {
    posts: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  emits: ['deleteSuccess'],
  methods: {
    deletePostById(id) {
      deletePost(id)
      .then(response => {
        if (response) {
          this.$emit('deleteSuccess')
        }
      })
      .catch(err => {
        if (err) {}
      })
    },
    deleteConfirm(id) {
      const deleteMethod = this.deletePostById
      this.$confirm({
        title: 'Hapus Berita',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        cancelText: 'Batal',
        okType: 'primary',
        onOk() {
          deleteMethod(id)
        },
      });
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