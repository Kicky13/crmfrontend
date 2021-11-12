<template>
  <div class="row mb-2">
    <div class="col-md-4 col-xs-4">
      <router-link :to="`/marketing/program`" class="font-weight-bold text-primary">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        Kembali ke List Program</router-link
      >
    </div>
  </div>
  <div class="card">
    <!-- <div class="card-header"><vb-headers-card-header :data="{ title: 'Add New Program' }" /></div> -->

    <vb-form-tambah-program />
  </div>
</template>

<script>
// import VbHeadersCardHeader from '@/@vb/widgets/Headers/CardHeader'
import VbFormTambahProgram from './FormTambahProgram'

export default {
  components: {
    // VbHeadersCardHeader,
    VbFormTambahProgram,
  },
}
</script>
