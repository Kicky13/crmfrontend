import apiClient from '@/services/axios/axios'

export async function surveyList() {
  return apiClient
  .post('/sales/SurveySales/list')
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function addSurvey(data) {
  return apiClient
  .post('/sales/SurveySales/add', data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function updateSurvey(data) {
  return apiClient
  .post('/sales/SurveySales/update', data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function deleteSurvey(data) {
  return apiClient
  .post('/sales/SurveySales/delete', data)
  .then(response => {
    if (response) {
      return response.data
    }
    return false
  })
}