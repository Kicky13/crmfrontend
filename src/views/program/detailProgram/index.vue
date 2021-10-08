<template>
    <a-row :gutter="[40, 40]">
    <a-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="8"
     
    >
      <div class="card card-top card-top-primary h-100">
        
        <div class="card-body pb-0">
            
          <div
            class="card-text detail-ellipsis"
           v-html="program_detail"
            
          />
        </div>
        
      </div>
    </a-col>
  </a-row>
</template>
<script>
import { listPost } from '@/services/connection/program/api'

export default { 
  data() {
    return {
      post: {},
    }
  },
  mounted() {
    this.getPostById()
  },
  methods: {
    getPostById() {
       const id = this.$route.params.id
      listPost()
      .then(response => {
        if (response) {
          console.log(response)
          const post = response.data.find(post => post.id === id)
          this.program_detail = post.program_detail
        }
      })
    },
  },
}
</script>