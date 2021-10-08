<template>
  <a-row :gutter="[40, 40]">
    <a-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="8"
      v-for="postItem in postItems"
      :key="postItem.id"
    >
      <div class="card card-top card-top-primary h-100">
        <div class="card-header d-flex justify-content-between">
          
          
        </div>
        <div class="card-body pb-0">
          <div
            class="card-text detail-ellipsis"
            v-html="postItem.program_detail"
          />
        </div>
        
      </div>
    </a-col>
  </a-row>
</template>
<script>
import axios from 'axios'
import { deletePost } from '@/services/connection/program/api'

export default {
 props:['postItems'],
  methods: {
   
    
},
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>

<style scoped>
.title-ellipsis,
.detail-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
}
.detail-ellipsis {
  -webkit-line-clamp: 4;
}
</style>