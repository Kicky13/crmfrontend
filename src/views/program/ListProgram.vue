<template>
    <div class="col-md-4" v-for="post in posts" :key="post.id"> 
        <div class="card"  style="border-top:8px solid red">
            <div class="card-header" style="font-weight:bold">{{post.post_title}}</div>
            <div class="card-body">
                <small style="color:red;">Berlaku : {{post.post_date}}</small>
                <div>
                    <small style="color:black">{{post.post_detail}}</small>
                </div>
                <div>
                    <small style="color:red">Status : {{post.publication_status}}</small>
                </div>
            </div>
        </div>   
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      posts: [],
      alertVisible: false,
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      axios
      .get('http://localhost:2000/posts')
      .then(response => this.posts = response.data)
    },
    deletePost(id) {
      const deleteConfirm = confirm('Apakah anda yakin?')
      if (deleteConfirm) {
        axios
        .delete(`http://localhost:2000/posts/${id}`)
        .then(response => {
          this.posts = response.data
          this.getPosts()
          this.alertVisible = true
          setTimeout(() => {
            this.alertVisible = false
          }, 5000)
        })
      }
    },
  },
}
</script>
