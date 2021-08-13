<template>
  <div class="card">
    <div class="card-header"><vb-headers-card-header :data="{ title: 'Form Tambah Berita' }" /></div>
    <div class="card-body"><vb-form-tambah-berita /></div>
  </div>
</template>

<script>
import VbHeadersCardHeader from '@/@vb/widgets/Headers/CardHeader'
import VbFormTambahBerita from '@/@vb/widgets/Forms/FormTambahBerita'

export default {
  components: {
    VbHeadersCardHeader,
    VbFormTambahBerita,
  },
}
</script>
