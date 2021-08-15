<template>
  <ul class="list-unstyled mb-0">
    <li :class="$style.item" v-for="post in posts" :key="post.id">
      <a href="javascript:;" :class="$style.itemLink">
        <div :class="$style.itemCover" class="mr-3">
          <img src="@/assets/images/news/1.jpg" alt="Hands" />
        </div>
        <div>
          <div class="font-weight-bold text-blue" v-text="post.title" />
          <div v-text="post.date" />
          <div v-text="post.detail" />
        </div>
      </a>
      <div>
        <a-button type="main" size="small" class="text-white mr-2">
          Edit
        </a-button>
        <a-button size="small">Hapus</a-button>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      posts: [
        {
          id: '001',
          title: 'Kronologi UNESCO Minta Stop Pembangunan Proyek di TN Komodo NTT',
          date: '03/08/2021, 20:10 WIB',
          detail: 'Komite Warisan Dunia UNESCO meminta pemerintah Indonesia menghentikan sementara proyek pembangunan di Taman Nasional Komodo. Apa yang terjadi?',
        },
        {
          id: '002',
          title: 'Daftar Terbaru Jalan Tol yang Masuk Proyek Strategis Nasional 2021',
          date: '04/08/2021, 10:35 WIB',
          detail: 'Ruas tol yang masuk dalam daftar proyek strategis nasional 2020-2024 era kepemimpinan Presiden Jokowi meliputi 53 ruas tol.',
        },
        {
          id: '003',
          title: 'Termasuk KA di Bali, Ini Daftar Proyek Strategis Nasional Kereta Api',
          date: '04/08/2021, 12:04 WIB',
          detail: 'Pembangunan infrastuktur kereta api yang masuk dalam daftar Proyek Strategis Nasional 2020-2024 era kepemimpinan Presiden Jokowi meliputi 15 proyek.',
        },
      ],
    }
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
