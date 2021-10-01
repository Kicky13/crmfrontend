import apiClient from '@/services/axios'
import newApiClient from '@/services/axios/axios'

// ========== apiClient ==========
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

export async function storePost(data, config) {
    return apiClient
    .post('/posts', data, config)
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
// ========== apiClient ==========

// ========== newApiClient ==========
export async function newPostList() {
    return newApiClient
    .post('/posts/list')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function newStorePost(data, config) {
    return newApiClient
    .post('/posts/store', data, config)
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}
// ========== newApiClient ==========