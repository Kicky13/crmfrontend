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
import axios from 'axios'

export default {
  components: {
    VbHeadersTag,
    VbWidgetsListBerita,
  },
  mounted() {
    // axios test
    axios
    .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(response => console.log(response.data.bpi))
  },
}
</script>
