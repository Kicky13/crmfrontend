<template>
  <div class="card">
    <div class="card-header"><vb-header :data="{ title: 'Form Tambah Berita' }" /></div>
    <div class="card-body"><vb-form-tambah-berita /></div>
  </div>
</template>

<script>
import VbHeader from './Header'
import VbFormTambahBerita from './FormTambahBerita'

export default {
  components: {
    VbHeader,
    VbFormTambahBerita,
  },
}
</script>
