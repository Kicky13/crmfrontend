<template>
  <div>
    <ul class="list-unstyled mb-0">
      <li :class="$style.item" v-for="post in postList" :key="post.id">
        <a href="javascript:;" :class="$style.itemLink">
          <div :class="$style.itemCover" class="mr-3">
            <img src="@/assets/images/news/1.jpg" alt="Hands" />
          </div>
          <div>
            <div class="font-size-18 font-weight-bold text-main" v-text="post.post_title" />
            <div class="font-size-12">{{post.post_date}}, 20:10 WIB</div>
            <div class="text-dark" v-html="post.post_detail" />
          </div>
          <div class="nav-item dropdown" style="margin-left: auto;">
            <a-dropdown placement="bottomRight" :trigger="['click']">
              <a class="nav-link pt-sm-0" href="javascript: void(0);">
                <i class="fe fe-more-horizontal" />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a @click="fetchGetPost(post.id)">Edit</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="deleteConfirm(post.id)">Hapus</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </a>
      </li>
    </ul>
    <a-modal
      title="Edit Berita"
      :visible="modalEditVisible"
      @ok="modalEditHandleOk"
      @cancel="modalEditHandleCancel"
      ok-text="Edit"
      cancel-text="Batal"
      style="top: 20px;"
    >
      <vb-form-edit-berita :item="postObject" />
    </a-modal>
  </div>
</template>
<script>
import { getPost, deletePost } from '@/services/connection/apiService'
import VbFormEditBerita from './edit'

export default {
  components: {
    VbFormEditBerita,
  },
  props:['postList'],
  data() {
    return {
      modalEditVisible: false,
      postObject: {},
    }
  },
  methods: {
    getPostById(id) {
      this.modalEditVisible = true
      getPost(id)
      .then(response => {
        if (response) {
          this.postObject = response
        }
      })
    },
    deletePostById(id) {
      deletePost(id)
      .then(response => {
        if (response) {}
        this.$emit('deleteMessage')
      })
    },
    deleteConfirm(id) {
      const deleteMethod = this.deletePostById
      this.$confirm({
        title: 'Hapus Berita',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'danger',
        cancelText: 'Batal',
        onOk() {
          deleteMethod(id)
        },
      });
    },
    modalEditHandleOk(e) {
      this.modalEditVisible = false;
    },
    modalEditHandleCancel(e) {
      this.modalEditVisible = false;
    },
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
