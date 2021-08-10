<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header"><table-header :data="{ title: 'List Permission' }" /></div>
          <div class="card-body"><datatable /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableHeader from '@/components/headers/TableHeader'
import Datatable from './Datatable.vue'

export default {
  name: 'VbAntDesign',
  components: {
    TableHeader,
    Datatable,
  },
}
</script>
