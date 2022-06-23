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

export async function sesiList() {
  return apiClient
  .post('/sesiPenilaian/getData')
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function addSesi(data) {
  return apiClient
  .post('/sesiPenilaian/Insert', data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function deleteSesi(data) {
  return apiClient
  .post('/sesiPenilaian/Delete', data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function updateSesi(data) {
  return apiClient
  .post('/sesiPenilaian/Update', data)
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}