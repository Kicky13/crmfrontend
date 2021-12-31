<template>
  <div>
    <Can
      do="create"
      on="News"
    >
      <router-link to="/marketing/berita/tambah">
        <a-button
          class="mb-4"
          type="primary"
        >
          <i class="fa fa-plus mr-2" />
          Tambah Berita
        </a-button>
      </router-link>
    </Can>
    <i
      class="fa fa-question btn btn-info ml-3"
      style="border-radius: 50%;"
      @click="quickGuideModalHandle"
    />
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
        --- Belum ada berita ---
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
    <a-modal
      v-model:visible="quickGuideModalVisible"
      title="Quick Guide"
      @ok="handleOk"
    >
      <template #footer>
        <a-pagination
          :total="paginationTotal"
          :default-page-size="1"
          @change="paginationHandle"
        />
      </template>
      <guide-news
        :index="pagination"
        @get-data="setPaginationTotal"
      />
    </a-modal>
  </div>
</template>

<script>
import { postList } from '@/services/connection/berita/api'
import VbListBerita from './listberita/ListBerita'
import { notification } from 'ant-design-vue';
import GuideNews from '@/components/main/Guide/News'

export default {
  components: {
    VbListBerita,
    GuideNews,
  },
  data() {
    return {
      posts: [],
      isLoading: false,
      current: 1,
      postTotal: 0,
      temp: [],
      quickGuideModalVisible: false,
      pagination: 1,
      paginationTotal: null,
    }
  },
  mounted() {
    this.fetchPostList()
  },
  methods: {
    onChange(current) {
      this.current = current
      const firstIndex = this.current * 6 - 6
      const lastIndex = this.current * 6
      this.posts = this.temp.slice(firstIndex, lastIndex)
    },
    fetchPostList() {
      this.posts = []
      this.isLoading = true
      postList()
      .then(response => {
        if (response) {
          this.temp = response.data
          this.postTotal = this.temp.length
          this.posts = this.temp.slice(0, 6)
          this.isLoading = false
        }
      })
      .catch(err => {
        if (err) {}
      })
    },
    deleteSuccess() {
      this.fetchPostList()
      notification.success({
        message: 'Hapus Berita',
        description: 'Berita berhasil dihapus',
      })
    },
    quickGuideModalHandle() {
      this.quickGuideModalVisible = true
    },
    paginationHandle(index) {
      this.pagination = index
    },
    setPaginationTotal(total) {
      this.paginationTotal = total
    },
  },
}
</script>