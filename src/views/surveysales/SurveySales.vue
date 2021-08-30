<template>
  <a-row :gutter="16">
    <a-col :span="9">
      <vb-jenis-penilaian />
    </a-col>
    <a-col :span="15">
      <vb-daftar-pertanyaan />
    </a-col>
  </a-row>
</template>

<script>
import VbJenisPenilaian from './jenispenilaian/JenisPenilaian'
import VbDaftarPertanyaan from './daftarpertanyaan/DaftarPertanyaan'

export default {
  components: {
    VbJenisPenilaian,
    VbDaftarPertanyaan,
  },
}
</script>