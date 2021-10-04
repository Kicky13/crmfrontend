// import apiClient from '@/services/axios'
import serverClient from '@/services/axios/axios'

export async function listPost() {
  return serverClient
  .post('/program/list')
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function showPost(id) {
  return serverClient
  .get(`/program/list/${id}`)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function deletePost(id) {
  return serverClient
  .delete(`/program/delete/${id}`)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function storePost(formData, config) {
return serverClient
.post('/program/store', formData, config)
.then(response => {
    if (response) {
        return response.data
    }
    return false
})
}

export async function updatePost(id, formData, config) {
return serverClient
.put(`/program/update/${id}`, formData, config)
.then(response => {
    if (response) {
        return response.data
    }
    return false
})
}