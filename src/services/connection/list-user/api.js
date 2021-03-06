import apiClient from '@/services/axios'

export async function getUserList() {
  return apiClient
    .get('/usercrm')
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => {
      console.error(err)
    })
}
export async function deleteLevelUser(id) {
  return apiClient.delete(`/usercrm/${id}`).then(response => {
    if (response) {
      return true
    }
    return false
  })
}
export async function insertUser(formData) {
  return apiClient
    .post('/usercrm', formData)
    .then(response => {
      if (response) {
        return response
      }
      return false
    })
    .catch(err => {
      console.error(err)
    })
}
