import apiClient from '@/services/axios'
import store from 'store'

export async function getDataList() {
    return apiClient
    .get('/settingradius')
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