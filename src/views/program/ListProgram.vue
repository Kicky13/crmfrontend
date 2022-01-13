<template>
  <a-row :gutter="[16, 16]">
    <a-col :xs="24" :sm="24" :md="12" :lg="8" v-for="postItem in postItems" :key="postItem.id">
      <div class="card card-top card-top-primary h-100">
        <div class="card-header d-flex justify-content-between">
          <h5 class="card-title title-ellipsis" v-text="postItem.program_title" />
          <Can do="update" on="Program">
            <div class="nav-item dropdown">
              <a-dropdown placement="bottomCenter" :trigger="['click']">
                <a class="nav-link pt-sm-0" href="javascript: void(0);">
                  <i class="fa fa-caret-down" />
                </a>
                <template #overlay>
                  <a-menu>
                    <router-link :to="{ path: `/marketing/program/edit/${postItem.id}` }">
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
          </Can>
        </div>
        <div class="card-body pb-0">
          <div class="card-text detail-ellipsis" v-html="postItem.program_detail" />
        </div>
        <div class="card-footer bg-transparent d-flex justify-content-between">
          <div class="text-main align-self-center">
            {{ postItem.start_date }} - {{ postItem.finish_date }}
          </div>
          <router-link :to="`/marketing/program/detailProgram/${postItem.id}`">
            <a-button type="primary">
              Selengkapnya
            </a-button>
          </router-link>
        </div>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import axios from 'axios'
import { deletePost } from '@/services/connection/program/api'

export default {
  props: ['postItems'],
  methods: {
    deletePostById(id) {
      try {
        deletePost(id).then(response => {
          if (response) {
            this.$emit('deleteMessage')
          }
        })
      } catch (error) {
        notification.error({
          message: 'Error',
          description: error.message,
        })
      }
    },
    deleteConfirm(id) {
      const deleteMethod = this.deletePostById
      this.$confirm({
        title: 'Hapus Program Name',
        content: 'Apakah anda yakin?',
        okText: 'Ya',
        okType: 'primary',
        cancelText: 'Batal',
        onOk() {
          deleteMethod(id)
        },
      })
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
