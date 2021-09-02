import apiClient from '@/services/axios'

export async function listPost() {
  return apiClient
  .get('/posts_program')
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function showPost(id) {
  return apiClient
  .get(`/posts_program/${id}`)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function deletePost(id) {
  return apiClient
  .delete(`/posts_program/${id}`)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function storePost(formData, config) {
return apiClient
.post('/posts_program', formData, config)
.then(response => {
    if (response) {
        return response.data
    }
    return false
})
}

export async function updatePost(id, formData, config) {
return apiClient
.put(`/posts_program/${id}`, formData, config)
.then(response => {
    if (response) {
        return response.data
    }
    return false
})
}