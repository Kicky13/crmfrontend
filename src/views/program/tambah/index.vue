<template>
  <div class="card">
    <!-- <div class="card-header"><vb-headers-card-header :data="{ title: 'Add New Program' }" /></div> -->
    <div style="height:8px;background-color:#b20838"></div>
    <div class="card-body"><vb-form-tambah-program /></div>
  </div>
</template>

<script>
// import VbHeadersCardHeader from '@/@vb/widgets/Headers/CardHeader'
import VbFormTambahProgram from '@/@vb/widgets/Forms/FormTambahProgram'

export default {
  components: {
    // VbHeadersCardHeader,
    VbFormTambahProgram,
  },
}
</script>
