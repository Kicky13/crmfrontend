<template>
  <ul class="list-unstyled mb-0">
    <li
      :class="$style.item"
      v-for="postItem in postItems"
      :key="postItem.id"
    >
      <a
        href="javascript:;"
        :class="$style.itemLink"
      >
        <div
          :class="$style.itemCover"
          class="mr-3"
        >
          <template v-if="postItem.image && postItem.image.status !== 'removed'">
            <img
              :src="postItem.image.thumbUrl"
              :alt="postItem.image.name"
            />
          </template>
          <template v-else>
            <img
              src="@/assets/images/logo/default-image.jpg"
              alt="Default"
            />
          </template>
        </div>
        <div>
          <div
            class="font-size-18 font-weight-bold text-main"
            v-text="postItem.post_title"
          />
          <div
            class="font-size-12">
            {{postItem.post_date}}, {{postItem.post_time}} WIB
          </div>
          <div
            class="text-dark"
            v-html="postItem.post_detail"
          />
        </div>
        <div
          class="nav-item dropdown"
          style="margin-left: auto;"
        >
          <a-dropdown
            placement="bottomRight"
            :trigger="['click']"
          >
            <a
              class="nav-link pt-sm-0"
              href="javascript: void(0);"
            >
              <i class="fe fe-more-horizontal" />
            </a>
            <template #overlay>
              <a-menu>
                <router-link :to="{ path: `/berita/edit/${postItem.id}` }">
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
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
import { deletePost } from '@/services/connection/berita/api'

export default {
  props:['postItems'],
  methods: {
    deletePostById(id) {
      deletePost(id)
      .then(response => {
        if (response) {
          this.$emit('deleteMessage')
        }
      })
    },
    deleteConfirm(id) {
      const deleteMethod = this.deletePostById
      this.$confirm({
        title: 'Hapus Berita',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
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