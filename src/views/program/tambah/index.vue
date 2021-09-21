<template>
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
