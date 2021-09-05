import apiClient from '@/services/axios'

export async function getSurvey() {
  return apiClient
  .get('/survey')
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function addSurvey(data) {
  return apiClient
  .post(`/survey`, data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function updateSurvey(id, data) {
  return apiClient
  .put(`/survey/${id}`, data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

// export async function deleteUser(id) {
//   return apiClient
//   .delete(`/user/${id}`)
//   .then(response => {
//     if (response) {
//       return true
//     }
//     return false
//   })
// }