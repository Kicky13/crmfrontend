<template>
  <div>
    <router-link to="/berita/tambah">
      <button type="button" class="btn btn-main mb-3">
        <i class="fa fa-plus" />
        <span class="text-black"> Tambah Berita</span>
      </button>
    </router-link>
    <div class="card">
      <div class="card-body"><vb-list-berita /></div>
    </div>
  </div>
</template>

<script>
import VbListBerita from './ListBerita'

export default {
  components: {
    VbListBerita,
  },
}
</script>
