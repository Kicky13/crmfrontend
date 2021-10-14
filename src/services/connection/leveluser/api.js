import apiClient from '@/services/axios/axios'

export async function levelUserList() {
  return apiClient
  .post('/user/listJenis')
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function deleteLevelUser(id) {
  return apiClient
  .delete(`/user/delete/${id}`)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function updateLevelUser(data) {
  return apiClient
  .post('/user/update', data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function addLevelUser(data) {
  return apiClient
  .post(`/user/add`, data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}