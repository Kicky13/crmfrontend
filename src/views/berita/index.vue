<template>
  <div>
    <div class="card-placeholder"><vb-headers-tag :data="{ title: 'List Berita' }" /></div>
    <div class="card">
      <div class="card-body"><vb-widgets-list-berita /></div>
    </div>
  </div>
</template>

<script>
import VbHeadersTag from '@/@vb/widgets/Headers/Tag'
import VbWidgetsListBerita from '@/@vb/widgets/WidgetsLists/ListBerita'

export default {
  components: {
    VbHeadersTag,
    VbWidgetsListBerita,
  },
}
</script>
