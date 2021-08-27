<template>
  <div>
      
    <router-link to="/program/tambah">
      <button type="button" class="btn btn-main mb-3">
        <i class="fa fa-plus" />
        <span class="text-black"> Tambah Program</span>
      </button>
    </router-link>
    <div class="row">
        
            <vb-list-program :post-items="posts"
      @delete-message="deleteSuccess"/>
        
    </div>
  </div>
</template>

<script>
import VbListProgram from './ListProgram'

export default {
  components: {
    VbListProgram,
  },
}
</script>
