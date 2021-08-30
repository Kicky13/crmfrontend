import apiClient from '@/services/axios'

export async function getUser() {
  return apiClient
  .get('/user')
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function deleteUser(id) {
  return apiClient
  .delete(`/user/${id}`)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function updateUser(id, data) {
  return apiClient
  .put(`/user/${id}`, data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function addUser(data) {
  return apiClient
  .post(`/user`, data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}