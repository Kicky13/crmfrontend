import apiClient from '@/services/axios'

export async function postList() {
    return apiClient
    .get('/posts')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function showPost(id) {
    return apiClient
    .get(`/posts/${ id }`)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function deletePost(id) {
  return apiClient
  .delete(`/posts/${ id }`)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function storePost(formData, config) {
    return apiClient
    .post('/posts', formData, config)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function updatePost(id, formData, config) {
    return apiClient
    .put(`/posts/${ id }`, formData, config)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}