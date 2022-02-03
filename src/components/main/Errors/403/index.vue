<template>
  <div class="p-5 font-size-30">
    <div class="font-weight-bold mb-3">Forbidden</div>
    <div>You don't have any access to this page, please contact admin to resolve</div>
    <div class="font-weight-bold font-size-70 mb-1">403 —</div>
    <router-link to="/" class="btn btn-outline-primary width-100"> Go Back </router-link>
  </div>
</template>
<script>
export default {
  name: 'VbError403',
}
</script>
