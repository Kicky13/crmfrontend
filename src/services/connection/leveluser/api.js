import apiClient from '@/services/axios'

export async function getLevelUser() {
  return apiClient
  .get('/leveluser')
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function deleteLevelUser(id) {
  return apiClient
  .delete(`/leveluser/${id}`)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function updateLevelUser(id, data) {
  return apiClient
  .put(`/leveluser/${id}`, data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function addLevelUser(data) {
  return apiClient
  .post(`/leveluser`, data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}