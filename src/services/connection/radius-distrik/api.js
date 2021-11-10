import apiClient from '@/services/axios/axios'
import store from 'store'

export async function getDataList() {
    return apiClient
    .post('/RadiusWilayah/List')
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
}

export async function getDataListRefWilayah() {
  return apiClient
  .post('/RadiusWilayah/List_Distrik')
  .then(response => {
      if (response) {
          return response.data
      }
      return false
  })
}

export async function deleteData(id) {
  return apiClient
  .delete('/settingradius/' + id)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function insertData(data) {
  return apiClient
  .post('/settingradius', data)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
}

export async function updateData(id, data) {
  return apiClient
  .put('/settingradius/' + id, data)
  .then(response => {
    if (response) {
      return true
    }
    return false
  })
}